import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Chips, Header, Icon, Photo, Search } from "../ui";
import { projects, tl } from "../data";
import { useStore } from "../store";

const Page = ({ children }: { children: React.ReactNode }) => <div className="pad-bottom">{children}</div>;

export function Listings() {
  const { listings } = useStore();
  const nav = useNavigate();
  const [f, setF] = useState("Tümü");
  const [collab, setCollab] = useState(false);
  const shown = listings.filter((l) => (f === "Tümü" || l.type === f || l.kind === f) && (!collab || l.collab));
  return (
    <Page>
      <Header title="İlanlar" action={<button className="btn sm" onClick={() => nav("ekle")}>+ İlan Ekle</button>} />
      <div className="pad">
        <Search placeholder="Bölge, il, ilçe veya ilan ara..." />
        <Chips items={["Tümü", "Satılık", "Kiralık", "Villa", "Daire", "Ticari"]} active={f} onPick={setF} />
        <label className="check"><input type="checkbox" checked={collab} onChange={(e) => setCollab(e.target.checked)} /> Sadece işbirliğine açık ilanlar</label>
        <p className="muted" style={{ marginBottom: 8 }}>{shown.length} ilan bulundu</p>
        {shown.map((l) => (
          <Link key={l.id} to={String(l.id)} className="card flush">
            <Photo hue={l.hue}>
              {l.collab && <span className="badge green">İşbirliğine Açık</span>}
              <span className="fav"><Icon n="heart" s={16} /></span>
            </Photo>
            <div className="body">
              <span className="tag">{l.type}</span>
              <h3 style={{ marginTop: 6 }}>{l.title}</h3>
              <p className="muted">{l.location}</p>
              <div className="price">{tl(l.price)}{l.type === "Kiralık" ? " / ay" : ""}</div>
              <div className="meta"><span>{l.rooms}</span><span>{l.area} m²</span><span>{l.floors} Kat</span></div>
            </div>
          </Link>
        ))}
      </div>
    </Page>
  );
}

export function ListingDetail() {
  const { id } = useParams();
  const { listings, notify } = useStore();
  const nav = useNavigate();
  const l = listings.find((x) => x.id === Number(id));
  if (!l) return <Header title="İlan bulunamadı" />;
  return (
    <div>
      <Photo hue={l.hue} h={240}>
        <button className="fav" style={{ left: 10, right: "auto" }} onClick={() => nav(-1)} aria-label="Geri"><Icon n="back" s={16} /></button>
        <span className="gallery-count">1/12</span>
      </Photo>
      <div className="pad">
        <span className="tag">{l.type}</span> {l.collab && <span className="tag green">İşbirliğine Açık</span>}
        <h2 style={{ marginTop: 8 }}>{l.title}</h2>
        <p className="muted">{l.location}</p>
        <div className="price" style={{ fontSize: 24, margin: "6px 0" }}>{tl(l.price)}</div>
        <div className="meta" style={{ marginBottom: 14 }}><span>{l.rooms}</span><span>{l.area} m²</span><span>{l.floors} Kat</span></div>
        <h3>Özellikler</h3>
        <div className="feature-grid">{l.features.map((f) => <span key={f}>{f}</span>)}</div>
        <h3 style={{ marginTop: 16 }}>Açıklama</h3>
        <p className="muted" style={{ marginTop: 4 }}>{l.desc}</p>
        <div className="row" style={{ margin: "20px 0 30px" }}>
          <button className="btn ghost" onClick={() => nav("/app/mesajlar")}>Mesaj Gönder</button>
          <button className="btn" onClick={() => notify("İletişim talebiniz iletildi.")}>İletişime Geç</button>
        </div>
      </div>
    </div>
  );
}

