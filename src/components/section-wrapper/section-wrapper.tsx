import { candal, nunito_sans, titillium_web } from "@/fonts/fonts";
import style from "./section-wrapper.module.css";

export function SectionWrapper({ sectionHeader, sectionSubheader, sectionContainerStyles, children, hashId }: any) {
  return (
    <section id={style[hashId]} style={sectionContainerStyles} className={style.sectionContainer}>
        <h1 className={candal.className}>{sectionHeader}</h1>
        <h2 className={nunito_sans.className}>{sectionSubheader}</h2>
      <div className={hashId === 'sponsorSection' ? '' : style.sectionWrapper}>{children}</div>
    </section>
  );
}
