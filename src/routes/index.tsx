import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, Phone, Star, Wifi, Utensils, Waves, Wind, Car, Coffee, ChevronRight, Menu, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palm Garden Hotel — Kaase, Kumasi" },
      { name: "description", content: "A tranquil garden retreat in Kaase, Kumasi. Refined rooms, lush gardens, and Ashanti hospitality." },
      { property: "og:title", content: "Palm Garden Hotel — Kaase, Kumasi" },
      { property: "og:description", content: "Book your stay at Palm Garden Hotel — a refined garden retreat in the heart of Ashanti." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80" },
    ],
  }),
  component: Index,
});

const HERO = "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=2000&q=85";
const LOGO_MARK = "Palm Garden";

const rooms = [
  {
    name: "Garden Deluxe",
    price: "₵850",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    desc: "Spacious king room opening onto private tropical gardens.",
    features: ["King bed", "Garden terrace", "Rain shower", "55\" smart TV"],
  },
  {
    name: "Palm Suite",
    price: "₵1,400",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
    desc: "A generous suite with separate lounge and views of the palm courtyard.",
    features: ["Lounge area", "Soaking tub", "Mini bar", "Espresso machine"],
  },
  {
    name: "Ashanti Villa",
    price: "₵2,600",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    desc: "Our signature standalone villa with plunge pool and personal host.",
    features: ["Plunge pool", "Private chef", "Two bedrooms", "Outdoor lounge"],
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
  "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?w=1200&q=80",
  "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80",
];

const amenities = [
  { icon: Waves, label: "Outdoor Pool" },
  { icon: Utensils, label: "Fine Dining" },
  { icon: Wifi, label: "High-speed Wi-Fi" },
  { icon: Wind, label: "Spa & Wellness" },
  { icon: Car, label: "Airport Transfer" },
  { icon: Coffee, label: "24/7 Concierge" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

function Index() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.3]);
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans antialiased overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          navSolid ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#top" className={`font-display text-2xl tracking-wide ${navSolid ? "text-foreground" : "text-white"}`}>
            {LOGO_MARK}
          </a>
          <div className={`hidden md:flex items-center gap-10 text-sm tracking-wide ${navSolid ? "text-foreground" : "text-white/90"}`}>
            {["Rooms", "Amenities", "Gallery", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-accent transition-colors">
                {l}
              </a>
            ))}
            <a
              href="#book"
              className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full hover:bg-accent/90 transition tracking-wider text-xs uppercase font-medium"
            >
              Book Now
            </a>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden ${navSolid ? "text-foreground" : "text-white"}`}
            aria-label="Menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-4 text-sm">
            {["Rooms", "Amenities", "Gallery", "Contact", "Book"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="top" className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={HERO} alt="Palm Garden Hotel" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="uppercase tracking-[0.4em] text-xs text-accent mb-6"
          >
            Kaase · Kumasi · Ghana
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-light leading-[0.95] max-w-5xl"
          >
            A garden retreat in the heart of Ashanti.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 max-w-xl text-white/80 text-lg font-light"
          >
            Where centuries of Kumasi hospitality meet quiet luxury, lush palms, and unhurried days.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#book"
              className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-accent/90 transition"
            >
              Reserve a Stay
            </a>
            <a
              href="#rooms"
              className="border border-white/40 text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-white/10 transition"
            >
              Explore Rooms
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em] uppercase"
        >
          Scroll
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5"
          >
            <p className="uppercase tracking-[0.3em] text-xs text-accent mb-6">Our Story</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-primary">
              A sanctuary woven through palms.
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.15 }}
            className="md:col-span-7 space-y-6 text-muted-foreground text-lg leading-relaxed"
          >
            <p>
              Tucked into the leafy edge of Kaase, Palm Garden Hotel is a quiet counterpoint to the rhythm of Kumasi. Our grounds unfold across landscaped gardens, shaded courtyards, and an open-air pavilion where guests linger over slow breakfasts.
            </p>
            <p>
              Every room is shaped by the colours of the Ashanti land — earthy clays, deep greens, soft brass — and finished with the comforts of a contemporary boutique hotel.
            </p>
            <div className="flex items-center gap-2 pt-4">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <Star className="w-5 h-5 fill-accent/50 text-accent" />
              <span className="ml-3 text-foreground font-medium">4.3</span>
              <span className="text-muted-foreground">· 153 Google reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMAGE BREAK */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=2000&q=85"
          alt="Pool"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex items-center justify-center px-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-3xl md:text-5xl text-white text-center max-w-4xl leading-tight italic font-light"
          >
            "The most peaceful stay we've had in Kumasi — the gardens are extraordinary."
            <footer className="not-italic text-sm tracking-[0.3em] uppercase mt-8 text-white/70">
              — Guest review, Google
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-accent mb-4">Accommodation</p>
              <h2 className="font-display text-5xl md:text-6xl text-primary leading-[1.05]">
                Rooms & Villas
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              Twenty-four bespoke rooms and villas, each opening onto a private corner of the garden.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((r, i) => (
              <motion.article
                key={r.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.15 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-sm aspect-[4/5] mb-6 bg-muted">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-display text-3xl text-primary">{r.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    <span className="text-accent font-medium">{r.price}</span> / night
                  </span>
                </div>
                <p className="text-muted-foreground mb-5 leading-relaxed">{r.desc}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-wider text-muted-foreground/80 mb-5">
                  {r.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
                <a href="#book" className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-primary group-hover:text-accent transition">
                  Reserve <ChevronRight className="w-4 h-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="py-32 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="uppercase tracking-[0.3em] text-xs text-accent mb-4">The Experience</p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight max-w-3xl mx-auto">
              Considered comforts, quietly delivered.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
            {amenities.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="flex flex-col items-center text-center"
              >
                <a.icon className="w-8 h-8 text-accent mb-4" strokeWidth={1.25} />
                <p className="text-sm tracking-wider uppercase font-light">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="uppercase tracking-[0.3em] text-xs text-accent mb-4">Gallery</p>
            <h2 className="font-display text-5xl md:text-6xl text-primary leading-[1.05] max-w-2xl">
              Moments from the garden.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.8 }}
                className={`overflow-hidden rounded-sm bg-muted ${
                  i === 0 || i === 5 ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <BookingSection />

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="uppercase tracking-[0.3em] text-xs text-accent mb-4">Find Us</p>
            <h2 className="font-display text-5xl md:text-6xl text-primary leading-[1.05] mb-10">
              Visit Palm Garden.
            </h2>
            <div className="space-y-6 text-foreground">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">J9RW+RRQ, Kaase, Kumasi, Ghana</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-accent mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Reservations</p>
                  <a href="tel:+233539795100" className="text-muted-foreground hover:text-accent transition">
                    053 979 5100
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Star className="w-5 h-5 text-accent mt-1 shrink-0 fill-accent" />
                <div>
                  <p className="font-medium">Rated 4.3 on Google</p>
                  <p className="text-muted-foreground">From 153 verified guest reviews</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="rounded-sm overflow-hidden aspect-square md:aspect-auto min-h-[400px] shadow-2xl"
          >
            <iframe
              title="Palm Garden Hotel location"
              src="https://www.google.com/maps?q=Palm+Garden+Hotel+Kaase+Kumasi&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-3xl">Palm Garden Hotel</p>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Palm Garden Hotel, Kaase · All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function BookingSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: "2",
    room: "Garden Deluxe",
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=2000&q=85)`,
        }}
      />
      <div className="absolute inset-0 bg-primary/85" />
      <div className="relative max-w-4xl mx-auto text-primary-foreground">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-accent mb-4">Reserve</p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight">Begin your stay</h2>
          <p className="mt-4 text-primary-foreground/70">Best rates guaranteed when you book direct.</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background/95 text-foreground rounded-sm p-12 text-center"
          >
            <p className="uppercase tracking-[0.3em] text-xs text-accent mb-4">Thank you, {form.name}</p>
            <h3 className="font-display text-3xl text-primary mb-3">Your request has been received.</h3>
            <p className="text-muted-foreground">
              Our reservations team will confirm your {form.room} for {form.guests} guest(s) within the hour.
            </p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            onSubmit={onSubmit}
            className="bg-background/95 backdrop-blur text-foreground rounded-sm p-8 md:p-12 grid md:grid-cols-2 gap-6 shadow-2xl"
          >
            <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field label="Check-in" type="date" value={form.checkin} onChange={(v) => setForm({ ...form, checkin: v })} required />
            <Field label="Check-out" type="date" value={form.checkout} onChange={(v) => setForm({ ...form, checkout: v })} required />
            <Select
              label="Guests"
              value={form.guests}
              onChange={(v) => setForm({ ...form, guests: v })}
              options={["1", "2", "3", "4", "5+"]}
            />
            <Select
              label="Room"
              value={form.room}
              onChange={(v) => setForm({ ...form, room: v })}
              options={rooms.map((r) => r.name)}
            />
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-4 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-accent/90 transition"
              >
                Request Reservation
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 border-b border-border bg-transparent py-2 focus:outline-none focus:border-accent transition"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 border-b border-border bg-transparent py-2 focus:outline-none focus:border-accent transition"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
