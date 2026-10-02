import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Avatar, Icon, IconName, Logo, Photo } from "../ui";
import { me, tl } from "../data";
import { useStore } from "../store";

type Ctx = { openMenu: () => void; openQuick: () => void };

export function Dashboard() {
  const { openMenu, openQuick } = useOutletContext<Ctx>();
  const { listings } = useStore();
  const tiles: { to: string; t: string; s: string; c: string; i: IconName }[] = [
    { to: "ilanlar", t: "İlanlar", s: "Elinde gayrimenkul var", c: "linear-gradient(135deg,#1d6fe6,#1456c4)", i: "building" },
    { to: "talepler", t: "Talepler", s: "Müşterim gayrimenkul arıyor", c: "linear-gradient(135deg,#2cc27f,#1fa468)", i: "clipboard" },
    { to: "firsatlar", t: "Fırsatlar", s: "Özel fiyatlı fırsatları gör", c: "linear-gradient(135deg,#fdb04d,#f59532)", i: "pin" },
    { to: "projeler", t: "Konut Projeleri", s: "Yeni proje arıyorum", c: "linear-gradient(135deg,#7a68ee,#5f4fd6)", i: "doc" },
  ];
  return (
    <div className="pad-bottom">
      <div className="topbar brand" style={{ position: "static" }}>
        <Logo light size={22} />
        <div className="grow" />
        <button className="icon-btn" onClick={openMenu} aria-label="Bildirimler" style={{ color: "#fff" }}><Icon n="bell" /></button>
        <Link to="profil"><Avatar name={me.name} size={38} /></Link>
      </div>
      <div className="pad" style={{ paddingTop: 18 }}>
        <h2 style={{ fontSize: 22, lineHeight: 1.25 }}>Hoş geldiniz<br />{me.name} 👋</h2>
        <p className="muted" style={{ margin: "8px 0 16px", fontSize: 14 }}>Bugün yeni bir portföy, yeni bir müşteri veya yeni bir satış fırsatı keşfedin.</p>
        <div className="tile-grid">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className="tile" style={{ background: t.c }}>
              <span className="t"><Icon n={t.i} s={22} />{t.t}</span><small>{t.s}</small>
            </Link>
          ))}
        </div>
        <Link to="isbirligi" className="card row-card" style={{ marginTop: 14, background: "#eaf2fd", borderColor: "#dce8fa", boxShadow: "none" }}>
          <span style={{ width: 44, height: 44, borderRadius: 12, border: "1.5px solid #1664d9", color: "#1664d9", display: "grid", placeItems: "center", background: "#fff" }}><Icon n="people" /></span>
          <div style={{ flex: 1 }}><b>İşbirliği &amp; Yönlendirme</b><p className="muted" style={{ fontSize: 12 }}>Müşterinizi doğru meslektaşla buluşturun</p></div>
          <Icon n="right" />
        </Link>
        <div className="section-title"><span>Son İlanlar</span><Link to="ilanlar">Tümünü Gör</Link></div>
        {listings.slice(0, 3).map((l) => (
          <Link key={l.id} to={`ilanlar/${l.id}`} className="card row-card">
            <div style={{ width: 104, flex: "none", borderRadius: 10, overflow: "hidden" }}>
              <Photo n={l.photo} h={80} rounded={false}><span className="badge blue">{l.type}</span></Photo>
            </div>
            <div><b>{l.title}</b><p className="muted">{l.location}</p><div className="price" style={{ fontSize: 17 }}>{tl(l.price)}</div></div>
          </Link>
        ))}
      </div>
      <button className="fab" aria-label="Hızlı erişim" onClick={openQuick}><Icon n="plus" s={26} /></button>
    </div>
  );
}

export function MenuDrawer({ onClose }: { onClose: () => void }) {
  const nav = useNavigate();
  const { logout, notify } = useStore();
  const [open, setOpen] = useState<string>("");
  const go = (to: string) => { onClose(); nav(to); };
  const groups: { l: string; i: IconName; subs: [string, string][] }[] = [
    { l: "İlanlar", i: "building", subs: [["Tüm İlanlar", "/app/ilanlar"], ["İlan Ekle", "/app/ilanlar/ekle"]] },
    { l: "Talepler", i: "clipboard", subs: [["Tüm Talepler", "/app/talepler"], ["Talep Ekle", "/app/talepler/ekle"]] },
    { l: "Fırsatlar", i: "tag", subs: [["Tüm Fırsatlar", "/app/firsatlar"], ["Fırsat Ekle", "/app/firsatlar/ekle"]] },
    { l: "Konut Projeleri", i: "doc", subs: [["Tüm Projeler", "/app/projeler"]] },
  ];
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer">
        <div style={{ display: "flex", alignItems: "center", margin: "4px 0 18px" }}>
          <Logo light size={26} /><div className="grow" />
          <button className="icon-btn" onClick={onClose} aria-label="Kapat"><Icon n="close" /></button>
        </div>
        <button className="item on" onClick={() => go("/app")}><Icon n="home" /> Ana Sayfa</button>
        {groups.map((g) => (
          <div key={g.l}>
            <button className="item" onClick={() => setOpen(open === g.l ? "" : g.l)}>
              <Icon n={g.i} /> {g.l} <span className={open === g.l ? "chev open" : "chev"}><Icon n="down" s={18} /></span>
            </button>
            {open === g.l && g.subs.map(([l, to]) => <button key={l} className="sub" onClick={() => go(to)}>{l}</button>)}
          </div>
        ))}
        <button className="item" onClick={() => go("/app/isbirligi")}><Icon n="people" /> İşbirliği &amp; Yönlendirme</button>
        <button className="item" onClick={() => go("/app/mesajlar")}><Icon n="chat" /> Mesajlar <span className="dot dark">3</span></button>
        <button className="item" onClick={() => notify("Bildirimler yakında.")}><Icon n="bell" /> Bildirimler <span className="dot">5</span></button>
        <hr />
        <p className="muted" style={{ padding: "0 12px 6px", color: "#8ea2cf" }}>Hesabım</p>
        <button className="item" onClick={() => go("/app/profil")}><Icon n="user" /> Profilim</button>
        <button className="item" onClick={() => go("/app/ayarlar")}><Icon n="settings" /> Ayarlar</button>
        <button className="item" onClick={() => { logout(); onClose(); nav("/giris"); }}><Icon n="logout" /> Çıkış Yap</button>
      </aside>
    </>
  );
}

export function QuickSheet({ onClose }: { onClose: () => void }) {
  const nav = useNavigate();
  const go = (to: string) => { onClose(); nav(to); };
  const items: { to: string; l: string; bg: string; fg: string; i: IconName }[] = [
    { to: "/app/ilanlar/ekle", l: "İlan Ekle", bg: "#bfe0ff", fg: "#1664d9", i: "building" },
    { to: "/app/talepler/ekle", l: "Talep Ekle", bg: "#b8efd0", fg: "#14925a", i: "clipboard" },
    { to: "/app/firsatlar/ekle", l: "Fırsat Ekle", bg: "#ffd9a0", fg: "#e5483d", i: "pin" },
    { to: "/app/isbirligi/yeni", l: "Yönlendirme Yap", bg: "linear-gradient(135deg,#c73fb0,#9c3ac9)", fg: "#fff", i: "userplus" },
  ];
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="sheet">
        <h3>Hızlı Erişim</h3>
        {items.map((it) => (
          <button key={it.l} className="item" onClick={() => go(it.to)}>
            <i style={{ background: it.bg, color: it.fg }}><Icon n={it.i} s={24} /></i> {it.l}
          </button>
        ))}
      </div>
    </>
  );
}
