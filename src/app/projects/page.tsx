"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import documentsIndex from "@/data/documents.json";

interface Project {
  id: number;
  title: string;
  description: string;
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

  // Direct academic mapping content for Nguyễn Minh Hằng's 6 PDF documents
  const academicDetailsMap: Record<string, { 
    description: string;
    tags: string[];
  }> = {
    "thao-tac-co-ban-voi-tep-tin-va-thu-muc": {
      description: "Hướng dẫn chi tiết các thao tác quản lý tệp tin, tổ chức cây thư mục học thuật ngăn nắp và thiết lập sao lưu dữ liệu trên hệ điều hành Windows.",
      tags: ["File Management", "OS Directory", "Data Backup"]
    },
    "tim-kiem-va-danh-gia-thong-tin-hoc-thuat": {
      description: "Nghiên cứu đối chiếu ngôn ngữ Anh học thuật và đời sống, kèm danh mục và bảng đánh giá tài liệu tham khảo theo chuẩn Harvard.",
      tags: ["Academic Research", "Search Operators", "APA Citation"]
    },
    "viet-prompt-hieu-qua-cho-cac-tac-vu-hoc-tap": {
      description: "Khảo sát và tối ưu hóa các cấp độ viết Prompt (Cơ bản, Cải tiến, Nâng cao) ứng dụng trong dịch thuật và phân tích tác vụ học tập.",
      tags: ["Prompt Engineering", "AI Study Buddy", "Critical Dialogues"]
    },
    "su-dung-cong-cu-truc-tuyen-cho-du-an-nhom": {
      description: "Nhật ký điều phối và cộng tác làm việc nhóm trực tuyến thông qua các công cụ quản lý tiến độ đám mây như Trello, Google Docs và MS Teams.",
      tags: ["Online Collaboration", "Agile Management", "Notion Hub"]
    },
    "su-dung-ai-tao-sinh-de-ho-tro-sang-tao-noi-dung": {
      description: "Quy trình ứng dụng AI tạo sinh để lên ý tưởng, thiết kế bộ ấn phẩm truyền thông đa phương tiện kết hợp biên tập và tối ưu hóa thủ công.",
      tags: ["Co-Creation with AI", "Academic Vocabulary", "Content Optimization"]
    },
    "su-dung-ai-co-trach-nhiem-trong-hoc-tap-va-nghien-cuu": {
      description: "Phân tích chính sách học thuật của nhà trường và thiết lập bộ nguyên tắc đạo đức cá nhân khi sử dụng trí tuệ nhân tạo có trách nhiệm.",
      tags: ["AI Ethics", "Data Privacy", "Academic Honesty"]
    }
  };

  // Build projectsData list dynamically using the 6 documents from documentsIndex
  const projectsData: Project[] = documentsIndex.map((doc, idx) => {
    const details = academicDetailsMap[doc.slug] || {
      description: "Biên tập nội dung tài liệu học thuật và trình bày dữ liệu học tập dưới cấu trúc trang Web.",
      tags: ["Coursework", "Web Presentation"]
    };

    return {
      id: idx + 1,
      title: doc.title,
      description: details.description,
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
          Dự Án
        </h1>
        <p className="text-slate-300 text-xs max-w-xl font-sans leading-relaxed mt-2">
          Nơi lưu trữ và trưng bày các báo cáo nghiên cứu và dự án học thuật của Nguyễn Minh Hằng.
        </p>
      </div>

      {/* Projects Grid (Compact Layout without header visual graphics) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectsData.map((project) => {
          return (
            <div
              key={project.id}
              className="bento-card p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header Title with small colored ceramic circle */}
                <div className="flex items-start gap-3 mb-4 pb-3 border-b border-white/5">
                  <div className={`w-3.5 h-3.5 rounded-full ${project.visualBg} mt-1.5 shrink-0`} />
                  <h3 className="text-base md:text-lg font-serif font-extrabold text-white group-hover:text-ceramic-pink transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                </div>

                {/* Structured nested items (Minimalist Description) */}
                <div className="text-xs font-sans text-slate-300 mt-2 mb-4 leading-relaxed font-medium">
                  <p>{project.description}</p>
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
