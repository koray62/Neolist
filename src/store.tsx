import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Deal, Listing, Referral, Request, deals as d0, listings as l0, referrals as f0, requests as r0 } from "./data";

type Store = {
  listings: Listing[]; requests: Request[]; deals: Deal[]; referrals: Referral[];
  addListing: (l: Omit<Listing, "id">) => void;
  updateListing: (id: number, l: Partial<Listing>) => void;
  deleteListing: (id: number) => void;
  addRequest: (r: Omit<Request, "id">) => void;
  addDeal: (d: Omit<Deal, "id">) => void;
  addReferral: (r: Omit<Referral, "id">) => void;
  authed: boolean; login: () => void; logout: () => void;
  toast: string; notify: (m: string) => void;
};
const Ctx = createContext<Store>(null!);
export const useStore = () => useContext(Ctx);

const KEY = "neolist.auth";
const read = () => { try { return localStorage.getItem(KEY) === "1"; } catch { return false; } };
const LKEY = "neolist.listings";
const readListings = (): Listing[] => {
  try { const v = JSON.parse(localStorage.getItem(LKEY) ?? "null"); return Array.isArray(v) ? v : l0; } catch { return l0; }
};
const write = (v: boolean) => { try { localStorage.setItem(KEY, v ? "1" : "0"); } catch { /* ignore */ } };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [listings, setL] = useState(readListings);
  useEffect(() => { try { localStorage.setItem(LKEY, JSON.stringify(listings)); } catch { /* storage full or blocked */ } }, [listings]);
  const [requests, setR] = useState(r0);
  const [deals, setD] = useState(d0);
  const [referrals, setF] = useState(f0);
  const [authed, setAuthed] = useState(read);
  const [toast, setToast] = useState("");
  const notify = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2200); };
  const next = (a: { id: number }[]) => Math.max(0, ...a.map((x) => x.id)) + 1;
  const value: Store = {
    listings, requests, deals, referrals, authed, toast, notify,
    addListing: (l) => setL((a) => [{ ...l, id: next(a) }, ...a]),
    updateListing: (id, l) => setL((a) => a.map((x) => (x.id === id ? { ...x, ...l } : x))),
    deleteListing: (id) => setL((a) => a.filter((x) => x.id !== id)),
    addRequest: (r) => setR((a) => [{ ...r, id: next(a) }, ...a]),
    addDeal: (d) => setD((a) => [{ ...d, id: next(a) }, ...a]),
    addReferral: (r) => setF((a) => [{ ...r, id: next(a) }, ...a]),
    login: () => { write(true); setAuthed(true); },
    logout: () => { write(false); setAuthed(false); },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
