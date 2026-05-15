import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebase";

const defaultWeekly = {
  senin: "available",
  selasa: "available",
  rabu: "available",
  kamis: "available",
  jumat: "available",
  sabtu: "available",
  minggu: "available",
};

const weekdayByDateIndex = [
  "minggu",
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
  "sabtu",
];

const weekdayLabel = {
  senin: "Senin",
  selasa: "Selasa",
  rabu: "Rabu",
  kamis: "Kamis",
  jumat: "Jumat",
  sabtu: "Sabtu",
  minggu: "Minggu",
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const statusMeta = {
  available: {
    label: "Available",
    short: "Ready",
    helper: "Masih kosong",
    className: "ready",
  },
  limited: {
    label: "Limited",
    short: "Limited",
    helper: "Stok terbatas",
    className: "limited",
  },
  unavailable: {
    label: "Full Booked",
    short: "Full",
    helper: "Tidak kosong",
    className: "full",
  },
};

const getStartOfToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getNextDates = (count = 14) => {
  const today = getStartOfToday();

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    const dayKey = weekdayByDateIndex[date.getDay()];

    return {
      key: formatDateKey(date),
      dayKey,
      dayLabel: index === 0 ? "Hari Ini" : weekdayLabel[dayKey],
      dateNumber: date.getDate(),
      month: monthNames[date.getMonth()],
      isToday: index === 0,
    };
  });
};

const normalizeWeekly = (weekly = {}) => ({
  senin: weekly.senin || weekly.Senin || "available",
  selasa: weekly.selasa || weekly.Selasa || "available",
  rabu: weekly.rabu || weekly.Rabu || "available",
  kamis: weekly.kamis || weekly.Kamis || "available",
  jumat: weekly.jumat || weekly.Jumat || "available",
  sabtu: weekly.sabtu || weekly.Sabtu || "available",
  minggu: weekly.minggu || weekly.Minggu || "available",
});

