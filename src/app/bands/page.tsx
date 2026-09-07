import { bands } from "@/data/bands";
import BandExplorer from "@/components/BandExplorer";

export default function BandsPage() {
  return (
    <main>
      <h1>Favorite Bands</h1>
      <BandExplorer bands={bands} />
    </main>
  );
}