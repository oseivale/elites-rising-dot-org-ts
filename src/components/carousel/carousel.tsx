"use client";
import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import style from "./carousel.module.css";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export function EmblaCarousel(slides: any) {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  console.log("slides", slides);

  return (
    <div className="embla" ref={emblaRef}>
      <div className={style["embla__container"]}>
        {slides.slides?.map((slide: any) => {
          console.log("slide", slide);
          return (
            <div key={slide.sys.id} className={style["embla__slide"]}>
              <Image
                className={style.slideImage}
                height={slide.fields.mainImage.fields.file.details.image.height}
                width={slide.fields.mainImage.fields.file.details.image.width}
                alt=""
                src={`https:${slide.fields.mainImage.fields.file.url}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
