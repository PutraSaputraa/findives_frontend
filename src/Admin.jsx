import { useEffect, useState } from "react";
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

export default function Admin() {
    const [newItem, setNewItem] = useState({
        id: "",
        name: "",
        startPrice: "",
        startUnit: "/ session",
        desc: "",
        badge: "Ready Stock",
        totalStock: 1,
        note: "",
        isActive: true,
        weekly: defaultWeekly,
        });

  const [user, setUser] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [override, setOverride] = useState({
    date: "",
    status: "available",
    note: "",
  });
  const [message, setMessage] = useState("");

  const loadItems = async () => {
    const snapshot = await getDocs(collection(db, "items"));
    const nextItems = snapshot.docs.map((itemDoc) => ({
      id: itemDoc.id,
      ...itemDoc.data(),
    }));

    setItems(nextItems);
    setSelectedItemId(nextItems[0]?.id || "");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await loadItems();
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

  const handleSaveOverride = async (event) => {
    event.preventDefault();

    if (!selectedItemId || !override.date) {
      setMessage("Pilih item dan tanggal dulu.");
      return;
    }

    const documentId = `${selectedItemId}_${override.date}`;

    try {
      await setDoc(doc(db, "availability", documentId), {
        itemId: selectedItemId,
        date: override.date,
        status: override.status,
        note: override.note,
        updatedAt: new Date().toISOString(),
      });

      setMessage("Availability berhasil disimpan.");
    } catch (error) {
      setMessage(`Gagal menyimpan availability: ${error.message}`);
    }
  };

  const handleDeleteOverride = async () => {
    if (!selectedItemId || !override.date) {
      setMessage("Pilih item dan tanggal dulu.");
      return;
    }

    const documentId = `${selectedItemId}_${override.date}`;

    try {
      await deleteDoc(doc(db, "availability", documentId));
      setMessage("Override tanggal berhasil dihapus.");
    } catch (error) {
      setMessage(`Gagal menghapus override: ${error.message}`);
    }
  };

  const handleSaveItem = async (item) => {
    try {
      await setDoc(
        doc(db, "items", item.id),
        {
          name: item.name,
          startPrice: item.startPrice,
          startUnit: item.startUnit,
          desc: item.desc,
          badge: item.badge,
          totalStock: Number(item.totalStock || 1),
          note: item.note || "",
          isActive: item.isActive !== false,
          weekly: item.weekly || defaultWeekly,
        },
        { merge: true }
      );

      setMessage("Item berhasil diupdate.");
      await loadItems();
    } catch (error) {
      setMessage(`Gagal update item: ${error.message}`);
    }
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    setMessage("");

    const cleanId = newItem.id
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    if (!cleanId || !newItem.name || !newItem.startPrice) {
        setMessage("ID item, nama, dan harga mulai wajib diisi.");
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
        weekly: newItem.weekly || defaultWeekly,
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
        isActive: true,
        weekly: defaultWeekly,
        });

        await loadItems();
    } catch (error) {
        setMessage(`Gagal menambahkan item: ${error.message}`);
    }
    };

  if (!user) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <h1>findive.id Admin</h1>
          <p>Login untuk mengubah data item dan availability.</p>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Email admin"
              value={login.email}
              onChange={(event) => setLogin({ ...login, email: event.target.value })}
              required
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(event) => setLogin({ ...login, password: event.target.value })}
              required
              style={styles.input}
            />

            <button style={styles.button}>Login</button>
          </form>

          {message && <p>{message}</p>}
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.header}>
          <div>
            <h1>Admin Dashboard</h1>
            <p>{user.email}</p>
          </div>

          <button style={styles.secondaryButton} onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>

        {message && <p style={styles.message}>{message}</p>}

        <h2>Update Item</h2>

        <div style={styles.grid}>
          {items.map((item) => (
            <article key={item.id} style={styles.itemCard}>
              <h3>{item.name}</h3>
              <p>{item.id}</p>

              <label>
                Nama
                <input
                  style={styles.input}
                  value={item.name || ""}
                  onChange={(event) =>
                    setItems((prev) =>
                      prev.map((current) =>
                        current.id === item.id
                          ? { ...current, name: event.target.value }
                          : current
                      )
                    )
                  }
                />
              </label>

              <label>
                Harga mulai
                <input
                  style={styles.input}
                  value={item.startPrice || ""}
                  onChange={(event) =>
                    setItems((prev) =>
                      prev.map((current) =>
                        current.id === item.id
                          ? { ...current, startPrice: event.target.value }
                          : current
                      )
                    )
                  }
                />
              </label>

              <label>
                Total stok
                <input
                  type="number"
                  style={styles.input}
                  value={item.totalStock || 1}
                  onChange={(event) =>
                    setItems((prev) =>
                      prev.map((current) =>
                        current.id === item.id
                          ? { ...current, totalStock: event.target.value }
                          : current
                      )
                    )
                  }
                />
              </label>

              <label>
                Note
                <textarea
                  style={styles.textarea}
                  value={item.note || ""}
                  onChange={(event) =>
                    setItems((prev) =>
                      prev.map((current) =>
                        current.id === item.id
                          ? { ...current, note: event.target.value }
                          : current
                      )
                    )
                  }
                />
              </label>

              <button style={styles.button} onClick={() => handleSaveItem(item)}>
                Simpan Item
              </button>
            </article>
          ))}
        </div>

        <h2>Set Availability Tanggal Tertentu</h2>

        <form onSubmit={handleSaveOverride} style={styles.form}>
          <select
            style={styles.input}
            value={selectedItemId}
            onChange={(event) => setSelectedItemId(event.target.value)}
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} - {item.id}
              </option>
            ))}
          </select>

          <input
            type="date"
            style={styles.input}
            value={override.date}
            onChange={(event) => setOverride({ ...override, date: event.target.value })}
            required
          />

          <select
            style={styles.input}
            value={override.status}
            onChange={(event) => setOverride({ ...override, status: event.target.value })}
          >
            <option value="available">Available</option>
            <option value="limited">Limited</option>
            <option value="unavailable">Full Booked</option>
          </select>

          <textarea
            style={styles.textarea}
            placeholder="Catatan, opsional"
            value={override.note}
            onChange={(event) => setOverride({ ...override, note: event.target.value })}
          />

          <button style={styles.button}>Simpan Availability</button>

          <button type="button" style={styles.dangerButton} onClick={handleDeleteOverride}>
            Hapus Override Tanggal Ini
          </button>
        </form>
        <h2>Tambah Item Baru</h2>
        <form onSubmit={handleAddItem} style={styles.form}>
        <label>
            ID Item
            <input
            style={styles.input}
            placeholder="contoh: short-fins-anak"
            value={newItem.id}
            onChange={(event) => setNewItem({ ...newItem, id: event.target.value })}
            required
            />
        </label>

        <label>
            Nama Item
            <input
            style={styles.input}
            placeholder="contoh: Short Fins Anak"
            value={newItem.name}
            onChange={(event) => setNewItem({ ...newItem, name: event.target.value })}
            required
            />
        </label>

        <label>
            Badge
            <input
            style={styles.input}
            placeholder="contoh: New Arrival"
            value={newItem.badge}
            onChange={(event) => setNewItem({ ...newItem, badge: event.target.value })}
            />
        </label>

        <label>
            Harga Mulai
            <input
            style={styles.input}
            placeholder="contoh: 20K"
            value={newItem.startPrice}
            onChange={(event) => setNewItem({ ...newItem, startPrice: event.target.value })}
            required
            />
        </label>

        <label>
            Satuan Harga
            <input
            style={styles.input}
            placeholder="contoh: / session"
            value={newItem.startUnit}
            onChange={(event) => setNewItem({ ...newItem, startUnit: event.target.value })}
            />
        </label>

        <label>
            Total Stok
            <input
            type="number"
            min="1"
            style={styles.input}
            value={newItem.totalStock}
            onChange={(event) => setNewItem({ ...newItem, totalStock: event.target.value })}
            />
        </label>

        <label>
            Deskripsi
            <textarea
            style={styles.textarea}
            placeholder="Deskripsi item"
            value={newItem.desc}
            onChange={(event) => setNewItem({ ...newItem, desc: event.target.value })}
            />
        </label>

        <label>
            Note Availability
            <textarea
            style={styles.textarea}
            placeholder="Catatan stok atau availability"
            value={newItem.note}
            onChange={(event) => setNewItem({ ...newItem, note: event.target.value })}
            />
        </label>

        <button style={styles.button}>Tambah Item</button>
        </form>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: 24,
    background: "#082535",
    color: "#082535",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  card: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 24,
    borderRadius: 24,
    background: "#D4E1E7",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
    flexWrap: "wrap",
  },
  form: {
    display: "grid",
    gap: 12,
    marginTop: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
  },
  itemCard: {
    display: "grid",
    gap: 10,
    padding: 16,
    borderRadius: 18,
    background: "#fff",
  },
  input: {
    width: "100%",
    minHeight: 44,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(8, 37, 53, 0.18)",
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(8, 37, 53, 0.18)",
  },
  button: {
    minHeight: 46,
    border: 0,
    borderRadius: 999,
    color: "#fff",
    background: "#254A5A",
    fontWeight: 800,
    cursor: "pointer",
  },
  secondaryButton: {
    minHeight: 42,
    padding: "0 16px",
    border: 0,
    borderRadius: 999,
    color: "#082535",
    background: "#809983",
    fontWeight: 800,
    cursor: "pointer",
  },
  dangerButton: {
    minHeight: 46,
    border: 0,
    borderRadius: 999,
    color: "#fff",
    background: "#7f1d1d",
    fontWeight: 800,
    cursor: "pointer",
  },
  message: {
    padding: 12,
    borderRadius: 12,
    background: "#fff",
  },
};