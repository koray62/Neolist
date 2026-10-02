import type { PhotoNo } from "./ui";

export type Listing = {
  id: number; title: string; location: string; price: number;
  type: "Satılık" | "Kiralık"; kind: string; rooms: string; area: number; floors: number;
  collab: boolean; photo: PhotoNo; desc: string; features: string[];
};
export type Request = {
  id: number; title: string; location: string; min: number; max: number;
  rooms: string; area: string; tag: "Oturum" | "Yatırım" | "Ticari"; kind: "Satın Alma" | "Kiralama" | "Yatırım";
};
export type Deal = {
  id: number; title: string; location: string; oldPrice: number; price: number;
  label: "Özel Fiyat" | "Acil Satış" | "Acil Fiyat"; photo: PhotoNo;
};
export type Project = {
  id: number; name: string; location: string; city: string; from: number; delivery: number;
  badge: "Acil Fiyat" | "Acil Satış"; progress: number; photo: PhotoNo; units: string[]; about: string;
};
export type Chat = { id: number; name: string; last: string; time: string; unread: number };
export type Referral = { id: number; name: string; note: string; date: string; dir: "in" | "out" };

export const tl = (n: number) => `${n.toLocaleString("tr-TR")} TL`;
export const mtl = (n: number) => `${+(n / 1e6).toFixed(1)}`.replace(".", ",");
export const budget = (min: number, max: number) =>
  min >= 1e6 && max >= 1e6 ? `${mtl(min)} - ${mtl(max)} M TL` : `${tl(min)} - ${tl(max)}`;

export const featureIcons: Record<string, "car" | "balcony" | "elevator" | "flame" | "drop" | "shield" | "home"> = {
  Otopark: "car", Balkon: "balcony", Asansör: "elevator", Isıtma: "flame", Doğalgaz: "drop", Güvenlik: "shield", Bahçe: "home",
};

export const listings: Listing[] = [
  { id: 1, title: "Beykoz’da 5+1 Villa", location: "Beykoz / İstanbul", price: 32500000, type: "Satılık", kind: "Villa", rooms: "5+1", area: 400, floors: 4, collab: true, photo: 1,
    desc: "Beykoz’un en prestijli sitelerinden birinde, orman manzaralı, modern tasarımlı villa. Geniş bahçe ve sosyal olanaklar...",
    features: ["Otopark", "Balkon", "Asansör", "Isıtma", "Doğalgaz"] },
  { id: 2, title: "Çekmeköy’de 4+1", location: "Çekmeköy / İstanbul", price: 14750000, type: "Satılık", kind: "Villa", rooms: "4+1", area: 210, floors: 3, collab: true, photo: 3,
    desc: "Metroya yakın, site içinde ferah ve aydınlık 4+1 müstakil villa.", features: ["Otopark", "Balkon", "Güvenlik"] },
  { id: 3, title: "Kadıköy’de 3+1 Daire", location: "Kadıköy / İstanbul", price: 85000, type: "Kiralık", kind: "Daire", rooms: "3+1", area: 145, floors: 5, collab: false, photo: 2,
    desc: "Deniz manzaralı, yeni yenilenmiş kiralık daire.", features: ["Balkon", "Asansör", "Isıtma"] },
  { id: 4, title: "Levent’te Ofis Katı", location: "Beşiktaş / İstanbul", price: 120000, type: "Kiralık", kind: "Ticari", rooms: "—", area: 320, floors: 12, collab: true, photo: 2,
    desc: "İş merkezinde, metro bağlantılı, hazır ofis katı.", features: ["Otopark", "Asansör", "Güvenlik"] },
  { id: 5, title: "Bodrum’da Deniz Manzaralı Villa", location: "Bodrum / Muğla", price: 41000000, type: "Satılık", kind: "Villa", rooms: "6+2", area: 520, floors: 3, collab: true, photo: 1,
    desc: "Özel havuzlu, denize 300 m mesafede lüks villa.", features: ["Bahçe", "Otopark", "Güvenlik"] },
];

