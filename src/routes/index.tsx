import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  MapPin,
  Menu,
  Phone,
  Star,
  Trees,
  X,
} from "lucide-react";

import { activities, featuredSpaces, hotelInfo, roomTypes, siteImages } from "@/lib/hotel-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palm Garden Hotel — Kaase, Kumasi" },
      {
        name: "description",
        content:
          "Palm Garden Hotel in Kaase, Kumasi — boutique stays, poolside dining, swing moments, water experiences, event planning, and direct tap-to-call booking.",
      },
      { property: "og:title", content: "Palm Garden Hotel — Kaase, Kumasi" },
      {
        property: "og:description",
        content:
          "Discover Palm Garden Hotel through real photos, rooms, activities, dining, and direct reservation contact.",
      },
      { property: "og:image", content: siteImages.aerial },
      { name: "twitter:image", content: siteImages.aerial },
    ],
  }),
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const comforts = [
  {
    title: "Poolside calm",
    description: "Curved pool lines, dense greenery, and a proper resort atmosphere from the first look.",
    image: siteImages.poolDay,
  },
  {
    title: "Swing moments",
    description: "Tap through to a smaller detail page for the swing and related experience info.",
    image: siteImages.forestLounge,
    link: "/experiences/$slug" as const,
    params: { slug: "garden-swing" },
  },
  {
    title: "Night energy",
    description: "Water lighting, bars, and dining help the property stay alive after dark.",
    image: siteImages.waterFeatureNight,
    link: "/experiences/$slug" as const,
    params: { slug: "multi-bars" },
  },
];

const galleryImages = [
  { src: siteImages.aerial, alt: "Aerial view of Palm Garden Hotel pool" },
  { src: siteImages.poolCurve, alt: "Curved pool at Palm Garden Hotel" },
  { src: siteImages.poolDay, alt: "Palm Garden Hotel pool courtyard in daylight" },
  { src: siteImages.waterFeatureNight, alt: "Palm Garden Hotel illuminated water feature at night" },
  { src: siteImages.forestLounge, alt: "Palm Garden Hotel forest lounge seating" },
  { src: siteImages.flamingoBar, alt: "Flamingo Bar and Grill at Palm Garden Hotel" },
];