export function Requests() {
  const { requests } = useStore();
  const nav = useNavigate();
  const [f, setF] = useState("Tümü");
  const shown = requests.filter((r) => f === "Tümü" || r.tag === f);
  return (
    <Page>
      <Header title="Talepler" action={<button className="btn sm" onClick={() => nav("ekle")}>+ Talep Ekle</button>} />
      <div className="pad">
        <Search placeholder="Bölge, il, ilçe veya talep ara..." />
        <Chips items={["Tümü", "Oturum", "Yatırım", "Ticari"]} active={f} onPick={setF} />
        <p className="muted" style={{ marginBottom: 8 }}>{shown.length} talep bulundu</p>
        {shown.map((r) => (
          <div key={r.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between" }}><h3>{r.title}</h3><span className={r.tag === "Yatırım" ? "tag green" : r.tag === "Ticari" ? "tag orange" : "tag"}>{r.tag}</span></div>
            <p className="muted">{r.location}</p>
            <div className="price" style={{ fontSize: 14, marginTop: 4 }}>{tl(r.min)} – {tl(r.max)}</div>
            <div className="meta"><span>{r.rooms}</span><span>{r.area}</span></div>
          </div>
        ))}
      </div>
    </Page>
  );
}

const num = (v: FormDataEntryValue | null) => Number(String(v ?? "").replace(/\D/g, "")) || 0;

export function AddRequest() {
  const { addRequest, notify } = useStore();
  const nav = useNavigate();
  const [type, setType] = useState("Satın Alma");
  const [kind, setKind] = useState("Daire");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    addRequest({
      title: `${kind} Aranıyor`, location: String(d.get("city") || "—"),
      min: num(d.get("min")), max: num(d.get("max")), rooms: String(d.get("rooms") || "—"),
      area: String(d.get("note") || "—"), tag: type === "Yatırım" ? "Yatırım" : kind === "Ticari" ? "Ticari" : "Oturum",
    });
    notify("Talebiniz yayınlandı."); nav("/app/talepler");
  };
  return (
    <div>
      <Header title="Talep Ekle" />
      <form className="pad" onSubmit={submit}>
        <p className="muted" style={{ marginBottom: 12 }}>Müşterinizin ihtiyacını paylaşın, doğru portföylere ulaşın.</p>
        <div className="tabs">{["Satın Alma", "Kiralama", "Yatırım"].map((t) => <button type="button" key={t} className={t === type ? "on" : ""} onClick={() => setType(t)}>{t}</button>)}</div>
        <Chips items={["Daire", "Villa", "Arsa", "Ticari", "Proje"]} active={kind} onPick={setKind} />
        <label className="field"><span>Bölge</span><input name="city" required placeholder="İl / İlçe" /></label>
        <div className="row"><label className="field"><span>Min. Bütçe (TL)</span><input name="min" inputMode="numeric" /></label><label className="field"><span>Max. Bütçe (TL)</span><input name="max" inputMode="numeric" /></label></div>
        <label className="field"><span>Oda Sayısı</span><select name="rooms"><option>1+1</option><option>2+1</option><option>3+1</option><option>4+1</option><option>5+1</option></select></label>
        <label className="field"><span>Özel Kriterler (opsiyonel)</span><textarea name="note" placeholder="Min. 150 m², denize yakın..." /></label>
        <button className="btn">Talebi Yayınla</button>
      </form>
    </div>
  );
}

export function AddListing() {
  const { addListing, notify } = useStore();
  const nav = useNavigate();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    addListing({
      title: String(d.get("title")), location: String(d.get("city")), price: num(d.get("price")),
      type: d.get("type") === "Kiralık" ? "Kiralık" : "Satılık", kind: String(d.get("kind")), rooms: String(d.get("rooms")),
      area: num(d.get("area")), floors: 1, collab: d.get("collab") === "on", hue: 200 + Math.floor(Math.random() * 50),
      desc: String(d.get("desc") || ""), features: [],
    });
    notify("İlanınız eklendi."); nav("/app/ilanlar");
  };
  return (
    <div>
      <Header title="İlan Ekle" />
      <form className="pad" onSubmit={submit}>
        <label className="field"><span>Başlık</span><input name="title" required /></label>
        <div className="row">
          <label className="field"><span>İlan Türü</span><select name="type"><option>Satılık</option><option>Kiralık</option></select></label>
          <label className="field"><span>Emlak Tipi</span><select name="kind"><option>Daire</option><option>Villa</option><option>Arsa</option><option>Ticari</option></select></label>
        </div>
        <label className="field"><span>Konum</span><input name="city" required placeholder="İlçe / İl" /></label>
        <div className="row">
          <label className="field"><span>Fiyat (TL)</span><input name="price" required inputMode="numeric" /></label>
          <label className="field"><span>m²</span><input name="area" required inputMode="numeric" /></label>
        </div>
        <label className="field"><span>Oda Sayısı</span><input name="rooms" defaultValue="3+1" /></label>
        <label className="field"><span>Açıklama</span><textarea name="desc" /></label>
        <label className="check"><input type="checkbox" name="collab" defaultChecked /> İşbirliğine açık</label>
        <button className="btn">İlanı Yayınla</button>
      </form>
    </div>
  );
}