export const requests: Request[] = [
  { id: 1, title: "Villa Aranıyor", location: "Beykoz / Acarkent", min: 20e6, max: 30e6, rooms: "4+1", area: "Min. 250 m²", tag: "Oturum", kind: "Satın Alma" },
  { id: 2, title: "Daire Aranıyor", location: "Zekeriyaköy / İstanbul", min: 15e6, max: 20e6, rooms: "3+1", area: "Min. 150 m²", tag: "Yatırım", kind: "Yatırım" },
  { id: 3, title: "Ticari Alan Aranıyor", location: "Levent / İstanbul", min: 30e6, max: 50e6, rooms: "—", area: "300 - 500 m²", tag: "Ticari", kind: "Kiralama" },
];

export const deals: Deal[] = [
  { id: 1, title: "Acarkent’te 5+1 Villa", location: "Beykoz / İstanbul", oldPrice: 45000000, price: 40000000, label: "Özel Fiyat", photo: 1 },
  { id: 2, title: "Levent’te 3+1 Residence", location: "Beşiktaş / İstanbul", oldPrice: 18500000, price: 16000000, label: "Acil Satış", photo: 2 },
  { id: 3, title: "Sapanca’da Yatırım Fırsatı", location: "Sakarya", oldPrice: 12000000, price: 9500000, label: "Acil Fiyat", photo: 3 },
];

export const projects: Project[] = [
  { id: 1, name: "Nest Levent", location: "Levent / İstanbul", city: "İstanbul", from: 8500000, delivery: 2026, badge: "Acil Fiyat", progress: 90, photo: 3, units: ["1+1", "2+1", "3+1"],
    about: "Levent’in kalbinde, modern yaşamın tüm ihtiyaçlarını karşılayan prestijli bir proje." },
  { id: 2, name: "Vadi İstanbul", location: "Sarıyer / İstanbul", city: "İstanbul", from: 6900000, delivery: 2025, badge: "Acil Satış", progress: 75, photo: 2, units: ["2+1", "3+1", "4+1"],
    about: "Vadi manzaralı, sosyal olanakları zengin karma kullanımlı proje." },
  { id: 3, name: "Koru Panorama", location: "Çekmeköy / İstanbul", city: "İstanbul", from: 5800000, delivery: 2025, badge: "Acil Fiyat", progress: 45, photo: 2, units: ["1+1", "2+1"],
    about: "Doğayla iç içe, şehir merkezine yakın konut projesi." },
];

export const chats: Chat[] = [
  { id: 1, name: "Ahmet Yılmaz", last: "Beykoz’da villa portföyünüz var mı?", time: "15:42", unread: 2 },
  { id: 2, name: "Mehmet Kaya", last: "Proje hakkında bilgi alabilir miyim?", time: "12:30", unread: 1 },
  { id: 3, name: "Selin Arslan", last: "Talep detayları için teşekkürler.", time: "Dün", unread: 0 },
  { id: 4, name: "Caner Aydın", last: "Yönlendirme talebi", time: "Dün", unread: 0 },
  { id: 5, name: "Zeynep Koç", last: "Fırsat ilanınız çok ilgimi çekti.", time: "Dün", unread: 0 },
];

export const referrals: Referral[] = [
  { id: 1, name: "Mehmet Kaya", note: "Antalya’da villa talebi", date: "10.04.2025", dir: "in" },
  { id: 2, name: "Ayşe Demir", note: "Bodrum’da 4+1 arıyor", date: "09.04.2025", dir: "in" },
];

export const cities: Record<string, string[]> = {
  İstanbul: ["Beykoz", "Çekmeköy", "Kadıköy", "Beşiktaş", "Sarıyer", "Üsküdar", "Zekeriyaköy"],
  Ankara: ["Çankaya", "Keçiören", "Yenimahalle"],
  İzmir: ["Karşıyaka", "Bornova", "Çeşme"],
  Muğla: ["Bodrum", "Marmaris", "Fethiye"],
  Antalya: ["Muratpaşa", "Kaş", "Alanya"],
};

export const me = {
  name: "Ahmet Yılmaz", title: "Gayrimenkul Danışmanı", office: "KW Ekol Gayrimenkul",
  phone: "+90 532 123 45 67", email: "ahmet.yilmaz@neolist.com", licence: "123456",
  about: "20 yıllık deneyimle lüks konut ve yatırım alanında uzmanlaşmış bir danışman.",
};
