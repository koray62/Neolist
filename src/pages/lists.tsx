import { FormEvent, ReactNode, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Chips, Field, Header, Icon, IconName, Photo, PhotoNo, Search } from "../ui";
import { budget, cities, featureIcons, projects, tl } from "../data";
import { useStore } from "../store";

const Page = ({ children }: { children: ReactNode }) => <div className="pad-bottom">{children}</div>;
const AddBtn = ({ to, label }: { to: string; label: string }) => {
  const nav = useNavigate();
  return <button className="btn sm" onClick={() => nav(to)}><Icon n="plus" s={14} w={2.4} />{label}</button>;
};
const Count = ({ n, what }: { n: number; what: string }) => <p className="muted" style={{ margin: "4px 0 12px", fontSize: 14 }}>{n.toLocaleString("tr-TR")} {what} bulundu</p>;

/** Dropdown chip (native select under a chevron) + sort/filter chip, as in the mockup chip rows. */
function ChipTail({ options, onPick, onFilter }: { options: string[]; onPick: (s: string) => void; onFilter: () => void }) {
  return (
    <>
      <label className="chip sq" style={{ position: "relative" }}>
        <Icon n="down" s={16} />
        <select aria-label="Daha fazla" value="" onChange={(e) => onPick(e.target.value)} style={{ position: "absolute", inset: 0, opacity: 0, width: "100%" }}>
          <option value="" disabled>Seç</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <button className="chip sq" onClick={onFilter} aria-label="Sırala"><Icon n="filter" s={18} /></button>
    </>
  );
}

export function Listings() {
  const { listings } = useStore();
  const [f, setF] = useState("Satılık");
  const [q, setQ] = useState("");
  const [collab, setCollab] = useState(false);
  const [sort, setSort] = useState(0);
  const shown = listings
    .filter((l) => (f === "Tümü" || l.type === f || l.kind === f) && (!collab || l.collab))
    .filter((l) => `${l.title} ${l.location}`.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))
    .sort((a, b) => sort * (a.price - b.price));
  return (
    <Page>
      <Header back={false} title="İlanlar" action={<AddBtn to="ekle" label="İlan Ekle" />} />
      <div className="pad">
        <Search placeholder="Bölge, il, ilçe veya anahtar kelime..." value={q} onChange={setQ} />
        <Chips items={["Satılık", "Kiralık", "Villa"]} active={f} onPick={setF}
          extra={<ChipTail options={["Tümü", "Daire", "Ticari"]} onPick={setF} onFilter={() => setSort(sort === 0 ? -1 : sort === -1 ? 1 : 0)} />} />
        <label className="check" style={{ marginBottom: 14 }}><input type="checkbox" checked={collab} onChange={(e) => setCollab(e.target.checked)} /> Sadece işbirliğine açık ilanlar</label>
        <Count n={shown.length} what="ilan" />
        {shown.map((l) => (
          <Link key={l.id} to={String(l.id)} className="card flush">
            <Photo n={l.photo} h={160}>
              {l.collab && <span className="badge green"><Icon n="checkc" s={14} />İşbirliğine Açık</span>}
              <span className="fav"><Icon n="heart" s={22} /></span>
              <span className="sale-tab">{l.type}</span>
            </Photo>
            <div className="body">
              <h3>{l.title}</h3>
              <p className="muted" style={{ marginTop: 2 }}>{l.location}</p>
              <div className="price" style={{ marginTop: 6 }}>{tl(l.price)}{l.type === "Kiralık" ? " / ay" : ""}</div>
              <div className="meta"><span><Icon n="bed" s={14} />{l.rooms}</span><span><Icon n="area" s={14} />{l.area} m²</span></div>
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
    <div style={{ paddingBottom: 96 }}>
      <div className="hero">
        <Photo n={l.photo} h={270} rounded={false}>
          <span className="gallery-count" style={{ bottom: 30 }}>1/12</span>
        </Photo>
        <div className="hero-actions">
          <button className="icon-btn" style={{ color: "#fff" }} onClick={() => nav(-1)} aria-label="Geri"><Icon n="back" s={24} /></button>
          <div className="grow" />
          <button className="round" onClick={() => notify("Favorilere eklendi.")} aria-label="Favori"><Icon n="heart" s={18} /></button>
          <button className="round" onClick={() => notify("Paylaşım bağlantısı kopyalandı.")} aria-label="Paylaş"><Icon n="share" s={18} /></button>
        </div>
      </div>
      <div className="sheet-top">
        <div style={{ display: "flex", gap: 8 }}>
          <span className="pill" style={{ background: "var(--blue)", color: "#fff", borderRadius: 8, padding: "6px 12px" }}>{l.type}</span>
          {l.collab && <span className="pill"><Icon n="checkc" s={14} />İşbirliğine Açık</span>}
        </div>
        <h2 style={{ marginTop: 12, fontSize: 21 }}>{l.title}</h2>
        <p className="muted" style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}><Icon n="pin" s={14} />{l.location}</p>
        <div className="price" style={{ fontSize: 24, margin: "8px 0 14px" }}>{tl(l.price)}{l.type === "Kiralık" ? " / ay" : ""}</div>
        <div className="meta" style={{ justifyContent: "space-between", padding: "14px 6px", borderBottom: "1px solid var(--line)", margin: 0, fontSize: 13 }}>
          <span><Icon n="bed" s={16} />{l.rooms}</span><span><Icon n="area" s={16} />{l.area} m²</span><span><Icon n="layers" s={16} />{l.floors} Kat</span>
        </div>
        <h3 style={{ marginTop: 16, fontSize: 16 }}>Özellikler</h3>
        <div className="feat">{l.features.map((f) => <span key={f}><Icon n={featureIcons[f] ?? "home"} s={14} />{f}</span>)}</div>
        <h3 style={{ marginTop: 18, fontSize: 16 }}>Açıklama</h3>
        <p className="muted" style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5 }}>{l.desc}</p>
      </div>
      <div className="bottom-bar">
        <button className="btn ghost" onClick={() => nav("/app/mesajlar")}><Icon n="chat" s={18} />Mesaj Gönder</button>
        <button className="btn" onClick={() => notify("İletişim talebiniz iletildi.")}>İletişime Geç</button>
      </div>
    </div>
  );
}