function Index() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 180]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [1, 0.45]);
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]?.name ?? "Garden Deluxe");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "flamingo-bar-grill",
    "garden-swing",
  ]);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedRoomData = roomTypes.find((room) => room.name === selectedRoom) ?? roomTypes[0];
  const selectedActivityData = activities.filter((activity) => selectedActivities.includes(activity.slug));
  const activityTotal = useMemo(
    () => selectedActivityData.reduce((sum, activity) => sum + extractPriceValue(activity.price), 0),
    [selectedActivityData],
  );
  const estimatedTotal = (selectedRoomData?.price ?? 0) + activityTotal;

  const toggleActivity = (slug: string) => {
    setSelectedActivities((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  };

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          navSolid ? "border-b border-border/70 bg-background/90 py-3 backdrop-blur-xl" : "py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a
            href="#top"
            className={`text-2xl tracking-[0.12em] ${navSolid ? "text-foreground" : "text-primary-foreground"}`}
          >
            Palm Garden
          </a>
          <div
            className={`hidden items-center gap-8 text-sm uppercase tracking-[0.24em] md:flex ${
              navSolid ? "text-foreground/85" : "text-primary-foreground/85"
            }`}
          >
            <a href="#rooms" className="transition hover:text-accent">Rooms</a>
            <a href="#experiences" className="transition hover:text-accent">Experiences</a>
            <a href="#gallery" className="transition hover:text-accent">Gallery</a>
            <a href="#contact" className="transition hover:text-accent">Contact</a>
            <a
              href="#reserve"
              className="rounded-full bg-accent px-5 py-3 text-xs text-accent-foreground transition hover:bg-accent/90"
            >
              Reserve
            </a>
          </div>
          <button
            type="button"
            className={`md:hidden ${navSolid ? "text-foreground" : "text-primary-foreground"}`}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-border bg-background px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.24em] text-foreground">
              {[
                ["Rooms", "#rooms"],
                ["Experiences", "#experiences"],
                ["Gallery", "#gallery"],
                ["Contact", "#contact"],
                ["Reserve", "#reserve"],
              ].map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="top" className="relative min-h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={siteImages.aerial}
            alt="Palm Garden Hotel aerial pool view"
            className="h-[115%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/82" />
        </motion.div>

        <motion.div
          style={{ opacity: overlayOpacity }}
          className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pb-12 pt-36 text-primary-foreground"
        >
          <div className="max-w-4xl space-y-8">
            <p className="text-xs uppercase tracking-[0.38em] text-accent">Kaase · Kumasi · Ghana</p>
            <h1 className="text-6xl leading-[0.92] text-primary-foreground md:text-8xl lg:text-[8.5rem]">
              Real resort energy in the middle of Kumasi.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/78 md:text-xl">
              Palm Garden Hotel now shows the actual place better — the pool, the night lighting, the forest lounge, the bars, the activities, and a cleaner path to booking.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#reserve"
                className="rounded-full bg-accent px-8 py-4 text-sm uppercase tracking-[0.25em] text-accent-foreground transition hover:bg-accent/90"
              >
                Start reservation
              </a>
              <a
                href="#experiences"
                className="rounded-full border border-primary-foreground/35 px-8 py-4 text-sm uppercase tracking-[0.25em] text-primary-foreground transition hover:bg-background/10"
              >
                Explore experiences
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredSpaces.map((space, index) => (
              <motion.article
                key={space.title}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.12, duration: 0.9 }}
                className="border border-primary-foreground/12 bg-background/10 p-5 backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-accent">{space.title}</p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/78">
                  {space.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.34em] text-accent">Why it feels different</p>
            <h2 className="text-5xl leading-[1.02] text-primary md:text-7xl">
              Considered comforts, quietly delivered.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              The site now sells the actual property better: real hotel photos, believable pricing, real experience pages, and direct booking actions that make sense for the owner.
            </p>
            <div className="flex items-center gap-3 pt-3 text-sm uppercase tracking-[0.24em] text-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span>{hotelInfo.rating} rating</span>
              <span className="text-muted-foreground">· {hotelInfo.reviews}</span>
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {comforts.map((item, index) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.12 }}
                className="border border-border/80 bg-card"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-1000 hover:scale-105"
                  />
                </div>
                <div className="space-y-4 p-5">
                  <h3 className="text-2xl text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  {item.link && item.params ? (
                    <Link
                      to={item.link}
                      params={item.params}
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-primary transition hover:text-accent"
                    >
                      Open page <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-muted-foreground">
                      Included in stay <Check className="h-4 w-4 text-accent" />
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="rooms" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-accent">Stay options</p>
              <h2 className="mt-4 text-5xl leading-[1.02] text-primary md:text-7xl">
                Rooms priced like a premium Kumasi stay.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Reasonable pricing for a place that combines hotel rooms with destination-style experiences.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {roomTypes.map((room, index) => (
              <motion.article
                key={room.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.12 }}
                className="border border-border/80 bg-card"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover transition duration-1000 hover:scale-105"
                  />
                </div>
                <div className="space-y-5 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-3xl text-primary">{room.name}</h3>
                    <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
                      <span className="text-accent">₵{room.price.toLocaleString()}</span> / night
                    </p>
                  </div>
                  <p className="leading-relaxed text-muted-foreground">{room.description}</p>
                  <ul className="space-y-2 text-sm uppercase tracking-[0.16em] text-foreground/80">
                    {room.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-accent" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#reserve"
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-primary transition hover:text-accent"
                  >
                    Select this stay <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="bg-primary px-6 py-24 text-primary-foreground md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-accent">Things to do</p>
              <h2 className="mt-4 max-w-4xl text-5xl leading-[1.02] md:text-7xl">
                Buttons now open smaller pages with the right images and details.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-primary-foreground/72">
              Fish feeding, boat riding, restaurant stops, cafe moments, events, bars, and the swing all have a clearer structure now.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {activities.map((activity, index) => (
              <motion.article
                key={activity.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                className="flex h-full flex-col border border-primary-foreground/12 bg-background/8 backdrop-blur-sm"
              >
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="h-full w-full object-cover transition duration-1000 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-accent">{activity.tag}</p>
                    <p className="text-sm uppercase tracking-[0.16em] text-primary-foreground/76">{activity.price}</p>
                  </div>
                  <h3 className="text-3xl text-primary-foreground">{activity.name}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-primary-foreground/72">
                    {activity.shortDescription}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to="/experiences/$slug"
                      params={{ slug: activity.slug }}
                      className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-5 py-3 text-xs uppercase tracking-[0.24em] text-primary-foreground transition hover:border-accent hover:text-accent"
                    >
                      View page <ChevronRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-xs uppercase tracking-[0.24em] text-accent-foreground transition hover:bg-accent/90"
                    >
                      Book by phone <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-14">
            <p className="text-xs uppercase tracking-[0.34em] text-accent">Real property photos</p>
            <h2 className="mt-4 max-w-3xl text-5xl leading-[1.02] text-primary md:text-7xl">
              Hero and gallery now come from the actual hotel.
            </h2>
          </motion.div>

          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08, duration: 0.8 }}
                className={`${index === 0 ? "md:col-span-2 md:row-span-2" : ""} ${index === 3 ? "md:row-span-2" : ""} overflow-hidden border border-border/70 bg-card`}
              >
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="reserve" className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0">
          <img
            src={siteImages.poolGuest}
            alt="Guest enjoying the pool at Palm Garden Hotel"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/86 to-primary/72" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6 text-primary-foreground"
          >
            <p className="text-xs uppercase tracking-[0.34em] text-accent">Reservation planner</p>
            <h2 className="text-5xl leading-[1.02] md:text-7xl">
              Pick the stay, add the experiences, then tap to call.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/74">
              This is better than a fake booking form. Guests can build what they want, see a reasonable total, then go straight to contact to call the hotel.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-primary-foreground/14 bg-background/10 p-5 backdrop-blur-sm">
                <CalendarDays className="h-6 w-6 text-accent" />
                <p className="mt-4 text-sm uppercase tracking-[0.22em]">Flexible visit planning</p>
              </div>
              <div className="border border-primary-foreground/14 bg-background/10 p-5 backdrop-blur-sm">
                <Trees className="h-6 w-6 text-accent" />
                <p className="mt-4 text-sm uppercase tracking-[0.22em]">Garden experiences</p>
              </div>
              <div className="border border-primary-foreground/14 bg-background/10 p-5 backdrop-blur-sm">
                <Phone className="h-6 w-6 text-accent" />
                <p className="mt-4 text-sm uppercase tracking-[0.22em]">Tap-to-call booking</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-primary-foreground/12 bg-background/92 p-6 text-foreground shadow-2xl backdrop-blur md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-accent">Select room</p>
                <div className="mt-4 space-y-3">
                  {roomTypes.map((room) => (
                    <button
                      key={room.name}
                      type="button"
                      onClick={() => setSelectedRoom(room.name)}
                      className={`w-full border p-4 text-left transition ${
                        selectedRoom === room.name
                          ? "border-accent bg-secondary"
                          : "border-border bg-card hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm uppercase tracking-[0.18em] text-foreground">
                          {room.name}
                        </span>
                        <span className="text-sm text-accent">₵{room.price.toLocaleString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-accent">Add activities</p>
                <div className="mt-4 grid gap-3">
                  {activities.map((activity) => {
                    const active = selectedActivities.includes(activity.slug);

                    return (
                      <button
                        key={activity.slug}
                        type="button"
                        onClick={() => toggleActivity(activity.slug)}
                        className={`flex items-center justify-between gap-4 border p-4 text-left transition ${
                          active
                            ? "border-accent bg-secondary"
                            : "border-border bg-card hover:border-accent/50"
                        }`}
                      >
                        <div>
                          <p className="text-sm uppercase tracking-[0.18em] text-foreground">
                            {activity.name}
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">{activity.tag}</p>
                        </div>
                        <span className="text-sm text-accent">{activity.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-accent">Estimated total</p>
                <h3 className="mt-3 text-4xl text-primary">₵{estimatedTotal.toLocaleString()}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Includes one night in {selectedRoomData?.name} and {selectedActivityData.length} selected experience
                  {selectedActivityData.length === 1 ? "" : "s"}. Final confirmation happens by phone.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm uppercase tracking-[0.24em] text-accent-foreground transition hover:bg-accent/90"
              >
                Go to contact <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="bg-secondary px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-accent">Contact & booking</p>
              <h2 className="mt-4 text-5xl leading-[1.02] text-primary md:text-7xl">
                When they want to book, make the call effortless.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Every booking path now points here clearly so a guest can tap once and speak to the hotel directly for stays, events, dining, or activities.
            </p>

            <div className="space-y-5 border border-border/70 bg-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-foreground">Reservations line</p>
                  <a
                    href={hotelInfo.phoneHref}
                    className="mt-2 block text-3xl text-primary transition hover:text-accent md:text-4xl"
                  >
                    {hotelInfo.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-foreground">Address</p>
                  <p className="mt-2 text-muted-foreground">{hotelInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Star className="mt-1 h-5 w-5 fill-accent text-accent" />
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-foreground">Google rating</p>
                  <p className="mt-2 text-muted-foreground">
                    {hotelInfo.rating} · {hotelInfo.reviews}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="overflow-hidden border border-border/80 bg-card shadow-xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={siteImages.poolDay}
                alt="Palm Garden Hotel pool courtyard"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <h3 className="text-3xl text-primary">Direct, simple booking</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  Tap below to call the hotel now for reservations, poolside plans, events, bars, or activity questions.
                </p>
              </div>
              <a
                href={hotelInfo.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm uppercase tracking-[0.24em] text-primary-foreground transition hover:opacity-90"
              >
                <Phone className="h-4 w-4" /> Tap to call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-primary px-6 py-10 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-3xl">{hotelInfo.name}</p>
          <p className="text-sm uppercase tracking-[0.22em] text-primary-foreground/62">
            © {new Date().getFullYear()} {hotelInfo.location}
          </p>
        </div>
      </footer>
    </main>
  );
}

function extractPriceValue(value: string) {
  const match = value.match(/\d[\d,]*/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}
