import Image from "next/image";
import Link from "next/link";
import style from "./link.module.css";
import { nunito_sans } from "@/fonts/fonts";
import { ArrowForward } from "@/icons/arrow-forward";

export function PageLink({ path, linkLabel, type }: any) {
  return (
    <Link className={type === 'button' ? `${style.btn} ${nunito_sans.className}` : `${style.link} ${nunito_sans.className}`} href={path}>
      {linkLabel}<ArrowForward />
    </Link>
  );
}
