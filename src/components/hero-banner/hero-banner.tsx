import Image from "next/image";
import style from "./hero-banner.module.css";
import {
  candal,
  nunito_sans,
  shantell_sans,
  titillium_web,
} from "@/fonts/fonts";
import Link from "next/link";
import { PageLink } from "../link/link";

export function HeroBanner({
  desktopBgImage,
  sectionHeader,
  sectionSubheader,
  ctas,
}: any): JSX.Element {
  const parseHeader = (text: any) => {
    const formattedText = text.split("|");
    return formattedText;
  };
  return (
    <section className={style.heroContainer}>
      <div className={style.heroImgWrapper}>
        <Image
          className={style.heroImg}
          alt="Hero Banner" // Improved alt text for accessibility
          src="/tamarcus-brown-T3uKisfmABY-unsplash.jpg"
          width={1000}
          height={1000}
        />
      </div>
      <div className={style.contentWrapper}>
        <div className={style.textWrapper}>
          <h1 className={candal.className}>
            {parseHeader(sectionHeader)[0]}{" "}
            <span className={style.coloredTitle}>
              {parseHeader(sectionHeader)[1]}
            </span>
          </h1>
          <h2 className={nunito_sans.className}>{sectionSubheader}</h2>
          {/* <p>Test body copy</p> */}
        </div>
        {ctas && (
          <div className={style.linkWrapper}>
            {ctas.map((cta: any) => {
              return (
                <PageLink key={cta.sys.id} type={'linkPrimary'} path={cta.fields.internalPath} linkLabel={cta.fields.linkLabel} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
