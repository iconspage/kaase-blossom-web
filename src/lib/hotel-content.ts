import palmPoolAerial from "@/assets/palm-pool-aerial.png.asset.json";
import palmPoolCurve from "@/assets/palm-pool-curve.png.asset.json";
import palmPoolDay from "@/assets/palm-pool-day.png.asset.json";
import palmWaterFeatureNight from "@/assets/palm-water-feature-night.png.asset.json";
import palmForestLounge from "@/assets/palm-forest-lounge.png.asset.json";
import palmFlamingoBar from "@/assets/palm-flamingo-bar.png.asset.json";
import palmPoolGuest from "@/assets/palm-pool-guest.png.asset.json";

export const hotelInfo = {
  name: "Palm Garden Hotel",
  location: "Kaase, Kumasi",
  address: "J9RW+RRQ, Kaase, Kumasi, Ghana",
  phoneDisplay: "053 979 5100",
  phoneHref: "tel:+233539795100",
  rating: "4.3",
  reviews: "153 Google reviews",
};

export const siteImages = {
  aerial: palmPoolAerial.url,
  poolCurve: palmPoolCurve.url,
  poolDay: palmPoolDay.url,
  waterFeatureNight: palmWaterFeatureNight.url,
  forestLounge: palmForestLounge.url,
  flamingoBar: palmFlamingoBar.url,
  poolGuest: palmPoolGuest.url,
};

export const roomTypes = [
  {
    name: "Garden Deluxe",
    price: 850,
    image: siteImages.poolDay,
    description: "A calm garden-facing stay with warm finishes, leafy views, and easy pool access.",
    features: ["Queen bed", "Breakfast included", "Air conditioning", "Wi-Fi"],
  },
  {
    name: "Palm Executive",
    price: 1250,
    image: siteImages.poolCurve,
    description: "A more generous room for longer stays, with a lounge corner and refined quiet.",
    features: ["King bed", "Lounge seating", "Mini fridge", "Balcony outlook"],
  },
  {
    name: "Courtyard Family Suite",
    price: 1900,
    image: siteImages.aerial,
    description: "For families and groups who want privacy, space, and a full resort atmosphere.",
    features: ["Two sleeping zones", "Garden access", "Dining nook", "Priority service"],
  },
];

export const activities = [
  {
    slug: "garden-swing",
    name: "Garden Swing",
    tag: "Quiet moments",
    price: "₵25 access",
    image: siteImages.forestLounge,
    shortDescription: "A shaded swing corner inside the palms for photos, quiet hangs, and slow evenings.",
    heroTitle: "Slip into the garden swing and let the whole place slow down.",
    longDescription:
      "The swing area is one of the most loved corners of Palm Garden Hotel. It sits inside the trees near the lounge spaces, with soft lighting in the evening and a relaxed atmosphere throughout the day. Guests use it for photos, couples' moments, and quiet breaks between meals or pool time.",
    highlights: ["Best for sunset photos", "Easy access from the lounge garden", "Private, leafy setting"],
  },
  {
    slug: "fish-feeding",
    name: "Fish Feeding",
    tag: "Family activity",
    price: "₵40 per person",
    image: siteImages.waterFeatureNight,
    shortDescription: "A playful nature activity by the illuminated water garden, perfect for families and first-time visitors.",
    heroTitle: "A small ritual by the water that guests remember.",
    longDescription:
      "Fish feeding happens around the water feature and garden ponds, where guests can pause, take photos, and enjoy the calmer side of the property. It is especially popular with children and evening visitors because of the lighting and peaceful setting.",
    highlights: ["Good for children", "Short and easy experience", "Great evening ambience"],
  },
  {
    slug: "boat-riding",
    name: "Boat Riding",
    tag: "Leisure ride",
    price: "₵85 per person",
    image: siteImages.waterFeatureNight,
    shortDescription: "A soft, scenic ride around the water feature for guests who want something memorable and different.",
    heroTitle: "A calm ride through Palm Garden's lit water landscape.",
    longDescription:
      "Boat riding adds a resort-style moment to your stay. It works best in the late afternoon and evening, when the reflections and garden lights make the property feel cinematic. It is ideal for couples, visitors, and event guests.",
    highlights: ["Best in the evening", "Good for couples", "Popular for event guests"],
  },
  {
    slug: "flamingo-bar-grill",
    name: "Flamingo Bar & Grill",
    tag: "Dining & drinks",
    price: "₵95 average spend",
    image: siteImages.flamingoBar,
    shortDescription: "Open-air dining with grilled plates, cocktails, and a lively night atmosphere.",
    heroTitle: "Where dinner turns into the best part of the night.",
    longDescription:
      "Flamingo Bar & Grill is one of the signature attractions on the property. Guests come for grilled plates, chilled drinks, group dinners, and the energy of the space after dark. It is a key reason many visitors stay longer than planned.",
    highlights: ["Cocktails and grills", "Open-air seating", "Great for groups and weekends"],
  },
  {
    slug: "cafe-shop",
    name: "Cafe & Shops",
    tag: "Daytime comfort",
    price: "₵35 and up",
    image: siteImages.forestLounge,
    shortDescription: "Coffee, light bites, and small convenience shopping without leaving the property.",
    heroTitle: "Morning coffee, midday reset, easy essentials.",
    longDescription:
      "For guests who want to stay inside the resort atmosphere, the cafe and small shop area keeps everything easy. Grab coffee, pastries, chilled drinks, or light essentials before heading to the pool, a meeting, or an activity.",
    highlights: ["Quick breakfasts", "Coffee and pastries", "Easy add-on stop during your stay"],
  },
  {
    slug: "event-room-planning",
    name: "Event Room Planning",
    tag: "Celebrations & business",
    price: "From ₵1,800",
    image: siteImages.poolDay,
    shortDescription: "Flexible event support for birthdays, meetings, receptions, and private gatherings.",
    heroTitle: "Plan something special in a place people actually want to attend.",
    longDescription:
      "Palm Garden Hotel is well suited for intimate celebrations, private dinners, meetings, and small corporate functions. The team can help shape seating, food, drinks, and timing so guests can plan everything in one location.",
    highlights: ["Birthdays and receptions", "Corporate meetings", "Food and drink coordination"],
  },
  {
    slug: "multi-bars",
    name: "Multi Bars",
    tag: "Nightlife energy",
    price: "₵60 and up",
    image: siteImages.flamingoBar,
    shortDescription: "Different bar moods across the property for relaxed drinks, social nights, and weekend hangouts.",
    heroTitle: "Choose your mood, stay for another round.",
    longDescription:
      "The hotel's multiple bar zones give guests options: lively, intimate, or poolside relaxed. That makes Palm Garden feel bigger than a standard hotel stay and gives visitors more reasons to stay on-site into the night.",
    highlights: ["Poolside options", "Group-friendly tables", "Weekend-ready atmosphere"],
  },
];

export const featuredSpaces = [
  {
    title: "Poolside calm",
    description: "Curved pool edges, thick greenery, and a resort feel the moment you arrive.",
    image: siteImages.poolCurve,
  },
  {
    title: "Night garden",
    description: "The lit water feature turns the property into an after-dark destination.",
    image: siteImages.waterFeatureNight,
  },
  {
    title: "Forest lounge",
    description: "Outdoor seating under the trees for meals, events, or quiet conversation.",
    image: siteImages.forestLounge,
  },
];