"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto dismiss success message after 4 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 4000);
    }, 1500);
  };

  const contactMethods = [
    {
      name: "Email học thuật",
      value: "hanacuti0507@gmail.com",
      link: "mailto:hanacuti0507@gmail.com",
      icon: <Mail className="h-5 w-5 text-lunar-gold" />,
      desc: "Kênh liên lạc chính thức cho các thảo luận nghiên cứu và thư mời hợp tác."
    },
    {
      name: "Số điện thoại",
      value: "033 544 8265",
      link: "tel:0335448265",
      icon: <Phone className="h-5 w-5 text-lunar-gold" />,
      desc: "Hỗ trợ trao đổi nhanh các công việc gấp hoặc hội thoại trực tiếp."
    },
    {
      name: "Facebook cá nhân",
      value: "Nguyễn Minh Hằng",
      link: "https://www.facebook.com/dmcuocdoi.vn",
      icon: (
        <svg className="h-5 w-5 text-lunar-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      desc: "Kết nối mạng xã hội để giao lưu và cập nhật các hoạt động sinh viên hàng ngày."
    },
    {
      name: "Địa điểm học tập",
      value: "ĐH Ngoại ngữ - ĐHQGHN",
      link: "https://maps.google.com/?q=Đại+học+Ngoại+ngữ+ĐHQGHN",
      icon: <MapPin className="h-5 w-5 text-lunar-gold" />,
      desc: "Phạm Văn Đồng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam."
    }
  ];

  return (
    <div className="flex flex-col gap-12 py-6 md:py-12">
      {/* Title Header */}
      <div className="border-b border-white/5 pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-lunar-gold">Get in touch</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2">
          Kết Nối / Liên Hệ
        </h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Direct Links */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bento-card p-6 md:p-8">
            <h2 className="text-xl font-serif font-bold text-white mb-4">
              Phương thức liên hệ
            </h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-sans">
              Tôi rất hân hạnh được hợp tác nghiên cứu, tham gia dự án số học thuật hoặc trao đổi chuyên môn. 
              Bạn có thể sử dụng các kênh liên lạc dưới đây.
            </p>
            
            <div className="space-y-6">
              {contactMethods.map((method) => (
                <a
                  key={method.name}
                  href={method.link}
                  target={method.link.startsWith("http") ? "_blank" : undefined}
                  rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex gap-4 p-4 rounded-xl border border-white/5 bg-[#0B0F19]/40 hover:border-lunar-gold/25 hover:bg-[#0B0F19]/70 transition-all duration-300 group"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0 self-start">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-mono uppercase text-slate-500 tracking-wider">
                      {method.name}
                    </h3>
                    <p className="text-sm font-semibold text-white mt-1 group-hover:text-lunar-gold transition-colors duration-300">
                      {method.value}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-sans leading-normal">
                      {method.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <div className="bento-card p-6 md:p-8">
            <h2 className="text-xl font-serif font-bold text-white mb-6">
              Gửi tin nhắn trực tiếp
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-slate-400 uppercase">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-xl bg-[#05070C]/60 border border-white/10 text-white text-sm focus:border-lunar-gold focus:outline-none transition-colors duration-300 placeholder:text-slate-600"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-slate-400 uppercase">
                    Địa chỉ Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#05070C]/60 border border-white/10 text-white text-sm focus:border-lunar-gold focus:outline-none transition-colors duration-300 placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-mono text-slate-400 uppercase">
                  Chủ đề
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Hợp tác nghiên cứu / Trao đổi công việc"
                  className="w-full px-4 py-3 rounded-xl bg-[#05070C]/60 border border-white/10 text-white text-sm focus:border-lunar-gold focus:outline-none transition-colors duration-300 placeholder:text-slate-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-slate-400 uppercase">
                  Nội dung tin nhắn *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập nội dung tin nhắn tại đây..."
                  className="w-full px-4 py-3 rounded-xl bg-[#05070C]/60 border border-white/10 text-white text-sm focus:border-lunar-gold focus:outline-none transition-colors duration-300 resize-none placeholder:text-slate-600"
                />
              </div>

              {/* Status Alert Inside Form */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm animate-fade-in">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span>Cảm ơn bạn! Tin nhắn đã được gửi thành công. Tôi sẽ phản hồi sớm nhất có thể.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-lunar-gold hover:bg-lunar-yellow text-[#05070C] font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] transform active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-[#05070C] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Gửi tin nhắn</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
