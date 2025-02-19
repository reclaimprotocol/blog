import React from "react";
import Logo from "../logo";
import Link from "next/link";
import { MobileNav } from "../mobile-nav";
import { ModeToggle } from "../mode-toggle";

const SiteNavigation = () => {
  return (
    <nav className="border border-b">
      <div className="md:container md:max-w-6xl px-3">
        <div className="hidden md:flex justify-between gap-20 items-center py-5">
          <Logo className="w-32" />
          <div className="flex items-center gap-10">
            <Link
              href={"/"}
              className="text-2xl border-b border-black dark:border-white cursor-pointer mt-1"
            >
              Home
            </Link>
            <Link
              href={"/"}
              className="text-2xl border-b border-black dark:border-white cursor-pointer mt-1"
            >
              Blogs
            </Link>
            <ModeToggle />
          </div>
        </div>
        <div className="flex md:hidden py-5">
          <div className="flex-1">
            <Logo className="w-24" />
          </div>
          <div className="flex gap-3">
            <ModeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteNavigation;
