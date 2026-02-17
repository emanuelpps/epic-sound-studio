import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";
import FeaturedHeroServer from "./FeaturedHeroServer";

export default function Main() {
  return (
    <main className="flex flex-col gap-6">
      <SearchBar />
      <FeaturedHeroServer />
    </main>
  );
}
