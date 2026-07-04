/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

const DOCS_DIR = path.join(__dirname, "../DuAnWord");
const OUTPUT_HTML_DIR = path.join(__dirname, "../src/data/documents");
const OUTPUT_JSON_PATH = path.join(__dirname, "../src/data/documents.json");

// Vietnamese slugify function to generate clean, SEO-friendly URLs
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function convertAll() {
  console.log("Starting conversion of docx files...");
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_HTML_DIR)) {
    fs.mkdirSync(OUTPUT_HTML_DIR, { recursive: true });
  }

  // Read files in DuAnWord directory
  const files = fs.readdirSync(DOCS_DIR);
  const docxFiles = files.filter(f => f.endsWith(".docx"));
  
  console.log(`Found ${docxFiles.length} docx files to convert.`);
  
  const documentsIndex = [];

  for (const file of docxFiles) {
    const filePath = path.join(DOCS_DIR, file);
    const fileNameWithoutExt = path.basename(file, ".docx");
    
    // Generate clean slug
    // Remove starting numbers like "1. " from slug
    const cleanTitle = fileNameWithoutExt.replace(/^\d+\.\s*/, "");
    const slug = slugify(cleanTitle);
    
    console.log(`Converting: "${file}" -> slug: "${slug}"`);

    try {
      // Convert docx to HTML using mammoth
      // Configure mammoth options if needed (e.g. styleMap)
      const options = {
        styleMap: [
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Heading 4'] => h4:fresh",
          "ul > li => li:fresh",
          "ol > li => li:fresh"
        ]
      };

      const result = await mammoth.convertToHtml({ path: filePath }, options);
      let html = result.value;
      const warnings = result.messages;
      
      if (warnings.length > 0) {
        console.warn(`Warnings for ${file}:`, warnings);
      }

      // ----------------------------------------------------
      // POST-PROCESSING: Fix formatting & layout bugs
      // ----------------------------------------------------

      // 0. Clean spelling typos in the raw Word text
      html = html.replace(/SỬ SỬ DỤNG/gi, "SỬ DỤNG");
      html = html.replace(/PHÁT TRÌNH KỸ NĂNG/gi, "PHÁT TRIỂN KỸ NĂNG");
      html = html.replace(/Nâng nâng cao/gi, "Nâng cao");
      html = html.replace(/Inforgraphic/gi, "Infographic");

      // 1. Clean empty list items
      html = html.replace(/<li>\s*(?:&nbsp;|&#xa0;|\u00A0|<br\s*\/?>)*\s*<\/li>/gi, "");

      // 2. Wrap and center images inside paragraphs and list items correctly
      // Paragraph-wrapped images
      html = html.replace(/<p>\s*<img([^>]*?)\/?>\s*<\/p>/gi, (match, attrs) => {
        return `<div class="flex justify-center my-6 text-center w-full"><div class="inline-block mx-auto"><img ${attrs.trim()} /></div></div>`;
      });

      // List-wrapped images
      html = html.replace(/<li>\s*<img([^>]*?)\/?>\s*<\/li>/gi, (match, attrs) => {
        return `<li class="list-none flex justify-center my-6 text-center w-full"><div class="inline-block mx-auto"><img ${attrs.trim()} /></div></li>`;
      });
      html = html.replace(/<li>\s*<p>\s*<img([^>]*?)\/?>\s*<\/p>\s*<\/li>/gi, (match, attrs) => {
        return `<li class="list-none flex justify-center my-6 text-center w-full"><div class="inline-block mx-auto"><img ${attrs.trim()} /></div></li>`;
      });

      // Fallback for any other unwrapped images
      html = html.replace(/<img([^>]*?)\/?>/gi, (match, attrs) => {
        if (attrs.includes('class="') || attrs.includes("class='") || attrs.includes('data:image')) {
          return match;
        }
        return `<div class="flex justify-center my-6 text-center w-full"><div class="inline-block mx-auto"><img ${attrs.trim()} /></div></div>`;
      });

      // 3. Restore list letter prefixes (e.g. a), b)) from Mammoth's anchor IDs
      html = html.replace(/<a id="([a-zA-Z0-9])\)_([^"]+)">\s*<\/a>\s*(<strong>)?/gi, (match, letter, rest, strong) => {
        return `<a id="${letter})_${rest}"></a>${strong || ''}${letter}) `;
      });

      // 4. Universal nested list unwrapping to prevent double list bullet bugs
      let prevHtml;
      do {
        prevHtml = html;
        html = html.replace(/<ul><li><ol>/gi, '<ol>');
        html = html.replace(/<ul><li><ul>/gi, '<ul>');
        html = html.replace(/<ol><li><ol>/gi, '<ol>');
        html = html.replace(/<ol><li><ul>/gi, '<ul>');

        // Corresponding closing tags
        html = html.replace(/<\/ol><\/li><\/ul>/gi, '</ol>');
        html = html.replace(/<\/ul><\/li><\/ul>/gi, '</ul>');
        html = html.replace(/<\/ol><\/li><\/ol>/gi, '</ol>');
        html = html.replace(/<\/ul><\/li><\/ol>/gi, '</ul>');
      } while (html !== prevHtml);
      
      html = html.replace(/<ol><li>\s*<\/li><\/ol>/gi, '');
      html = html.replace(/<ul><li>\s*<\/li><\/ul>/gi, '');
      
      // Global cleanups for invalid nesting
      html = html.replace(/<p>\s*<\/p>/gi, '');
      html = html.replace(/<p>(<h[1-6][^>]*>)/gi, '$1');

      // 6. Merge adjacent split tables
      html = html.replace(/<\/tbody>\s*<\/table>\s*<table[^>]*>\s*<tbody>/gi, "");
      html = html.replace(/<\/table>\s*<table[^>]*>/gi, "");
      html = html.replace(/<td>\s*<p[^>]*>(.*?)<\/p>\s*<\/td>/gi, "<td>$1</td>");
      html = html.replace(/<th>\s*<p[^>]*>(.*?)<\/p>\s*<\/th>/gi, "<th>$1</th>");

      // 7. Apply standard document-specific heading hierarchies
      if (slug === "thao-tac-co-ban-voi-tep-tin-va-thu-muc") {
        if (!html.includes("<h1>THAO TÁC CƠ BẢN VỚI TỆP TIN VÀ THƯ MỤC</h1>")) {
          html = "<h1>THAO TÁC CƠ BẢN VỚI TỆP TIN VÀ THƯ MỤC</h1><h2>Hướng dẫn thực hành các bước cơ bản trên Windows</h2>" + html;
        }
        // Highlight step numbers
        html = html.replace(/<p>(\d+)\.\s*(?:&nbsp;|&#xa0;|\u00A0)*\s*<strong>([^<]+):<\/strong>\s*(?:&nbsp;|&#xa0;|\u00A0)*/gi, "<h3>$1. $2</h3><p>");
      } 
      else if (slug === "tim-kiem-va-danh-gia-thong-tin-hoc-thuat") {
        // Fix duplicate/unclosed section list structures
        html = html.replace(/<ol>\s*<li>\s*<a id="1\.\s*Đặc điểm Từ vựng\s*"><\/a>\s*<strong>Đặc điểm Từ vựng<\/strong>/gi, '<h3><a id="1. Đặc điểm Từ vựng"></a>1. Đặc điểm Từ vựng</h3>');
        html = html.replace(/<h2><a id="2\.\s*Cấu trúc Ngữ pháp\s*"><\/a>Cấu trúc Ngữ pháp<\/h2>/gi, '<h3><a id="2. Cấu trúc Ngữ pháp"></a>2. Cấu trúc Ngữ pháp</h3>');
        html = html.replace(/<h2><a id="3\.\s*Giọng điệu và Tính khách quan\s*"><\/a>Giọng điệu và Tính khách quan<\/h2>/gi, '<h3><a id="3. Giọng điệu và Tính khách quan"></a>3. Giọng điệu và Tính khách quan</h3>');
        
        // Remove trailing unclosed tags from section II
        html = html.replace(/<\/li>\s*<\/ol>\s*<h2><a id="III\.\s*Danh mục tài liệu/gi, '<h2><a id="III. Danh mục tài liệu');

        // Fix headings I and II
        html = html.replace(/<h2><a id="I\.\s*Giới\s+thiệu\s+chung\s*"><\/a>Giới thiệu chung<\/h2>/gi, '<h2><a id="I._Giới_thiệu_chung_"></a>I. Giới thiệu chung</h2>');
        html = html.replace(/<h2><a id="II\.\s*Nội\s+dung\s+so\s+sánh\s*"><\/a>Nội dung so sánh<\/h2>/gi, '<h2><a id="II._Nội_dung_so_sánh_"></a>II. Nội dung so sánh</h2>');
        
        // Restore Roman numerals III and IV in heading text
        html = html.replace(/<h2><a id="III\.\s*Danh mục tài liệu tham khảo\s*"><\/a>Danh mục tài liệu tham khảo<\/h2>/gi, '<h2><a id="III. Danh mục tài liệu tham khảo"></a>III. Danh mục tài liệu tham khảo</h2>');
        html = html.replace(/<h2><a id="IV\.\s*Bảng tổng hợp và Đánh giá độ tin cậy\s*"><\/a>Bảng tổng hợp và Đánh giá độ tin cậy của nguồn thông tin<\/h2>/gi, '<h2><a id="IV. Bảng tổng hợp và Đánh giá độ tin cậy"></a>IV. Bảng tổng hợp và Đánh giá độ tin cậy của nguồn thông tin</h2>');

        // Clean up Celce-Murcia, Flowerdew and publisher split typos
        html = html.replace(/Celce-Mur\s+cia/gi, 'Celce-Murcia');
        html = html.replace(/Flowerde\s+w/gi, 'Flowerdew');
        html = html.replace(/Nhà XB: SAGE<\/li>\s*<\/ul>\s*<p>Publications\.<\/p>/gi, 'Nhà XB: SAGE Publications</li></ul>');

        // Merge evaluation table split criteria rows (e.g. Biber 2006, Nesi & Gardner 2012)
        html = html.replace(/<\/ul>\s*<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>\s*<tr>\s*<td><\/td>\s*<td><\/td>\s*<td><\/td>\s*<td>\s*-\s*Cập nhật:\s*([\s\S]*?)<\/td>\s*<td><\/td>\s*<\/tr>/gi,
          '<li>Cập nhật: $2</li></ul></td><td>$1</td></tr>');

        // Clean up last table cell broken tags
        html = html.replace(/Tier 3 \(Trung bình<\/p>\s*<p>- Phục vụ tra cứu thực tế\)/gi, 'Tier 3 (Trung bình - Phục vụ tra cứu thực tế)');
      } 
      else if (slug === "viet-prompt-hieu-qua-cho-cac-tac-vu-hoc-tap") {
        html = html.replace(/<p><strong>NGHIÊN CỨU VÀ TỐI ƯU HÓA PROMPT ENGINEERING TRONG HỌC TẬP<\/strong><\/p>/gi, "<h1>NGHIÊN CỨU VÀ TỐI ƯU HÓA PROMPT ENGINEERING TRONG HỌC TẬP</h1>");
        html = html.replace(/<p><strong>1\.\s*Phân tích tác vụ học tập và mục tiêu<\/strong><\/p>/gi, "<h2>1. Phân tích tác vụ học tập và mục tiêu</h2>");
        html = html.replace(/<p><strong>2\.\s*Xây dựng các phiên bản Prompt<\/strong><\/p>/gi, "<h2>2. Xây dựng các phiên bản Prompt</h2>");
        html = html.replace(/<p><strong>3\.\s*Thử nghiệm và So sánh kết quả<\/strong><\/p>/gi, "<h2>3. Thử nghiệm và So sánh kết quả</h2>");
        html = html.replace(/<h2>4\.\s*Phân tích hiệu quả Prompt\s*\(Tư duy phản biện\s*\)<\/h2>/gi, "<h2>4. Phân tích hiệu quả Prompt (Tư duy phản biện)</h2>");
        html = html.replace(/<h2>5\.\s*Tổng hợp nguyên tắc và mẹo viết Prompt hiệu quả<\/h2>/gi, "<h2>5. Tổng hợp nguyên tắc và mẹo viết Prompt hiệu quả</h2>");
        html = html.replace(/<p><strong>2\.1\.\s*Phiên bản 1:\s*Prompt Cơ bản\s*\(Simple Prompt\s*\)<\/strong><\/p>/gi, "<h3>2.1. Phiên bản 1: Prompt Cơ bản (Simple Prompt)</h3>");
        html = html.replace(/<p><strong>2\.2\.\s*Prompt Cải tiến\s*\(Structured Prompt\s*\)<\/strong><\/p>/gi, "<h3>2.2. Phiên bản 2: Prompt Cải tiến (Structured Prompt)</h3>");
        
        // Restore heading 2.3 and subheadings Workflow / Công thức RCAI
        html = html.replace(/<p><strong>2\.3\.\s*Prompt Nâng cao\s*\(Advanced Prompt\s*-\s*Kết hợp Role-play,\s*Chain-of-Thought\s*và\s*Few-shot\s*\)<\/strong><\/p>/gi, "<h3>2.3. Phiên bản 3: Prompt Nâng cao (Advanced Prompt - Kết hợp Role-play, Chain-of-Thought và Few-shot)</h3>");
        html = html.replace(/<p><strong>Workflow\/Instructions:<\/strong><\/p>/gi, "<h4>Workflow/Instructions:</h4>");
        html = html.replace(/<p><strong>Công thức R-C-A-I[^<]*<\/strong><\/p>/gi, "<h4>Công thức R-C-A-I (Role - Context - Action - Instruction)</h4>");

        // Close unclosed outer list before section 2 starts
        html = html.replace(/<\/ul>\s*(<h2>2\.\s*Xây dựng các phiên bản Prompt<\/h2>)/gi, '</ul></ul>$1');

        // Fix unclosed prompt quotes
        html = html.replace(/<p>"Hãy giải thích khái niệm Proof of Work \(PoW\) trong công nghệ Blockchain\.\s*<ul>/gi, '<p>"Hãy giải thích khái niệm Proof of Work (PoW) trong công nghệ Blockchain."</p><ul>');
        html = html.replace(/dễ hiểu\."<\/li>/gi, 'dễ hiểu.</li>');
      } 
      else if (slug === "su-dung-cong-cu-truc-tuyen-cho-du-an-nhom") {
        if (!html.includes("<h1>SỬ DỤNG CÔNG CỤ TRỰC TUYẾN CHO DỰ ÁN NHÓM</h1>")) {
          html = "<h1>SỬ DỤNG CÔNG CỤ TRỰC TUYẾN CHO DỰ ÁN NHÓM</h1>" + html;
        }
        html = html.replace(/<p>Phần I\.\s*Giới thiệu chung<\/p>/gi, "<h2>Phần I. Giới thiệu chung</h2>");
        html = html.replace(/<p>Phần 2\.\s*Nhật ký minh chứng<\/p>/gi, "<h2>Phần 2. Nhật ký minh chứng</h2>");
        html = html.replace(/<p>2\.2\.\s*Công cụ soạn thảo tài liệu cộng tác\s*\(Google Docs\s*\)<\/p>/gi, "<h3>2.2. Công cụ soạn thảo tài liệu cộng tác (Google Docs)</h3>");
        html = html.replace(/<p>2\.3\.\s*Công cụ giao tiếp nhóm\s*\(Microsoft Teams\s*\/\s*Discord\s*\)<\/p>/gi, "<h3>2.3. Công cụ giao tiếp nhóm (Microsoft Teams / Discord)</h3>");
        if (!html.includes("<h3>2.1. Công cụ quản lý tiến độ (Trello)</h3>")) {
          html = html.replace(/(Nhóm chúng tôi đã thiết lập một bảng công việc\s*\(Board\)\s*trên Trello)/gi, "<h3>2.1. Công cụ quản lý tiến độ (Trello)</h3><p>$1");
        }
        // Map single-item lists to headings
        html = html.replace(/<ol>\s*<li>Các công cụ hợp tác trực tuyến được sử dụng<\/li>\s*<\/ol>/gi, '<h3>Các công cụ hợp tác trực tuyến được sử dụng</h3>');
        html = html.replace(/<ol>\s*<li>Phân tích hiệu quả của công cụ đối với cá nhân<\/li>\s*<\/ol>/gi, '<h3>Phân tích hiệu quả của công cụ đối với cá nhân</h3>');

        // Fix bullet list items
        html = html.replace(/<li>Nhiệm vụ:<\/li>\s*<\/ul>\s*<p>\+\s*Quản lý, sắp xếp lịch trình thực hiện<\/p>\s*<p>\+\s*Tổng hợp kiến thức<\/p>/gi, '<li>Nhiệm vụ:<ul><li>Quản lý, sắp xếp lịch trình thực hiện</li><li>Tổng hợp kiến thức</li></ul></li></ul>');

        // Fix section III. Kết luận H2 heading placement
        html = html.replace(/(<p>Qua việc áp dụng các công cụ trực tuyến)/gi, '<h2>Phần III. Kết luận</h2>$1');
      } 
      else if (slug === "su-dung-ai-tao-sinh-de-ho-tro-sang-tao-noi-dung") {
        html = html.replace(/<h1><a id="PHẦN_I:_GIỚI_THIỆU_CHUNG_VỀ_DỰ_ÁN_"><\/a>PHẦN I: GIỚI THIỆU CHUNG VỀ DỰ ÁN<\/h1>/gi, '<h2><a id="PHẦN_I:_GIỚI_THIỆU_CHUNG_VỀ_DỰ_ÁN_"></a>PHẦN I: GIỚI THIỆU CHUNG VỀ DỰ ÁN</h2>');
        html = html.replace(/<h1><a id="PHẦN_II:_NHẬT_KÝ_CHI_TIẾT_QUÁ_TRÌNH_SỬ_D"><\/a>PHẦN II: NHẬT KÝ CHI TIẾT QUÁ TRÌNH SỬ DỤNG AI<\/h1>/gi, '<h2><a id="PHẦN_II:_NHẬT_KÝ_CHI_TIẾT_QUÁ_TRÌNH_SỬ_D"></a>PHẦN II: NHẬT KÝ CHI TIẾT QUÁ TRÌNH SỬ DỤNG AI</h2>');
        html = html.replace(/<h1><a id="PHẦN_III:_SO_SÁNH_VÀ_ĐÁNH_GIÁ_CÁC_CÔNG_C"><\/a>PHẦN III: SO SÁNH VÀ ĐÁNH GIÁ CÁC CÔNG CỤ AI<\/h1>/gi, '<h2><a id="PHẦN_III:_SO_SÁNH_VÀ_ĐÁNH_GIÁ_CÁC_CÔNG_C"></a>PHẦN III: SO SÁNH VÀ ĐÁNH GIÁ CÁC CÔNG CỤ AI</h2>');
        html = html.replace(/<h1><a id="PHẦN_IV:_PHÂN_TÍCH_VAI_TRÒ_CỦA_AI_TRONG_"><\/a>PHẦN IV: PHÂN TÍCH VAI TRÒ CỦA AI TRONG QUY TRÌNH SÁNG TẠO<\/h1>/gi, '<h2><a id="PHẦN_IV:_PHÂN_TÍCH_VAI_TRÒ_CỦA_AI_TRONG_"></a>PHẦN IV: PHÂN TÍCH VAI TRÒ CỦA AI TRONG QUY TRÌNH SÁNG TẠO</h2>');
        html = html.replace(/<h1><a id="PHẦN_V:_KẾT_LUẬN_"><\/a>PHẦN V: KẾT LUẬN<\/h1>/gi, '<h2><a id="PHẦN_V:_KẾT_LUẬN_"></a>PHẦN V: KẾT LUẬN</h2>');
        html = html.replace(/<h2><a id="1\.1\._Bối_cảnh_và_Mục_tiêu_dự_án_"><\/a>Bối cảnh và Mục tiêu dự án<\/h2>/gi, '<h3><a id="1.1._Bối_cảnh_và_Mục_tiêu_dự_án_"></a>1.1. Bối cảnh và Mục tiêu dự án</h3>');
        html = html.replace(/<h2><a id="1\.2\._Danh_sách_các_công_cụ_AI_tạo_sinh_đ"><\/a>Danh sách các công cụ AI tạo sinh được sử dụng<\/h2>/gi, '<h3><a id="1.2._Danh_sách_các_công_cụ_AI_tạo_sinh_đ"></a>1.2. Danh sách các công cụ AI tạo sinh được sử dụng</h3>');
        html = html.replace(/<h2><a id="2\.1\._Giai_đoạn_1:_Lên_ý_tưởng_và_Xây_dựn"><\/a>Giai đoạn 1: Lên ý tưởng và Xây dựng nội dung\s*\(Google Gemini\)<\/h2>/gi, '<h3><a id="2.1._Giai_đoạn_1:_Lên_ý_tưởng_và_Xây_dựn"></a>2.1. Giai đoạn 1: Lên ý tưởng và Xây dựng nội dung (Google Gemini)</h3>');
        html = html.replace(/<h2><a id="2\.2\._Giai_đoạn_2:_Sáng_tạo_tư_liệu_hình_"><\/a>Giai đoạn 2: Sáng tạo tư liệu hình ảnh độc bản\s*\(Bing Image Creator\s*\/\s*DALL-E 3\)<\/h2>/gi, '<h3><a id="2.2._Giai_đoạn_2:_Sáng_tạo_tư_liệu_hình_"></a>2.2. Giai đoạn 2: Sáng tạo tư liệu hình ảnh độc bản (Bing Image Creator / DALL-E 3)</h3>');
        html = html.replace(/<h2><a id="2\.3\._Giai_đoạn_3:_Thiết_kế_và_Hoàn_thiện"><\/a>Giai đoạn 3: Thiết kế và Hoàn thiện sản phẩm\s*\(Canva AI\s*-\s*Magic Design\)<\/h2>/gi, '<h3><a id="2.3._Giai_đoạn_3:_Thiết_kế_và_Hoàn_thiện"></a>2.3. Giai đoạn 3: Thiết kế và Hoàn thiện sản phẩm (Canva AI - Magic Design)</h3>');
        html = html.replace(/<h2>Cách chỉnh sửa và tích hợp của cá nhân<\/h2>/gi, "<h3>Cách chỉnh sửa và tích hợp của cá nhân</h3>");
        html = html.replace(/<h2>Tôi tải hình ảnh chất lượng cao từ AI về, sử dụng phần mềm đồ họa cá nhân để cắt bỏ một vài chi tiết thừa ở góc camera mà AI vẽ lỗi \(ngón chân rùa bị dị dạng nhẹ\), sau đó tăng độ tương phản để bức ảnh sẵn sàng làm hình nền chủ đạo cho slide\.<\/h2>/gi, "<p>Tôi tải hình ảnh chất lượng cao từ AI về, sử dụng phần mềm đồ họa cá nhân để cắt bỏ một vài chi tiết thừa ở góc camera mà AI vẽ lỗi (ngón chân rùa bị dị dạng nhẹ), sau đó tăng độ tương phản để bức ảnh sẵn sàng làm hình nền chủ đạo cho slide.</p>");
        
        // Correct b) Cách chỉnh sửa H2 heading to H3 with the specific label 2.3.b)
        html = html.replace(/<h2><a id="b\)_Cách_chỉnh_sửa_và_tích_hợp_của_cá_nhâ"><\/a>b\) Cách chỉnh sửa và tích hợp của cá nhân<\/h2>/gi, '<h3><a id="b)_Cách_chỉnh_sửa_và_tích_hợp_của_cá_nhâ"></a>2.3.b) Cách chỉnh sửa và tích hợp của cá nhân</h3>');
        
        html = html.replace(/<h2><a id="4\.1\._Những_điểm_mạnh_và_Hạn_chế_cốt_lõi_"><\/a>Những điểm mạnh và Hạn chế cốt lõi của AI<\/h2>/gi, '<h3><a id="4.1._Những_điểm_mạnh_và_Hạn_chế_cốt_lõi_"></a>4.1. Những điểm mạnh và Hạn chế cốt lõi của AI</h3>');
        html = html.replace(/<h2><a id="4\.2\._Sự_thay_đổi_trong_quy_trình_sáng_tạ"><\/a>Sự thay đổi trong quy trình sáng tạo cá nhân<\/h2>/gi, '<h3><a id="4.2._Sự_thay_đổi_trong_quy_trình_sáng_tạ"></a>4.2. Sự thay đổi trong quy trình sáng tạo cá nhân</h3>');
        html = html.replace(/<h2><a id="4\.3\._Các_vấn_đề_đạo_đức_cần_cân_nhắc_"><\/a>Các vấn đề đạo đức cần cân nhắc<\/h2>/gi, '<h3><a id="4.3._Các_vấn_đề_đạo_đức_cần_cân_nhắc_"></a>4.3. Các vấn đề đạo đức cần cân nhắc</h3>');

        // Apply unique stage labels for repeating H3 subheadings 2.1.b) and 2.2.b)
        let gdCount = 0;
        html = html.replace(/<h3>(<a id="[^"]*"><\/a>)?Cách chỉnh sửa và tích hợp của cá nhân<\/h3>/gi, (match, anchor) => {
          gdCount++;
          const labels = ['2.1.b) Cách chỉnh sửa và tích hợp của cá nhân', '2.2.b) Cách chỉnh sửa và tích hợp của cá nhân'];
          return `<h3>${anchor || ''}${labels[gdCount - 1] || 'Cách chỉnh sửa và tích hợp của cá nhân'}</h3>`;
        });

        // Convert single-item lists to sub-headers
        let qtrCount = 0;
        html = html.replace(/<ol>\s*<li><strong>(Quá trình Prompting và Kết quả nhận được)<\/strong><\/li>\s*<\/ol>/gi, (match, text) => {
          qtrCount++;
          const labels = ['2.1.a)', '2.2.a)', '2.3.a)'];
          return `<h4>${labels[qtrCount - 1] || 'a)'} ${text}</h4>`;
        });

        // Heals split paragraphs
        html = html.replace(/cung cấp cho tôi 5 số liệu<\/p>\s*<p>thống kê chấn động nhất/gi, 'cung cấp cho tôi 5 số liệu thống kê chấn động nhất');
        html = html.replace(/Thực trạng,<\/p>\s*<p>\(2\)/gi, 'Thực trạng, (2)');
      } 
      else if (slug === "su-dung-ai-co-trach-nhiem-trong-hoc-tap-va-nghien-cuu") {
        html = html.replace(/<p><strong>PHÁT TRIỂN KỸ NĂNG SỬ DỤNG AI CÓ TRÁCH NHIỆM VÀ ĐẠO ĐỨC TRONG HỌC TẬP VÀ NGHIÊN CỨU<\/strong><\/p>/gi, "<h1>PHÁT TRIỂN KỸ NĂNG SỬ DỤNG AI CÓ TRÁCH NHIỆM VÀ ĐẠO ĐỨC TRONG HỌC TẬP VÀ NGHIÊN CỨU</h1>");
        html = html.replace(/<p><strong>I\.\s*Phân tích chính sách của nhà trường về sử dụng AI trong học thuật<\/strong><\/p>/gi, "<h2>I. Phân tích chính sách của nhà trường về sử dụng AI trong học thuật</h2>");
        html = html.replace(/<p><strong>II\.\s*Nhật ký thực nghiệm:\s*Sử dụng AI hỗ trợ thực hiện nhiệm vụ học tập<\/strong><\/p>/gi, "<h2>II. Nhật ký thực nghiệm: Sử dụng AI hỗ trợ thực hiện nhiệm vụ học tập</h2>");
        html = html.replace(/<p><strong>III\.\s*Phân tích các vấn đề đạo đức liên quan đến AI trong học thuật<\/strong><\/p>/gi, "<h2>III. Phân tích các vấn đề đạo đức liên quan đến AI trong học thuật</h2>");
        html = html.replace(/<p><strong>IV\.\s*Bộ nguyên tắc cá nhân về sử dụng AI có trách nhiệm\s*\(6\s*Nguyên tắc\s*\)<\/strong><\/p>/gi, "<h2>IV. Bộ nguyên tắc cá nhân về sử dụng AI có trách nhiệm (6 Nguyên tắc)</h2>");
        html = html.replace(/<p><strong>V\.\s*Infographic minh họa “Sử dụng AI có trách nhiệm trong học tập<\/strong><\/p>/gi, "<h2>V. Infographic minh họa &quot;Sử dụng AI có trách nhiệm trong học tập&quot;</h2>");
        html = html.replace(/<p><strong>1\.\s*Ghi lại các prompts đã sử dụng và đầu ra\s*\(Outputs\)\s*của AI<\/strong><\/p>/gi, "<h3>1. Ghi lại các prompts đã sử dụng và đầu ra (Outputs) của AI</h3>");
        html = html.replace(/<p><strong>2\.\s*Đánh giá,\s*chỉnh sửa và tích hợp đầu ra của AI<\/strong><\/p>/gi, "<h3>2. Đánh giá, chỉnh sửa và tích hợp đầu ra của AI</h3>");
        html = html.replace(/<p><strong>3\.\s*Trích dẫn việc sử dụng AI một cách minh bạch\s*\(Mẫu trích dẫn\s*\)<\/strong><\/p>/gi, "<h3>3. Trích dẫn việc sử dụng AI một cách minh bạch (Mẫu trích dẫn)</h3>");
        html = html.replace(/<p><strong>1\.\s*Ranh giới giữa hỗ trợ hợp lý và gian lận học thuật<\/strong><\/p>/gi, "<h3>1. Ranh giới giữa hỗ trợ hợp lý và gian lận học thuật</h3>");
        html = html.replace(/<p><strong>2\.\s*Vấn đề về quyền sở hữu trí tuệ và trích dẫn<\/strong><\/p>/gi, "<h3>2. Vấn đề về quyền sở hữu trí tuệ và trích dẫn</h3>");
        html = html.replace(/<p><strong>3\.\s*Tác động đến quá trình học tập và phát triển kỹ năng<\/strong><\/p>/gi, "<h3>3. Tác động đến quá trình học tập và phát triển kỹ năng</h3>");

        // Merge floating prompt label lists and prompt quotes
        html = html.replace(/<ul>\s*<li><strong>(Prompt \d+ [^<]+)<\/strong><\/li>\s*<\/ul>\s*<p>("[^"]+")<\/p>/gi, '<ul><li><strong>$1</strong> $2</li></ul>');
      }

      // Save HTML fragment
      const outputHtmlPath = path.join(OUTPUT_HTML_DIR, `${slug}.html`);
      fs.writeFileSync(outputHtmlPath, html, "utf8");

      // Save to JSON index
      documentsIndex.push({
        id: documentsIndex.length + 1,
        title: fileNameWithoutExt, // e.g. "1. Thao tác cơ bản với tệp tin và thư mục"
        slug: slug,
        originalName: file,
        wordCount: html.replace(/<[^>]*>/g, "").split(/\s+/).length
      });

      console.log(`Successfully saved HTML fragment for "${slug}"`);
    } catch (err) {
      console.error(`Error converting file ${file}:`, err);
    }
  }

  // Write JSON metadata index file
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(documentsIndex, null, 2), "utf8");
  console.log(`Successfully generated metadata index at ${OUTPUT_JSON_PATH}`);
}

convertAll();
