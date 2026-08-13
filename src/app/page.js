import { FeaturedCarousel } from "@/components/home/featured-carousel";
import { featuredHomeItems } from "@/content/home";

export default function HomePage() {
  return <FeaturedCarousel items={featuredHomeItems} />;
}
