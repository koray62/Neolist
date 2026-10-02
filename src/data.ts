export type Listing = {
  id: number; title: string; location: string; price: number;
  type: "Satılık" | "Kiralık"; kind: string; rooms: string; area: number; floors: number;
  collab: boolean; hue: number; desc: string; features: string[];
};
export type Request = {
  id: number; title: string; location: string; min: number; max: number;
  rooms: string; area: string; tag: "Oturum" | "Yatırım" | "Ticari";
};
export type Deal = {
  id: number; title: string; location: string; oldPrice: number; price: number;
  label: "Özel Fiyat" | "Acil Satış" | "Acil Fiyat"; hue: number;
};
export type Project = {
  id: number; name: string; location: string; from: number; delivery: number;
  status: string; hue: number; units: string[]; about: string;
};
export type Chat = { id: number; name: string; last: string; time: string; unread: number };
export type Referral = { id: number; name: string; note: string; date: string; dir: "in" | "out" };

export const tl = (n: number) => `${n.toLocaleString("tr-TR")} TL`;

export const listings: Listing[] = [
  { id: 1, title: "Beykoz’da 5+1 Villa", location: "Beykoz / İstanbul", price: 32500000, type: "Satılık", kind: "Villa", rooms: "5+1", area: 400, floors: 4, collab: true, hue: 215,
    desc: "Beykoz’un en prestijli sitelerinde, orman manzaralı, modern tasarımlı villa. Geniş bahçe ve havuz imkânı.",
    features: ["Otopark", "Balkon", "Asansör", "Isıtma", "Güvenlik", "Bahçe"] },
  { id: 2, title: "Çekmeköy’de 4+1", location: "Çekmeköy / İstanbul", price: 14750000, type: "Satılık", kind: "Daire", rooms: "4+1", area: 210, floors: 3, collab: true, hue: 190,
    desc: "Metroya yakın, site içinde ferah ve aydınlık 4+1 daire.", features: ["Otopark", "Balkon", "Asansör", "Güvenlik"] },
  { id: 3, title: "Kadıköy’de 3+1 Daire", location: "Kadıköy / İstanbul", price: 85000, type: "Kiralık", kind: "Daire", rooms: "3+1", area: 145, floors: 5, collab: false, hue: 230,
    desc: "Deniz manzaralı, yeni yenilenmiş kiralık daire.", features: ["Balkon", "Asansör", "Isıtma"] },
  { id: 4, title: "Levent’te Ofis Katı", location: "Beşiktaş / İstanbul", price: 120000, type: "Kiralık", kind: "Ticari", rooms: "—", area: 320, floors: 12, collab: true, hue: 250,
    desc: "İş merkezinde, metro bağlantılı, hazır ofis katı.", features: ["Otopark", "Asansör", "Güvenlik", "Jeneratör"] },
  { id: 5, title: "Bodrum’da Deniz Manzaralı Villa", location: "Bodrum / Muğla", price: 41000000, type: "Satılık", kind: "Villa", rooms: "6+2", area: 520, floors: 3, collab: true, hue: 175,
    desc: "Özel havuzlu, denize 300 m mesafede lüks villa.", features: ["Havuz", "Bahçe", "Otopark", "Güvenlik"] },
];

export const requests: Request[] = [
  { id: 1, title: "Villa Aranıyor", location: "Beykoz / Acarkent", min: 20000000, max: 30000000, rooms: "4+1", area: "Min. 250 m²", tag: "Oturum" },
  { id: 2, title: "Daire Aranıyor", location: "Zekeriyaköy / İstanbul", min: 15000000, max: 20000000, rooms: "3+1", area: "Min. 150 m²", tag: "Yatırım" },
  { id: 3, title: "Ticari Alan Aranıyor", location: "Levent / İstanbul", min: 30000000, max: 50000000, rooms: "—", area: "300 - 500 m²", tag: "Ticari" },
];

export const deals: Deal[] = [
  { id: 1, title: "Acarkent’te 5+1 Villa", location: "Beykoz / İstanbul", oldPrice: 45000000, price: 40000000, label: "Özel Fiyat", hue: 210 },
  { id: 2, title: "Levent’te 3+1 Residence", location: "Beşiktaş / İstanbul", oldPrice: 18000000, price: 16000000, label: "Acil Satış", hue: 225 },
  { id: 3, title: "Sapanca’da Yatırım Fırsatı", location: "Sakarya", oldPrice: 12000000, price: 9500000, label: "Acil Fiyat", hue: 185 },
];

export const projects: Project[] = [
  { id: 1, name: "Nest Levent", location: "Levent / İstanbul", from: 8500000, delivery: 2026, status: "%90 tamamlandı", hue: 215, units: ["1+1", "2+1", "3+1"],
    about: "Levent’te modern yaşamın tüm olanaklarını prestijli bir projede buluşturuyor." },
  { id: 2, name: "Vadi İstanbul", location: "Sarıyer / İstanbul", from: 6900000, delivery: 2025, status: "%75 tamamlandı", hue: 195, units: ["2+1", "3+1", "4+1"],
    about: "Vadi manzaralı, sosyal olanakları zengin karma kullanımlı proje." },
  { id: 3, name: "Koru Panorama", location: "Çekmeköy / İstanbul", from: 5800000, delivery: 2026, status: "%45 tamamlandı", hue: 235, units: ["1+1", "2+1"],
    about: "Doğayla iç içe, şehir merkezine yakın konut projesi." },
];

export const chats: Chat[] = [
  { id: 1, name: "Ahmet Yılmaz", last: "Beykoz’daki villa portföyünüz var mı?", time: "15:42", unread: 2 },
  { id: 2, name: "Mehmet Kaya", last: "Fiyat hakkında bilgi alabilir miyim?", time: "10:30", unread: 1 },
  { id: 3, name: "Selin Arslan", last: "Talep detayları için teşekkürler.", time: "Dün", unread: 0 },
  { id: 4, name: "Caner Aydın", last: "Yönlendirme talebiniz alındı.", time: "Dün", unread: 0 },
  { id: 5, name: "Zeynep Koç", last: "Fırsat için müsait misiniz?", time: "Pzt", unread: 0 },
];

export const referrals: Referral[] = [
  { id: 1, name: "Mehmet Kaya", note: "Antalya’da villa talebi", date: "10.04.2025", dir: "in" },
  { id: 2, name: "Ayşe Demir", note: "Bodrum’da 4+1 arayışı", date: "09.04.2025", dir: "in" },
  { id: 3, name: "Can Öztürk", note: "Levent’te ofis talebi", date: "07.04.2025", dir: "out" },
];

export const me = {
  name: "Ahmet Yılmaz", title: "Gayrimenkul Danışmanı", office: "KW Ekol Gayrimenkul",
  phone: "+90 532 123 45 67", email: "ahmet.yilmaz@neolist.com", licence: "123456",
  about: "20 yıllık deneyim, lüks konut ve proje satışı alanında uzman.",
};

export const initials = (n: string) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);
