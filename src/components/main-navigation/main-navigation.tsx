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
  const [activeLink, setActiveLink] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [scrollY, setScrollY] = useState<number>(0);

//   function useActiveLink(targetPath:string) {
//     const pathname = usePathname();
//     return pathname === targetPath ? style["active"] : "";
// } 

  useEffect(() => {
    // Function to update the state with the new window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };


    // Adding the event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {windowWidth < 740 ? (
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
      ) : (
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
      )}
    </>
  );
};

export default MainNav;
