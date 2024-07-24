import WhiteLogo from "@/assets/logos/white.svg";
import BlackLogo from "@/assets/logos/black.svg";
import LogoMain from "@/assets/logos/main.svg";
import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <>
      <Image src={LogoMain} alt="logo" className={`${className}`} />
    </>
  );
};

export default Logo;
