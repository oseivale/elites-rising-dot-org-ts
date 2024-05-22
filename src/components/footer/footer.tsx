import Image from "next/image";
// import { PageLink } from "../PageLink/PageLink";
import style from "./footer.module.css";
import { nunito_sans } from "@/fonts/fonts";
import { Facebook } from "@/icons/facebook";
import { LinkedIn } from "@/icons/linkedin";
import { Instagram } from "@/icons/instagram";
import Link from "next/link";

// Define the types for the props
interface FooterLink {
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

interface FooterProps {
  footerLinks: FooterLink[];
  socialLogos?: {
    facebook: JSX.Element;
    linkedIn: JSX.Element;
    instagram: JSX.Element;
  }; // Optional, depending on how you want to handle social icons
  brandLogo?: string; // Optional, depends if you use brandLogo in your component, which is not used in the given code
}

export function Footer({ footerLinks, socialLogos, brandLogo }: FooterProps) {
  return (
    <footer className={style.footerContainer}>
      <div className={style.footerGridWrapper}>
        <div className={`${nunito_sans.className}`}>
          <p>4 Disan Court, Toronto ON</p>
          <p>+1 (647) 572-7559</p>
          <p>elitesrising@gmail.com</p>
          <div className={style.socialLinksContainer}>
            <h1>Stay Connected</h1>
            <div className={style.socialLinksWrapper}>
              <Link href='https://www.linkedin.com/company/elites-rising/' target="_blank">
                <LinkedIn />
              </Link>
              <Link href='https://www.instagram.com/elitesrising/' target="_blank">
                <Instagram />
              </Link>
            </div>
          </div>
        </div>
        <div className={`${style.mobileLinkList} ${nunito_sans.className}`}>
          <h1>Quick Links</h1>
          <ul>
            {footerLinks.map((footerLink, index) => (
              <li key={footerLink.sys.id}>
                <Link
                  className={style.footerbtn}
                  href={footerLink.fields.internalPath}
                >
                  {footerLink.fields.linkLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p
          className={style.copyrightText}
        >&copy; {`Copyright ${new Date().getFullYear()} | Elites Rising`}</p>
      </div>
    </footer>
  );
}
