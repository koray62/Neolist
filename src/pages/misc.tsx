import { useState } from "react";
import { Avatar, Chips, Header, Icon, IconName } from "../ui";
import { chats, me, referrals } from "../data";
import { useStore } from "../store";

export function Collab() {
  const { notify } = useStore();
  const [tab, setTab] = useState<"in" | "out">("in");
  const rows = referrals.filter((r) => r.dir === tab);
  return (
    <div>
      <Header title="İşbirliği & Yönlendirme" />
      <div className="pad">
        <p className="muted" style={{ marginBottom: 12 }}>Müşterini doğru meslektaşla buluştur.</p>
        <button className="btn" onClick={() => notify("Yönlendirme formu yakında.")}>Yönlendirme Yap</button>
        <div className="section-title"><span>Son Yönlendirmeler</span></div>
        <div className="tabs">
          <button className={tab === "in" ? "on" : ""} onClick={() => setTab("in")}>Gelen ({referrals.filter((r) => r.dir === "in").length})</button>
          <button className={tab === "out" ? "on" : ""} onClick={() => setTab("out")}>Giden ({referrals.filter((r) => r.dir === "out").length})</button>
        </div>
        <div className="card">
          {rows.map((r) => (
            <div key={r.id} className="list-row">
              <Avatar name={r.name} />
              <div style={{ flex: 1 }}><b>{r.name}</b><p className="muted">{r.note}</p></div>
              <span className="msg-time">{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Messages() {
  const [f, setF] = useState("Tümü");
  const unread = chats.filter((c) => c.unread).length;
  const shown = chats.filter((c) => f !== "Okunmamış" || c.unread);
  return (
    <div className="pad-bottom">
      <Header title="Mesajlar" />
      <div className="pad">
        <Chips items={["Tümü", "Okunmamış", "Arşiv"]} active={f} onPick={setF} />
        {f === "Okunmamış" && <p className="muted">{unread} okunmamış sohbet</p>}
        <div className="card">
          {f === "Arşiv" ? <p className="muted">Arşivlenmiş sohbet yok.</p> : shown.map((c) => (
            <div key={c.id} className="list-row">
              <Avatar name={c.name} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <b>{c.name}</b>
                <p className="muted" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.last}</p>
              </div>
              <div style={{ textAlign: "right" }}><div className="msg-time">{c.time}</div>{c.unread ? <span className="dot" style={{ marginLeft: "auto" }}>{c.unread}</span> : null}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Profile() {
  const [tab, setTab] = useState("Genel Bilgiler");
  const { notify } = useStore();
  return (
    <div>
      <Header title="Profilim" />
      <div className="pad">
        <div className="card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Avatar name={me.name} size={72} />
          <div>
            <h3 style={{ fontSize: 18 }}>{me.name}</h3>
            <p className="muted">{me.title}</p><p className="muted">{me.office}</p>
            <p className="muted">{me.phone}</p><p className="muted">{me.email}</p>
          </div>
        </div>
        <button className="btn ghost" onClick={() => notify("Profil düzenleme yakında.")}>Profili Düzenle</button>
        <div className="tabs" style={{ marginTop: 14 }}>
          {["Genel Bilgiler", "Uzmanlık Alanları"].map((t) => <button key={t} className={t === tab ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        {tab === "Genel Bilgiler" ? (
          <div className="card">
            <div className="kv"><span>Ad Soyad</span><span>{me.name}</span></div>
            <div className="kv"><span>Ünvan</span><span>{me.title}</span></div>
            <div className="kv"><span>Firma Adı</span><span>{me.office}</span></div>
            <div className="kv"><span>Yetki Belgesi No</span><span>{me.licence}</span></div>
            <div className="kv"><span>Hakkında</span><span style={{ maxWidth: 200, textAlign: "right" }}>{me.about}</span></div>
          </div>
        ) : (
          <div className="chips" style={{ flexWrap: "wrap" }}>{["Lüks Konut", "Villa", "Proje Satışı", "Yatırım"].map((x) => <span className="tag" key={x}>{x}</span>)}</div>
        )}
      </div>
    </div>
  );
}

const groups: { g: string; items: { l: string; i: IconName }[] }[] = [
  { g: "Hesap", items: [{ l: "Kişisel Bilgiler", i: "user" }, { l: "Şifre Değiştir", i: "lock" }, { l: "Telefon / E-posta", i: "phone" }] },
  { g: "Bildirimler", items: [{ l: "İlan Bildirimleri", i: "bell" }, { l: "Talep Bildirimleri", i: "bell" }, { l: "Fırsat Bildirimleri", i: "bell" }, { l: "Proje Bildirimleri", i: "bell" }, { l: "Mesaj Bildirimleri", i: "bell" }] },
  { g: "Gizlilik", items: [{ l: "Profil Görünürlüğü", i: "eye" }, { l: "Müşteri Bilgileri", i: "lock" }] },
  { g: "Sözleşmeler", items: [{ l: "Kullanım Koşulları", i: "clipboard" }, { l: "KVKK Metni", i: "clipboard" }] },
];

export function Settings() {
  const { notify } = useStore();
  return (
    <div>
      <Header title="Ayarlar" />
      <div className="pad">
        {groups.map((g) => (
          <div key={g.g}>
            <p className="muted" style={{ fontWeight: 700, margin: "10px 0 6px" }}>{g.g}</p>
            <div className="card">
              {g.items.map((it) => (
                <button key={it.l} className="list-row" style={{ width: "100%", textAlign: "left" }} onClick={() => notify(`${it.l} yakında.`)}>
                  <Icon n={it.i} s={18} /><span style={{ flex: 1 }}>{it.l}</span><Icon n="right" s={16} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
