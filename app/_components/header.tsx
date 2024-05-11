import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={60} height={80} />
      </Link>
      <Button
        variant="outline"
        size="icon"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </header>
  );
};

export default Header;
