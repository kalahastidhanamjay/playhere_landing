/** A tiny inline icon set (24px grid, stroke-based) so the landing page ships no icon library. */
const CIRCLE10 = "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z";

const PATHS = {
  check: "M20 6 9 17l-5-5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  plus: "M12 5v14M5 12h14",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  chart: "M3 3v18h18M7 15l4-4 3 3 5-6",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  whistle: "M10 6v4M21 6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.675A7 7 0 1 1 9 6z",
  // Sports
  cricket: "M20.6 3.4a1.5 1.5 0 0 1 0 2.1L11 15.1 8.9 13 18.5 3.4a1.5 1.5 0 0 1 2.1 0ZM8.9 15.1 4 20M8.5 6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0",
  football: `${CIRCLE10}M12 7.5l4.3 3.1-1.6 5H9.3l-1.6-5ZM12 2v5.5M16.3 10.6l5.2-1.7M14.7 15.6l3.2 4.4M9.3 15.6l-3.2 4.4M7.7 10.6 2.5 8.9`,
  basketball: `${CIRCLE10}M12 2v20M2 12h20M5 4.9c3.6 3.7 3.6 10.5 0 14.2M19 4.9c-3.6 3.7-3.6 10.5 0 14.2`,
  volleyball: `${CIRCLE10}M11 7a16 16 0 0 1 10.98 4.362M12 12a13 13 0 0 1-8.66 5M16.83 13.634a16 16 0 0 1-9.267 7.328M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10M8.17 15.366a16 16 0 0 1-1.713-11.69`,
  shuttle: "M6.5 14.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.6 15.4 13.5 4 20 10.5ZM11 13l5.8-5.8",
  racket: "M14 3.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM9.4 14.6 3.5 20.5M10.5 6.5l7 7M17.5 6.5l-7 7",
  paddle: "M18.4 15.2a7 7 0 1 0-9.6-9.6 7 7 0 0 0 0 7.8L4 18.2 5.8 20l4.8-4.8a7 7 0 0 0 7.8 0ZM19.5 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
  hockey: "M16 2 9.2 17.2A3 3 0 0 1 6.5 19H3M17.5 15.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z",
  kabaddi:
    "M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5M9 5A2 2 0 1 0 5 5V10M9 7V4A2 2 0 1 1 13 4V7.268",
  khokho:
    "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0ZM20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0ZM16 17h4M4 13h4",
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, strokeWidth = 2 }: { name: IconName; size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={PATHS[name]} />
    </svg>
  );
}
