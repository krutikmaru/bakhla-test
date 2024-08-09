// Next & React imports
import React from "react";

// UI imports
import { Separator } from "@/components/ui/separator";
import { packages } from "@/app/lib/data/packages";
import PackageCard from "@/app/ui/components/packages/PackageCard";

function Page() {
  return (
    <div className="w-full p-10">
      <h1 className="text-4xl font-semibold tracking-tighter">Packages</h1>
      <h3 className="scroll-m-20 mt-10 mb-4 text-2xl font-semibold tracking-tight">
        Hajj
      </h3>
      <div>
        {packages.map((p) => {
          return (
            <>
              <PackageCard
                key={p.name}
                name={p.name}
                image={p.image}
                price={p.price}
                days={p.days}
              />
              <Separator />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
