import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";
import Featured from "@/shared/components/ui/Featured/Featured";

export default function Main() {
  return (
    <main className="overflow-y-auto p-6 flex flex-col gap-6">
      <SearchBar />
      <Featured />
    </main>
  );
}
