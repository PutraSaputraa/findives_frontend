import { useEffect, useState } from "react";
import heroVideo from "./assets/cinematic.MOV?url";
import equipmentPoster from "./assets/Frame 60.png";
import longFinsImage from "./assets/Frame 91.png";
import maskImage from "./assets/Frame 92.png";
import insta360 from "./assets/Frame 93.png";

const WHATSAPP_NUMBER = "6285799759626";

const fallbackEquipment  = [
  {
    id: "long-fins-premium",
    name: "Long Fins premium",
    startPrice: "35k",
    startUnit: "/ 1 session",
    desc: "Long fins untuk latihan renang, freediving basic, dan pengalaman berenang lebih powerful.",
    badge: "Most Popular",
    image: longFinsImage,
    pricing: [
      {
        title: "Per Session",
        items: [
          ["session", "35k"],
        ],
      },
      {
        title: "Per Hari",
        items: [
          ["1 hari", "125k"],
        ],
      },
    ],
  },
  {
    id: "long-fins-basic",
    name: "Long Fins Basic",
    startPrice: "35k",
    startUnit: "/ 1 session",
    desc: "Long fins untuk latihan renang, freediving basic, dan pengalaman berenang lebih powerful.",
    badge: "Most Popular",
    image: longFinsImage,
    pricing: [
      {
        title: "Per Session",
        items: [
          ["session", "35K"],
        ],
      },
      {
        title: "Per Hari",
        items: [
          ["1 hari", "70k"],
        ],
      },
    ],
  },
  {
    id: "snorkeling-mask",
    name: "Snorkeling Mask",
    startPrice: "15K",
    startUnit: "/ session",
    desc: "Mask nyaman untuk snorkeling ringan, latihan di kolam, dan kebutuhan basic underwater.",
    badge: "Ready Stock",
    image: maskImage,
    pricing: [
      {
        title: "Per Session",
        items: [
          ["session", "15K"],
        ],
      },
    ],
  },
  {
    id: "low-volume-mask",
    name: "Low Volume Mask",
    startPrice: "20K",
    startUnit: "/ session",
    desc: "Mask low volume untuk pengalaman underwater yang lebih nyaman dan compact.",
    badge: "Compact Fit",
    image: maskImage,
    pricing: [
      {
        title: "Per Session",
        items: [
          ["session", "20K"],
        ],
      },
    ],
  },
  {
    id: "insta360",
    name: "Insta360",
    startPrice: "150K",
    startUnit: "/ 1 jam",
    desc: "Camera 360 derajat untuk merekam pengalaman underwater yang unik.",
    badge: "New Arrival",
    image: insta360,
    pricing: [
      {
        title: "Per Jam",
        items: [
          ["3 jam", "150K"],
          ["6 jam", "225K"],
          ["9 jam", "275K"],
          ["12 jam", "300K"],
        ],
      },
    ],
  },
];


