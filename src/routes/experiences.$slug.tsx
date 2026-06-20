import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Phone } from "lucide-react";

import { activities, hotelInfo } from "@/lib/hotel-content";

export const Route = createFileRoute("/experiences/$slug")({
  head: ({ params }) => {
    const activity = activities.find((item) => item.slug === params.slug);

    return {
      meta: [
        { title: `${activity?.name ?? "Experience"} — ${hotelInfo.name}` },
        {
          name: "description",
          content:
            activity?.shortDescription ??
            `Explore unique experiences at ${hotelInfo.name} in ${hotelInfo.location}.`,
        },
        { property: "og:title", content: `${activity?.name ?? "Experience"} — ${hotelInfo.name}` },
        {
          property: "og:description",
          content:
            activity?.shortDescription ??
            `Explore unique experiences at ${hotelInfo.name} in ${hotelInfo.location}.`,
        },
        ...(activity ? [{ property: "og:image", content: activity.image }] : []),
        ...(activity ? [{ name: "twitter:image", content: activity.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const activity = activities.find((item) => item.slug === params.slug);

    if (!activity) {
      throw notFound();
    }

    return { activity };
  },
  component: ExperiencePage,
});

function ExperiencePage() {
  const { activity } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[88vh] overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/80" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-6 py-8 text-primary-foreground">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-primary-foreground/80 transition hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" /> Back to hotel
            </Link>
          </div>

          <div className="max-w-3xl space-y-6 pb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">{activity.tag}</p>
            <h1 className="max-w-4xl text-6xl leading-[0.95] text-primary-foreground md:text-8xl">
              {activity.name}
            </h1>
            <p className="max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
              {activity.heroTitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <span className="rounded-full border border-primary-foreground/25 bg-background/10 px-5 py-3 text-sm uppercase tracking-[0.24em] text-primary-foreground">
                {activity.price}
              </span>
              <a
                href={hotelInfo.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm uppercase tracking-[0.24em] text-accent-foreground transition hover:bg-accent/90"
              >
                <Phone className="h-4 w-4" /> Call to book
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.32em] text-accent">About this experience</p>
              <h2 className="text-5xl leading-[1.02] text-primary">Made to feel like part of the stay, not an add-on.</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{activity.longDescription}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {activity.highlights.map((highlight) => (
                <div key={highlight} className="border border-border/80 bg-card px-5 py-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-accent">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.18em] text-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-border/80 bg-card p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Booking</p>
            <h3 className="mt-4 text-3xl text-primary">Ready to plan it?</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Call the hotel directly to check timing, group size, and the best package for your visit.
            </p>
            <a
              href={hotelInfo.phoneHref}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm uppercase tracking-[0.24em] text-primary-foreground transition hover:opacity-90"
            >
              <Phone className="h-4 w-4" /> {hotelInfo.phoneDisplay}
            </a>
            <div className="mt-8 border-t border-border pt-8 text-sm text-muted-foreground">
              <p>{hotelInfo.address}</p>
              <p className="mt-2">{hotelInfo.rating} rating · {hotelInfo.reviews}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}