export function Requests() {
  const { requests } = useStore();
  const [f, setF] = useState("Tüm Talepler");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState(0);
  const shown = requests
    .filter((r) => f === "Tüm Talepler" || r.kind === f)
    .filter((r) => `${r.title} ${r.location}`.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))
    .sort((a, b) => sort * (a.max - b.max));
  return (
    <Page>
      <Header back={false} title="Talepler" action={<AddBtn to="ekle" label="Talep Ekle" />} />
      <div className="pad">
        <Search placeholder="Bölge, il, ilçe veya anahtar kelime..." value={q} onChange={setQ} />
        <Chips items={["Tüm Talepler", "Satın Alma", "Kiralama"]} active={f} onPick={setF}
          extra={<ChipTail options={["Yatırım"]} onPick={setF} onFilter={() => setSort(sort === 0 ? -1 : sort === -1 ? 1 : 0)} />} />
        <Count n={shown.length} what="talep" />
        {shown.map((r) => (
          <div key={r.id} className="card" style={{ padding: "14px 14px 12px" }}>
            <h3 style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#fdd77a", display: "grid", placeItems: "center", color: "#d68a00" }}><Icon n="pin" s={11} w={2.4} /></span>{r.title}
            </h3>
            <p className="muted" style={{ marginTop: 4 }}>{r.location}</p>
            <div className="meta" style={{ gap: 8 }}>
              <span><Icon n="tag" s={13} />{budget(r.min, r.max)}</span><span>•</span>
              {r.rooms !== "—" && <><span><Icon n="bed" s={13} />{r.rooms}</span><span>•</span></>}<span><Icon n="area" s={13} />{r.area}</span>
            </div>
            <div style={{ marginTop: 10 }}><span className="pill"><Icon n={r.tag === "Ticari" ? "store" : r.tag === "Yatırım" ? "tag" : "home"} s={13} />{r.tag}</span></div>
          </div>
        ))}
      </div>
    </Page>
  );
}

const num = (v: FormDataEntryValue | null) => Number(String(v ?? "").replace(/\D/g, "")) || 0;
const roomOpts = ["1+0", "1+1", "2+1", "3+1", "4+1", "5+1", "6+1"];

