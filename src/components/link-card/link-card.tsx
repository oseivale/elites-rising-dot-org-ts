import Image from "next/image";
import Link from "next/link";
import style from './link-card.module.css'

export function LinkCard({
  mainImage,
  externalUrl,
  imgHeight,
  imgWidth,
}: any) {
  return (
    <Link className={style.cardWrapper} href={externalUrl} style={{ display: "inline-block" }}>
      <Image className={style.cardImage} src={mainImage} height={imgHeight} width={imgWidth} alt="" />
    </Link>
  );
}
