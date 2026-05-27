import { useEffect, useRef, useState } from "react";
import cinematic1 from "./assets/cinematic1.MOV?url";
import cinematic2 from "./assets/cinematic2.MOV?url";
import cinematic3 from "./assets/cinematic3.MOV?url";
import equipmentPoster from "./assets/Frame 60.png";
import insta360 from "./assets/Frame 93.png";
import testi1 from "./assets/testi1.jpg";
import testi2 from "./assets/testi2.jpg";
import testi3 from "./assets/testi3.jpg";

const WHATSAPP_NUMBER = "62895421909289";

const heroSlides = [
  {
    video: cinematic1,
    subtitle: "Sewa Long Fins & Dive Mask di Kolam Renang FIK-UNY",
    copy: "Just come and rent on the spot.",
    buttonLabel: "Booking via WhatsApp",
    whatsappMessage:
      "Halo findive.id, saya ingin bertanya tentang sewa Long Fins dan Dive Mask.",
  },
  {
    video: cinematic2,
    subtitle: "Latihan underwater lebih nyaman dengan equipment yang siap pakai",
    copy: "Pilih fins dan mask sesuai kebutuhan sesi kamu.",
    buttonLabel: "Cek Equipment",
    whatsappMessage:
      "Halo findive.id, saya ingin cek ketersediaan equipment untuk latihan underwater.",
  },
  {
    video: cinematic3,
    subtitle: "Dokumentasikan momen underwater dengan paket Insta360",
    copy: "Cocok untuk konten, trip, dan sesi seru di air.",
    buttonLabel: "Tanya Paket Insta360",
    whatsappMessage:
      "Halo findive.id, saya ingin bertanya tentang paket Insta360 underwater.",
  },
];

const pricingTabs = [
  {
    id: "on-the-spot",
    label: "On The Spot",
    eyebrow: "Kolam Renang",
    title: "Persewaan di Kolam Renang",
    desc: "Harga per sesi untuk sewa langsung di tempat.",
    items: [
      {
        name: "Semua Fin",
        detail: "Long fins premium",
        price: "35K",
        unit: "/ session",
      },
      {
        name: "Snorkeling Mask",
        detail: "Mask nyaman untuk snorkeling ringan",
        price: "15K",
        unit: "/ session",
      },
      {
        name: "Low Volume Mask",
        detail: "Mask compact untuk underwater practice",
        price: "20K",
        unit: "/ session",
      },
    ],
  },
  {
    id: "daily",
    label: "Per Hari",
    eyebrow: "Luar Kolam",
    title: "Persewaan di Luar Kolam Renang",
    desc: "Harga per hari untuk pemakaian di luar area kolam renang.",
    items: [
      {
        name: "Long Fins Premium",
        detail: "Sewa harian untuk fin premium",
        price: "125K",
        unit: "/ hari",
      },
    ],
  },
  {
    id: "package",
    label: "Paket Insta360",
    eyebrow: "Paket",
    title: "Insta360 X5 Price List",
    desc: "Paket untuk Kolam Renang UNY dan Umbul Ponggok.",
    items: [
      {
        name: "Insta360 X5 + Dive Case + Selfie Stick + Videographer + Long Fins Fiberglass",
        detail: "Paket lengkap dengan dokumentasi dan fins fiberglass",
        price: "350K",
        unit: "/ sesi",
      },
      {
        name: "Insta360 X5 + Dive Case + Selfie Stick + Videographer + Long Fins Wave",
        detail: "Paket dokumentasi dengan long fins wave",
        price: "250K",
        unit: "/ sesi",
      },
      {
        name: "Insta360 X5 + Dive Case + Selfie Stick",
        detail: "3 jam",
        price: "150K",
      },
      {
        name: "Insta360 X5 + Dive Case + Selfie Stick",
        detail: "6 jam",
        price: "225K",
      },
      {
        name: "Insta360 X5 + Dive Case + Selfie Stick",
        detail: "9 jam",
        price: "275K",
      },
      {
        name: "Insta360 X5 + Dive Case + Selfie Stick",
        detail: "12 jam",
        price: "300K",
      },
    ],
  },
];

const pricingCards = pricingTabs.flatMap((tab) =>
  tab.items.map((item, index) => ({
    id: `${tab.id}-${index}`,
    tabId: tab.id,
    category: tab.label,
    name: item.name,
    desc: item.detail,
    price: item.price,
    unit: item.unit,
    image: insta360,
  }))
);



