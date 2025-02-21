import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 md:py-6 lg:py-8 text-center text-xl font-medium flex items-center justify-center gap-2 flex-wrap font-workSans">
      <p>Contact me by email:</p>
      <Link
        type="email"
        href="mailto:gasseramr9@gmail.com"
        className="font-bold"
      >
        gasseramr9@gmail.com
      </Link>
    </footer>
  );
};

export default Footer;
