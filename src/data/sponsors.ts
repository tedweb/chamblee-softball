// Sponsor data for every page that shows sponsors. Edit the "sponsors" list in docs/data.json and rebuild.
import data from "../../docs/data.json";

export interface Sponsor { name: string; url: string; image: string; tagline: string; status: string; level: string; }

const allSponsors = ((data as { sponsors?: Sponsor[] }).sponsors ?? []);

// Only sponsors with status "active" appear on the site.
export const activeSponsors = allSponsors.filter(sponsor => sponsor.status?.toLowerCase() === "active");

// Sponsors at the "featured" level; falls back to all active sponsors if none are featured.
const featured = activeSponsors.filter(sponsor => sponsor.level?.toLowerCase() === "featured");
export const featuredSponsors = featured.length > 0 ? featured : activeSponsors;
