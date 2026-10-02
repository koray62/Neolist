import { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Icon, IconName } from "./ui";
import { useStore } from "./store";
import { Splash, Login, Signup } from "./pages/auth";
import { Dashboard, MenuDrawer, QuickSheet } from "./pages/home";
import { Listings, ListingDetail, Requests, AddRequest, Deals, Projects, ProjectDetail, AddDeal } from "./pages/lists";
import { AddListing } from "./pages/listingform";
import { Collab, Messages, NewReferral, Profile, Settings } from "./pages/misc";

const tabs: { to: string; label: string; icon: IconName }[] = [
  { to: "/app", label: "Ana Sayfa", icon: "home" },
  { to: "/app/ilanlar", label: "İlanlar", icon: "building" },
  { to: "/app/talepler", label: "Talepler", icon: "clipboard" },
  { to: "/app/firsatlar", label: "Fırsatlar", icon: "tag" },
];

function Shell() {
  const [menu, setMenu] = useState(false);
  const [quick, setQuick] = useState(false);
  const { pathname } = useLocation();
  const { authed } = useStore();
  useEffect(() => { setMenu(false); setQuick(false); }, [pathname]);
  if (!authed) return <Navigate to="/giris" replace />;
  const showTabs = ["/app", "/app/ilanlar", "/app/talepler", "/app/firsatlar", "/app/projeler", "/app/isbirligi", "/app/mesajlar", "/app/profil"].includes(pathname);
  return (
    <>
      <Outlet context={{ openMenu: () => setMenu(true), openQuick: () => setQuick(true) }} />
      {showTabs && (
        <>
          <nav className="tabbar">
            {tabs.map((t) => (
              <NavLink key={t.to} to={t.to} end className={({ isActive }) => (isActive ? "on" : "")}>
                <Icon n={t.icon} /> {t.label}
              </NavLink>
            ))}
            <button onClick={() => setMenu(true)}><Icon n="menu" /> Menü</button>
          </nav>
        </>
      )}
      {menu && <MenuDrawer onClose={() => setMenu(false)} />}
      {quick && <QuickSheet onClose={() => setQuick(false)} />}
    </>
  );
}

export default function App() {
  const { toast } = useStore();
  return (
    <div className="phone">
      {toast && <div className="toast">{toast}</div>}
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/uye-ol" element={<Signup />} />
          <Route path="/app" element={<Shell />}>
            <Route index element={<Dashboard />} />
            <Route path="ilanlar" element={<Listings />} />
            <Route path="ilanlar/ekle" element={<AddListing />} />
            <Route path="ilanlar/:id" element={<ListingDetail />} />
            <Route path="talepler" element={<Requests />} />
            <Route path="talepler/ekle" element={<AddRequest />} />
            <Route path="firsatlar" element={<Deals />} />
            <Route path="firsatlar/ekle" element={<AddDeal />} />
            <Route path="projeler" element={<Projects />} />
            <Route path="projeler/:id" element={<ProjectDetail />} />
            <Route path="isbirligi" element={<Collab />} />
            <Route path="isbirligi/yeni" element={<NewReferral />} />
            <Route path="mesajlar" element={<Messages />} />
            <Route path="profil" element={<Profile />} />
            <Route path="ayarlar" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </div>
  );
}
