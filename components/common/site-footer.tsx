import React from "react";

const SiteFooter = () => {
  return (
    <nav className="border border-b">
      <div className="md:container md:max-w-6xl px-3">
        <div className="flex justify-center gap-20 items-center py-5">
          Reclaim Protocol {new Date().getFullYear()} © All rights reserved.
        </div>
      </div>
    </nav>
  );
};

export default SiteFooter;
