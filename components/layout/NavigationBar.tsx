"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaLinkedin, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const links: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];
const linkedIn = "https://www.linkedin.com/in/gasseramr";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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
      <div className="lg:hidden font-semibold font-workSans">
        <div className="border-b-2 px-6 py-5 w-full flex items-center justify-between">
          <button onClick={toggleMenu}>
            <FaBars size={24} />
          </button>
          <Link href={linkedIn} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={16} />
          </Link>
        </div>
        {isOpen && (
          <>
            {/* Overlay */}
            <button
              className="fixed inset-0 bg-black opacity-50 z-[150]"
              onClick={toggleMenu}
            ></button>

            {/* Menu with sliding transition */}
            <div
              className={`w-[202px] h-screen fixed top-0 left-0 bg-white z-[200] pl-6 pt-4 text-[20px] flex flex-col gap-8 transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <ul className="flex flex-col gap-8">
                <button onClick={toggleMenu} className="text-start w-3 h-4">
                  <IoClose width={10} />
                </button>
                {links.map((link) => {
                  const isActive = isActiveLink(link.href, pathname);
                  return (
                    <li
                      key={link.href}
                      className={`${
                        isActive ? "font-bold text-black" : "text-notSelected"
                      }`}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  );
                })}
              </ul>
              {/* Push button to the bottom of the flex container */}
              <button className="text-contactMe w-[134px] h-[36px] border-2 border-black rounded-[5px] text-xs self-end mt-auto">
                Contact Me
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NavigationBar;
