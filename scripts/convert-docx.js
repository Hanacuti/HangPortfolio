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

      // 1. Clean empty list items
      html = html.replace(/<li>\s*(?:&nbsp;|&#xa0;|\u00A0|<br\s*\/?>)*\s*<\/li>/gi, "");

      // 2. Remove list items wrapping images and wrap images in Tailwind centering container
      html = html.replace(/<li>\s*(<img[^>]*>)\s*<\/li>/gi, '$1');
      html = html.replace(/<li>\s*(<img[^>]*>)\s*/gi, '$1');
      html = html.replace(/(<img[^>]*>)\s*<\/li>/gi, '$1');
      
      html = html.replace(/<img([^>]*)>/gi, (match) => {
        if (match.includes('class="') || match.includes("class='")) {
          return match;
        }
        return `<div class="flex justify-center my-6 text-center w-full"><div class="inline-block mx-auto"><img${match.substring(4)} /></div></div>`;
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
        html = html.replace(/<h2>2\.\s*Cấu trúc Ngữ pháp<\/h2>/gi, "<h3>2. Cấu trúc Ngữ pháp</h3>");
        html = html.replace(/<h2>3\.\s*Giọng điệu và Tính khách quan<\/h2>/gi, "<h3>3. Giọng điệu và Tính khách quan</h3>");
      } 
      else if (slug === "viet-prompt-hieu-qua-cho-cac-tac-vu-hoc-tap") {
        html = html.replace(/<p><strong>NGHIÊN CỨU VÀ TỐI ƯU HÓA PROMPT ENGINEERING TRONG HỌC TẬP<\/strong><\/p>/gi, "<h1>NGHIÊN CỨU VÀ TỐI ƯU HÓA PROMPT ENGINEERING TRONG HỌC TẬP</h1>");
        html = html.replace(/<p><strong>1\.\s*Phân tích tác vụ học tập và mục tiêu<\/strong><\/p>/gi, "<h2>1. Phân tích tác vụ học tập và mục tiêu</h2>");
        html = html.replace(/<p><strong>2\.\s*Xây dựng các phiên bản Prompt<\/strong><\/p>/gi, "<h2>2. Xây dựng các phiên bản Prompt</h2>");
        html = html.replace(/<p><strong>3\.\s*Thử nghiệm và So sánh kết quả<\/strong><\/p>/gi, "<h2>3. Thử nghiệm và So sánh kết quả</h2>");
        html = html.replace(/<h2>4\.\s*Phân tích hiệu quả Prompt\s*\(Tư duy phản biện\s*\)<\/h2>/gi, "<h2>4. Phân tích hiệu quả Prompt (Tư duy phản biện)</h2>");
        html = html.replace(/<h2>5\.\s*Tổng hợp nguyên tắc và mẹo viết Prompt hiệu quả<\/h2>/gi, "<h2>5. Tổng hợp nguyên tắc và mẹo viết Prompt hiệu quả</h2>");
        html = html.replace(/<p><strong>2\.1\.\s*Phiên bản 1:\s*Prompt Cơ bản\s*\(Simple Prompt\s*\)<\/strong><\/p>/gi, "<h3>2.1. Phiên bản 1: Prompt Cơ bản (Simple Prompt)</h3>");
        html = html.replace(/<p><strong>2\.2\.\s*Phiên bản 2:\s*Prompt Cải tiến\s*\(Structured Prompt\s*\)<\/strong><\/p>/gi, "<h3>2.2. Phiên bản 2: Prompt Cải tiến (Structured Prompt)</h3>");
        html = html.replace(/<p><strong>2\.3\.\s*Prompt Nâng nâng cao\s*\(Advanced Prompt\s*-\s*Kết hợp Role-play,\s*Chain-of-Thought\s*và\s*Few-shot\s*\)<\/strong><\/p>/gi, "<h3>2.3. Phiên bản 3: Prompt Nâng cao (Advanced Prompt)</h3>");
      } 
      else if (slug === "su-dung-cong-cu-truc-tuyen-cho-du-an-nhom") {
        if (!html.includes("<h1>SỬ DỤNG CÔNG CỤ TRỰC TUYẾN CHO DỰ ÁN NHÓM</h1>")) {
          html = "<h1>SỬ DỤNG CÔNG CỤ TRỰC TUYẾN CHO DỰ ÁN NHÓM</h1>" + html;
        }
        html = html.replace(/<p>Phần I\.\s*Giới thiệu chung<\/p>/gi, "<h2>Phần I. Giới thiệu chung</h2>");
        html = html.replace(/<p>Phần 2\.\s*Nhật ký minh chứng<\/p>/gi, "<h2>Phần II. Nhật ký minh chứng</h2>");
        html = html.replace(/<p>2\.2\.\s*Công cụ soạn thảo tài liệu cộng tác\s*\(Google Docs\s*\)<\/p>/gi, "<h3>2.2. Công cụ soạn thảo tài liệu cộng tác (Google Docs)</h3>");
        html = html.replace(/<p>2\.3\.\s*Công cụ giao tiếp nhóm\s*\(Microsoft Teams\s*\/\s*Discord\s*\)<\/p>/gi, "<h3>2.3. Công cụ giao tiếp nhóm (Microsoft Teams / Discord)</h3>");
        if (!html.includes("<h3>2.1. Công cụ quản lý tiến độ (Trello)</h3>")) {
          html = html.replace(/(Nhóm chúng tôi đã thiết lập một bảng công việc\s*\(Board\)\s*trên Trello)/gi, "<h3>2.1. Công cụ quản lý tiến độ (Trello)</h3><p>$1");
        }
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
        html = html.replace(/<h2>Tôi tải hình ảnh chất lượng cao từ AI về, sử dụng phần mềm đồ họa cá nhân để cắt bỏ một vài chi tiết thừa ở góc camera mà AI vẽ lỗi \(ngón chân rùa bị dị dạng nhẹ\), sau đó tăng độ tương phản để bức ảnh sẵn sàng làm hình nền chủ đạo cho slide\.<\/h2>/gi, "<h3>Cách chỉnh sửa và tích hợp của cá nhân</h3><p>Tôi tải hình ảnh chất lượng cao từ AI về, sử dụng phần mềm đồ họa cá nhân để cắt bỏ một vài chi tiết thừa ở góc camera mà AI vẽ lỗi (ngón chân rùa bị dị dạng nhẹ), sau đó tăng độ tương phản để bức ảnh sẵn sàng làm hình nền chủ đạo cho slide.</p>");
        html = html.replace(/<h2><a id="b\)_Cách_chỉnh_sửa_và_tích_hợp_của_cá_nhâ"><\/a>Cách chỉnh sửa và tích hợp của cá nhân<\/h2>/gi, '<h3><a id="b)_Cách_chỉnh_sửa_và_tích_hợp_của_cá_nhâ"></a>Cách chỉnh sửa và tích hợp của cá nhân</h3>');
        html = html.replace(/<h2><a id="4\.1\._Những_điểm_mạnh_và_Hạn_chế_cốt_lõi_"><\/a>Những điểm mạnh và Hạn chế cốt lõi của AI<\/h2>/gi, '<h3><a id="4.1._Những_điểm_mạnh_và_Hạn_chế_cốt_lõi_"></a>4.1. Những điểm mạnh và Hạn chế cốt lõi của AI</h3>');
        html = html.replace(/<h2><a id="4\.2\._Sự_thay_đổi_trong_quy_trình_sáng_tạ"><\/a>Sự thay đổi trong quy trình sáng tạo cá nhân<\/h2>/gi, '<h3><a id="4.2._Sự_thay_đổi_trong_quy_trình_sáng_tạ"></a>4.2. Sự thay đổi trong quy trình sáng tạo cá nhân</h3>');
        html = html.replace(/<h2><a id="4\.3\._Các_vấn_đề_đạo_đức_cần_cân_nhắc_"><\/a>Các vấn đề đạo đức cần cân nhắc<\/h2>/gi, '<h3><a id="4.3._Các_vấn_đề_đạo_đức_cần_cân_nhắc_"></a>4.3. Các vấn đề đạo đức cần cân nhắc</h3>');
      } 
      else if (slug === "su-dung-ai-co-trach-nhiem-trong-hoc-tap-va-nghien-cuu") {
        html = html.replace(/<p><strong>PHÁT TRÌNH KỸ NĂNG SỬ SỬ DỤNG AI CÓ TRÁCH NHIỆM VÀ ĐẠO ĐỨC TRONG HỌC TẬP VÀ NGHIÊN CỨU<\/strong><\/p>/gi, "<h1>PHÁT TRIỂN KỸ NĂNG SỬ SỬ DỤNG AI CÓ TRÁCH NHIỆM VÀ ĐẠO ĐỨC TRONG HỌC TẬP VÀ NGHIÊN CỨU</h1>");
        html = html.replace(/<p><strong>PHÁT TRIỂN KỸ NĂNG SỬ SỬ DỤNG AI CÓ TRÁCH NHIỆM VÀ ĐẠO ĐỨC TRONG HỌC TẬP VÀ NGHIÊN CỨU<\/strong><\/p>/gi, "<h1>PHÁT TRIỂN KỸ NĂNG SỬ SỬ DỤNG AI CÓ TRÁCH NHIỆM VÀ ĐẠO ĐỨC TRONG HỌC TẬP VÀ NGHIÊN CỨU</h1>");
        html = html.replace(/<p><strong>I\.\s*Phân tích chính sách của nhà trường về sử dụng AI trong học thuật<\/strong><\/p>/gi, "<h2>I. Phân tích chính sách của nhà trường về sử dụng AI trong học thuật</h2>");
        html = html.replace(/<p><strong>II\.\s*Nhật ký thực nghiệm:\s*Sử dụng AI hỗ trợ thực hiện nhiệm vụ học tập<\/strong><\/p>/gi, "<h2>II. Nhật ký thực nghiệm: Sử dụng AI hỗ trợ thực hiện nhiệm vụ học tập</h2>");
        html = html.replace(/<p><strong>III\.\s*Phân tích các vấn đề đạo đức liên quan đến AI trong học thuật<\/strong><\/p>/gi, "<h2>III. Phân tích các vấn đề đạo đức liên quan đến AI trong học thuật</h2>");
        html = html.replace(/<p><strong>IV\.\s*Bộ nguyên tắc cá nhân về sử dụng AI có trách nhiệm\s*\(6\s*Nguyên tắc\s*\)<\/strong><\/p>/gi, "<h2>IV. Bộ nguyên tắc cá nhân về sử dụng AI có trách nhiệm (6 Nguyên tắc)</h2>");
        html = html.replace(/<p><strong>V\.\s*Inforgraphic minh họa “Sử dụng AI có trách nhiệm trong học tập<\/strong><\/p>/gi, "<h2>V. Infographic minh họa &quot;Sử dụng AI có trách nhiệm trong học tập&quot;</h2>");
        html = html.replace(/<p><strong>1\.\s*Ghi lại các prompts đã sử dụng và đầu ra\s*\(Outputs\)\s*của AI<\/strong><\/p>/gi, "<h3>1. Ghi lại các prompts đã sử dụng và đầu ra (Outputs) của AI</h3>");
        html = html.replace(/<p><strong>2\.\s*Đánh giá,\s*chỉnh sửa và tích hợp đầu ra của AI<\/strong><\/p>/gi, "<h3>2. Đánh giá, chỉnh sửa và tích hợp đầu ra của AI</h3>");
        html = html.replace(/<p><strong>3\.\s*Trích dẫn việc sử dụng AI một cách minh bạch\s*\(Mẫu trích dẫn\s*\)<\/strong><\/p>/gi, "<h3>3. Trích dẫn việc sử dụng AI một cách minh bạch (Mẫu trích dẫn)</h3>");
        html = html.replace(/<p><strong>1\.\s*Ranh giới giữa hỗ trợ hợp lý và gian lận học thuật<\/strong><\/p>/gi, "<h3>1. Ranh giới giữa hỗ trợ hợp lý và gian lận học thuật</h3>");
        html = html.replace(/<p><strong>2\.\s*Vấn đề về quyền sở hữu trí tuệ và trích dẫn<\/strong><\/p>/gi, "<h3>2. Vấn đề về quyền sở hữu trí tuệ và trích dẫn</h3>");
        html = html.replace(/<p><strong>3\.\s*Tác động đến quá trình học tập và phát triển kỹ năng<\/strong><\/p>/gi, "<h3>3. Tác động đến quá trình học tập và phát triển kỹ năng</h3>");
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