const testimonials = [
  {
    id: "testi-1",
    name: "Raka",
    role: "Freediving Beginner",
    label: "On The Spot Rental",
    text: "Sewanya praktis, tinggal datang ke kolam dan alatnya langsung siap dipakai. Fins-nya nyaman buat latihan.",
    image: testi1,
  },
  {
    id: "testi-2",
    name: "Naya",
    role: "Snorkeling Trip",
    label: "Daily Rental",
    text: "Mask dan fins bersih, ukuran juga pas. Cocok banget buat yang butuh alat dadakan untuk trip singkat.",
    image: testi2,
  },
  {
    id: "testi-3",
    name: "Dimas",
    role: "Underwater Content",
    label: "Insta360 Package",
    text: "Paket Insta360-nya worth it. Hasil dokumentasi underwater jadi lebih cinematic dan gampang buat konten.",
    image: testi3,
  },
];

const faqs = [
  {
    id: "faq-1",
    question: "Apakah bisa sewa langsung di kolam?",
    answer: "Bisa. Untuk penyewaan on the spot, kamu bisa langsung datang ke area kolam dan memilih alat yang tersedia saat itu.",
  },
  {
    id: "faq-2",
    question: "Apakah perlu booking terlebih dahulu?",
    answer: "Booking disarankan supaya alat yang kamu butuhkan bisa disiapkan lebih dulu, terutama saat akhir pekan atau jam ramai.",
  },
  {
    id: "faq-3",
    question: "Apa saja alat yang bisa disewa?",
    answer: "Saat ini tersedia long fins basic, long fins premium, snorkeling mask, low volume mask, dan paket dokumentasi Insta360.",
  },
  {
    id: "faq-4",
    question: "Apakah alat boleh dibawa ke luar kolam?",
    answer: "Boleh untuk item tertentu dengan sistem sewa harian. Detail harga dan ketersediaan bisa ditanyakan langsung lewat WhatsApp.",
  },
  {
    id: "faq-5",
    question: "Bagaimana cara menghubungi findive.id?",
    answer: "Kamu bisa klik tombol WhatsApp di halaman ini untuk bertanya stok alat, harga, jadwal, atau kebutuhan sewa lainnya.",
  },
];