function Place({ cityName = "city", districtName = "district" }: { cityName?: string; districtName?: string }) {
  const [city, setCity] = useState("");
  return (
    <div className="row">
      <Field><select name={cityName} required value={city} onChange={(e) => setCity(e.target.value)}><option value="" disabled>İl seçin</option>{Object.keys(cities).map((c) => <option key={c}>{c}</option>)}</select><Icon n="down" s={16} /></Field>
      <Field><select name={districtName} required defaultValue="" key={city}><option value="" disabled>İlçe seçin</option>{(cities[city] ?? []).map((c) => <option key={c}>{c}</option>)}</select><Icon n="down" s={16} /></Field>
    </div>
  );
}
const place = (d: FormData) => `${d.get("district")} / ${d.get("city")}`;

const typeIcons: [string, IconName][] = [["Daire", "building"], ["Villa", "home"], ["Arsa", "land"], ["Ticari", "store"], ["Proje", "doc"]];

export function AddRequest() {
  const { addRequest, notify } = useStore();
  const nav = useNavigate();
  const [type, setType] = useState<"Satın Alma" | "Kiralama" | "Yatırım">("Satın Alma");
  const [kind, setKind] = useState("Daire");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const a = String(d.get("rmin") || ""), b = String(d.get("rmax") || "");
    addRequest({
      title: `${kind} Aranıyor`, location: place(d), min: num(d.get("min")), max: num(d.get("max")),
      rooms: a && b && a !== b ? `${a} - ${b}` : a || b || "—", area: String(d.get("note") || "—"),
      tag: type === "Yatırım" ? "Yatırım" : kind === "Ticari" ? "Ticari" : "Oturum", kind: type,
    });
    notify("Talebiniz yayınlandı."); nav("/app/talepler");
  };
  return (
    <form style={{ paddingBottom: 96 }} onSubmit={submit}>
      <Header title="Talep Ekle" />
      <div className="pad">
        <p className="muted" style={{ marginBottom: 6, fontSize: 14 }}>Müşterinizin ihtiyacını paylaşın, doğru portföylere ulaşın.</p>
        <p className="label">Talep Türü</p>
        <div className="seg">{(["Satın Alma", "Kiralama", "Yatırım"] as const).map((t) => <button type="button" key={t} className={t === type ? "on" : ""} onClick={() => setType(t)}>{t}</button>)}</div>
        <p className="label">Gayrimenkul Türü</p>
        <div className="types">{typeIcons.map(([t, i]) => <button type="button" key={t} className={t === kind ? "on" : ""} onClick={() => setKind(t)}><Icon n={i} s={26} />{t}</button>)}</div>
        <p className="label">Bölge</p>
        <Place />
        <p className="label">Bütçe</p>
        <div className="row"><Field><input name="min" inputMode="numeric" placeholder="Min. TL" /></Field><Field><input name="max" inputMode="numeric" placeholder="Max. TL" /></Field></div>
        <p className="label">Oda Sayısı</p>
        <div className="row">
          <Field><select name="rmin" defaultValue=""><option value="">Min</option>{roomOpts.map((r) => <option key={r}>{r}</option>)}</select><Icon n="down" s={16} /></Field>
          <Field><select name="rmax" defaultValue=""><option value="">Max</option>{roomOpts.map((r) => <option key={r}>{r}</option>)}</select><Icon n="down" s={16} /></Field>
        </div>
        <Field><input name="note" placeholder="Özel Kriterler (opsiyonel)" /></Field>
      </div>
      <div className="bottom-bar"><button className="btn">Talebi Yayınla</button></div>
    </form>
  );
}