const makeCleanId = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function Admin() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    startPrice: "",
    startUnit: "/ session",
    desc: "",
    badge: "Ready Stock",
    totalStock: 1,
    note: "",
    sortOrder: 99,
    weekly: defaultWeekly,
  });

  const dates = useMemo(() => getNextDates(14), []);

  const selectedItem =
    items.find((item) => item.id === selectedItemId) || items[0] || null;

  const loadData = async () => {
    setLoading(true);

    try {
      const itemsSnapshot = await getDocs(collection(db, "items"));
      const availabilitySnapshot = await getDocs(collection(db, "availability"));

      const nextItems = itemsSnapshot.docs
        .map((itemDoc) => {
          const data = itemDoc.data();

          return {
            id: itemDoc.id,
            name: data.name || "Unnamed Item",
            startPrice: data.startPrice || "",
            startUnit: data.startUnit || "/ session",
            desc: data.desc || "",
            badge: data.badge || "Ready Stock",
            totalStock: Number(data.totalStock || 1),
            note: data.note || "",
            isActive: data.isActive !== false,
            sortOrder: Number(data.sortOrder ?? 99),
            weekly: normalizeWeekly(data.weekly),
          };
        })
        .filter((item) => item.isActive !== false)
        .sort((a, b) => a.sortOrder - b.sortOrder);

      const nextAvailabilityMap = {};

      availabilitySnapshot.docs.forEach((availabilityDoc) => {
        const data = availabilityDoc.data();

        if (!data.itemId || !data.date || !data.status) return;

        nextAvailabilityMap[`${data.itemId}_${data.date}`] = {
          id: availabilityDoc.id,
          ...data,
        };
      });

      setItems(nextItems);
      setAvailabilityMap(nextAvailabilityMap);

      if (!selectedItemId && nextItems.length > 0) {
        setSelectedItemId(nextItems[0].id);
      }

      if (
        selectedItemId &&
        !nextItems.some((item) => item.id === selectedItemId) &&
        nextItems.length > 0
      ) {
        setSelectedItemId(nextItems[0].id);
      }
    } catch (error) {
      setMessage(`Gagal memuat data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await loadData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
      setMessage("Login berhasil.");
    } catch (error) {
      setMessage(`Login gagal: ${error.message}`);
    }
  };

  const getDayStatus = (item, dateInfo) => {
    if (!item) return "available";

    const override = availabilityMap[`${item.id}_${dateInfo.key}`];
    const weeklyStatus = item.weekly?.[dateInfo.dayKey] || "available";

    return override?.status || weeklyStatus;
  };

  const getDaySource = (item, dateInfo) => {
    if (!item) return "weekly";

    const override = availabilityMap[`${item.id}_${dateInfo.key}`];

    return override ? "override" : "weekly";
  };

  const handleSetStatus = async (dateInfo, status) => {
    if (!selectedItem) {
      setMessage("Pilih item dulu.");
      return;
    }

    const documentId = `${selectedItem.id}_${dateInfo.key}`;

    try {
      await setDoc(
        doc(db, "availability", documentId),
        {
          itemId: selectedItem.id,
          itemName: selectedItem.name,
          date: dateInfo.key,
          status,
          note: statusMeta[status]?.helper || "",
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setMessage(
        `${selectedItem.name} tanggal ${dateInfo.key} diubah menjadi ${statusMeta[status].label}.`
      );

      await loadData();
    } catch (error) {
      setMessage(`Gagal mengubah status: ${error.message}`);
    }
  };

  const handleResetDate = async (dateInfo) => {
    if (!selectedItem) {
      setMessage("Pilih item dulu.");
      return;
    }

    const documentId = `${selectedItem.id}_${dateInfo.key}`;

    try {
      await deleteDoc(doc(db, "availability", documentId));
      setMessage(
        `${selectedItem.name} tanggal ${dateInfo.key} dikembalikan ke jadwal mingguan.`
      );

      await loadData();
    } catch (error) {
      setMessage(`Gagal reset tanggal: ${error.message}`);
    }
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    setMessage("");

    const cleanId = makeCleanId(newItem.id);

    if (!cleanId || !newItem.name || !newItem.startPrice) {
      setMessage("ID item, nama item, dan harga mulai wajib diisi.");
      return;
    }

    try {
      await setDoc(doc(db, "items", cleanId), {
        name: newItem.name,
        startPrice: newItem.startPrice,
        startUnit: newItem.startUnit,
        desc: newItem.desc,
        badge: newItem.badge,
        totalStock: Number(newItem.totalStock || 1),
        note: newItem.note || newItem.desc || "",
        isActive: true,
        sortOrder: Number(newItem.sortOrder || 99),
        weekly: defaultWeekly,
        createdAt: new Date().toISOString(),
      });

      setMessage("Item baru berhasil ditambahkan.");
      setNewItem({
        id: "",
        name: "",
        startPrice: "",
        startUnit: "/ session",
        desc: "",
        badge: "Ready Stock",
        totalStock: 1,
        note: "",
        sortOrder: 99,
        weekly: defaultWeekly,
      });

      await loadData();
    } catch (error) {
      setMessage(`Gagal menambahkan item: ${error.message}`);
    }
  };

  const summary = useMemo(() => {
    if (!selectedItem) {
      return {
        available: 0,
        limited: 0,
        unavailable: 0,
      };
    }

    return dates.reduce(
      (result, dateInfo) => {
        const status = getDayStatus(selectedItem, dateInfo);
        result[status] += 1;
        return result;
      },
      {
        available: 0,
        limited: 0,
        unavailable: 0,
      }
    );
  }, [dates, selectedItem, availabilityMap]);

  if (!user) {
    return (
      <main style={styles.page}>
        <section style={styles.loginCard}>
          <p style={styles.kicker}>findive.id</p>
          <h1 style={styles.loginTitle}>Admin Login</h1>
          <p style={styles.muted}>
            Login untuk mengubah status availability.
          </p>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email admin"
              value={login.email}
              onChange={(event) =>
                setLogin({ ...login, email: event.target.value })
              }
              required
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(event) =>
                setLogin({ ...login, password: event.target.value })
              }
              required
              style={styles.input}
            />

            <button style={styles.primaryButton}>Login</button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <header style={styles.header}>
          <div>
            <p style={styles.kicker}>findive.id admin</p>
            <h1 style={styles.title}>Availability Calendar</h1>
            <p style={styles.muted}>
              Pilih item, lalu ubah tanggal menjadi Available, Limited, atau Full Booked.
            </p>
          </div>

          <button style={styles.logoutButton} onClick={() => signOut(auth)}>
            Logout
          </button>
        </header>

        {message && <p style={styles.message}>{message}</p>}

        <section style={styles.toolbar}>
          <label style={styles.label}>
            Pilih Item
            <select
              style={styles.input}
              value={selectedItemId}
              onChange={(event) => setSelectedItemId(event.target.value)}
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.badge}
                </option>
              ))}
            </select>
          </label>

          <button style={styles.secondaryButton} onClick={loadData}>
            Refresh Data
          </button>
        </section>

        {loading ? (
          <div style={styles.emptyState}>Memuat data Firebase...</div>
        ) : !selectedItem ? (
          <div style={styles.emptyState}>
            Belum ada item. Tambahkan item baru di bawah.
          </div>
        ) : (
          <>
            <section style={styles.itemSummary}>
              <div>
                <p style={styles.kicker}>Selected item</p>
                <h2 style={styles.itemTitle}>{selectedItem.name}</h2>
                <p style={styles.muted}>{selectedItem.note || selectedItem.desc}</p>
              </div>

              <div style={styles.summaryPills}>
                <span style={styles.readyPill}>{summary.available} ready</span>
                <span style={styles.limitedPill}>{summary.limited} limited</span>
                <span style={styles.fullPill}>{summary.unavailable} full</span>
              </div>
            </section>

            <section style={styles.calendarGrid}>
              {dates.map((dateInfo) => {
                const status = getDayStatus(selectedItem, dateInfo);
                const source = getDaySource(selectedItem, dateInfo);
                const meta = statusMeta[status];

                return (
                  <article
                    key={dateInfo.key}
                    style={{
                      ...styles.dayCard,
                      ...styles[`${meta.className}Card`],
                    }}
                  >
                    <div style={styles.dayTop}>
                      <span style={styles.dayName}>{dateInfo.dayLabel}</span>
                      <span style={styles.sourceBadge}>
                        {source === "override" ? "Custom" : "Default"}
                      </span>
                    </div>

                    <strong style={styles.dateNumber}>
                      {dateInfo.dateNumber}
                    </strong>
                    <span style={styles.month}>{dateInfo.month}</span>

                    <div style={styles.statusRow}>
                      <span style={styles.statusText}>{meta.label}</span>
                      <small style={styles.statusHelper}>{meta.helper}</small>
                    </div>

                    <div style={styles.actionGrid}>
                      <button
                        style={styles.readyButton}
                        onClick={() => handleSetStatus(dateInfo, "available")}
                      >
                        Ready
                      </button>
                      <button
                        style={styles.limitedButton}
                        onClick={() => handleSetStatus(dateInfo, "limited")}
                      >
                        Limited
                      </button>
                      <button
                        style={styles.fullButton}
                        onClick={() => handleSetStatus(dateInfo, "unavailable")}
                      >
                        Full
                      </button>
                    </div>

                    <button
                      style={styles.resetButton}
                      onClick={() => handleResetDate(dateInfo)}
                    >
                      Reset ke default
                    </button>
                  </article>
                );
              })}
            </section>
          </>
        )}

        <details style={styles.details}>
          <summary style={styles.summary}>Tambah Item Baru</summary>

          <form onSubmit={handleAddItem} style={styles.addForm}>
            <label style={styles.label}>
              ID Item
              <input
                style={styles.input}
                placeholder="contoh: short-fins-anak"
                value={newItem.id}
                onChange={(event) =>
                  setNewItem({ ...newItem, id: event.target.value })
                }
                required
              />
            </label>

            <label style={styles.label}>
              Nama Item
              <input
                style={styles.input}
                placeholder="contoh: Short Fins Anak"
                value={newItem.name}
                onChange={(event) =>
                  setNewItem({ ...newItem, name: event.target.value })
                }
                required
              />
            </label>

            <label style={styles.label}>
              Badge
              <input
                style={styles.input}
                placeholder="contoh: New Arrival"
                value={newItem.badge}
                onChange={(event) =>
                  setNewItem({ ...newItem, badge: event.target.value })
                }
              />
            </label>

            <label style={styles.label}>
              Harga Mulai
              <input
                style={styles.input}
                placeholder="contoh: 20K"
                value={newItem.startPrice}
                onChange={(event) =>
                  setNewItem({ ...newItem, startPrice: event.target.value })
                }
                required
              />
            </label>

            <label style={styles.label}>
              Satuan Harga
              <input
                style={styles.input}
                placeholder="contoh: / session"
                value={newItem.startUnit}
                onChange={(event) =>
                  setNewItem({ ...newItem, startUnit: event.target.value })
                }
              />
            </label>

            <label style={styles.label}>
              Total Stok
              <input
                type="number"
                min="1"
                style={styles.input}
                value={newItem.totalStock}
                onChange={(event) =>
                  setNewItem({ ...newItem, totalStock: event.target.value })
                }
              />
            </label>

            <label style={styles.label}>
              Sort Order
              <input
                type="number"
                min="1"
                style={styles.input}
                value={newItem.sortOrder}
                onChange={(event) =>
                  setNewItem({ ...newItem, sortOrder: event.target.value })
                }
              />
            </label>

            <label style={styles.labelWide}>
              Deskripsi
              <textarea
                style={styles.textarea}
                placeholder="Deskripsi item"
                value={newItem.desc}
                onChange={(event) =>
                  setNewItem({ ...newItem, desc: event.target.value })
                }
              />
            </label>

            <label style={styles.labelWide}>
              Note Availability
              <textarea
                style={styles.textarea}
                placeholder="Catatan stok atau availability"
                value={newItem.note}
                onChange={(event) =>
                  setNewItem({ ...newItem, note: event.target.value })
                }
              />
            </label>

            <button style={styles.primaryButton}>Tambah Item</button>
          </form>
        </details>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: 16,
    background: "#082535",
    color: "#082535",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },
  shell: {
    width: "min(1180px, 100%)",
    margin: "0 auto",
    padding: "clamp(16px, 4vw, 28px)",
    borderRadius: 28,
    background: "#D4E1E7",
    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.25)",
  },
  loginCard: {
    width: "min(420px, 100%)",
    margin: "10vh auto 0",
    padding: 24,
    borderRadius: 28,
    background: "#D4E1E7",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 18,
    flexWrap: "wrap",
    marginBottom: 18,
  },
  kicker: {
    margin: 0,
    color: "#788C57",
    fontSize: 13,
    fontWeight: 950,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  title: {
    margin: "6px 0 8px",
    color: "#082535",
    fontSize: "clamp(2.3rem, 7vw, 5.4rem)",
    fontWeight: 950,
    fontStyle: "italic",
    lineHeight: 0.9,
    textTransform: "uppercase",
  },
  loginTitle: {
    margin: "6px 0 8px",
    color: "#082535",
    fontSize: "2.4rem",
    fontWeight: 950,
    fontStyle: "italic",
    lineHeight: 0.95,
    textTransform: "uppercase",
  },
  muted: {
    margin: 0,
    color: "#254A5A",
    lineHeight: 1.55,
  },
  form: {
    display: "grid",
    gap: 12,
    marginTop: 18,
  },
  toolbar: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "end",
    gap: 12,
    margin: "22px 0",
  },
  label: {
    display: "grid",
    gap: 7,
    color: "#082535",
    fontWeight: 850,
  },
  labelWide: {
    display: "grid",
    gap: 7,
    color: "#082535",
    fontWeight: 850,
    gridColumn: "1 / -1",
  },
  input: {
    width: "100%",
    minHeight: 48,
    padding: "11px 13px",
    borderRadius: 16,
    border: "1px solid rgba(8, 37, 53, 0.18)",
    color: "#082535",
    background: "#FFFFFF",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: 96,
    padding: "11px 13px",
    borderRadius: 16,
    border: "1px solid rgba(8, 37, 53, 0.18)",
    color: "#082535",
    background: "#FFFFFF",
    outline: "none",
    resize: "vertical",
  },
  primaryButton: {
    minHeight: 48,
    padding: "0 18px",
    border: 0,
    borderRadius: 999,
    color: "#FFFFFF",
    background: "#254A5A",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryButton: {
    minHeight: 48,
    padding: "0 18px",
    border: "1px solid rgba(8, 37, 53, 0.16)",
    borderRadius: 999,
    color: "#082535",
    background: "#FFFFFF",
    fontWeight: 900,
    cursor: "pointer",
  },
  logoutButton: {
    minHeight: 44,
    padding: "0 16px",
    border: 0,
    borderRadius: 999,
    color: "#082535",
    background: "#809983",
    fontWeight: 900,
    cursor: "pointer",
  },
  message: {
    margin: "14px 0",
    padding: 12,
    borderRadius: 16,
    color: "#082535",
    background: "#FFFFFF",
    border: "1px solid rgba(8, 37, 53, 0.12)",
  },
  emptyState: {
    padding: 24,
    borderRadius: 22,
    color: "#254A5A",
    background: "#FFFFFF",
    fontWeight: 850,
  },
  itemSummary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 18,
    padding: 18,
    borderRadius: 24,
    background: "#FFFFFF",
    border: "1px solid rgba(8, 37, 53, 0.10)",
  },
  itemTitle: {
    margin: "4px 0 8px",
    color: "#082535",
    fontSize: "clamp(1.7rem, 4vw, 3.2rem)",
    fontWeight: 950,
    fontStyle: "italic",
    lineHeight: 0.95,
    textTransform: "uppercase",
  },
  summaryPills: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  readyPill: {
    padding: "9px 12px",
    borderRadius: 999,
    color: "#16351d",
    background: "rgba(128, 153, 131, 0.32)",
    fontWeight: 950,
  },
  limitedPill: {
    padding: "9px 12px",
    borderRadius: 999,
    color: "#4b3f18",
    background: "rgba(120, 140, 87, 0.35)",
    fontWeight: 950,
  },
  fullPill: {
    padding: "9px 12px",
    borderRadius: 999,
    color: "#4b1820",
    background: "rgba(75, 24, 32, 0.12)",
    fontWeight: 950,
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 14,
  },
  dayCard: {
    minHeight: 250,
    padding: 16,
    display: "grid",
    gap: 10,
    borderRadius: 24,
    border: "1px solid rgba(8, 37, 53, 0.10)",
    boxShadow: "0 18px 48px rgba(8, 37, 53, 0.08)",
  },
  readyCard: {
    background: "linear-gradient(145deg, rgba(128, 153, 131, 0.24), #FFFFFF)",
  },
  limitedCard: {
    background: "linear-gradient(145deg, rgba(120, 140, 87, 0.36), #FFFFFF)",
  },
  fullCard: {
    background: "linear-gradient(145deg, rgba(75, 24, 32, 0.12), #FFFFFF)",
  },
  dayTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
  },
  dayName: {
    color: "#082535",
    fontSize: 13,
    fontWeight: 950,
    textTransform: "uppercase",
  },
  sourceBadge: {
    padding: "6px 9px",
    borderRadius: 999,
    color: "#254A5A",
    background: "rgba(255, 255, 255, 0.72)",
    fontSize: 12,
    fontWeight: 900,
  },
  dateNumber: {
    color: "#082535",
    fontSize: 52,
    lineHeight: 0.9,
    fontWeight: 950,
  },
  month: {
    marginTop: -8,
    color: "#254A5A",
    fontWeight: 900,
  },
  statusRow: {
    display: "grid",
    gap: 2,
  },
  statusText: {
    color: "#082535",
    fontWeight: 950,
    fontSize: 18,
  },
  statusHelper: {
    color: "#254A5A",
    fontWeight: 800,
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
  },
  readyButton: {
    minHeight: 38,
    border: 0,
    borderRadius: 999,
    background: "rgba(128, 153, 131, 0.55)",
    color: "#082535",
    fontWeight: 950,
    cursor: "pointer",
  },
  limitedButton: {
    minHeight: 38,
    border: 0,
    borderRadius: 999,
    background: "rgba(120, 140, 87, 0.55)",
    color: "#082535",
    fontWeight: 950,
    cursor: "pointer",
  },
  fullButton: {
    minHeight: 38,
    border: 0,
    borderRadius: 999,
    background: "rgba(75, 24, 32, 0.18)",
    color: "#4b1820",
    fontWeight: 950,
    cursor: "pointer",
  },
  resetButton: {
    minHeight: 38,
    border: "1px solid rgba(8, 37, 53, 0.14)",
    borderRadius: 999,
    color: "#254A5A",
    background: "#FFFFFF",
    fontWeight: 900,
    cursor: "pointer",
  },
  details: {
    marginTop: 22,
    padding: 16,
    borderRadius: 22,
    background: "rgba(255, 255, 255, 0.72)",
    border: "1px solid rgba(8, 37, 53, 0.10)",
  },
  summary: {
    cursor: "pointer",
    fontWeight: 950,
    color: "#082535",
  },
  addForm: {
    marginTop: 16,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
};