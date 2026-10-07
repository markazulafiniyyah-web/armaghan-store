'use client';

import { site } from '@/data/site';
import { waLink } from '@/lib/format';

export default function WhatsAppFab() {
  return (
    <a
      className="fab"
      href={waLink(
        `Assalam o Alaikum ${site.name}! I am visiting your website and would like to ask about your kapra / place an order.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.32 4.95L2 22l5.2-1.36c1.45.79 3.09 1.21 4.84 1.21 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.13c-1.6 0-3.1-.43-4.4-1.19l-.31-.19-3.09.81.83-3.02-.2-.32a8.1 8.1 0 0 1-1.24-4.26c0-4.49 3.65-8.14 8.14-8.14 4.49 0 8.14 3.65 8.14 8.14 0 4.49-3.65 8.17-7.87 8.17Zm4.47-6.09c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.74-1.8-.2-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.65 4.12 3.62.58.24 1.03.39 1.38.5.58.18 1.11.16 1.53.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"
        />
      </svg>
      <span>WhatsApp order</span>
    </a>
  );
}
