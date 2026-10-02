import { FormEvent, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Chips, Field, Header, Icon, IconName } from "../ui";
import { chats, me } from "../data";
import { useStore } from "../store";

export function Collab() {
  const nav = useNavigate();
  const { referrals } = useStore();
  const [only, setOnly] = useState(false);
  const rows = referrals.filter((r) => !only || r.dir === "in");
  const big = (bg: string, icon: IconName, title: string, sub: string, onClick: () => void) => (
    <button className="card row-card" style={{ width: "100%", textAlign: "left", padding: 14 }} onClick={onClick}>
      <span style={{ width: 64, height: 64, borderRadius: 16, background: bg, color: "#fff", display: "grid", placeItems: "center", flex: "none" }}><Icon n={icon} s={30} /></span>
      <div style={{ flex: 1 }}><b>{title}</b><p className="muted" style={{ marginTop: 2 }}>{sub}</p></div>
      <Icon n="right" />
    </button>
  );
  return (
    <div className="pad-bottom">
      <Header title="İşbirliği & Yönlendirme" />
      <div className="pad">
        <p className="muted" style={{ marginBottom: 14, fontSize: 14 }}>Müşterinizi doğru meslektaşla buluşturun.</p>
        {big("linear-gradient(135deg,#29b6c8,#1d9bb5)", "userplus", "Yönlendirme Yap", "Yeni yönlendirme kaydı oluşturun.", () => nav("yeni"))}
        {big("linear-gradient(135deg,#7a6cf0,#5f55dc)", "user", "Gelen Yönlendirmeler", `${referrals.filter((r) => r.dir === "in").length} yeni talep`, () => setOnly(!only))}
        <div className="section-title" style={{ marginTop: 22 }}><span>Son Yönlendirmeler</span></div>
        {rows.map((r) => (
          <div key={r.id} className="card row-card">
            <Avatar name={r.name} size={50} />
            <div style={{ flex: 1 }}><b>{r.name}</b><p className="muted">{r.note}</p></div>
            <span className="msg-time" style={{ alignSelf: "flex-start" }}>{r.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NewReferral() {
  const { addReferral, notify } = useStore();
  const nav = useNavigate();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    addReferral({ name: String(d.get("name")), note: String(d.get("note")), date: new Date().toLocaleDateString("tr-TR"), dir: "out" });
    notify("Yönlendirme kaydedildi."); nav("/app/isbirligi");
  };
  return (
    <form style={{ paddingBottom: 96 }} onSubmit={submit}>
      <Header title="Yönlendirme Yap" />
      <div className="pad">
        <p className="muted" style={{ marginBottom: 14, fontSize: 14 }}>Yeni yönlendirme kaydı oluşturun.</p>
        <Field icon="user"><input name="name" required placeholder="Meslektaş adı soyadı" /></Field>
        <Field><input name="note" required placeholder="Müşteri talebi (ör. Bodrum’da 4+1)" /></Field>
      </div>
      <div className="bottom-bar"><button className="btn">Yönlendirmeyi Kaydet</button></div>
    </form>
  );
}

export function Messages() {
  const [f, setF] = useState("Tümü");
  const total = chats.reduce((a, c) => a + c.unread, 0);
  const unreadTab = `Okunmamış (${total})`;
  const shown = chats.filter((c) => f !== unreadTab || c.unread);
  return (
    <div className="pad-bottom">
      <Header back={false} title="Mesajlar" />
      <div className="pad">
        <Chips items={["Tümü", unreadTab, "Arşiv"]} active={f} onPick={setF} />
        {f === "Arşiv" ? <p className="muted">Arşivlenmiş sohbet yok.</p> : shown.map((c) => (
          <div key={c.id} className="list-row" style={{ borderBottom: "1px solid var(--line)", padding: "14px 0" }}>
            <Avatar name={c.name} size={52} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <b>{c.name}</b>
              <p className="muted" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 }}>{c.last}</p>
            </div>
            <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
              <span className="msg-time">{c.time}</span>{c.unread ? <span className="dot">{c.unread}</span> : <span style={{ height: 22 }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Profile() {
  const [tab, setTab] = useState("Genel Bilgiler");
  const { notify } = useStore();
  const rows: [string, ReactNode][] = [
    ["Ad Soyad", me.name], ["Ünvan", me.title], ["Firma Adı", me.office], ["Yetki Belgesi No", me.licence], ["Hakkında", me.about],
  ];
  return (
    <div className="pad-bottom">
      <Header title="Profilim" />
      <div className="pad">
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 6 }}>
          <Avatar name={me.name} size={110} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: 20 }}>{me.name}</h3>
            <p className="muted" style={{ marginTop: 2 }}>{me.title}</p>
            <p className="muted">{me.office}</p>
            <p style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8, fontSize: 13, color: "var(--ink)" }}><span style={{ color: "var(--blue)" }}><Icon n="phone" s={15} /></span>{me.phone}</p>
            <p style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4, fontSize: 13, color: "var(--ink)" }}><span style={{ color: "var(--blue)" }}><Icon n="mail" s={15} /></span>{me.email}</p>
            <button className="btn ghost sm" style={{ marginTop: 10 }} onClick={() => notify("Profil düzenleme yakında.")}>Profili Düzenle</button>
          </div>
        </div>
        <div className="utabs">
          {["Genel Bilgiler", "Uzmanlık Alanları", "Hizmet Verilen Bölgeler"].map((t) => <button key={t} className={t === tab ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        {tab === "Genel Bilgiler" && rows.map(([k, v]) => <div key={k} className="kv"><span>{k}</span><span>{v}</span></div>)}
        {tab === "Uzmanlık Alanları" && <div className="feat">{["Lüks Konut", "Villa", "Proje Satışı", "Yatırım"].map((x) => <span key={x}>{x}</span>)}</div>}
        {tab === "Hizmet Verilen Bölgeler" && <div className="feat">{["Beykoz", "Çekmeköy", "Sarıyer", "Beşiktaş"].map((x) => <span key={x}><Icon n="pin" s={13} />{x}</span>)}</div>}
      </div>
    </div>
  );
}

const groups: { g: string; gi: IconName; items: { l: string; i: IconName; toggle?: boolean }[] }[] = [
  { g: "Hesap", gi: "user", items: [{ l: "Kişisel Bilgiler", i: "user" }, { l: "Şifre Değiştir", i: "lock" }, { l: "Telefon / E-posta", i: "phone" }] },
  { g: "Bildirimler", gi: "bell", items: [{ l: "İlan Bildirimleri", i: "bell" }, { l: "Talep Bildirimleri", i: "bell" }, { l: "Fırsat Bildirimleri", i: "bell" }, { l: "Proje Bildirimleri", i: "building" }, { l: "Mesaj Bildirimleri", i: "chat" }] },
  { g: "Gizlilik", gi: "shield", items: [{ l: "Profil Görünürlüğü", i: "eye", toggle: true }, { l: "Müşteri Bilgileri", i: "lock" }] },
  { g: "Sözleşmeler", gi: "doc", items: [{ l: "Kullanım Koşulları", i: "doc" }, { l: "KVKK Metni", i: "doc" }] },
];

export function Settings() {
  const { notify } = useStore();
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ paddingBottom: 24 }}>
      <Header title="Ayarlar" />
      <div className="pad">
        {groups.map((g) => (
          <div key={g.g} className="set-group">
            <div className="set-head"><Icon n={g.gi} s={16} />{g.g}</div>
            {g.items.map((it) => (
              <button key={it.l} className="set-row" onClick={() => (it.toggle ? setVisible(!visible) : notify(`${it.l} yakında.`))}>
                <Icon n={it.i} s={18} /><span>{it.l}</span>
                {it.toggle ? <i className={visible ? "switch on" : "switch"} /> : <Icon n="right" s={16} />}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
