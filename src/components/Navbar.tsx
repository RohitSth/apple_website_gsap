import Image from "next/image";
import { appleImg, bagImg, searchImg } from "@/utils";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Image src={appleImg} alt="Apple" width={14} height={18} />
        <div>
          {["Phones", "Macbooks", "Tablets"].map((nav) => (
            <div key={nav}>{nav}</div>
          ))}
        </div>

        <div>
          <Image src={searchImg} alt="search" width={18} height={18} />
          <Image src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
