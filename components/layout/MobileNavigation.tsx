import Link from "next/link";
import { useState } from "react";
import { FaLinkedin, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";


interface LinkType {
  href: string;
  label: string;
}

interface MobileNavigationProps {
  links: LinkType[];
  linkedIn: string;
  pathname: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  links,
  linkedIn,
  pathname,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const isActiveLink = (linkHref: string): boolean => {
    return linkHref === "/" ? pathname === "/" : pathname.startsWith(linkHref);
  };

  const isPathWork = pathname.startsWith("/work");

  return (
    <div className={`lg:hidden font-semibold font-workSans `}>
      <div
        className={`border-b-2 px-6 py-5 flex items-center justify-between ${isPathWork && "bg-black text-white border-none"}`}
      >
        <button onClick={toggleMenu}>
          <FaBars size={24} />
        </button>
        <Link
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isPathWork && "text-blue-500"}`}
        >
          <FaLinkedin size={24} />
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
              <button onClick={toggleMenu} className="text-start">
                <IoClose width={24} />
              </button>
              {links.map((link) => {
                const isActive = isActiveLink(link.href);
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
            <Link
              href="#contact_me"
              onClick={toggleMenu}
              className="text-contactMe w-[134px] h-[36px] border-2 border-black rounded-[5px] text-xs self-start mt-auto flex items-center justify-center mb-[24px]"
            >
              Contact Me
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNavigation;