export default function App() {
  const equipmentData = fallbackEquipment;
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (menuOpen) {
        setNavbarHidden(false);
        return;
      }

      if (currentScrollY < 80) {
        setNavbarHidden(false);
      } else {
        setNavbarHidden(isScrollingDown);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  const openWhatsApp = (message) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  useEffect(() => {
    if (!selectedEquipment) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedEquipment(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEquipment]);

  const navItems = [
    ["Home", "#home"],
    ["Pricelist", "#equipment"],
  ];

  return (
    <main className="findive-page">
      <style>{css}</style>

      <nav className={`navbar ${navbarHidden ? "navbar-hidden" : ""}`}>
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          findive.id
        </a>

        <button
          className={`hamburger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button
            className="nav-cta"
            onClick={() =>
              openWhatsApp("Halo findive.id, saya ingin bertanya tentang sewa Long Fins dan Dive Mask.")
            }
          >
            Rent Now
          </button>
        </div>
      </nav>

      <section id="home" className="hero">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="hero-content">

          <p className="hero-subtitle">Sewa Long Fins & Dive Mask di Kolam Renang FIK-UNY</p>
          <p className="hero-copy">Just come and rent on the spot.</p>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() =>
                openWhatsApp("Halo findive.id, saya ingin bertanya tentang sewa Long Fins dan Dive Mask.")
              }
            >
              Booking via WhatsApp
            </button>
          </div>
        </div>
      </section>

      <section className="section equipment" id="equipment">
        <div className="section-head">
          <h2>OUR EQUIPMENT</h2>
          <p>AVAILABLE TO RENT</p>
        </div>

        <div className="equipment-grid">
          {equipmentData.map((item) => (
            <article className="equipment-card" key={item.id}>
              <div className="equipment-image" style={{ backgroundImage: `url(${item.image})` }}>
                <span>{item.badge}</span>
              </div>
              <div className="equipment-body">
                <h3>{item.name}</h3>
                <span className="price-label">Mulai dari</span>
                <p className="price">
                  {item.startPrice} <small>{item.startUnit}</small>
                </p>
                <p>{item.desc}</p>
                <div className="equipment-actions">
                  <button onClick={() => setSelectedEquipment(item)}>
                    View Price Detail
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedEquipment && (
        <div className="modal-backdrop" onClick={() => setSelectedEquipment(null)}>
          <div
            className="price-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="price-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedEquipment(null)}
              aria-label="Close price detail"
            >
              x
            </button>

            <div
              className="modal-image"
              style={{ backgroundImage: `url(${selectedEquipment.image})` }}
            >
              <span>{selectedEquipment.badge}</span>
            </div>

            <div className="modal-content">
              <p className="modal-kicker">PRICE DETAIL</p>
              <h3 id="price-modal-title">{selectedEquipment.name}</h3>
              <p className="modal-desc">{selectedEquipment.desc}</p>

              <div className="modal-price-grid">
                {selectedEquipment.pricing.map((group) => (
                  <div className="modal-price-group" key={group.title}>
                    <h4>{group.title}</h4>
                    {group.items.map(([label, price]) => (
                      <div className="modal-price-row" key={label}>
                        <span>{label}</span>
                        <strong>{price}</strong>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                <button
                  className="primary-btn"
                  onClick={() =>
                    openWhatsApp(`Halo findive.id, saya ingin sewa ${selectedEquipment.name}.`)
                  }
                >
                  Booking via WhatsApp
                </button>
                <button className="secondary-modal-btn" onClick={() => setSelectedEquipment(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <h2>findive.id</h2>
        <p>Long Fins & Dive Mask Rental</p>
        <p>Kolam Renang FIK-UNY, Yogyakarta</p>
        <div>
          <button
            onClick={() =>
              openWhatsApp("Halo findive.id, saya ingin bertanya tentang sewa Long Fins dan Dive Mask.")
            }
          >
            WhatsApp
          </button>
          <a href="https://www.instagram.com/findive.id" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
        <small>Copyright 2026 findive.id. All rights reserved.</small>
      </footer>

      <button
        className="floating-wa"
        onClick={() =>
          openWhatsApp("Halo findive.id, saya ingin bertanya tentang sewa Long Fins dan Dive Mask.")
        }
        aria-label="Chat WhatsApp"
      >
        WA
      </button>
    </main>
  );
}

const css = `
:root {
  --deep-navy: #082535;
  --dark-teal: #254A5A;
  --olive-green: #788C57;
  --sage-green: #809983;
  --pale-blue-gray: #D4E1E7;
  --white: #FFFFFF;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  overflow-x: hidden;
  background: var(--pale-blue-gray);
  color: var(--deep-navy);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

.findive-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--deep-navy);
  background:
    radial-gradient(circle at top left, rgba(120, 140, 87, 0.18), transparent 30rem),
    radial-gradient(circle at top right, rgba(37, 74, 90, 0.16), transparent 34rem),
    linear-gradient(180deg, var(--pale-blue-gray) 0%, var(--white) 38%, var(--pale-blue-gray) 100%);
}

.navbar {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  min-height: 58px;
  padding: 8px clamp(16px, 3vw, 44px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(8, 37, 53, 0.94);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(212, 225, 231, 0.16);
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.32s ease, opacity 0.32s ease;
  will-change: transform;
}

.navbar-hidden {
  transform: translateY(-110%);
  opacity: 0;
  pointer-events: none;
}

.brand {
  color: var(--white);
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-links a,
.nav-cta {
  min-height: 38px;
  padding: 8px 14px;
  color: var(--pale-blue-gray);
  text-decoration: none;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
}

.nav-cta {
  color: white;
  font-weight: 800;
  background: var(--sage-green);
  padding-inline: 18px;
}

.hamburger {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(212, 225, 231, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
}

.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  margin: 4px auto;
  border-radius: 999px;
  background: var(--white);
  transition: 0.25s ease;
}

.hamburger.is-open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.hamburger.is-open span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

.hero {
  position: relative;
  min-height: 100svh;
  padding: 86px 18px 56px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--deep-navy);
}

.hero::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 180px;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(8, 37, 53, 0) 0%,
    rgba(8, 37, 53, 0.18) 32%,
    rgba(212, 225, 231, 0.72) 72%,
    var(--pale-blue-gray) 100%
  );
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(1120px, 100%);
  margin: 0 auto;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: min(1120px, 100%);
  margin: 0 auto;
}

.hero h1,
.section-head h2 {
  margin: 0;
  font-weight: 950;
  font-style: italic;
  line-height: 0.9;
  letter-spacing: 0;
  text-transform: uppercase;
}

.hero h1 {
  color: var(--white);
}

.section-head h2 {
  color: var(--deep-navy);
}

.hero h1 {
  max-width: 850px;
  font-size: clamp(3.35rem, 14vw, 9.4rem);
}

.hero-subtitle {
  max-width: 640px;
  margin: 24px 0 0;
  color: var(--white);
  font-size: clamp(1.28rem, 4vw, 2.3rem);
  font-weight: 800;
}

.hero-copy {
  margin: 12px 0 0;
  color: var(--pale-blue-gray);
  font-size: clamp(1rem, 3vw, 1.25rem);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.primary-btn,
.secondary-btn,
.equipment-body button {
  min-height: 48px;
  padding: 14px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 900;
}

.primary-btn {
  color: var(--white);
  background: var(--dark-teal);
  box-shadow: 0 18px 44px rgba(8, 37, 53, 0.2);
}

.secondary-btn {
  color: var(--white);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(212, 225, 231, 0.22);
}

.section {
  width: min(1160px, calc(100% - 32px));
  margin: 0 auto;
  padding: 82px 0;
}

.section-head {
  margin-bottom: 30px;
}

.section-head h2 {
  margin-top: 12px;
  font-size: clamp(2.45rem, 10vw, 6rem);
}

.equipment .section-head h2 {
  font-size: clamp(2rem, 6.5vw, 4.1rem);
}

.section-head p:not(.eyebrow) {
  margin: 10px 0 0;
  color: var(--dark-teal);
  font-weight: 850;
  letter-spacing: 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.about-text {
  margin: 0;
  padding: clamp(22px, 5vw, 38px);
  border-radius: 28px;
  color: var(--dark-teal);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(212, 225, 231, 0.68));
  border: 1px solid rgba(37, 74, 90, 0.1);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.7;
  box-shadow: 0 24px 70px rgba(8, 37, 53, 0.11);
}

.highlight-grid,
.equipment-grid,
.pricing-grid {
  display: grid;
  gap: 16px;
}

.highlight-grid {
  grid-template-columns: 1fr;
}

.highlight-card {
  padding: 22px;
  display: flex;
  gap: 14px;
  align-items: center;
  border-radius: 24px;
  background: rgba(212, 225, 231, 0.92);
  color: var(--deep-navy);
}

.highlight-card:nth-child(even) {
  background: rgba(128, 153, 131, 0.96);
  color: var(--white);
}

.highlight-card span {
  flex: 0 0 auto;
  width: 14px;
  height: 42px;
  border-radius: 999px;
  background: var(--olive-green);
}

.highlight-card p {
  margin: 0;
  font-weight: 900;
}

.equipment {
  width: 100%;
  padding-inline: max(16px, calc((100% - 1160px) / 2));
  background:
    linear-gradient(180deg, var(--pale-blue-gray) 0%, rgba(212, 225, 231, 0.96) 24%, rgba(255, 255, 255, 0.9) 100%),
    url("${equipmentPoster}") center / cover;
}

.equipment-grid {
  grid-template-columns: 1fr;
}

.equipment-card {
  overflow: hidden;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(37, 74, 90, 0.12);
  box-shadow: 0 24px 80px rgba(8, 37, 53, 0.14);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.equipment-card:hover {
  transform: translateY(-7px);
  border-color: rgba(37, 74, 90, 0.26);
}

.equipment-image {
  min-height: 220px;
  padding: 18px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  background-size: cover;
  background-position: center;
}

.equipment-image span,
.pricing-card span {
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--white);
  background: var(--dark-teal);
  font-size: 0.78rem;
  font-weight: 950;
}

.equipment-body {
  padding: 22px;
}

.equipment-body h3 {
  margin: 0;
  color: var(--deep-navy);
  font-size: 1.45rem;
}

.price-label {
  display: inline-block;
  margin-top: 14px;
  color: var(--olive-green);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.price {
  margin: 6px 0 12px;
  color: var(--dark-teal);
  font-size: 2.7rem;
  line-height: 1;
  font-weight: 950;
}

.price small {
  color: var(--dark-teal);
  font-size: 0.9rem;
  font-weight: 700;
}

.equipment-body p:not(.price) {
  min-height: 76px;
  color: var(--dark-teal);
  line-height: 1.55;
}

.equipment-body button {
  width: 100%;
  color: var(--white);
  background: var(--olive-green);
}


.equipment-actions {
  display: grid;
  gap: 10px;
}

.outline-card-btn {
  color: var(--deep-navy) !important;
  background: transparent !important;
  border: 1px solid rgba(37, 74, 90, 0.22) !important;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  padding: 16px;
  display: grid;
  place-items: center;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(14px);
}

.price-modal {
  position: relative;
  width: min(940px, 100%);
  max-height: min(90svh, 760px);
  overflow: auto;
  display: grid;
  grid-template-columns: 0.88fr 1.12fr;
  border-radius: 30px;
  background: var(--pale-blue-gray);
  border: 1px solid rgba(212, 225, 231, 0.42);
  box-shadow: 0 30px 90px rgba(8, 37, 53, 0.38);
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  color: var(--white);
  background: rgba(8, 37, 53, 0.82);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 950;
  line-height: 1;
}

.modal-image {
  min-height: 100%;
  padding: 18px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-size: cover;
  background-position: center;
}

.modal-image span {
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--white);
  background: var(--dark-teal);
  font-size: 0.78rem;
  font-weight: 950;
}

.modal-content {
  padding: clamp(24px, 5vw, 38px);
  background:
    radial-gradient(circle at top right, rgba(152, 187, 215, 0.34), transparent 16rem),
    var(--white);
}

.modal-kicker {
  margin: 0 0 8px;
  color: var(--olive-green);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.1em;
}

.modal-content h3 {
  margin: 0;
  color: var(--deep-navy);
  font-size: clamp(2rem, 6vw, 3.4rem);
  font-style: italic;
  line-height: 0.95;
  text-transform: uppercase;
}

.modal-desc {
  margin: 14px 0 0;
  color: var(--dark-teal);
  line-height: 1.6;
}

.modal-price-grid {
  margin-top: 22px;
  display: grid;
  gap: 12px;
}

.modal-price-group {
  padding: 16px;
  border-radius: 22px;
  background: var(--pale-blue-gray);
  border: 1px solid rgba(37, 74, 90, 0.12);
}

.modal-price-group h4 {
  margin: 0 0 12px;
  color: var(--deep-navy);
  font-size: 1rem;
  text-transform: uppercase;
}

.modal-price-row {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border-top: 1px solid rgba(37, 74, 90, 0.12);
  color: var(--dark-teal);
}

.modal-price-row:first-of-type {
  border-top: 0;
}

.modal-price-row strong {
  color: var(--deep-navy);
  font-size: 1.15rem;
}

.modal-actions {
  margin-top: 22px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.secondary-modal-btn {
  min-height: 48px;
  padding: 14px 20px;
  border-radius: 999px;
  border: 1px solid rgba(37, 74, 90, 0.18);
  color: var(--dark-teal);
  background: var(--white);
  cursor: pointer;
  font-weight: 900;
}

.pricelist {
  width: 100%;
  padding-inline: max(16px, calc((100% - 1160px) / 2));
  background: linear-gradient(180deg, var(--pale-blue-gray), var(--white));
}

.pricing-grid {
  grid-template-columns: 1fr;
}

.pricing-card {
  padding: 28px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(37, 74, 90, 0.12);
  box-shadow: 0 22px 60px rgba(8, 37, 53, 0.1);
}

.pricing-card:nth-child(2) span {
  background: var(--sage-green);
  color: var(--white);
}

.pricing-card h3 {
  margin: 26px 0 0;
  color: var(--dark-teal);
  font-size: clamp(4rem, 16vw, 6.4rem);
  line-height: 0.85;
}

.pricing-card p {
  margin: 8px 0 22px;
  color: var(--dark-teal);
  font-weight: 800;
}

.pricing-card small {
  color: var(--dark-teal);
  line-height: 1.6;
}

.note {
  margin: 22px auto 0;
  max-width: 760px;
  color: var(--dark-teal);
  text-align: center;
  line-height: 1.7;
}

.terms {
  width: 100%;
  padding-inline: max(16px, calc((100% - 1160px) / 2));
  background:
    radial-gradient(circle at top left, rgba(120, 140, 87, 0.24), transparent 28rem),
    linear-gradient(180deg, var(--deep-navy), var(--dark-teal));
}

.terms .section-head h2 {
  color: var(--white);
}

.step-grid {
  display: grid;
  gap: 18px;
}

.step-card {
  padding: 18px;
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 16px;
  align-items: center;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  color: var(--deep-navy);
}

.step-card b {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--white);
  background: var(--dark-teal);
  font-size: 1.6rem;
}

.step-card p {
  margin: 0;
  font-size: clamp(1rem, 4vw, 1.55rem);
  font-weight: 900;
  font-style: italic;
}

.rules {
  margin-top: 24px;
  display: grid;
  gap: 10px;
}

.rules p {
  margin: 0;
  padding: 15px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.42);
  color: var(--deep-navy);
}

.howto-list {
  display: grid;
  gap: 12px;
}

.howto-item {
  padding: 16px;
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 14px;
  align-items: center;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(37, 74, 90, 0.1);
  box-shadow: 0 18px 44px rgba(8, 37, 53, 0.08);
}

.howto-item span {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: var(--sage-green);
  color: var(--white);
  font-weight: 950;
}

.howto-item p {
  margin: 0;
  color: var(--deep-navy);
  font-weight: 800;
}

.location {
  display: grid;
  gap: 24px;
  align-items: center;
}

.location h2 {
  margin: 12px 0;
  font-size: clamp(2.1rem, 8vw, 4.5rem);
  line-height: 0.98;
  text-transform: uppercase;
  font-style: italic;
}

.location p {
  color: var(--dark-teal);
}

.map-card {
  min-height: 360px;
  padding: 22px;
  display: flex;
  align-items: flex-end;
  border-radius: 30px;
  background:
    radial-gradient(circle at 20% 20%, rgba(152, 187, 215, 0.24), transparent 16rem),
    radial-gradient(circle at 84% 12%, rgba(128, 153, 131, 0.26), transparent 14rem),
    linear-gradient(145deg, var(--deep-navy), var(--dark-teal));
  box-shadow: 0 24px 70px rgba(8, 37, 53, 0.16);
}

.map-card div {
  width: 100%;
  padding: 20px;
  border-radius: 24px;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(14px);
}

.map-card span,
.map-card strong {
  display: block;
}

.map-card span {
  color: var(--pale-blue-gray);
  font-weight: 950;
}

.map-card strong {
  margin-top: 6px;
  font-size: 1.2rem;
}

.booking {
  width: 100%;
  padding-inline: max(16px, calc((100% - 960px) / 2));
  background: linear-gradient(180deg, var(--pale-blue-gray), var(--white));
}

.booking-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  padding: clamp(16px, 4vw, 28px);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(37, 74, 90, 0.12);
  box-shadow: 0 24px 70px rgba(8, 37, 53, 0.12);
}

.booking-form input,
.booking-form select,
.booking-form textarea {
  width: 100%;
  min-height: 52px;
  border: 1px solid rgba(8, 37, 53, 0.12);
  border-radius: 18px;
  padding: 14px 16px;
  color: var(--deep-navy);
  background: var(--white);
  outline: none;
}

.booking-form textarea {
  min-height: 128px;
  resize: vertical;
}

.booking-form input:focus,
.booking-form select:focus,
.booking-form textarea:focus {
  border-color: var(--dark-teal);
  box-shadow: 0 0 0 4px rgba(37, 74, 90, 0.18);
}

.form-submit {
  width: 100%;
}

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-item {
  overflow: hidden;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(37, 74, 90, 0.12);
  box-shadow: 0 18px 44px rgba(8, 37, 53, 0.08);
}

.faq-item button {
  width: 100%;
  min-height: 58px;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border: 0;
  color: var(--deep-navy);
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-weight: 900;
}

.faq-item button span {
  color: var(--dark-teal);
  font-size: 1.4rem;
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}

.faq-answer.open {
  grid-template-rows: 1fr;
}

.faq-answer p {
  overflow: hidden;
  margin: 0;
  padding: 0 18px 18px;
  color: var(--dark-teal);
  line-height: 1.65;
}

footer {
  padding: 56px 18px 96px;
  text-align: center;
  background: var(--deep-navy);
  border-top: 1px solid rgba(212, 225, 231, 0.1);
}

footer h2 {
  margin: 0 0 8px;
  font-size: 2rem;
}

footer p {
  margin: 8px 0;
  color: var(--pale-blue-gray);
}

footer div {
  margin: 18px 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

footer button,
footer a {
  min-height: 44px;
  padding: 12px 16px;
  border-radius: 999px;
  border: 1px solid rgba(212, 225, 231, 0.18);
  color: var(--white);
  background: rgba(37, 74, 90, 0.72);
  text-decoration: none;
  cursor: pointer;
}

footer small {
  color: rgba(212, 225, 231, 0.7);
}

.floating-wa {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 60;
  width: 58px;
  height: 58px;
  border: 0;
  border-radius: 50%;
  color: var(--white);
  background: var(--dark-teal);
  font-weight: 950;
  box-shadow: 0 18px 44px rgba(8, 37, 53, 0.34);
  cursor: pointer;
}

@media (max-width: 820px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 10px);
    left: 16px;
    right: 16px;
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 14px;
    border-radius: 24px;
    background: rgba(8, 37, 53, 0.96);
    border: 1px solid rgba(212, 225, 231, 0.14);
    box-shadow: 0 24px 60px rgba(8, 37, 53, 0.35);
  }

  .nav-links.show {
    display: flex;
  }

  .nav-links a,
  .nav-cta {
    width: 100%;
    border-radius: 16px;
    text-align: left;
  }

  .hero-actions,
  .hero-actions a,
  .hero-actions button {
    width: 100%;
  }

  .hero-badges span {
    max-width: 100%;
  }

  .price-modal {
    grid-template-columns: 1fr;
    border-radius: 24px;
  }

  .modal-image {
    min-height: 220px;
  }

  .modal-actions,
  .modal-actions .primary-btn,
  .secondary-modal-btn {
    width: 100%;
  }
}

@media (min-width: 640px) {
  .highlight-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .equipment-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .booking-form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .booking-form textarea,
  .form-submit {
    grid-column: 1 / -1;
  }
}

@media (min-width: 900px) {
  .about-grid,
  .location {
    grid-template-columns: 0.9fr 1.1fr;
  }

  .equipment-grid,
  .pricing-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .step-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .step-card {
    grid-template-columns: 1fr;
    align-content: start;
  }
}

@media (max-width: 380px) {
  .hero {
    padding-inline: 14px;
  }

  .hero h1 {
    font-size: clamp(3rem, 18vw, 4.4rem);
  }

  .section {
    width: min(100% - 24px, 1160px);
  }

  .section-head h2 {
    font-size: clamp(2.15rem, 13vw, 3.2rem);
  }

  .step-card {
    grid-template-columns: 56px 1fr;
    border-radius: 22px;
  }

  .step-card b {
    width: 52px;
    height: 52px;
  }
}
  


`;
