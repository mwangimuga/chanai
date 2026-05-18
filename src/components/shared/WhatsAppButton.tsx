import { forwardRef, useState } from "react";
import { useWhatsApp } from "@/hooks/useWhatsApp";

const WhatsAppButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const { openWhatsApp } = useWhatsApp();
  const [hovered, setHovered] = useState(false);
  return (
    <button
      ref={ref}
      onClick={() => openWhatsApp("Hello ChanAI Tech! I'd like to learn more about your services.")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 group"
    >
      <span
        className={`overflow-hidden transition-all duration-300 text-sm font-medium text-white whitespace-nowrap glass-strong rounded-full ${
          hovered ? "max-w-[200px] opacity-100 px-4 py-2" : "max-w-0 opacity-0 px-0 py-0"
        }`}
      >
        Chat with us
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping-ring" />
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white relative z-10" fill="currentColor">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/>
          <path d="M20.5 3.5C18.3 1.2 15.3 0 12.1 0 5.5 0 .2 5.4.2 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.4-8.3zM12.1 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.5 4.5-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7-.1 5.5-4.5 9.9-9.9 9.9z"/>
        </svg>
      </span>
    </button>
  );
});
WhatsAppButton.displayName = "WhatsAppButton";

export default WhatsAppButton;
