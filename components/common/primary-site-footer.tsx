import React from "react";
import { ModeToggle } from "../mode-toggle";

const PrimarySiteFooter = () => {
  return (
    <div className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-[color:var(--line)]">
      <div className="text-center text-sm text-[color:var(--ink-3)]">
        Copyright © {new Date().getFullYear()} Reclaim Protocol. All rights
        reserved.
      </div>
      <div className="mt-2 flex items-center justify-center">
        <div className="inline-flex items-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default PrimarySiteFooter;
