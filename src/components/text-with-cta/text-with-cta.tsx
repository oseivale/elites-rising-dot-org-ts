import { candal, nunito_sans, raleway, shantell_sans, titillium_web } from "@/fonts/fonts";
import style from "./text-with-cta.module.css";
import Link from "next/link";
import { ArrowForward } from "@/icons/arrow-forward";

export function TextWithCTA({ header, subheader, bodyCopy, contentAlignment, ctas }:any) {
    console.log('contentAlignment', contentAlignment)

  const alignContent = (contentAlignment: any[]) => {
    let alignmentClasses: any[] = []
    if(contentAlignment?.includes('Left on desktop')){
        return alignmentClasses.push(style.leftAlignDesktop)
    }

    if(contentAlignment?.includes('Left on mobile')){
        return alignmentClasses.push(style.leftAlignMobile)
    }

    if(contentAlignment?.includes('Center on desktop')){
        return alignmentClasses.push(style.centerAlignDesktop)
    }

    if(contentAlignment?.includes('Center on mobile')){
        return alignmentClasses.push(style.centerAlignMobile)
    }

    return alignmentClasses
  }  

  const textAlignmentClasses = () => {
    return contentAlignment
      ?.map((item:any) => {
        switch (item) {
          case 'Center on mobile':
            return style.mobileCenterAlign;
          case 'Center on desktop':
            return style.desktopCenterAlign;
          case 'Left on mobile':
            return style.mobileLeftAlign;
          case 'Left on desktop':
            return style.desktopLeftAlign;
          default:
            return '';
        }
      })
      .join(' ');
  };


  console.log('tettt', textAlignmentClasses())
  return (
    <div className={`${style.textWithCTAContainer} `}>
      <div className={`${style.textWithCTAWrapper} ${textAlignmentClasses()}`}>
        <h1 className={candal.className}>{header}</h1>
        <h2 className={titillium_web.className}>{subheader}</h2>
        <p className={nunito_sans.className}>{bodyCopy}</p>
      </div>
      {ctas && (
        <div className={style.linkWrapper}>
        {ctas.map((cta: any) => {
            return (
                <Link key={cta.sys.id} className={`${style.link} ${nunito_sans.className}`} href={cta.fields.internalPath}>{cta.fields.linkLabel}<ArrowForward /></Link>
            )
        })}
      </div>
      )}
      
    </div>
  );
}
