"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import documentsIndex from "@/data/documents.json";

interface Project {
  id: number;
  title: string;
  problem: string; // Nhiệm vụ thực hành (ý lớn)
  problemSub: string; // Ý nhỏ
  solution: string; // Kỹ năng phát triển (ý lớn)
  solutionSub: string; // Ý nhỏ
  result: string; // Bài học rút ra (ý lớn)
  resultSub: string; // Ý nhỏ
  techTags: string[];
  docLink: string;
  visualBg: string;
}

export default function Projects() {
  // Colors for small circle markers
  const circleColors = [
    "bg-ceramic-pink",
    "bg-ceramic-blue",
    "bg-ceramic-yellow",
    "bg-ceramic-mint",
    "bg-ceramic-pink"
  ];

  // Direct academic mapping content for Nguyễn Minh Hằng's 6 Word documents
  const academicDetailsMap: Record<string, { 
    problem: string; problemSub: string;
    solution: string; solutionSub: string;
    result: string; resultSub: string;
    tags: string[];
  }> = {
    "thao-tac-co-ban-voi-tep-tin-va-thu-muc": {
      problem: "Quản lý cấu trúc thư mục khoa học và phân loại tệp tin trên máy tính.",
      problemSub: "Mục tiêu: Sắp xếp cây thư mục học tập ULIS ngăn nắp, dễ truy xuất.",
      solution: "Thiết lập sơ đồ cây thư mục học tập, phân quyền và sao lưu dữ liệu.",
      solutionSub: "Công cụ & Kỹ thuật: Ứng dụng quy tắc đặt tên, sao lưu đám mây định kỳ.",
      result: "Làm chủ không gian làm việc số cá nhân, tối ưu hóa thời gian tìm kiếm tài liệu.",
      resultSub: "Đúc kết: Bảo vệ dữ liệu cá nhân an toàn trước các rủi ro hư hỏng hệ thống.",
      tags: ["File Management", "OS Directory", "Data Backup"]
    },
    "tim-kiem-va-danh-gia-thong-tin-hoc-thuat": {
      problem: "Sàng lọc nguồn tài liệu tham khảo học thuật đáng tin cậy phục vụ nghiên cứu.",
      problemSub: "Mục tiêu: Đọc lọc tài liệu ngôn ngữ chính thống từ Google Scholar & ResearchGate.",
      solution: "Ứng dụng cú pháp tìm kiếm nâng cao (Search Operators) và đánh giá APA.",
      solutionSub: "Công cụ & Kỹ thuật: Sử dụng từ khóa loại trừ (NOT), tìm chính xác (quotes).",
      result: "Xây dựng bộ thư mục nghiên cứu vững chắc, nâng cao tư duy phản biện.",
      resultSub: "Đúc kết: Tránh ngộ nhận tin giả, xây dựng lập luận khoa học chặt chẽ.",
      tags: ["Academic Research", "Search Operators", "APA Citation"]
    },
    "viet-prompt-hieu-qua-cho-cac-tac-vu-hoc-tap": {
      problem: "Sử dụng AI tạo sinh để hỗ trợ học tập hiệu quả, tránh hiện tượng ỷ lại.",
      problemSub: "Mục tiêu: Soạn thảo prompt AI hỗ trợ dịch thuật Anh-Việt theo ngữ cảnh.",
      solution: "Xây dựng các bộ prompt theo cấu trúc định sẵn (ROLE-TASK-CONTEXT).",
      solutionSub: "Công cụ & Kỹ thuật: Thiết lập vai trò (ROLE) chuyên gia ngôn ngữ để AI phản biện.",
      result: "Biến AI thành trợ lý phản biện, tối ưu hóa thời gian soạn bài.",
      resultSub: "Đúc kết: AI chỉ là trợ lý phản biện, bản sắc ngôn từ vẫn do con người quyết định.",
      tags: ["Prompt Engineering", "AI Study Buddy", "Critical Dialogues"]
    },
    "su-dung-cong-cu-truc-tuyen-cho-du-an-nhom": {
      problem: "Tổ chức làm việc nhóm liên ngành bị phân mảnh tài nguyên và thiếu đồng bộ.",
      problemSub: "Mục tiêu: Đồng bộ hóa tài nguyên bài tập thuyết trình nhóm trên đám mây.",
      solution: "Ứng dụng các công cụ cộng tác trực tuyến để điều phối công việc.",
      solutionSub: "Công cụ & Kỹ thuật: Quản lý tiến độ Agile/Kanban trên Google Drive & Trello.",
      result: "Nâng cao hiệu suất trao đổi nhóm, đồng bộ hóa tài nguyên thời gian thực.",
      resultSub: "Đúc kết: Phối hợp khoa học trực tuyến giúp rút ngắn 30% thời gian thảo luận thừa.",
      tags: ["Online Collaboration", "Agile Management", "Notion Hub"]
    },
    "su-dung-ai-tao-sinh-de-ho-tro-sang-tao-noi-dung": {
      problem: "Ứng dụng AI lên ý tưởng, viết dàn ý nhưng vẫn đảm bảo tính nguyên bản.",
      problemSub: "Mục tiêu: Thiết kế dàn ý chi tiết bài luận ngôn ngữ học tiếng Anh.",
      solution: "Áp dụng phương pháp đồng sáng tạo (co-creation) cùng trí tuệ nhân tạo.",
      solutionSub: "Công cụ & Kỹ thuật: Nhập yêu cầu cấu trúc câu, sửa lỗi diễn đạt gián tiếp.",
      result: "Hoàn thiện bài viết học thuật có chiều sâu ngôn ngữ, đúng đạo đức.",
      resultSub: "Đúc kết: Tôn trọng bản quyền và chỉ dùng AI làm chất xúc tác khơi nguồn ý tưởng.",
      tags: ["Co-Creation with AI", "Academic Vocabulary", "Content Optimization"]
    },
    "su-dung-ai-co-trach-nhiem-trong-hoc-tap-va-nghien-cuu": {
      problem: "Nguy cơ vi phạm đạo đức học thuật và rò rỉ dữ liệu cá nhân trực tuyến.",
      problemSub: "Mục tiêu: Đảm bảo an toàn tài khoản học tập và thẻ cá nhân trên mạng.",
      solution: "Nghiên cứu giới hạn sử dụng AI, quy tắc trích nguồn AI minh bạch.",
      solutionSub: "Công cụ & Kỹ thuật: Tuân thủ quy chuẩn trích dẫn AI và bảo mật thông tin.",
      result: "Hình thành ý thức bảo mật cao, trách nhiệm đạo đức trên không gian mạng.",
      resultSub: "Đúc kết: Trở thành công dân số có trách nhiệm xã hội và tôn trọng bản quyền.",
      tags: ["AI Ethics", "Data Privacy", "Academic Honesty"]
    }
  };

  // Build projectsData list dynamically using the 6 documents from documentsIndex
  const projectsData: Project[] = documentsIndex.map((doc, idx) => {
    const details = academicDetailsMap[doc.slug] || {
      problem: "Thực hành nghiên cứu lý thuyết và rèn luyện kỹ năng số.",
      problemSub: "Mục tiêu: Hoàn thành bài tập môn học.",
      solution: "Biên tập nội dung tệp Word, chuyển đổi sang cấu trúc trang Web.",
      solutionSub: "Kỹ thuật: Chuyển đổi Word to HTML.",
      result: "Nâng cao năng lực tự học và kỹ năng số học thuật.",
      resultSub: "Đúc kết: Làm chủ các công cụ tin học ứng dụng.",
      tags: ["Coursework", "Word to HTML"]
    };

    return {
      id: idx + 1,
      title: doc.title,
      problem: details.problem,
      problemSub: details.problemSub,
      solution: details.solution,
      solutionSub: details.solutionSub,
      result: details.result,
      resultSub: details.resultSub,
      techTags: details.tags,
      docLink: `/documents/${doc.slug}`,
      visualBg: circleColors[idx % circleColors.length]
    };
  });

  // Restore scroll position ONLY when coming back from a document page
  useEffect(() => {
    const cameFromDoc = sessionStorage.getItem("projects_scroll_pos_flag");
    const savedPos = sessionStorage.getItem("projects_scroll_pos");
    
    if (cameFromDoc === "true" && savedPos) {
      const timer = setTimeout(() => {
        window.scrollTo(0, parseFloat(savedPos));
        // Clear flags immediately
        sessionStorage.removeItem("projects_scroll_pos");
        sessionStorage.removeItem("projects_scroll_pos_flag");
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Clear flags if we entered from navbar or home, loading from top
      sessionStorage.removeItem("projects_scroll_pos");
      sessionStorage.removeItem("projects_scroll_pos_flag");
    }
  }, []);

  const handleProjectClick = () => {
    // Save scroll position and set navigation flag
    sessionStorage.setItem("projects_scroll_pos", window.scrollY.toString());
    sessionStorage.setItem("projects_scroll_pos_flag", "true");
  };

  return (
    <div className="flex flex-col gap-12 py-4 md:py-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-ceramic-pink/15 pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-ceramic-pink">Showcase</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
          Kho Dự Án & Bài Tập
        </h1>
        <p className="text-slate-300 text-xs max-w-xl font-sans leading-relaxed mt-2">
          Nơi lưu trữ và trưng bày các bài thực hành kỹ năng số, nghiên cứu học thuật của Nguyễn Minh Hằng.
        </p>
      </div>

      {/* Projects Grid (Compact Layout without header visual graphics) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectsData.map((project) => {
          return (
            <div
              key={project.id}
              className="bento-card p-5 md:p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header Title with small colored ceramic circle */}
                <div className="flex items-start gap-3 mb-4 pb-3 border-b border-white/5">
                  <div className={`w-3.5 h-3.5 rounded-full ${project.visualBg} mt-1.5 shrink-0`} />
                  <h3 className="text-base md:text-lg font-serif font-extrabold text-white group-hover:text-ceramic-pink transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                </div>

                {/* Structured nested items (Ý lớn / Ý nhỏ) */}
                <div className="space-y-4 text-xs font-sans text-slate-300">
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1 font-semibold">
                      1. Nhiệm vụ thực hành
                    </h4>
                    <p className="leading-relaxed text-slate-200 pl-1 font-medium">{project.problem}</p>
                    <ul className="list-disc list-inside pl-2 mt-0.5 text-[11px] text-slate-400">
                      <li>{project.problemSub}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1 font-semibold">
                      2. Kỹ năng phát triển
                    </h4>
                    <p className="leading-relaxed text-slate-200 pl-1 font-medium">{project.solution}</p>
                    <ul className="list-disc list-inside pl-2 mt-0.5 text-[11px] text-slate-400">
                      <li>{project.solutionSub}</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono text-ceramic-pink uppercase tracking-wide font-semibold mb-1">
                      3. Bài học đúc kết
                    </h4>
                    <p className="text-white leading-relaxed pl-1 font-medium">{project.result}</p>
                    <ul className="list-disc list-inside pl-2 mt-0.5 text-[11px] text-ceramic-pink/70">
                      <li>{project.resultSub}</li>
                    </ul>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-white/5">
                  {project.techTags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-ceramic-cream/50 border border-white/5 text-[9px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-white/5">
                <Link
                  href={project.docLink}
                  onClick={handleProjectClick}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-ceramic-mint hover:bg-ceramic-mint/90 text-white font-semibold font-serif tracking-wider text-xs transition-colors duration-300"
                >
                  <FileText className="h-4 w-4" />
                  Xem Tài Liệu
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
