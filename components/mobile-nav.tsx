"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "./mode-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Mobile Nav</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center"
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href="/">
            Home
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/blog">
            Blogs
          </MobileLink>
          <ExtMobileLink
            onOpenChange={setOpen}
            href="https://dev.reclaimprotocol.org/dashboard"
          >
            Dashboard
          </ExtMobileLink>
          <ExtMobileLink
            onOpenChange={setOpen}
            href="https://t.me/protocolreclaim"
          >
            Community
          </ExtMobileLink>
          <ExtMobileLink
            onOpenChange={setOpen}
            href="https://www.reclaimprotocol.org/whitepaper"
          >
            Whitepaper
          </ExtMobileLink>
          <ExtMobileLink
            onOpenChange={setOpen}
            href="https://docs.reclaimprotocol.org/"
          >
            Docs
          </ExtMobileLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

interface ExtMobileLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}

function ExtMobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: ExtMobileLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
