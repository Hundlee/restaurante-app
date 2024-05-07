import Image from "next/image";
import CategoryList from "../_components/category-list";
import Header from "../_components/header";
import Search from "../_components/search";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className=" px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizza"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full object-contain"
          quality={100}
        />
      </div>
    </main>
  );
}
