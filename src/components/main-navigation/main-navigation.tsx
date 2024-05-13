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
    id: string;
  };
  fields: {
    internalName: string;
    linkLabel: string;
    internalPath: string;
    ariaLabel: string;
  };
}

interface MainNavProps {
  navigationLinks: NavLink[];
}

export const MainNav: FC<MainNavProps> = ({ navigationLinks }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

// function useWindowSize() {
//   const isSSR = typeof window === 'undefined';
//   const [windowSize, setWindowSize] = useState({
//     width: 1200, // Default width during SSR
//     height: 800, // Default height during SSR
//   });

//   function handleResize() {
//     setWindowSize({
//       width: isSSR ? 1200 : window.innerWidth,
//       height: isSSR ? 800 : window.innerHeight,
//     });
//   }

//   useEffect(() => {
//     if (!isSSR) {
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//     }
//   }, []);

//   return windowSize;
// }

// const { width, height }: any = useWindowSize();

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setScrollY(window.scrollY);
      }
    };

    handleScroll();
    if (typeof window !== "undefined") window.addEventListener("scroll", handleScroll);
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
              <span className={style.navLogo}>ICON</span>{" "}
              {/* Adjust if you use an image or icon here */}
            </Link>

            <button onClick={toggleOpen}>
              {open ? <Close /> : <Hamburger />}
            </button>
          </div>
          {open && (
            <ul className={style.mobileNavLinkWrapper}>
              {navigationLinks.map((navLink, index) => (
                <li className={nunito_sans.className} key={navLink.sys.id}>
                  <Link href={navLink.fields.internalPath || ""} passHref>
                    <span>{navLink.fields.linkLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <nav className={style.mobileNavContainer}>
          <div
            className={
              scrollY > 70 ? style.coloredNavWrapper : style.navWrapper
            }
          >
            <Link href="/" passHref>
              <span className={style.navLogo}>
                <TestLogo />
              </span>
            </Link>
            <ul>
              {navigationLinks.map((navLink, index) => (
                <li
                  className={`${style.linkWrapper} ${nunito_sans.className}`}
                  key={navLink.sys.id}
                >
                  <Link
                    href={navLink.fields.internalPath}
                    className={`${style.navLink}`}
                    passHref
                  >
                    <span className={style.navLink}>
                      {navLink.fields.linkLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

    </>
  );
};

export default MainNav;
