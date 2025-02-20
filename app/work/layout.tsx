import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-[rgba(0,0,0,0.93)] pb-48">{children}</div>;
}
