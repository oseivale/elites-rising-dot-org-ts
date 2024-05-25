"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import Image from "next/image"; // If needed
import style from "./main-navigation.module.css";
import { Hamburger } from "../../icons/hamburger";
import { Close } from "../../icons/close";
import { nunito_sans } from "@/fonts/fonts";
import { TestLogo } from "@/icons/test-logo";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface NavLink {
  sys: {
    id?: string;
  };
  fields: {
    internalName?: string;
    linkLabel?: string;
    internalPath?: string;
    ariaLabel?: string;
  };
}

interface MainNavProps {
  logo: any;
  navigationLinks?: NavLink[];
}

export const MainNav: FC<MainNavProps> = ({ navigationLinks, logo }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  console.log("logo", logo);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setScrollY(window.scrollY);
      }
    };

    handleScroll();
    if (typeof window !== "undefined")
      window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav
        className={`${style.navContainer} ${open ? style.open : style.close}`}
      >
        <div
          className={
            scrollY > 50 ? style.coloredNavWrapper : style.mobileNavWrapper
          }
        >
          <Link href="/" passHref>
            <span className={style.navLogo}>
              <TestLogo />
            </span>{" "}
            {/* Adjust if you use an image or icon here */}
          </Link>

          <button onClick={toggleOpen}>
            {open ? <Close /> : <Hamburger />}
          </button>
        </div>
        {open && (
          <ul className={style.mobileNavLinkWrapper}>
            {navigationLinks?.map((navLink, index) => (
              <>
                {navLink && (
                  <li className={nunito_sans.className} key={navLink?.sys?.id}>
                    <Link href={navLink?.fields?.internalPath || ""} passHref>
                      <span>{navLink?.fields?.linkLabel}</span>
                    </Link>
                  </li>
                )}
              </>
            ))}
          </ul>
        )}
      </nav>

      <nav className={style.mobileNavContainer}>
        <div
          className={scrollY > 70 ? style.coloredNavWrapper : style.navWrapper}
        >
          <Link href="/" passHref>
            {/* <span className={style.navLogo}>
              <TestLogo />
            </span> */}
            <Image
              className={style.navLogo}
              alt=""
              src={`https:${logo?.fields?.mainImage?.fields?.file?.url}`}
              height={100}
              width={100}
            />
          </Link>
          <ul>
            {navigationLinks?.map((navLink, index) => (
              <>
                {navLink && (
                  <li
                    className={`${style.linkWrapper} ${nunito_sans.className}`}
                    key={navLink?.sys?.id}
                  >
                    <Link
                      href={navLink?.fields?.internalPath || ""}
                      className={`${style.navLink}`}
                      passHref
                    >
                      <span className={style.navLink}>
                        {navLink?.fields?.linkLabel}
                      </span>
                    </Link>
                  </li>
                )}
              </>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
