"use client";

import React from "react";
import Link from "next/link";
import { 
  FileText, 
  ExternalLink 
} from "lucide-react";
import documentsIndex from "@/data/documents.json";

interface Project {
  id: number;
  title: string;
  badge: string;
  problem: string; // Nhiệm vụ thực hành
  solution: string; // Kỹ năng phát triển
  result: string; // Bài học rút ra
  techTags: string[];
  docLink: string;
  demoLink: string;
  visualBg: string;
}

export default function Projects() {
  // Custom frame shapes matching "tim nove", "louis ed", "jordan", "boing"
  const frameShapes = [
    "frame-mirror-1", // Tim nove - scalloped mirror
    "frame-mirror-2", // Louis ed - arch bottom
    "frame-mirror-3", // Jordan - classic circle
    "frame-mirror-4", // Boing - wavy mirror
    "frame-cloud-flower" // Cloud shape
  ];

  // Colors for frames
  const frameColors = [
    "bg-ceramic-pink text-white",
    "bg-ceramic-blue text-white",
    "bg-ceramic-yellow text-slate-800",
    "bg-ceramic-mint text-white",
    "bg-ceramic-pink-light text-ceramic-pink"
  ];

  // Direct academic mapping content for Nguyễn Minh Hằng's 6 Word documents
  const academicDetailsMap: Record<string, { problem: string; solution: string; result: string; tags: string[] }> = {
    "thao-tac-co-ban-voi-tep-tin-va-thu-muc": {
      problem: "Quản lý cấu trúc thư mục khoa học và phân loại tệp tin trên máy tính cá nhân.",
      solution: "Thiết lập sơ đồ cây thư mục học tập chuẩn hóa, phân quyền truy cập và xây dựng kế hoạch sao lưu dữ liệu an toàn.",
      result: "Làm chủ không gian làm việc số cá nhân, tối ưu hóa thời gian tìm kiếm tài liệu học tập.",
      tags: ["File Management", "OS Directory Structure", "Data Backup"]
    },
    "tim-kiem-va-danh-gia-thong-tin-hoc-thuat": {
      problem: "Sàng lọc nguồn tài liệu tham khảo học thuật đáng tin cậy giữa biển thông tin chưa kiểm chứng.",
      solution: "Ứng dụng cú pháp tìm kiếm nâng cao (Search Operators) trên Google Scholar, JSTOR; đánh giá uy tín nguồn theo APA và chỉ số trích dẫn.",
      result: "Xây dựng bộ thư mục nghiên cứu vững chắc, nâng cao tư duy phản biện khi tiếp cận thông tin mạng.",
      tags: ["Academic Research", "Search Operators", "APA Citation"]
    },
    "viet-prompt-hieu-qua-cho-cac-tac-vu-hoc-tap": {
      problem: "Sử dụng AI tạo sinh (ChatGPT, Claude) để hỗ trợ học tập hiệu quả, tránh hiện tượng ỷ lại.",
      solution: "Xây dựng các bộ prompt theo cấu trúc định sẵn (ROLE-TASK-CONTEXT-CONSTRAINT) phục vụ phân tích ngữ pháp, dịch thuật đối sánh.",
      result: "Biến AI thành trợ lý phản biện, tối ưu hóa thời gian lập đề cương bài luận mà vẫn giữ vững tính tự chủ học thuật.",
      tags: ["Prompt Engineering", "AI Study Buddy", "Critical Dialogues"]
    },
    "su-dung-cong-cu-truc-tuyen-cho-du-an-nhom": {
      problem: "Tổ chức làm việc nhóm liên ngành bị phân mảnh tài nguyên và thiếu đồng bộ tiến độ.",
      solution: "Ứng dụng các công cụ cộng tác trực tuyến (Google Workspace, Notion) thiết lập sơ đồ Agile/Kanban điều phối công việc.",
      result: "Nâng cao hiệu suất trao đổi nhóm, đồng bộ hóa tài nguyên nghiên cứu thời gian thực mượt mà.",
      tags: ["Online Collaboration", "Agile Task Management", "Notion Hub"]
    },
    "su-dung-ai-tao-sinh-de-ho-tro-sang-tao-noi-dung": {
      problem: "Ứng dụng trí tuệ nhân tạo để lên ý tưởng, cấu trúc bài viết học thuật nhưng vẫn đảm bảo tính nguyên bản và văn phong cá nhân.",
      solution: "Áp dụng phương pháp đồng sáng tạo (co-creation), dùng AI để gợi ý từ vựng chuyên ngành và sửa lỗi diễn đạt cú pháp phức tạp.",
      result: "Hoàn thiện bài viết học thuật có chiều sâu ngôn ngữ học, đáp ứng đạo đức học thuật.",
      tags: ["Co-Creation with AI", "Academic Vocabulary", "Content Optimization"]
    },
    "su-dung-ai-co-trach-nhiem-trong-hoc-tap-va-nghien-cuu": {
      problem: "Nguy cơ vi phạm đạo đức học thuật (đạo văn AI) và rò rỉ dữ liệu cá nhân khi tương tác với các công cụ trực tuyến.",
      solution: "Nghiên cứu các giới hạn sử dụng AI, quy tắc trích nguồn AI minh bạch và bảo mật thông tin tài khoản cá nhân.",
      result: "Hình thành ý thức bảo mật cao, trách nhiệm bản quyền và đạo đức nghiên cứu trên không gian mạng.",
      tags: ["AI Ethics", "Data Privacy", "Academic Honesty"]
    }
  };

  // Build projectsData list dynamically using the 6 documents from documentsIndex
  const projectsData: Project[] = documentsIndex.map((doc, idx) => {
    const details = academicDetailsMap[doc.slug] || {
      problem: "Thực hành nghiên cứu lý thuyết và rèn luyện kỹ năng số.",
      solution: "Biên tập nội dung tệp Word, chuyển đổi sang cấu trúc trang Web trực quan.",
      result: "Nâng cao năng lực tự học và làm chủ các công cụ tin học ứng dụng.",
      tags: ["Coursework", "Word to HTML"]
    };

    return {
      id: idx + 1,
      title: doc.title,
      badge: "Bài tập lớn (Coursework)",
      problem: details.problem,
      solution: details.solution,
      result: details.result,
      techTags: details.tags,
      docLink: `/documents/${doc.slug}`,
      demoLink: `/documents/${doc.slug}`,
      visualBg: frameColors[idx % frameColors.length]
    };
  });

  return (
    <div className="flex flex-col gap-12 py-4 md:py-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-ceramic-pink/15 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Showcase</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 mt-2">
          Kho Dự Án & Bài Tập
        </h1>
        <p className="text-slate-500 text-xs max-w-xl font-sans leading-relaxed mt-2">
          Nơi lưu trữ và trưng bày các bài thực hành kỹ năng số, nghiên cứu học thuật của Nguyễn Minh Hằng.
        </p>
      </div>

      {/* Projects Grid (6 Word documents in styled cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projectsData.map((project, index) => {
          const frameShapeClass = frameShapes[index % frameShapes.length];
          return (
            <div
              key={project.id}
              className="bento-card overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Decorative Visual Header */}
                <div className="w-full h-44 bg-ceramic-cream/40 border-b border-ceramic-pink/10 flex items-center justify-center p-6 relative">
                  {/* Floral details */}
                  <div className="absolute top-3 left-4 opacity-30 select-none">
                    <svg className="w-8 h-8 text-ceramic-mint/30 fill-current" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 right-4 opacity-30 select-none">
                    <svg className="w-10 h-10 text-ceramic-pink/20 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                  </div>

                  {/* 3D Ceramic Mirror Frame */}
                  <div className={`w-24 h-24 ${frameShapeClass} ${project.visualBg} border-4 border-white ceramic-shadow flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                    <FileText className="h-7 w-7" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-lg md:text-xl font-serif font-extrabold text-slate-800 group-hover:text-ceramic-pink transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-[8px] font-mono text-ceramic-pink font-bold uppercase tracking-wider bg-ceramic-pink-light border border-ceramic-pink/15 px-2 py-0.5 rounded-full">
                      {project.badge}
                    </span>
                  </div>

                  {/* Parent-Child Heading Structure */}
                  <div className="space-y-4 text-xs font-sans text-slate-600">
                    <div className="border-b border-ceramic-pink/5 pb-3">
                      <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1">
                        1. Nhiệm vụ thực hành
                      </h4>
                      <p className="leading-relaxed font-sans">{project.problem}</p>
                    </div>
                    
                    <div className="border-b border-ceramic-pink/5 pb-3">
                      <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-1">
                        2. Kỹ năng phát triển
                      </h4>
                      <p className="leading-relaxed font-sans">{project.solution}</p>
                    </div>

                    <div className="pb-1">
                      <h4 className="text-[10px] font-mono text-ceramic-pink uppercase tracking-wide font-semibold mb-1">
                        3. Bài học rút ra
                      </h4>
                      <p className="text-slate-800 leading-relaxed font-medium font-sans">{project.result}</p>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-ceramic-pink/10">
                    {project.techTags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-ceramic-cream border border-ceramic-pink/5 text-[9px] font-mono text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 flex items-center gap-4 border-t border-ceramic-cream pt-4 mt-2">
                <Link
                  href={project.docLink}
                  className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-500 hover:text-ceramic-pink transition-colors duration-300"
                >
                  <FileText className="h-4 w-4 text-ceramic-pink" />
                  Xem Tài Liệu
                </Link>
                <span className="h-4 w-px bg-ceramic-pink/15" />
                <Link
                  href={project.demoLink}
                  className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-500 hover:text-ceramic-pink transition-colors duration-300"
                >
                  <ExternalLink className="h-4 w-4 text-ceramic-pink" />
                  Đọc Phiên Bản Web
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