export function AddListing() {
  const { addListing, notify } = useStore();
  const nav = useNavigate();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const kind = String(d.get("kind"));
    addListing({
      title: String(d.get("title")), location: place(d), price: num(d.get("price")),
      type: d.get("type") === "Kiralık" ? "Kiralık" : "Satılık", kind, rooms: String(d.get("rooms")),
      area: num(d.get("area")), floors: 1, collab: d.get("collab") === "on",
      photo: (1 + Math.floor(Math.random() * 3)) as PhotoNo,
      desc: String(d.get("desc") || ""), features: [],
    });
    notify("İlanınız eklendi."); nav("/app/ilanlar");
  };
  return (
    <form style={{ paddingBottom: 96 }} onSubmit={submit}>
      <Header title="İlan Ekle" />
      <div className="pad">
        <Field><input name="title" required placeholder="İlan başlığı" /></Field>
        <div className="row">
          <Field><select name="type" defaultValue="Satılık"><option>Satılık</option><option>Kiralık</option></select><Icon n="down" s={16} /></Field>
          <Field><select name="kind" defaultValue="Daire"><option>Daire</option><option>Villa</option><option>Arsa</option><option>Ticari</option></select><Icon n="down" s={16} /></Field>
        </div>
        <Place />
        <div className="row"><Field><input name="price" required inputMode="numeric" placeholder="Fiyat (TL)" /></Field><Field><input name="area" required inputMode="numeric" placeholder="m²" /></Field></div>
        <Field><select name="rooms" defaultValue="3+1">{roomOpts.map((r) => <option key={r}>{r}</option>)}</select><Icon n="down" s={16} /></Field>
        <Field><input name="desc" placeholder="Açıklama (opsiyonel)" /></Field>
        <label className="check"><input type="checkbox" name="collab" defaultChecked /> İşbirliğine açık</label>
      </div>
      <div className="bottom-bar"><button className="btn">İlanı Yayınla</button></div>
    </form>
  );
}

export function AddDeal() {
  const { addDeal, notify } = useStore();
  const nav = useNavigate();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    addDeal({
      title: String(d.get("title")), location: place(d), oldPrice: num(d.get("old")), price: num(d.get("price")),
      label: d.get("label") === "Acil Satış" ? "Acil Satış" : "Özel Fiyat", photo: (1 + Math.floor(Math.random() * 3)) as PhotoNo,
    });
    notify("Fırsat eklendi."); nav("/app/firsatlar");
  };
  return (
    <form style={{ paddingBottom: 96 }} onSubmit={submit}>
      <Header title="Fırsat Ekle" />
      <div className="pad">
        <Field><input name="title" required placeholder="Fırsat başlığı" /></Field>
        <Place />
        <div className="row"><Field><input name="old" required inputMode="numeric" placeholder="Eski fiyat (TL)" /></Field><Field><input name="price" required inputMode="numeric" placeholder="Yeni fiyat (TL)" /></Field></div>
        <Field><select name="label" defaultValue="Özel Fiyat"><option>Özel Fiyat</option><option>Acil Satış</option></select><Icon n="down" s={16} /></Field>
      </div>
      <div className="bottom-bar"><button className="btn">Fırsatı Yayınla</button></div>
    </form>
  );
}

