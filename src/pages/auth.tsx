import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon, Logo } from "../ui";
import { useStore } from "../store";

export function Splash() {
  const nav = useNavigate();
  return (
    <div className="splash">
      <Logo light />
      <p style={{ marginTop: 6, opacity: .85 }}>Profesyonel Gayrimenkul İş Ağı</p>
      <div className="hero">
        <svg className="city" viewBox="0 0 300 100" preserveAspectRatio="none">
          <path d="M0 100V60h14V40h12v30h10V20h14v50h12V45h16v25h10V30h14v40h12V55h14v45z" fill="#fff" />
        </svg>
        <h2 style={{ fontSize: 22 }}>Doğru bağlantılarla<br />daha fazla fırsata ulaşın.</h2>
        <div style={{ height: 18 }} />
        <button className="btn light" onClick={() => nav("/giris")}>Giriş Yap</button>
        <div style={{ height: 10 }} />
        <button className="btn outline-light" onClick={() => nav("/uye-ol")}>Üye Ol</button>
      </div>
    </div>
  );
}

export function Login() {
  const { login, authed } = useStore();
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  if (authed) { setTimeout(() => nav("/app", { replace: true })); }
  return (
    <form className="auth" onSubmit={(e) => { e.preventDefault(); login(); nav("/app"); }}>
      <div style={{ textAlign: "center" }}><Logo /></div>
      <h1>Hoş Geldiniz!</h1>
      <p className="muted" style={{ marginBottom: 18 }}>Gayrimenkul profesyonelleriyle buluşma noktası.</p>
      <label className="field"><span>E-posta adresi veya telefon</span><input required defaultValue="ahmet.yilmaz@neolist.com" /></label>
      <label className="field"><span>Şifre</span><input required type={show ? "text" : "password"} defaultValue="123456" /></label>
      <div className="row" style={{ alignItems: "center", marginBottom: 14 }}>
        <label className="check"><input type="checkbox" defaultChecked /> Beni hatırla</label>
        <button type="button" className="muted" style={{ textAlign: "right", color: "var(--blue)" }} onClick={() => setShow(!show)}>
          <Icon n="eye" s={16} /> {show ? "Gizle" : "Göster"}
        </button>
      </div>
      <button className="btn">Giriş Yap</button>
      <div className="divider">veya</div>
      <button type="button" className="btn ghost" onClick={() => nav("/uye-ol")}>Üye Ol</button>
      <p className="muted" style={{ textAlign: "center", marginTop: 16 }}>Henüz üye değil misiniz? <Link to="/uye-ol" style={{ color: "var(--blue)" }}>Üye Ol</Link></p>
    </form>
  );
}

export function Signup() {
  const { login, notify } = useStore();
  const nav = useNavigate();
  const [role, setRole] = useState("Danışman");
  return (
    <form className="auth" onSubmit={(e) => { e.preventDefault(); login(); notify("Üyelik başvurunuz alındı."); nav("/app"); }}>
      <h1 style={{ marginTop: 0 }}>Üye Ol</h1>
      <p className="muted">Hemen profesyonel ağımıza katılın.</p>
      <div className="role">
        {["Danışman", "Ofis / Broker", "Proje Firması"].map((r) => (
          <button type="button" key={r} className={r === role ? "on" : ""} onClick={() => setRole(r)}>{r}</button>
        ))}
      </div>
      <div className="row"><label className="field"><span>Adınız</span><input required /></label><label className="field"><span>Soyadınız</span><input required /></label></div>
      <label className="field"><span>Telefon</span><input required type="tel" /></label>
      <label className="field"><span>E-posta</span><input required type="email" /></label>
      <label className="field"><span>Şirket / Ofis Adı</span><input required /></label>
      <label className="field"><span>Yetki Belgesi No</span><input required /></label>
      <label className="field"><span>Şifre</span><input required type="password" minLength={6} /></label>
      <label className="check"><input type="checkbox" required /> Kullanım koşullarını kabul ediyorum.</label>
      <label className="check"><input type="checkbox" required /> KVKK metnini okudum, onaylıyorum.</label>
      <label className="check"><input type="checkbox" required /> Neolist iş ağı kurallarını kabul ediyorum.</label>
      <button className="btn" style={{ marginTop: 10 }}>Üyelik Başvurusu Yap</button>
      <p className="muted" style={{ textAlign: "center", marginTop: 14 }}>Zaten üye misiniz? <Link to="/giris" style={{ color: "var(--blue)" }}>Giriş Yap</Link></p>
    </form>
  );
}
