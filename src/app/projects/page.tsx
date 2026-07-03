"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Code, 
  ExternalLink, 
  BookOpen, 
  Cpu, 
  Scale 
} from "lucide-react";
import documentsIndex from "@/data/documents.json";

interface Project {
  id: number;
  title: string;
  category: "linguistics" | "digital" | "legaltech" | "academic";
  categoryLabel: string;
  badge: string;
  problem: string;
  solution: string;
  result: string;
  techTags: string[];
  docLink: string;
  demoLink: string;
  visualBg: string; // Tailwind background color class for frame
  icon: React.ReactNode;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "linguistics", label: "Nghiên cứu Ngôn ngữ" },
    { value: "digital", label: "Sản phẩm số" },
    { value: "legaltech", label: "Legal Tech" },
    { value: "academic", label: "Tài liệu học tập" },
  ];

  // Custom frame shapes matching "tim nove", "louis ed", "jordan", "boing"
  const frameShapes = [
    "frame-mirror-1", // Tim nove - scalloped mirror
    "frame-mirror-2", // Louis ed - arch bottom
    "frame-mirror-3", // Jordan - classic circle
    "frame-mirror-4", // Boing - wavy mirror
    "frame-cloud-flower" // Cloud shape
  ];

  const projectsData: Project[] = [
    {
      id: 1,
      title: "Đơn giản hóa văn bản pháp lý bằng AI (Legal NLP)",
      category: "legaltech",
      categoryLabel: "Legal Tech",
      badge: "Digital Product & Research",
      problem: "Văn bản pháp lý bằng tiếng Anh thường chứa các câu quá dài và thuật ngữ phức tạp cổ điển, gây cản trở khả năng tự đọc hiểu của người dân.",
      solution: "Xây dựng bộ quy tắc rút gọn cú pháp câu và phân tích từ vựng sử dụng thư viện NLP (Python/SpaCy), phân loại mức độ dễ hiểu của điều khoản.",
      result: "Chuyển đổi thành công các mẫu hợp đồng dịch vụ phức tạp sang tiếng Anh phổ thông, tăng mức độ hiểu của người đọc không chuyên thêm 45%.",
      techTags: ["Python", "SpaCy", "NLP Parser", "Next.js", "Markdown"],
      docLink: "#",
      demoLink: "#",
      visualBg: "bg-ceramic-pink text-white",
      icon: <Scale className="h-7 w-7 text-white" />
    },
    {
      id: 2,
      title: "Cơ sở dữ liệu Thuật ngữ Hợp đồng Thương mại Anh - Việt",
      category: "linguistics",
      categoryLabel: "Nghiên cứu Ngôn ngữ",
      badge: "Academic Report",
      problem: "Các khái niệm pháp lý Common Law (Thông luật) thường không có khái niệm tương đương hoàn toàn trong dân luật Việt Nam, gây lỗi nghiêm trọng khi dịch hợp đồng.",
      solution: "Khai thác bộ ngữ liệu song ngữ Anh-Việt gồm 50 hợp đồng mẫu quốc tế, phân tích cấu trúc đối sánh ngữ nghĩa thuật ngữ theo ngữ cảnh thực tế.",
      result: "Xuất bản cẩm nang tra cứu thuật ngữ song ngữ 40 trang với 200+ từ khóa cốt lõi kèm phân tích lỗi sai điển hình, đạt điểm xuất sắc tại hội đồng khoa học ULIS.",
      techTags: ["Linguistics", "Corpus Analysis", "LaTeX", "Academic Writing"],
      docLink: "#",
      demoLink: "#",
      visualBg: "bg-ceramic-blue text-white",
      icon: <BookOpen className="h-7 w-7 text-white" />
    },
    {
      id: 3,
      title: "Hệ thống quản lý nghiên cứu học thuật Notion Hub",
      category: "digital",
      categoryLabel: "Sản phẩm số",
      badge: "Digital Product",
      problem: "Quá trình thu thập tài liệu tham khảo (literature review), ghi chú trích dẫn và thảo luận nhóm nghiên cứu của sinh viên bị phân mảnh trên nhiều ứng dụng.",
      solution: "Thiết kế hệ dữ liệu Notion Hub liên kết chặt chẽ theo phương pháp ghi chú Zettelkasten, tích hợp bảng theo dõi tiến độ Agile/Kanban.",
      result: "Cải thiện 30% hiệu suất chuẩn bị đề cương nghiên cứu, được ứng dụng thực tế hỗ trợ 3 nhóm nghiên cứu khoa học sinh viên tại ULIS đạt hiệu quả cao.",
      techTags: ["Notion Architect", "Information Design", "Database", "Agile Layout"],
      docLink: "#",
      demoLink: "#",
      visualBg: "bg-ceramic-yellow text-slate-800",
      icon: <Cpu className="h-7 w-7 text-slate-800" />
    },
    {
      id: 4,
      title: "Chatbot Tra cứu Thuật ngữ Pháp lý Song ngữ thông minh",
      category: "legaltech",
      categoryLabel: "Legal Tech",
      badge: "Digital Product",
      problem: "Người dịch thuật và sinh viên ngành Ngôn ngữ Anh gặp khó khăn khi tìm kiếm ví dụ đặt câu thực tế cho các thuật ngữ pháp lý khó.",
      solution: "Tích hợp API của mô hình ngôn ngữ lớn kết hợp cơ sở dữ liệu thuật ngữ đã tinh lọc để trả về giải nghĩa và ví dụ song ngữ tức thời.",
      result: "Hỗ trợ trả lời chính xác trên 500 truy vấn thuật ngữ phổ biến ngay lập tức, cung cấp ngữ cảnh sử dụng thực tế chuẩn xác.",
      techTags: ["Python", "LLM API", "Tailwind CSS", "Next.js", "JSON Database"],
      docLink: "#",
      demoLink: "#",
      visualBg: "bg-ceramic-mint text-white",
      icon: <Code className="h-7 w-7 text-white" />
    },
    ...documentsIndex.map((doc) => ({
      id: 10 + doc.id,
      title: doc.title,
      category: "academic" as const,
      categoryLabel: "Tài liệu học tập",
      badge: "Academic Coursework",
      problem: "Nghiên cứu và rèn luyện kỹ năng số, tin học ứng dụng và cách viết báo cáo khoa học bài bản.",
      solution: `Biên dịch nội dung từ tệp Word tài liệu gốc, tổ chức lại bố cục trực quan chuẩn web, dung lượng ${doc.wordCount} từ.`,
      result: "Xem tài liệu học tập được trình bày dạng văn bản HTML cấu trúc sạch, tối ưu tương phản dễ đọc.",
      techTags: ["Word to HTML", "Mammoth Parser", "Bento Study"],
      docLink: `/documents/${doc.slug}`,
      demoLink: `/documents/${doc.slug}`,
      visualBg: "bg-ceramic-pink-light text-ceramic-pink",
      icon: <FileText className="h-7 w-7 text-ceramic-pink" />
    }))
  ];

  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div className="flex flex-col gap-12 py-4 md:py-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="border-b border-ceramic-pink/15 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ceramic-pink">Showcase</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 mt-2">
            Kho Dự Án Nghiên Cứu
          </h1>
        </div>
        <p className="text-slate-500 text-xs max-w-xs font-sans leading-relaxed">
          Nơi tổng hợp các báo cáo nghiên cứu học thuật, sản phẩm kỹ thuật số và các dự án ứng dụng công nghệ trong pháp luật.
        </p>
      </div>

      {/* Filter Tabs (Floral/Playful Buttons) */}
      <div className="flex flex-wrap items-center gap-2 bg-ceramic-pink-light/30 border border-ceramic-pink/10 p-1.5 rounded-2xl w-fit">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-serif tracking-wider capitalize transition-all duration-300 ${
                isActive
                  ? "bg-ceramic-mint text-white font-semibold shadow-sm scale-102"
                  : "text-slate-600 hover:text-ceramic-pink hover:bg-ceramic-pink-light/50"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid (Glazed Ornate Frames) */}
      <motion.div 
        layout 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            // Cycle frame shape styles
            const frameShapeClass = frameShapes[index % frameShapes.length];
            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bento-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Ornate Frame Visual Header */}
                  <div className="w-full h-44 bg-ceramic-cream/40 border-b border-ceramic-pink/10 flex items-center justify-center p-6 relative">
                    {/* Wavy/Foliage Background Accents */}
                    <div className="absolute top-3 left-4 opacity-30 select-none">
                      <svg className="w-10 h-10 text-ceramic-mint/30 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                      </svg>
                    </div>

                    <div className="absolute bottom-3 right-4 opacity-30 select-none">
                      <svg className="w-12 h-12 text-ceramic-pink/20 fill-current" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>

                    {/* Glazed Ceramic Mirror Frame */}
                    <div className={`w-24 h-24 ${frameShapeClass} ${project.visualBg} border-4 border-white ceramic-shadow flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                      {project.icon}
                    </div>
                  </div>

                  {/* Content details */}
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="text-xl font-serif font-bold text-slate-800 group-hover:text-ceramic-pink transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <span className="shrink-0 text-[9px] font-mono text-ceramic-pink font-semibold uppercase tracking-wider bg-ceramic-pink-light border border-ceramic-pink/15 px-2.5 py-0.5 rounded-full">
                        {project.badge}
                      </span>
                    </div>

                    {/* Structured Problem-Solution-Result layout */}
                    <div className="space-y-4 text-xs font-sans text-slate-600">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 border-b border-ceramic-pink/5 pb-3">
                        <span className="md:col-span-3 text-slate-400 font-mono text-[9px]">BÀI TOÁN:</span>
                        <p className="md:col-span-9 leading-relaxed">{project.problem}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 border-b border-ceramic-pink/5 pb-3">
                        <span className="md:col-span-3 text-slate-400 font-mono text-[9px]">GIẢI PHÁP:</span>
                        <p className="md:col-span-9 leading-relaxed">{project.solution}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 pb-1">
                        <span className="md:col-span-3 text-ceramic-pink font-mono text-[9px] font-semibold">KẾT QUẢ:</span>
                        <p className="md:col-span-9 text-slate-800 leading-relaxed font-medium">{project.result}</p>
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

                {/* Interaction Buttons (Next.js Link integration) */}
                <div className="px-6 pb-6 md:px-8 md:pb-8 flex items-center gap-4 border-t border-ceramic-cream pt-4 mt-2">
                  {project.docLink.startsWith("http") || project.docLink === "#" ? (
                    <a
                      href={project.docLink}
                      className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-500 hover:text-ceramic-pink transition-colors duration-300"
                    >
                      <FileText className="h-4 w-4 text-ceramic-pink" />
                      Xem Tài Liệu/Mã
                    </a>
                  ) : (
                    <Link
                      href={project.docLink}
                      className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-500 hover:text-ceramic-pink transition-colors duration-300"
                    >
                      <FileText className="h-4 w-4 text-ceramic-pink" />
                      Xem Tài Liệu/Mã
                    </Link>
                  )}
                  <span className="h-4 w-px bg-ceramic-pink/15" />
                  {project.demoLink.startsWith("http") || project.demoLink === "#" ? (
                    <a
                      href={project.demoLink}
                      className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-500 hover:text-ceramic-pink transition-colors duration-300"
                    >
                      <ExternalLink className="h-4 w-4 text-ceramic-pink" />
                      Trải Nghiệm Live
                    </a>
                  ) : (
                    <Link
                      href={project.demoLink}
                      className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-500 hover:text-ceramic-pink transition-colors duration-300"
                    >
                      <ExternalLink className="h-4 w-4 text-ceramic-pink" />
                      Trải Nghiệm Live
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
