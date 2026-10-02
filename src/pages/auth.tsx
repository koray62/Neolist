import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field, Icon, Logo } from "../ui";
import { useStore } from "../store";

function CityNight() {
  const towers: [number, number, number][] = [
    [10, 36, 70], [48, 30, 110], [82, 34, 90], [120, 30, 140], [156, 36, 100],
    [196, 28, 120], [228, 32, 160], [266, 46, 230], [316, 30, 130], [350, 40, 100],
  ];
  const base = 520;
  return (
    <svg className="bg" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1f4d" /><stop offset=".3" stopColor="#1f4686" /><stop offset=".5" stopColor="#8a86a6" />
          <stop offset=".64" stopColor="#e39a6c" />
        </linearGradient>
        <linearGradient id="wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#233e6e" /><stop offset=".5" stopColor="#0d2250" /><stop offset="1" stopColor="#071940" /></linearGradient>
        <pattern id="wn" width="7" height="9" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="2" height="2.6" fill="#ffd27a" opacity=".6" /></pattern>
      </defs>
      <rect width="400" height="800" fill="url(#sk)" />
      <rect y={base} width="400" height="280" fill="url(#wt)" />
      {towers.map(([x, w, h], i) => (
        <g key={i}><rect x={x} y={base - h} width={w} height={h} fill="#0d1a3a" /><rect x={x} y={base - h} width={w} height={h} fill="url(#wn)" /></g>
      ))}
      <rect y={base - 2} width="400" height="4" fill="#f2a45a" opacity=".55" />
      {towers.map(([x, w, h], i) => <rect key={i} x={x + 3} y={base + 4} width={w - 6} height={h * 0.35} fill="#f0b060" opacity=".13" />)}
    </svg>
  );
}

export function Splash() {
  const nav = useNavigate();
  return (
    <div className="splash">
      <CityNight />
      <Logo light size={38} />
      <p className="sub">Profesyonel Gayrimenkul<br />İş Ağı</p>
      <p className="tag">Doğru bağlantılarla<br />daha fazla fırsata ulaşın.</p>
      <div className="dots"><i className="on" /><i /><i /><i /></div>
      <button className="btn light" onClick={() => nav("/giris")}>Giriş Yap</button>
      <div style={{ height: 12 }} />
      <button className="btn outline-light" onClick={() => nav("/uye-ol")}>Üye Ol</button>
      <button className="muted" style={{ color: "#c6d3f0", margin: "22px auto 0", fontSize: 12, display: "flex", gap: 14, alignItems: "center" }} onClick={() => nav("/giris")}>
        Daha fazlası için keşfet <Icon n="arrowr" s={16} />
      </button>
    </div>
  );
}

export function Login() {
  const { login } = useStore();
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  return (
    <form className="auth" onSubmit={(e) => { e.preventDefault(); login(); nav("/app"); }}>
      <div style={{ textAlign: "center" }}><Logo size={30} /></div>
      <h1>Hoş Geldiniz!</h1>
      <p className="muted" style={{ marginBottom: 20, fontSize: 14 }}>Gayrimenkul profesyonellerinin<br />buluşma noktası.</p>
      <Field icon="user"><input required placeholder="E-posta adresi veya telefon" /></Field>
      <Field icon="lock">
        <input required type={show ? "text" : "password"} placeholder="Şifre" />
        <button type="button" onClick={() => setShow(!show)} aria-label="Şifreyi göster"><Icon n="eye" /></button>
      </Field>
      <div className="row" style={{ alignItems: "center", marginBottom: 16 }}>
        <label className="check"><input type="checkbox" /> Beni hatırla</label>
        <button type="button" style={{ textAlign: "right", fontSize: 13, color: "var(--ink)" }}>Şifremi unuttum?</button>
      </div>
      <button className="btn navy">Giriş Yap</button>
      <div className="divider">veya</div>
      <button type="button" className="btn ghost" onClick={() => nav("/uye-ol")}>Üye Ol</button>
      <div className="foot">
        <span>Henüz üye değil misiniz?</span>
        <Link to="/uye-ol" aria-label="Üye Ol"><Icon n="arrowr" s={16} /></Link>
      </div>
    </form>
  );
}

export function Signup() {
  const { login, notify } = useStore();
  const nav = useNavigate();
  const [role, setRole] = useState("Danışman");
  const [show, setShow] = useState(false);
  return (
    <form className="auth signup" onSubmit={(e) => { e.preventDefault(); login(); notify("Üyelik başvurunuz alındı."); nav("/app"); }}>
      <h1>Üye Ol</h1>
      <p className="muted" style={{ marginBottom: 14, fontSize: 14 }}>Hemen profesyonel ağımıza katılın.</p>
      <div className="seg" style={{ marginBottom: 14 }}>
        {["Danışman", "Ofis / Broker", "Proje Firması"].map((r) => (
          <button type="button" key={r} className={r === role ? "on" : ""} style={{ height: 52, lineHeight: 1.1, fontSize: 13 }} onClick={() => setRole(r)}>{r}</button>
        ))}
      </div>
      <Field><input required placeholder="Adınız" /></Field>
      <Field><input required placeholder="Soyadınız" /></Field>
      <Field><input required type="tel" placeholder="Telefon" /></Field>
      <Field><input required type="email" placeholder="E-posta" /></Field>
      <Field><input required placeholder="Şirket / Ofis Adı" /></Field>
      <Field>
        <select required defaultValue="" aria-label="Uzmanlık Bölgesi">
          <option value="" disabled>Uzmanlık Bölgesi</option>
          <option>İstanbul</option><option>Ankara</option><option>İzmir</option><option>Muğla</option><option>Antalya</option>
        </select>
        <Icon n="down" s={18} />
      </Field>
      <Field>
        <input required type={show ? "text" : "password"} minLength={6} placeholder="Şifre" />
        <button type="button" onClick={() => setShow(!show)} aria-label="Şifreyi göster"><Icon n="eye" /></button>
      </Field>
      <label className="check"><input type="checkbox" required /> <u>Kullanım koşullarını</u> kabul ediyorum.</label>
      <label className="check"><input type="checkbox" required /> <u>KVKK metnini</u> okudum, kabul ediyorum.</label>
      <label className="check"><input type="checkbox" required /> <u>Neolist iş ağı kurallarını</u> kabul ediyorum.</label>
      <button className="btn" style={{ marginTop: 12 }}>Üyelik Başvurusu Yap</button>
      <p className="muted" style={{ textAlign: "center", marginTop: 16 }}>Zaten üye misiniz? <Link to="/giris" style={{ color: "var(--blue)", fontWeight: 600 }}>Giriş Yap</Link></p>
    </form>
  );
}