export function AddDeal() {
  const { addDeal, notify } = useStore();
  const nav = useNavigate();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    addDeal({
      title: String(d.get("title")), location: String(d.get("city")), oldPrice: num(d.get("old")), price: num(d.get("price")),
      label: d.get("label") === "Acil Satış" ? "Acil Satış" : "Özel Fiyat", hue: 200 + Math.floor(Math.random() * 50),
    });
    notify("Fırsat eklendi."); nav("/app/firsatlar");
  };
  return (
    <div>
      <Header title="Fırsat Ekle" />
      <form className="pad" onSubmit={submit}>
        <label className="field"><span>Başlık</span><input name="title" required /></label>
        <label className="field"><span>Konum</span><input name="city" required /></label>
        <div className="row">
          <label className="field"><span>Eski Fiyat (TL)</span><input name="old" required inputMode="numeric" /></label>
          <label className="field"><span>Yeni Fiyat (TL)</span><input name="price" required inputMode="numeric" /></label>
        </div>
        <label className="field"><span>Etiket</span><select name="label"><option>Özel Fiyat</option><option>Acil Satış</option></select></label>
        <button className="btn">Fırsatı Yayınla</button>
      </form>
    </div>
  );
}

export function Deals() {
  const { deals } = useStore();
  const nav = useNavigate();
  return (
    <Page>
      <Header title="Fırsatlar" action={<button className="btn sm" onClick={() => nav("ekle")}>+ Fırsat Ekle</button>} />
      <div className="pad">
        <Search placeholder="Bölge, il, ilçe veya fırsat ara..." />
        <p className="muted" style={{ margin: "12px 0 8px" }}>{deals.length} fırsat bulundu</p>
        {deals.map((d) => {
          const pct = d.oldPrice > 0 ? Math.round((1 - d.price / d.oldPrice) * 100) : 0;
          return (
            <div key={d.id} className="card" style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 96, flex: "none", borderRadius: 10, overflow: "hidden", position: "relative" }}>
                <Photo hue={d.hue} h={110}><span className={d.label === "Özel Fiyat" ? "badge orange" : "badge red"}>{d.label}</span></Photo>
              </div>
              <div>
                <h3>{d.title}</h3><p className="muted">{d.location}</p>
                <div className="price old">{tl(d.oldPrice)}</div>
                <div className="price new">{tl(d.price)}</div>
                <span className="tag orange">%{pct} avantaj</span>
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

export function Projects() {
  const [f, setF] = useState("Tümü");
  return (
    <div>
      <Header title="Konut Projeleri" />
      <div className="pad">
        <Search placeholder="Proje adı veya bölge ara..." />
        <Chips items={["Tümü", "İstanbul", "Ankara", "İzmir"]} active={f} onPick={setF} />
        <p className="muted" style={{ marginBottom: 8 }}>{projects.length} proje bulundu</p>
        {projects.map((p) => (
          <Link key={p.id} to={String(p.id)} className="card" style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 96, flex: "none", borderRadius: 10, overflow: "hidden" }}><Photo hue={p.hue} h={110}><span className="badge orange">Özel Fiyat</span></Photo></div>
            <div>
              <h3>{p.name}</h3><p className="muted">{p.location}</p>
              <div className="price" style={{ fontSize: 14 }}>{tl(p.from)}’den</div>
              <p className="muted">Teslim: {p.delivery}</p>
              <span className="tag green">{p.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams();
  const { notify } = useStore();
  const nav = useNavigate();
  const [tab, setTab] = useState("Genel Bilgiler");
  const p = projects.find((x) => x.id === Number(id));
  if (!p) return <Header title="Proje bulunamadı" />;
  return (
    <div>
      <Photo hue={p.hue} h={220}>
        <button className="fav" style={{ left: 10, right: "auto" }} onClick={() => nav(-1)} aria-label="Geri"><Icon n="back" s={16} /></button>
      </Photo>
      <div className="pad">
        <h2>{p.name}</h2>
        <p className="muted">{p.location}</p>
        <div className="price" style={{ fontSize: 22, margin: "6px 0" }}>{tl(p.from)}’den</div>
        <div className="meta" style={{ marginBottom: 12 }}>{p.units.map((u) => <span key={u}>{u}</span>)}</div>
        <div className="tabs">{["Genel Bilgiler", "Fiyat Listesi"].map((t) => <button key={t} className={t === tab ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}</div>
        {tab === "Genel Bilgiler" ? (
          <>
            <h3>Proje Hakkında</h3>
            <p className="muted" style={{ marginTop: 4 }}>{p.about}</p>
            <div className="kv" style={{ marginTop: 12 }}><span>Teslim</span><span>{p.delivery}</span></div>
            <div className="kv"><span>Durum</span><span>{p.status}</span></div>
          </>
        ) : (
          p.units.map((u, i) => <div key={u} className="kv"><span>{u}</span><span>{tl(p.from + i * 2200000)}’den</span></div>)
        )}
        <div className="row" style={{ margin: "20px 0 30px" }}>
          <button className="btn ghost" onClick={() => notify("Müşteriniz kaydedildi.")}>Müşterimi Kaydet</button>
          <button className="btn" onClick={() => setTab("Fiyat Listesi")}>Proje Detay</button>
        </div>
      </div>
    </div>
  );
}
