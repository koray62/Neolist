import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const P: Record<string, string> = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16 M21 21l-4.3-4.3",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  settings: "M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  plus: "M12 5v14 M5 12h14",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",
  back: "M19 12H5 M12 19l-7-7 7-7",
  right: "M9 18l6-6-6-6",
  down: "M6 9l6 6 6-6",
  close: "M18 6L6 18 M6 6l12 12",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  building: "M3 21h18 M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16 M15 9h3a1 1 0 0 1 1 1v11 M9 8h2 M9 12h2 M9 16h2",
  clipboard: "M9 2h6v4H9z M7 4H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2 M8 12h8 M8 16h5",
  tag: "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z M7 7h.01",
  people: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  filter: "M22 3H2l8 9.5V19l4 2v-8.5z",
};
export type IconName = keyof typeof P;

export const Icon = ({ n, s = 20 }: { n: IconName; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={P[n]} />
  </svg>
);

export const Logo = ({ light }: { light?: boolean }) => (
  <span className="logo" style={{ color: light ? "#fff" : "#0b2a6f" }}>NEOLIST</span>
);

export const Photo = ({ hue, h = 140, children }: { hue: number; h?: number; children?: ReactNode }) => (
  <div className="photo" style={{ height: h, background: `linear-gradient(160deg, hsl(${hue} 60% 62%), hsl(${hue + 20} 55% 28%))` }}>
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="skyline">
      <path d="M0 60V35h12V20h14v18h10V10h16v30h12V25h14v15h10V15h14v25h12V30h14v30z" fill="rgba(255,255,255,.18)" />
    </svg>
    {children}
  </div>
);

export const Header = ({ title, action }: { title: string; action?: ReactNode }) => {
  const nav = useNavigate();
  return (
    <div className="topbar">
      <button className="icon-btn" onClick={() => nav(-1)} aria-label="Geri"><Icon n="back" /></button>
      <h2>{title}</h2>
      <div className="grow" />
      {action}
    </div>
  );
};

export const Search = ({ placeholder }: { placeholder: string }) => (
  <label className="search"><Icon n="search" s={18} /><input placeholder={placeholder} /></label>
);

export const Chips = ({ items, active, onPick }: { items: string[]; active: string; onPick: (s: string) => void }) => (
  <div className="chips">
    {items.map((c) => (
      <button key={c} className={c === active ? "chip on" : "chip"} onClick={() => onPick(c)}>{c}</button>
    ))}
  </div>
);

export const Avatar = ({ name, size = 40 }: { name: string; size?: number }) => (
  <span className="avatar" style={{ width: size, height: size, fontSize: size / 2.6 }}>
    {name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
  </span>
);
