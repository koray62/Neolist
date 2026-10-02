import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Avatar, Icon, IconName, Logo, Photo } from "../ui";
import { me, tl } from "../data";
import { useStore } from "../store";

type Ctx = { openMenu: () => void; openQuick: () => void };

export function Dashboard() {
  const { openMenu } = useOutletContext<Ctx>();
  const { listings } = useStore();
  const tiles: { to: string; t: string; s: string; c: string; i: IconName }[] = [
    { to: "ilanlar", t: "İlanlar", s: "Elinde gayrimenkul var", c: "var(--blue)", i: "building" },
    { to: "talepler", t: "Talepler", s: "Müşteri yeni arayışı", c: "var(--green)", i: "clipboard" },
    { to: "firsatlar", t: "Fırsatlar", s: "Özel fiyatlı fırsatlar", c: "var(--orange)", i: "tag" },
    { to: "projeler", t: "Konut Projeleri", s: "Yeni proje fırsatları", c: "var(--purple)", i: "building" },
  ];
  return (
    <div className="pad-bottom">
      <div className="topbar" style={{ background: "#fff" }}>
        <Logo />
        <div className="grow" />
        <button className="icon-btn" onClick={openMenu} aria-label="Bildirimler"><Icon n="bell" /></button>
        <Link to="profil"><Avatar name={me.name} size={34} /></Link>
      </div>
      <div className="pad">
        <h2>Hoş geldiniz <span style={{ color: "var(--blue)" }}>{me.name}</span> 👋</h2>
        <p className="muted" style={{ margin: "2px 0 14px" }}>Bugün yeni portföy, yeni bir müşteri veya yeni satış fırsatı sizi bekliyor.</p>
        <div className="tile-grid">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className="tile" style={{ background: t.c }}>
              <span className="ic"><Icon n={t.i} /></span><b>{t.t}</b><small>{t.s}</small>
            </Link>
          ))}
        </div>
        <Link to="isbirligi" className="card" style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
          <span className="avatar" style={{ width: 40, height: 40 }}><Icon n="people" /></span>
          <div style={{ flex: 1 }}><b>İşbirliği &amp; Yönlendirme</b><p className="muted">Müşterini doğru meslektaşla buluştur.</p></div>
          <Icon n="right" />
        </Link>
        <div className="section-title"><span>Son İlanlar</span><Link to="ilanlar">Tümünü Gör</Link></div>
        {listings.slice(0, 3).map((l) => (
          <Link key={l.id} to={`ilanlar/${l.id}`} className="card" style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 84, borderRadius: 10, overflow: "hidden", flex: "none" }}><Photo hue={l.hue} h={72} /></div>
            <div><b>{l.title}</b><p className="muted">{l.location}</p><div className="price">{tl(l.price)}</div></div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function MenuDrawer({ onClose }: { onClose: () => void }) {
  const nav = useNavigate();
  const { logout } = useStore();
  const go = (to: string) => { onClose(); nav(to); };
  const items: { to: string; l: string; i: IconName; n?: number }[] = [
    { to: "/app", l: "Ana Sayfa", i: "home" },
    { to: "/app/ilanlar", l: "İlanlar", i: "building" },
    { to: "/app/talepler", l: "Talepler", i: "clipboard" },
    { to: "/app/firsatlar", l: "Fırsatlar", i: "tag" },
    { to: "/app/projeler", l: "Konut Projeleri", i: "building" },
    { to: "/app/isbirligi", l: "İşbirliği & Yönlendirme", i: "people" },
    { to: "/app/mesajlar", l: "Mesajlar", i: "chat", n: 3 },
    { to: "/app/mesajlar", l: "Bildirimler", i: "bell", n: 5 },
  ];
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer">
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <Logo light /><div className="grow" />
          <button className="icon-btn" onClick={onClose} aria-label="Kapat"><Icon n="close" /></button>
        </div>
        {items.map((it, i) => (
          <button key={it.l} className={i === 0 ? "item on" : "item"} onClick={() => go(it.to)}>
            <Icon n={it.i} /> {it.l} {it.n ? <span className="dot">{it.n}</span> : null}
          </button>
        ))}
        <hr />
        <p className="muted" style={{ padding: "0 12px 4px" }}>Hesabım</p>
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
  const items: { to: string; l: string; c: string; i: IconName }[] = [
    { to: "/app/ilanlar/ekle", l: "İlan Ekle", c: "var(--blue)", i: "building" },
    { to: "/app/talepler/ekle", l: "Talep Ekle", c: "var(--green)", i: "clipboard" },
    { to: "/app/firsatlar/ekle", l: "Fırsat Ekle", c: "var(--orange)", i: "tag" },
    { to: "/app/isbirligi", l: "Yönlendirme Yap", c: "var(--purple)", i: "people" },
  ];
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="sheet">
        <h3>Hızlı Erişim</h3>
        {items.map((it) => (
          <button key={it.l} className="item" onClick={() => go(it.to)}>
            <i style={{ background: it.c }}><Icon n={it.i} /></i> {it.l}
          </button>
        ))}
      </div>
    </>
  );
}
