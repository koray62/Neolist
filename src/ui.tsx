import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const P = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16 M21 21l-4.3-4.3",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
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
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  building: "M3 21h18 M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16 M15 9h3a1 1 0 0 1 1 1v11 M9 8h2 M9 12h2 M9 16h2",
  clipboard: "M9 2h6v4H9z M7 4H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2 M8 12h8 M8 16h5",
  tag: "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z M7 7h.01",
  people: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  filter: "M3 5h18 M6 12h12 M10 19h4",
  pin: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M8.6 13.5l6.8 4 M15.4 6.5l-6.8 4",
  bed: "M2 18V6 M2 13h20v5 M22 13v-1a3 3 0 0 0-3-3h-9v4 M6 11a1.5 1.5 0 1 0 0-.01",
  area: "M4 4h16v16H4z M4 10h6 M10 4v6",
  layers: "M12 2l10 5-10 5L2 7z M2 17l10 5 10-5 M2 12l10 5 10-5",
  car: "M3 17h18v-4l-2-6H5l-2 6z M7 17v3 M17 17v3 M3 13h18",
  balcony: "M3 10h18 M5 10v10 M19 10v10 M3 20h18 M9 10v10 M15 10v10",
  elevator: "M5 3h14v18H5z M12 3v18 M7.5 10l1.5-2 1.5 2 M13.5 14l1.5 2 1.5-2",
  flame: "M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 3-6 1 2 3 2 3-6z",
  drop: "M12 2s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z",
  land: "M3 20l6-12 4 7 3-4 5 9z",
  store: "M3 9l2-5h14l2 5 M3 9v11h18V9 M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0 M9 20v-5h6v5",
  shield: "M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6",
  checkc: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20 M8 12l3 3 5-6",
  scan: "M4 8V5a1 1 0 0 1 1-1h3 M16 4h3a1 1 0 0 1 1 1v3 M20 16v3a1 1 0 0 1-1 1h-3 M8 20H5a1 1 0 0 1-1-1v-3 M9 12h6",
  userplus: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M19 8v6 M22 11h-6",
  arrowr: "M5 12h14 M12 5l7 7-7 7",
} as const;
export type IconName = keyof typeof P;

export const Icon = ({ n, s = 20, w = 1.8 }: { n: IconName; s?: number; w?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
    <path d={P[n]} />
  </svg>
);

export const Logo = ({ light, size }: { light?: boolean; size?: number }) => (
  <span className="logo" style={{ color: light ? "#fff" : "#12306f", fontSize: size }}>NEOLIST</span>
);

/* ---------- photos ---------- */
export type PhotoNo = 1 | 2 | 3;

export const Photo = ({ n = 1, h = 150, rounded = true, children }: { n?: PhotoNo; h?: number; rounded?: boolean; children?: ReactNode }) => (
  <div className="photo" style={{ height: h, borderRadius: rounded ? undefined : 0 }}>
    <img src={`${import.meta.env.BASE_URL}photos/p${n}.jpg`} alt="" loading="lazy" />
    {children}
  </div>
);

/* ---------- illustrated portraits ---------- */
type Look = { skin: string; hair: string; suit: string; bg: string; female?: boolean; beard?: string; tie?: string };
const looks: Record<string, Look> = {
  "Ahmet Yılmaz": { skin: "#d9a07a", hair: "#1c1a18", suit: "#14285c", bg: "#d5dae3", beard: "#2a2420", tie: "#14285c" },
  "Mehmet Kaya": { skin: "#c98f6b", hair: "#1f1b19", suit: "#2a2c33", bg: "#cfd6df", tie: "#8aa0c8" },
  "Ayşe Demir": { skin: "#e6bd9c", hair: "#4a2e22", suit: "#3a3f4c", bg: "#d9d3cc", female: true },
  "Selin Arslan": { skin: "#8d5a3b", hair: "#15110f", suit: "#f0e6da", bg: "#e4ddd2", female: true },
  "Caner Aydın": { skin: "#d8a27d", hair: "#3a342f", suit: "#4a4d56", bg: "#cdd3dc", beard: "#5a524b" },
  "Zeynep Koç": { skin: "#e2b392", hair: "#6a3a22", suit: "#2f4a6e", bg: "#e0d6cc", female: true },
};
const fallback: Look = { skin: "#dcae8a", hair: "#2a2420", suit: "#35456b", bg: "#dde3ee" };

export const Avatar = ({ name, size = 44 }: { name: string; size?: number }) => {
  const l = looks[name] ?? fallback;
  return (
    <span className="avatar" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <rect width="100" height="100" fill={l.bg} />
        {l.female && <path d="M26 46c0-24 14-34 24-34s24 10 24 34v30H26z" fill={l.hair} />}
        <path d="M8 100c2-18 16-26 42-26s40 8 42 26z" fill={l.suit} />
        {l.tie && <><path d="M42 76l8 10 8-10-4-4h-8z" fill="#fff" /><path d="M48 80h4l2 16h-8z" fill={l.tie} /></>}
        {!l.tie && <path d="M42 76l8 12 8-12z" fill="#f4eee8" />}
        <rect x="44" y="62" width="12" height="16" rx="5" fill={l.skin} />
        <ellipse cx="50" cy="44" rx="17" ry="20" fill={l.skin} />
        {l.beard && <path d="M33 46c2 22 14 26 17 26s15-4 17-26c-3 8-9 10-17 10s-14-2-17-10z" fill={l.beard} />}
        {l.female ? <path d="M32 44c2-16 10-22 18-22s16 6 18 22c-6-8-12-12-18-12s-12 4-18 12z" fill={l.hair} /> : <path d="M32 40c0-14 8-20 18-20s18 6 18 20c-5-7-11-10-18-10s-13 3-18 10z" fill={l.hair} />}
        <circle cx="43" cy="46" r="1.6" fill="#2a1c14" /><circle cx="57" cy="46" r="1.6" fill="#2a1c14" />
        <path d="M44 58q6 4 12 0" stroke="#7a3d2c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
};

/* ---------- shared bits ---------- */
export const Header = ({ title, action, back = true }: { title: string; action?: ReactNode; back?: boolean }) => {
  const nav = useNavigate();
  return (
    <div className={back ? "topbar back" : "topbar"}>
      {back && <button className="icon-btn" style={{ marginLeft: -6 }} onClick={() => nav(-1)} aria-label="Geri"><Icon n="back" s={22} /></button>}
      <h2>{title}</h2>
      <div className="grow" />
      {action}
    </div>
  );
};

export const Search = ({ placeholder, value, onChange }: { placeholder: string; value?: string; onChange?: (v: string) => void }) => (
  <label className="search"><Icon n="search" s={18} /><input placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} /></label>
);

export const Chips = ({ items, active, onPick, extra }: { items: string[]; active: string; onPick: (s: string) => void; extra?: ReactNode }) => (
  <div className="chips">
    {items.map((c) => <button key={c} className={c === active ? "chip on" : "chip"} onClick={() => onPick(c)}>{c}</button>)}
    {extra}
  </div>
);

export const Field = ({ icon, children }: { icon?: IconName; children: ReactNode }) => (
  <div className="input">{icon && <Icon n={icon} s={20} />}{children}</div>
);
