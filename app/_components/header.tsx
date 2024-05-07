import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Image src="/logo.png" alt="Logo" width={60} height={60} />
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
