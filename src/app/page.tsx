import { Header } from "../components/header/Header";
import { Sidenav } from "../components/sidenav/Sidenav";
import { TableFiles } from "@/components/table-files/TableFiles";
import { TableFilters } from "@/components/table-filters/TableFilters";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex h-dvh w-full grid-cols-2 overflow-hidden bg-white">
      <Sidenav />

      <div className="flex h-dvh w-full flex-col overflow-hidden">
        <Header />

        <TableFilters />

        <div className="flex h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-auto">
            <TableFiles />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
