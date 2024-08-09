"use client";
// Next & React imports
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Third party imports
import axios from "axios";

// UI imports
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

export default function PackageCard({
  name,
  image,
  price,
  days,
}: PackageProps) {
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await axios.get(
  //       "https://lacewing-promoted-normally.ngrok-free.app/api/method/bakhla.api.ping.hello"
  //     );
  //     alert("aa gaya data");
  //     console.log(data);
  //   }
  //   fetchData();
  // });
  return (
    <div className="w-full hover:bg-neutral-100 transition-all ease-in-out duration-100 rounded-lg p-4 flex justify-between items-center">
      <PackageImage {...{ image, name }} />
      <PackageDetails {...{ name, price, days }} />
      <div className="w-[300px] h-full flex">
        <div></div>
      </div>
      <PackageActions />
    </div>
  );
}

function PackageImage({ image, name }: { image: string; name: string }) {
  return (
    <div className="w-[200px] h-[200px] relative overflow-hidden rounded-md">
      <Image fill objectFit="cover" src={image} alt={name} />
    </div>
  );
}

function PackageDetails({
  name,
  price,
  days,
}: {
  name: string;
  price: string;
  days: number;
}) {
  return (
    <div className="max-w-[400px]  tracking-tighter">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {name}
      </h3>
      <p className="text-neutral-500 mb-2">
        From <span className="text-red-600">₹{price}</span> / Per Person
      </p>
      <div className="text-neutral-500 flex space-x-2 items-center font-medium">
        <Clock className="w-4" />
        <span>{days} Days</span>
      </div>
    </div>
  );
}

function PackageActions() {
  const [passengersCount, setPassengersCount] = useState(1);
  const [passengersIncludeChild, setPassengersIncludeChild] = useState(false);
  const [childrenCount, setChildrenCount] = useState({
    "0-2": 0,
    "2-6": 0,
    "6-12": 0,
  });

  function handleChildrenCountChange(event: { type: string; value: number }) {
    if (event.type === "0-2") {
      setChildrenCount({ ...childrenCount, "0-2": event.value });
    }
    if (event.type === "2-6") {
      setChildrenCount({ ...childrenCount, "2-6": event.value });
    }
    if (event.type === "6-12") {
      setChildrenCount({ ...childrenCount, "6-12": event.value });
    }
  }

  function handlePassengerCountChange(newCount: number) {
    setChildrenCount({ ["0-2"]: 0, ["2-6"]: 0, ["6-12"]: 0 });
    setPassengersIncludeChild(false);
    setPassengersCount(newCount);
  }

  return (
    <div>
      <Button variant={"link"}>View</Button>
      <Sheet>
        <SheetTrigger>
          <Button className="bg-red-500 hover:bg-red-400">Book Now</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Booking Details</SheetTitle>
            <SheetDescription>
              Please let us know the following details to confirm your booking.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col w-full space-y-4">
            <div className="mt-5 w-full">
              <span className="text-xs text-neutral-400">Total Passengers</span>
              <Input
                value={passengersCount}
                onChange={(e) =>
                  handlePassengerCountChange(Number.parseInt(e.target.value))
                }
                type="number"
                placeholder="1"
                className="outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={passengersIncludeChild}
                onCheckedChange={setPassengersIncludeChild}
                id="airplane-mode"
              />
              <span className="text-sm text-neutral-800">
                Do you have children with you?
              </span>
            </div>
            {passengersIncludeChild && (
              <div className="w-full flex items-center justify-between space-x-2">
                <div className="mt-5 w-full">
                  <span className="text-xs text-neutral-400">0-2 Years</span>
                  <Input
                    type="number"
                    placeholder="1"
                    value={childrenCount["0-2"]}
                    onChange={(e) =>
                      handleChildrenCountChange({
                        type: "0-2",
                        value: Number.parseInt(e.target.value),
                      })
                    }
                    className="outline-none"
                    max={
                      passengersCount -
                      childrenCount["2-6"] -
                      childrenCount["6-12"]
                    }
                  />
                </div>
                <div className="mt-5 w-full">
                  <span className="text-xs text-neutral-400">2-6 Years</span>
                  <Input
                    type="number"
                    placeholder="1"
                    value={childrenCount["2-6"]}
                    onChange={(e) =>
                      handleChildrenCountChange({
                        type: "2-6",
                        value: Number.parseInt(e.target.value),
                      })
                    }
                    className="outline-none"
                    max={
                      passengersCount -
                      childrenCount["0-2"] -
                      childrenCount["6-12"]
                    }
                  />
                </div>
                <div className="mt-5 w-full">
                  <span className="text-xs text-neutral-400">6-12 Years</span>
                  <Input
                    type="number"
                    placeholder="1"
                    value={childrenCount["6-12"]}
                    onChange={(e) =>
                      handleChildrenCountChange({
                        type: "6-12",
                        value: Number.parseInt(e.target.value),
                      })
                    }
                    className="outline-none"
                    max={
                      passengersCount -
                      childrenCount["0-2"] -
                      childrenCount["2-6"]
                    }
                  />
                </div>
              </div>
            )}
            <div>
              <span className="text-sm text-neutral-400">Add Ons</span>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox />
                <span className="text-sm text-neutral-800">Wheelchair</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox />
                <span className="text-sm text-neutral-800">Personal Guide</span>
              </div>
            </div>
          </div>
          <SheetFooter className="w-full mt-5">
            <SheetClose asChild>
              <Button type="submit" className="w-full">
                Confirm Booking
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Types

interface PackageProps {
  id?: string;
  name: string;
  image: string;
  price: string;
  days: number;
}
