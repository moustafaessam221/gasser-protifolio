"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";
import MobileNavigation from "./MobileNavigation";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];
const linkedIn = "https://www.linkedin.com/in/gasseramr";

const NavigationBar = () => {
  const pathname = usePathname();

  function isActiveLink(linkHref: string, currentPathname: string) {
    return linkHref === "/"
      ? currentPathname === "/"
      : currentPathname.startsWith(linkHref);
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block relative">
        {/* Base Navigation */}
        <nav
          className={`responsive-padding py-6 z-40 flex flex-wrap justify-between items-center bg-white text-black ${
            !pathname.startsWith("/work") && "border-b"
          }`}
        >
          <ul className="flex flex-wrap  lg:gap-[200px] font-workSans">
            {links.map((link) => {
              const isActive = isActiveLink(link.href, pathname);
              return (
                <li
                  key={link.href}
                  className={`text-xl ${isActive ? "font-bold text-black" : ""}`}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              );
            })}
          </ul>
          <Link href={linkedIn} target="_blank" rel="noopener noreferrer">
            <FaLinkedin
              size={32}
              className="transition-colors duration-300 ease-in-out"
            />
          </Link>
        </nav>

        {/* Overlay Navigation for dark theme */}
        <nav
          className={`absolute top-0 left-0 w-full responsive-padding py-6 z-30 flex flex-wrap justify-between items-center bg-black text-white
        transition-[clip-path] duration-500 ease-in-out
        ${
          pathname.startsWith("/work")
            ? "clip-path-from-right"
            : "clip-path-to-right"
        }`}
        >
          <ul className="flex gap-[200px] font-workSans">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
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
          <Link href={linkedIn} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={32} className="text-[#8E9FC4]" />
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation links={links} linkedIn={linkedIn} pathname={pathname} />
    </>
  );
};

export default NavigationBar;
