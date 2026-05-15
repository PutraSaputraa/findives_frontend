import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";


export async function seedFirestore() {
  const items = [
    {
      id: "long-fins-premium",
      name: "Long Fins",
      startPrice: "35K",
      startUnit: "/ 1 session",
      desc: "Long fins untuk latihan renang, freediving basic, dan pengalaman berenang lebih powerful.",
      badge: "Most Popular",
      totalStock: 2,
      note: "Stok premium terbatas. Booking disarankan sebelum datang.",
      isActive: true,
      weekly: {
        senin: "available",
        selasa: "available",
        rabu: "limited",
        kamis: "available",
        jumat: "available",
        sabtu: "limited",
        minggu: "limited",
      },
    },
    {
      id: "snorkeling-mask",
      name: "Snorkeling Mask",
      startPrice: "15K",
      startUnit: "/ 1 session",
      desc: "Mask nyaman untuk snorkeling ringan, latihan di kolam, dan kebutuhan basic underwater.",
      badge: "Easy Rent",
      totalStock: 4,
      note: "Cocok untuk pemula dan latihan basic.",
      isActive: true,
      weekly: {
        senin: "available",
        selasa: "available",
        rabu: "available",
        kamis: "available",
        jumat: "available",
        sabtu: "limited",
        minggu: "limited",
      },
    },
    {
      id: "low-volume-mask",
      name: "Low Volume Mask",
      startPrice: "20K",
      startUnit: "/ 1 session",
      desc: "Mask low volume untuk pengalaman underwater yang lebih nyaman dan compact.",
      badge: "Compact Fit",
      totalStock: 3,
      note: "Cocok untuk underwater practice dan freediving basic.",
      isActive: true,
      weekly: {
        senin: "available",
        selasa: "available",
        rabu: "available",
        kamis: "limited",
        jumat: "available",
        sabtu: "limited",
        minggu: "limited",
      },
    },
  ];

  for (const item of items) {
    const { id, ...data } = item;
    await setDoc(doc(db, "items", id), data);
  }

  await setDoc(doc(db, "availability", "long-fins-premium_2026-05-20"), {
    itemId: "long-fins-premium",
    date: "2026-05-20",
    status: "unavailable",
    note: "Full booked untuk sesi ini",
  });

  console.log("Seed Firestore selesai.");
}