export function Deals() {
  const { deals } = useStore();
  const [f, setF] = useState("Tümü");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState(0);
  const pct = (d: { oldPrice: number; price: number }) => (d.oldPrice > 0 ? Math.round((1 - d.price / d.oldPrice) * 100) : 0);
  const shown = deals
    .filter((d) => f === "Tümü" || d.label === f)
    .filter((d) => `${d.title} ${d.location}`.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))
    .sort((a, b) => sort * (a.price - b.price));
  return (
    <Page>
      <Header back={false} title="Fırsatlar" action={<AddBtn to="ekle" label="Fırsat Ekle" />} />
      <div className="pad">
        <Search placeholder="Bölge, il, ilçe veya anahtar kelime..." value={q} onChange={setQ} />
        <Chips items={["Tümü", "Acil Satış", "Özel Fiyat"]} active={f} onPick={setF}
          extra={<ChipTail options={["Acil Fiyat"]} onPick={setF} onFilter={() => setSort(sort === 0 ? -1 : sort === -1 ? 1 : 0)} />} />
        <Count n={shown.length} what="fırsat" />
        {shown.map((d) => (
          <div key={d.id} className="card row-card" style={{ alignItems: "stretch" }}>
            <div style={{ width: 118, flex: "none", borderRadius: 10, overflow: "hidden" }}>
              <Photo n={d.photo} h={132} rounded={false}><span className="badge">{d.label}</span></Photo>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center", minWidth: 0 }}>
              <h3 style={{ fontSize: 16 }}>{d.title}</h3>
              <div className="price old">{tl(d.oldPrice)}</div>
              <div className="price" style={{ fontSize: 17 }}>{tl(d.price)}</div>
              <span className={pct(d) <= 12 ? "pill red" : "pill orange"} style={{ alignSelf: "flex-start", marginTop: 4 }}>%{pct(d)} avantaj</span>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

export function Projects() {
  const { notify } = useStore();
  const [f, setF] = useState("Tümü");
  const [q, setQ] = useState("");
  const shown = projects.filter((p) => (f === "Tümü" || p.city === f) && `${p.name} ${p.location}`.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")));
  return (
    <Page>
      <Header title="Konut Projeleri" action={<button className="btn sm" onClick={() => notify("Proje ekleme yakında.")}><Icon n="plus" s={14} w={2.4} />Proje Ekle</button>} />
      <div className="pad">
        <Search placeholder="Proje adı veya bölge ara..." value={q} onChange={setQ} />
        <Chips items={["Tümü", "İstanbul", "Ankara", "İzmir"]} active={f} onPick={setF} />
        <Count n={shown.length} what="proje" />
        {shown.map((p) => (
          <Link key={p.id} to={String(p.id)} className="card row-card" style={{ alignItems: "stretch" }}>
            <div style={{ width: 112, flex: "none", borderRadius: 10, overflow: "hidden" }}>
              <Photo n={p.photo} h={128} rounded={false}><span className="badge">{p.badge}</span></Photo>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, justifyContent: "center" }}>
              <h3>{p.name}</h3>
              <p className="muted">{p.location}</p>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>{tl(p.from)}’den</div>
              <b style={{ fontSize: 14 }}>Teslim: {p.delivery}</b>
              <span className="pill" style={{ alignSelf: "flex-start", background: "#3ec98a", color: "#fff", marginTop: 2 }}>%{p.progress} tamamlandı</span>
            </div>
          </Link>
        ))}
      </div>
    </Page>
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
    <div style={{ paddingBottom: 96 }}>
      <div className="topbar" style={{ paddingBottom: 6 }}>
        <button className="icon-btn" style={{ marginLeft: -6 }} onClick={() => nav(-1)} aria-label="Geri"><Icon n="back" s={22} /></button>
        <div className="grow" />
        <button className="icon-btn" onClick={() => notify("Paylaşım bağlantısı kopyalandı.")} aria-label="Paylaş"><Icon n="scan" /></button>
      </div>
      <div style={{ padding: "4px 14px 0" }}>
        <div style={{ borderRadius: 14, overflow: "hidden", position: "relative" }}>
          <Photo n={p.photo} h={190} rounded={false}><span className="gallery-count">1/2</span></Photo>
        </div>
      </div>
      <div className="pad" style={{ paddingTop: 16 }}>
        <h2 style={{ fontSize: 22 }}>{p.name}</h2>
        <p className="muted" style={{ marginTop: 2 }}>{p.location}</p>
        <div style={{ fontWeight: 800, color: "var(--blue)", margin: "8px 0 10px", fontSize: 16 }}>{tl(p.from)}’den</div>
        <div className="feat" style={{ marginTop: 0 }}>{p.units.map((u) => <span key={u}><Icon n="bed" s={14} />{u}</span>)}</div>
        <div className="tabs">{["Genel Bilgiler", "Fiyat Listesi"].map((t) => <button key={t} className={t === tab ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}</div>
        {tab === "Genel Bilgiler" ? (
          <>
            <h3 style={{ fontSize: 16 }}>Proje Hakkında</h3>
            <p className="muted" style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5 }}>{p.about}</p>
          </>
        ) : (
          p.units.map((u, i) => <div key={u} className="kv" style={{ borderBottom: "1px solid var(--line)" }}><span>{u}</span><span>{tl(p.from + i * 2200000)}’den</span></div>)
        )}
      </div>
      <div className="bottom-bar">
        <button className="btn ghost" onClick={() => notify("Müşteriniz kaydedildi.")}>Müşterimi Kaydet</button>
        <button className="btn" onClick={() => setTab("Fiyat Listesi")}>Proje Detay</button>
      </div>
    </div>
  );
}
