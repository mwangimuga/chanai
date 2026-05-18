export const WHATSAPP_NUMBER = "250789769928";
export const WHATSAPP_DISPLAY = "+250 789 769 928";

export const buildWhatsAppLink = (message?: string) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (message?: string) => {
  window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
};

export interface BookingPayload {
  name: string;
  company?: string;
  email: string;
  phone: string;
  country: string;
  source?: string;
  services: string[];
  project: string;
  timeline: string;
  budget: string;
  contact: string;
}

export const formatBookingMessage = (b: BookingPayload) => `🚀 *New Consultation Request — ChanAI Tech*

👤 *Name:* ${b.name}
🏢 *Company:* ${b.company || "—"}
📧 *Email:* ${b.email}
📱 *Phone:* ${b.phone}
🌍 *Country:* ${b.country}

🛠️ *Services Requested:*
${b.services.map((s) => `• ${s}`).join("\n")}

📋 *Project Details:*
${b.project}

⏱️ *Timeline:* ${b.timeline}
💰 *Budget:* ${b.budget}
📞 *Preferred Contact:* ${b.contact}

_Sent via ChanAI Tech Website_`;
