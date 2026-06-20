"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavHeaderProps {
  activePage?: string;
}

const tabs = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/contact", label: "Contact" },
  { href: "/issue", label: "Report Issue" },
];

function NavHeader({ activePage = "/" }: NavHeaderProps) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border border-border glass-panel p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.href}
          setPosition={setPosition}
          isActive={activePage === tab.href}
        >
          <Link href={tab.href}>{tab.label}</Link>
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  isActive,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  isActive: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs font-medium md:px-5 md:py-2.5 md:text-sm transition-colors duration-200 ${
        isActive
          ? "text-primary"
          : "text-text-muted hover:text-text-main"
      }`}
    >
      {children}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="absolute z-0 h-7 rounded-full bg-white/10 md:h-10"
    />
  );
};

export default NavHeader;
