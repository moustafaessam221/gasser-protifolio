"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav
      className={`responsive-padding py-6 z-50 flex flex-wrap justify-between items-center border-b ${pathname === "/work" && "bg-black text-white border-none"}`}
    >
      <ul className="flex gap-12">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li
              key={link.href}
              className={`text-xl ${isActive ? "font-bold" : ""}`}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
      <div>
        <FaLinkedin
          size={32}
          className={`${pathname === "/work" && " text-[#8E9FC4] border-none"}`}
        />
      </div>
    </nav>
  );
};

export default NavigationBar;
