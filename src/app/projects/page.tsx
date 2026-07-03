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
  visualGradient: string;
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
      visualGradient: "from-blue-950 via-slate-900 to-indigo-950",
      icon: <Scale className="h-6 w-6 text-lunar-gold" />
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
      visualGradient: "from-emerald-950 via-slate-900 to-teal-950",
      icon: <BookOpen className="h-6 w-6 text-lunar-gold" />
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
      visualGradient: "from-amber-950 via-slate-900 to-stone-900",
      icon: <Cpu className="h-6 w-6 text-lunar-gold" />
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
      visualGradient: "from-purple-950 via-slate-900 to-fuchsia-950",
      icon: <Code className="h-6 w-6 text-lunar-gold" />
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
      visualGradient: "from-slate-950 via-[#0B0F19] to-[#05070C]",
      icon: <FileText className="h-6 w-6 text-lunar-gold" />
    }))
  ];

  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div className="flex flex-col gap-12 py-6 md:py-12">
      {/* Title Header */}
      <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-lunar-gold">Showcase</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
            Kho Dự Án Nghiên Cứu
          </h1>
        </div>
        <p className="text-slate-400 text-sm max-w-sm font-sans">
          Nơi tổng hợp các báo cáo nghiên cứu học thuật, sản phẩm kỹ thuật số và các dự án ứng dụng công nghệ trong pháp luật.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#0B0F19]/40 border border-white/5 p-1.5 rounded-2xl w-fit">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-lunar-gold text-[#05070C] font-semibold shadow-[0_0_12px_rgba(255,215,0,0.15)]"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
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
                {/* Visual Header Mockup */}
                <div className={`w-full h-40 bg-gradient-to-br ${project.visualGradient} border-b border-white/5 flex items-center justify-center p-6 relative`}>
                  {/* Subtle Grid Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  
                  {/* Glowing Lunar Light */}
                  <div className="absolute -bottom-4 right-1/4 w-24 h-24 rounded-full bg-lunar-gold/5 blur-xl" />
                  
                  {/* Centered Graphic Representing the Project */}
                  <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                      {project.icon}
                    </div>
                    <span className="text-[10px] font-mono text-lunar-gold uppercase tracking-widest mt-1 bg-black/50 px-2 py-0.5 rounded-full border border-lunar-gold/15">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-lunar-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Structured Problem-Solution-Result layout */}
                  <div className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 border-b border-white/5 pb-3">
                      <span className="md:col-span-3 text-slate-500 font-mono">BÀI TOÁN:</span>
                      <p className="md:col-span-9 text-slate-300 leading-relaxed">{project.problem}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 border-b border-white/5 pb-3">
                      <span className="md:col-span-3 text-slate-500 font-mono">GIẢI PHÁP:</span>
                      <p className="md:col-span-9 text-slate-300 leading-relaxed">{project.solution}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 pb-1">
                      <span className="md:col-span-3 text-lunar-gold/80 font-mono">KẾT QUẢ:</span>
                      <p className="md:col-span-9 text-slate-200 leading-relaxed font-medium">{project.result}</p>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
                    {project.techTags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interaction Buttons */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 flex items-center gap-4">
                {project.docLink.startsWith("http") || project.docLink === "#" ? (
                  <a
                    href={project.docLink}
                    className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-300 hover:text-lunar-gold transition-colors duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    Xem Tài Liệu/Mã
                  </a>
                ) : (
                  <Link
                    href={project.docLink}
                    className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-300 hover:text-lunar-gold transition-colors duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    Xem Tài Liệu/Mã
                  </Link>
                )}
                <span className="h-4 w-px bg-white/10" />
                {project.demoLink.startsWith("http") || project.demoLink === "#" ? (
                  <a
                    href={project.demoLink}
                    className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-300 hover:text-lunar-gold transition-colors duration-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Trải Nghiệm Live
                  </a>
                ) : (
                  <Link
                    href={project.demoLink}
                    className="flex items-center gap-1.5 text-xs font-semibold font-mono text-slate-300 hover:text-lunar-gold transition-colors duration-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Trải Nghiệm Live
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
