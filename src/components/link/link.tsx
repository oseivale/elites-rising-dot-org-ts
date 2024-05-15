"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./link.module.css";
import { nunito_sans } from "@/fonts/fonts";
import { ArrowForward } from "@/icons/arrow-forward";
import { useEffect, useState } from "react";

export function PageLink({ path, linkLabel, type }: any) {
  const [link, setLink] = useState(null);
  const getLinkType = (linkType: any) => {
    switch (linkType) {
      case "linkPrimary":
        return (
          <Link
            className={`${style.linkPrimary} ${nunito_sans.className}`}
            href={path}
          >
            {linkLabel}
            <ArrowForward />
          </Link>
        );
      case "linkSecondary":
        return (
          <Link
            className={`${style.linkSecondary} ${nunito_sans.className}`}
            href={path}
            target="_blank"
          >
            {linkLabel}
            <ArrowForward />
          </Link>
        );
      default:
        null;
    }
  };

  return <div>{getLinkType(type)}</div>;
}
