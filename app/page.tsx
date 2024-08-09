"use client";
// Next & React Imports
import Image from "next/image";
import Link from "next/link";

// UI Imports
import { Button } from "@/components/ui/button";

// Third party Imports
import { Package } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-100, -600]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const transition = {
    type: "easeInOut",
    duration: 0.8, // Adjust duration as needed
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center overflow-x-hidden">
      <div className="w-full h-screen relative overflow-hidden flex justify-center items-center">
        <div className="z-50 w-[50%] h-full text-center text-white flex justify-center items-end">
          Embark on your sacred journey with Bakhla Travels, offering
          comprehensive Hajj and Umrah packages. Enjoy seamless travel
          arrangements, comfortable accommodations, and dedicated support to
          ensure a spiritually enriching experience.
        </div>
        <div className=" absolute w-full h-[70%] bottom-0 bg-gradient-to-b from-transparent to-black z-40 pointer-events-none"></div>
        <Image
          fill
          src={"/images/clouds.jpg"}
          alt={"clouds"}
          className="absolute object-cover bottom-0 left-0 right-0 scale-105 pointer-events-none"
        />
        <motion.div
          style={{
            y: imageY,
          }}
          className="absolute z-20 h-full object-cover bottom-0 left-0 right-0 scale-105 pointer-events-none"
        >
          <Image
            fill
            src={"/images/makkah.png"}
            alt={"makkah"}
            className="pointer-events-none object-cover"
          />
        </motion.div>
        <motion.div
          style={{ y }}
          className="text-9xl absolute font-bold tracking-tighter z-10 flex flex-col justify-center items-center"
        >
          <h1 className="text-black">BETTER</h1>
          <h1 className="text-red-700">PILGRIMAGE</h1>
        </motion.div>
      </div>
      <div className="w-full h-screen bg-black"></div>
    </div>
  );
}
