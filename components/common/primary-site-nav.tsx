import Logo from "../logo";
import { MobileNav } from "../mobile-nav";
import Link from "next/link";

const PrimarySiteNav = () => {
  return (
    <nav className="container px-8 mx-auto max-w-screen-lg xl:px-5 py-6 lg:py-8">
      <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-14">
        <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
          <Link
            href={"https://reclaimprotocol.org"}
            className="px-5 py-2 text-base font-medium nav-link"
          >
            Home
          </Link>
          <a
            href={"https://dev.reclaimprotocol.org/dashboard"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-base font-medium nav-link"
          >
            Dashboard
          </a>
          <a
            href={"https://t.me/protocolreclaim"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-base font-medium nav-link"
          >
            Community
          </a>
        </div>
        <div className="flex w-full items-center justify-between md:w-auto">
          <Link href={"https://reclaimprotocol.org"}>
            <Logo className="w-8 md:w-10" />
          </Link>
          <MobileNav />
        </div>
        <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
          <Link
            href={"/"}
            className="px-5 py-2 text-base font-medium nav-link"
          >
            Blogs
          </Link>
          <a
            href={"https://www.reclaimprotocol.org/whitepaper"}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-base font-medium nav-link"
          >
            Whitepaper
          </a>
          <a
            href="https://docs.reclaimprotocol.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-base font-medium nav-link"
          >
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
};

export default PrimarySiteNav;
