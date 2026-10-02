import { FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Field, Header, Icon, Photo } from "../ui";
import { Listing, featureIcons, tl } from "../data";
import { fileToDataUrl } from "../images";
import { useStore } from "../store";
import { Place, num, place, roomOpts } from "./lists";

const MAX_PHOTOS = 6;
const featureNames = Object.keys(featureIcons);

/** The sample photo of a seeded listing becomes a normal, removable photo once the listing is edited. */
const photosOf = (l?: Listing) => l?.photos ?? (l?.photo ? [`${import.meta.env.BASE_URL}photos/p${l.photo}.jpg`] : []);

function ListingForm({ editing, onDone }: { editing?: Listing; onDone: () => void }) {
  const { addListing, updateListing, notify } = useStore();
  const [photos, setPhotos] = useState<string[]>(photosOf(editing));
  const [features, setFeatures] = useState<string[]>(editing?.features ?? []);
  const [busy, setBusy] = useState(false);
  const [district = "", city = ""] = (editing?.location ?? "").split(" / ");

  const pick = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const room = MAX_PHOTOS - photos.length;
      const next = await Promise.all(Array.from(files).slice(0, room).map((f) => fileToDataUrl(f)));
      setPhotos((p) => [...p, ...next]);
      if (files.length > room) notify(`En fazla ${MAX_PHOTOS} fotoğraf eklenebilir.`);
    } catch {
      notify("Fotoğraf yüklenemedi.");
    }
    setBusy(false);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const data = {
      title: String(d.get("title")), location: place(d), price: num(d.get("price")),
      type: d.get("type") === "Kiralık" ? ("Kiralık" as const) : ("Satılık" as const), kind: String(d.get("kind")),
      rooms: String(d.get("rooms")), area: num(d.get("area")), collab: d.get("collab") === "on",
      desc: String(d.get("desc") || ""), features, photos, photo: undefined,
    };
    if (editing) updateListing(editing.id, data);
    else addListing({ ...data, floors: 1, mine: true });
    notify(editing ? "İlan güncellendi." : "İlanınız eklendi.");
    onDone();
  };

  return (
    <form onSubmit={submit}>
      <div className="pad">
        <p className="label" style={{ marginTop: 6 }}>Fotoğraflar</p>
        <div className="pics">
          {photos.map((src, i) => (
            <div key={i} className="pic">
              <img src={src} alt="" />
              <button type="button" aria-label="Fotoğrafı kaldır" onClick={() => setPhotos(photos.filter((_, j) => j !== i))}><Icon n="close" s={12} w={2.6} /></button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="pic add">
              <Icon n="camera" s={22} />{busy ? "Yükleniyor…" : "Ekle"}
              <input type="file" accept="image/*" multiple onChange={(e) => { void pick(e.target.files); e.target.value = ""; }} />
            </label>
          )}
        </div>
        {photos.length === 0 && <p className="muted" style={{ marginBottom: 12 }}>Fotoğraf eklemezseniz ilanda varsayılan bir çizim gösterilir.</p>}

        <Field><input name="title" required placeholder="İlan başlığı" defaultValue={editing?.title} /></Field>
        <div className="row">
          <Field><select name="type" defaultValue={editing?.type ?? "Satılık"}><option>Satılık</option><option>Kiralık</option></select><Icon n="down" s={16} /></Field>
          <Field><select name="kind" defaultValue={editing?.kind ?? "Daire"}><option>Daire</option><option>Villa</option><option>Arsa</option><option>Ticari</option></select><Icon n="down" s={16} /></Field>
        </div>
        <Place defaultCity={city} defaultDistrict={district} />
        <div className="row">
          <Field><input name="price" required inputMode="numeric" placeholder="Fiyat (TL)" defaultValue={editing?.price} /></Field>
          <Field><input name="area" required inputMode="numeric" placeholder="m²" defaultValue={editing?.area} /></Field>
        </div>
        <Field><select name="rooms" defaultValue={editing?.rooms ?? "3+1"}>{[...new Set([...(editing ? [editing.rooms] : []), ...roomOpts])].map((r) => <option key={r}>{r}</option>)}</select><Icon n="down" s={16} /></Field>
        <Field><input name="desc" placeholder="Açıklama (opsiyonel)" defaultValue={editing?.desc} /></Field>
        <p className="label">Özellikler</p>
        <div className="chips" style={{ flexWrap: "wrap", margin: "0 0 8px" }}>
          {featureNames.map((f) => (
            <button type="button" key={f} className={features.includes(f) ? "chip on" : "chip"} onClick={() => setFeatures(features.includes(f) ? features.filter((x) => x !== f) : [...features, f])}>{f}</button>
          ))}
        </div>
        <label className="check"><input type="checkbox" name="collab" defaultChecked={editing?.collab ?? true} /> İşbirliğine açık</label>
      </div>
      <div className="bottom-bar">
        {editing && <button type="button" className="btn ghost" onClick={onDone}>Vazgeç</button>}
        <button className="btn">{editing ? "Güncelle" : "İlanı Yayınla"}</button>
      </div>
    </form>
  );
}

export function AddListing() {
  const { listings, deleteListing, notify } = useStore();
  const [params, setParams] = useSearchParams();
  const [confirm, setConfirm] = useState(0);
  const [nonce, setNonce] = useState(0);
  const mine = listings.filter((l) => l.mine);
  const editing = mine.find((l) => l.id === Number(params.get("duzenle")));

  const done = () => { setParams({}); setNonce((n) => n + 1); };
  const edit = (id: number) => { setParams({ duzenle: String(id) }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const remove = (id: number) => {
    deleteListing(id);
    setConfirm(0);
    if (editing?.id === id) done();
    notify("İlan silindi.");
  };

  return (
    <div style={{ paddingBottom: 96 }}>
      <Header title={editing ? "İlanı Düzenle" : "İlan Ekle"} />
      <ListingForm key={`${editing?.id ?? "new"}-${nonce}`} editing={editing} onDone={done} />
      <div className="pad" style={{ paddingTop: 0 }}>
        <div className="section-title"><span>İlanlarım ({mine.length})</span></div>
        {mine.length === 0 && <p className="muted">Henüz ilan eklemediniz.</p>}
        {mine.map((l) => (
          <div key={l.id} className="card" style={editing?.id === l.id ? { borderColor: "var(--blue)" } : undefined}>
            <div className="row-card" style={{ display: "flex", gap: 12 }}>
              <Link to={`/app/ilanlar/${l.id}`} style={{ width: 96, flex: "none", borderRadius: 10, overflow: "hidden" }}>
                <Photo src={l.photos?.[0]} n={l.photo} h={72} rounded={false} />
              </Link>
              <div style={{ minWidth: 0 }}>
                <b style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.title}</b>
                <p className="muted">{l.location}</p>
                <div className="price" style={{ fontSize: 16 }}>{tl(l.price)}{l.type === "Kiralık" ? " / ay" : ""}</div>
              </div>
            </div>
            {confirm === l.id ? (
              <div className="my-actions">
                <span className="muted" style={{ alignSelf: "center", flex: 1.4 }}>Silinsin mi?</span>
                <button className="btn danger ghost" onClick={() => remove(l.id)}>Evet, sil</button>
                <button className="btn ghost" onClick={() => setConfirm(0)}>Vazgeç</button>
              </div>
            ) : (
              <div className="my-actions">
                <button className="btn ghost" onClick={() => edit(l.id)}><Icon n="edit" s={15} />Düzenle</button>
                <button className="btn ghost danger" onClick={() => setConfirm(l.id)}><Icon n="trash" s={15} />Sil</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
