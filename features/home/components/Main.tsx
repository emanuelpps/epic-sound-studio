import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";
import { HeroCard } from "@/shared/components/ui/Cards/HeroCard";

export default function Main() {
  return (
    <main className="flex flex-col gap-6">
      <SearchBar />
      <HeroCard />
    </main>
  );
}
