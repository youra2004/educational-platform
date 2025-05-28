"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink>;

export const Link = ({
  href,
  children,
  className = "",
  ...rest
}: LinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <NextLink
      href={href}
      className={`hover:text-accent text-secondary ${isActive ? "underline" : ""} ${className}`}
      {...rest}
    >
      {children}
    </NextLink>
  );
};