export default function App() {
  const heroVideoRefs = useRef([]);
  const [activePricingTab, setActivePricingTab] = useState(pricingTabs[0].id);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);
  const [heroVideoProgress, setHeroVideoProgress] = useState(0);

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

  useEffect(() => {
    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4500);

    return () => {
      window.clearInterval(testimonialTimer);
    };
  }, []);

  useEffect(() => {
    heroVideoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeHeroVideo) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeHeroVideo]);

  const goToPrevTestimonial = () => {
    setActiveTestimonial((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const goToNextTestimonial = () => {
    setActiveTestimonial((current) => (current + 1) % testimonials.length);
  };

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  const goToHeroVideo = (index) => {
    setHeroVideoProgress(0);
    setActiveHeroVideo(index);
  };

  const goToPrevHeroVideo = () => {
    setHeroVideoProgress(0);
    setActiveHeroVideo((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1
    );
  };

  const goToNextHeroVideo = () => {
    setHeroVideoProgress(0);
    setActiveHeroVideo((current) => (current + 1) % heroSlides.length);
  };

  const updateHeroVideoProgress = (event) => {
    const video = event.currentTarget;

    if (!video.duration) {
      setHeroVideoProgress(0);
      return;
    }

    setHeroVideoProgress((video.currentTime / video.duration) * 100);
  };

  const openWhatsApp = (message) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const navItems = [
    ["Home", "#home"],
    ["Harga", "#pricing"],
    ["Testimoni", "#testimonials"],
    ["FAQ", "#faq"],
  ];
  const activeHeroSlide = heroSlides[activeHeroVideo];
  const activePricing = pricingTabs.find((tab) => tab.id === activePricingTab) || pricingTabs[0];
  const activePricingCards = pricingCards.filter((item) => item.tabId === activePricingTab);

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
        <div className="hero-video-carousel" aria-hidden="true">
          <div
            className="hero-video-track"
            style={{ transform: `translateX(-${activeHeroVideo * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <div className="hero-video-slide" key={slide.video}>
                <video
                  ref={(element) => {
                    heroVideoRefs.current[index] = element;
                  }}
                  className="hero-video"
                  src={slide.video}
                  autoPlay={index === activeHeroVideo}
                  muted
                  playsInline
                  preload="auto"
                  onLoadedMetadata={() => {
                    if (index === activeHeroVideo) setHeroVideoProgress(0);
                  }}
                  onTimeUpdate={(event) => {
                    if (index === activeHeroVideo) updateHeroVideoProgress(event);
                  }}
                  onEnded={() => {
                    if (index === activeHeroVideo) goToNextHeroVideo();
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="hero-video-arrow prev"
          type="button"
          onClick={goToPrevHeroVideo}
          aria-label="Video sebelumnya"
        >
          ‹
        </button>

        <button
          className="hero-video-arrow next"
          type="button"
          onClick={goToNextHeroVideo}
          aria-label="Video berikutnya"
        >
          ›
        </button>

        <div className="hero-content">

          <p className="hero-subtitle" key={`subtitle-${activeHeroVideo}`}>
            {activeHeroSlide.subtitle}
          </p>
          <p className="hero-copy" key={`copy-${activeHeroVideo}`}>
            {activeHeroSlide.copy}
          </p>

          <div className="hero-actions" key={`actions-${activeHeroVideo}`}>
            <button
              className="primary-btn"
              onClick={() =>
                openWhatsApp(activeHeroSlide.whatsappMessage)
              }
            >
              {activeHeroSlide.buttonLabel}
            </button>
          </div>

          <div className="hero-video-indicators" aria-label="Pilih video hero">
            {heroSlides.map((_, index) => {
              const progress =
                index < activeHeroVideo
                  ? 100
                  : index === activeHeroVideo
                    ? heroVideoProgress
                    : 0;

              return (
                <button
                  key={index}
                  type="button"
                  className={index === activeHeroVideo ? "active" : ""}
                  onClick={() => goToHeroVideo(index)}
                  aria-label={`Tampilkan video ${index + 1}`}
                  aria-current={index === activeHeroVideo}
                >
                  <span style={{ width: `${progress}%` }} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="section-head pricing-head">
          <h2>PRICE LIST</h2>
          <p>{activePricing.desc}</p>
        </div>

        <div className="pricing-filter" aria-label="Pilih jenis persewaan">
          {pricingTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={tab.id === activePricingTab ? "active" : ""}
              onClick={() => setActivePricingTab(tab.id)}
              aria-pressed={tab.id === activePricingTab}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pricing-grid">
          {activePricingCards.map((item) => (
            <article className="pricing-card" key={item.id}>
              <div
                className="pricing-card-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="pricing-card-body">
                <div className="pricing-card-top">
                  <span>{item.category}</span>
                  <div className="pricing-card-price">
                    <strong>{item.price}</strong>
                    {item.unit && <small>{item.unit}</small>}
                  </div>
                </div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section testimonial-section" id="testimonials">
        <div className="section-head testimonial-head">
          <h2>TESTIMONIALS</h2>
          <p>CERITA CUSTOMER FINDIVE.ID</p>
        </div>

        <div className="testimonial-carousel" aria-label="Carousel testimoni pelanggan">
          <button
            className="testimonial-arrow prev"
            type="button"
            onClick={goToPrevTestimonial}
            aria-label="Testimoni sebelumnya"
          >
            ‹
          </button>

          <div className="testimonial-viewport">
            <div
              className="testimonial-track"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((item) => (
                <article className="testimonial-slide" key={item.id}>
                  <div
                    className="testimonial-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="testimonial-content">
                    <span>{item.label}</span>
                    <p>“{item.text}”</p>
                    <div className="testimonial-author">
                      <strong>{item.name}</strong>
                      <small>{item.role}</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            className="testimonial-arrow next"
            type="button"
            onClick={goToNextTestimonial}
            aria-label="Testimoni berikutnya"
          >
            ›
          </button>
        </div>

        <div className="testimonial-dots" aria-label="Pilih testimoni">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === activeTestimonial ? "active" : ""}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Lihat testimoni ${index + 1}`}
              aria-current={index === activeTestimonial}
            />
          ))}
        </div>
      </section>


      <section className="section faq-section" id="faq">
        <div className="section-head faq-head">
          <h2>FAQ</h2>
          <p>PERTANYAAN YANG SERING DITANYAKAN</p>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = activeFaq === index;

            return (
              <article className="faq-item" key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  {item.question}
                  <span>{isOpen ? "−" : "+"}</span>
                </button>

                <div
                  className={`faq-answer ${isOpen ? "open" : ""}`}
                  id={`faq-answer-${item.id}`}
                >
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

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
  background: #082535f0;
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

.hero-video-carousel {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-video-track {
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.hero-video-slide {
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--deep-navy);
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-video-arrow {
  position: absolute;
  top: 50%;
  z-index: 3;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(212, 225, 231, 0.24);
  border-radius: 50%;
  color: var(--white);
  background: rgba(8, 37, 53, 0.42);
  backdrop-filter: blur(12px);
  font-size: 0;
  line-height: 1;
  cursor: pointer;
  transform: translateY(-50%);
  transition: background 0.2s ease, transform 0.2s ease;
}

.hero-video-arrow::before {
  font-size: 2.35rem;
}

.hero-video-arrow.prev::before {
  content: "<";
}

.hero-video-arrow.next::before {
  content: ">";
}

.hero-video-arrow:hover {
  background: rgba(8, 37, 53, 0.68);
  transform: translateY(-50%) scale(1.04);
}

.hero-video-arrow.prev {
  left: clamp(14px, 3vw, 36px);
}

.hero-video-arrow.next {
  right: clamp(14px, 3vw, 36px);
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
  animation: heroTextIn 0.46s ease both;
}

.hero-copy {
  margin: 12px 0 0;
  color: var(--pale-blue-gray);
  font-size: clamp(1rem, 3vw, 1.25rem);
  animation: heroTextIn 0.46s ease 0.06s both;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
  animation: heroTextIn 0.46s ease 0.12s both;
}

@keyframes heroTextIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-video-indicators {
  width: min(420px, 100%);
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.hero-video-indicators button {
  position: relative;
  height: 4px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: rgba(212, 225, 231, 0.34);
  cursor: pointer;
}

.hero-video-indicators button::after {
  content: "";
  position: absolute;
  inset: -8px 0;
}

.hero-video-indicators span {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0;
  border-radius: inherit;
  background: var(--white);
  transition: width 0.16s linear;
}

.hero-video-indicators button.active {
  background: rgba(255, 255, 255, 0.34);
}

.primary-btn,
.secondary-btn {
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
.equipment-grid {
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
}

.equipment-image {
  min-height: 220px;
  background-size: cover;
  background-position: center;
}

.equipment-body {
  padding: 22px;
}

.equipment-body h3 {
  margin: 0;
  color: var(--deep-navy);
  font-size: 1.45rem;
}

.equipment-body p {
  margin: 12px 0 0;
  color: var(--dark-teal);
  line-height: 1.55;
}

.pricing-section {
  width: 100%;
  padding-inline: max(16px, calc((100% - 1160px) / 2));
  background:
    linear-gradient(180deg, var(--pale-blue-gray) 0%, rgba(255, 255, 255, 0.92) 46%, var(--pale-blue-gray) 100%),
    url("${equipmentPoster}") center / cover;
}

.pricing-head h2 {
  font-size: clamp(2rem, 6.5vw, 4.1rem);
}

.pricing-filter {
  margin-bottom: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pricing-filter button {
  min-height: 46px;
  padding: 12px 16px;
  border: 1px solid rgba(37, 74, 90, 0.16);
  border-radius: 999px;
  color: var(--deep-navy);
  background: rgba(255, 255, 255, 0.84);
  cursor: pointer;
  font-weight: 950;
  box-shadow: 0 12px 32px rgba(8, 37, 53, 0.08);
}

.pricing-filter button.active {
  color: var(--white);
  background: var(--dark-teal);
  border-color: var(--dark-teal);
  box-shadow: 0 16px 38px rgba(8, 37, 53, 0.18);
}

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.pricing-card {
  overflow: hidden;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(37, 74, 90, 0.12);
  box-shadow: 0 24px 80px rgba(8, 37, 53, 0.14);
}

.pricing-card-image {
  min-height: 230px;
  background-size: cover;
  background-position: center;
}

.pricing-card-body {
  padding: 22px;
}

.pricing-card-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: start;
}

.pricing-card-top span {
  width: fit-content;
  padding: 7px 10px;
  border-radius: 999px;
  color: var(--white);
  background: var(--dark-teal);
  font-size: 0.72rem;
  font-weight: 950;
  text-transform: uppercase;
}

.pricing-card h3 {
  margin: 18px 0 0;
  color: var(--deep-navy);
  font-size: clamp(1.18rem, 3vw, 1.55rem);
  line-height: 1.18;
}

.pricing-card p {
  margin: 12px 0 0;
  color: var(--dark-teal);
  line-height: 1.55;
}

.pricing-card-price {
  display: grid;
  justify-items: end;
  color: var(--deep-navy);
  text-align: right;
  white-space: nowrap;
}

.pricing-card-price strong {
  font-size: clamp(2rem, 6vw, 3.2rem);
  line-height: 0.9;
  font-style: italic;
}

.pricing-card-price small {
  color: var(--dark-teal);
  font-weight: 850;
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


.faq-section {
  width: min(960px, calc(100% - 32px));
  padding-top: 42px;
}

.faq-head h2 {
  font-size: clamp(2rem, 6.5vw, 4.1rem);
}

.faq-list {
  max-width: 960px;
  margin: 0 auto;
}

.faq-item button span {
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--white);
  background: var(--dark-teal);
  line-height: 1;
}

.testimonial-section {
  width: min(1160px, calc(100% - 32px));
  padding-top: 42px;
}

.testimonial-head h2 {
  font-size: clamp(2rem, 6.5vw, 4.1rem);
}

.testimonial-carousel {
  position: relative;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 48px;
  gap: 14px;
  align-items: center;
}

.testimonial-viewport {
  overflow: hidden;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(37, 74, 90, 0.12);
  box-shadow: 0 24px 80px rgba(8, 37, 53, 0.14);
}

.testimonial-track {
  display: flex;
  transition: transform 0.45s ease;
  will-change: transform;
}

.testimonial-slide {
  flex: 0 0 100%;
  min-height: 420px;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  background:
    radial-gradient(circle at top right, rgba(128, 153, 131, 0.22), transparent 18rem),
    rgba(255, 255, 255, 0.94);
}

.testimonial-image {
  min-height: 420px;
  background-size: cover;
  background-position: center;
}

.testimonial-content {
  padding: clamp(24px, 5vw, 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.testimonial-content span {
  color: var(--olive-green);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.testimonial-content p {
  margin: 16px 0 0;
  color: var(--deep-navy);
  font-size: clamp(1.25rem, 3.6vw, 2rem);
  line-height: 1.32;
  font-weight: 850;
  font-style: italic;
}

.testimonial-author {
  margin-top: 24px;
  display: grid;
  gap: 4px;
}

.testimonial-author strong {
  color: var(--deep-navy);
  font-size: 1.05rem;
}

.testimonial-author small {
  color: var(--dark-teal);
  font-weight: 750;
}

.testimonial-arrow {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: var(--white);
  background: var(--dark-teal);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 16px 38px rgba(8, 37, 53, 0.2);
}

.testimonial-dots {
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.testimonial-dots button {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(37, 74, 90, 0.28);
  cursor: pointer;
  transition: width 0.25s ease, background 0.25s ease;
}

.testimonial-dots button.active {
  width: 34px;
  background: var(--dark-teal);
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

  .hero-video-arrow {
    top: auto;
    bottom: 92px;
    width: 42px;
    height: 42px;
    transform: none;
  }

  .hero-video-arrow::before {
    font-size: 2rem;
  }

  .hero-video-arrow:hover {
    transform: none;
  }

  .hero-badges span {
    max-width: 100%;
  }

  .pricing-filter {
    display: grid;
    grid-template-columns: 1fr;
  }

  .pricing-card-top {
    grid-template-columns: 1fr;
  }

  .pricing-card-price {
    justify-items: start;
    text-align: left;
  }

  .pricing-card-price strong {
    font-size: clamp(2rem, 14vw, 3.25rem);
  }

  .testimonial-carousel {
    grid-template-columns: 1fr;
  }

  .testimonial-slide {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  .testimonial-image {
    min-height: 260px;
  }

  .testimonial-arrow {
    position: absolute;
    top: 130px;
    z-index: 2;
    width: 42px;
    height: 42px;
    background: rgba(8, 37, 53, 0.86);
  }

  .testimonial-arrow.prev {
    left: 14px;
  }

  .testimonial-arrow.next {
    right: 14px;
  }

}

@media (min-width: 640px) {
  .highlight-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .equipment-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .pricing-grid {
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

  .equipment-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

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
