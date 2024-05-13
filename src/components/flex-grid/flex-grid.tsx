"use client";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import { TextWithCTA } from "../text-with-cta/text-with-cta";
import Link from "next/link";
import { LinkCard } from "../link-card/link-card";
import CardComponent from "../info-card/info-card";
import { EmblaCarousel } from "../carousel/carousel";
import styles from './flex-grid.module.css'

interface FlexGridProps {
  content: any[]; // Accepts any ReactNode as children
  cols?: number; // Optional prop to define the number of columns
}

const FlexGrid: React.FC<FlexGridProps> = ({ content, cols=1 }) => {
  // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const { width, height }: any = useWindowSize();

  function useWindowSize() {
    const isSSR = typeof window === 'undefined';
    const [windowSize, setWindowSize] = useState({
      width: isSSR ? 1200 : window.innerWidth, // Default width during SSR
      height: isSSR ? 800 : window.innerHeight, // Default height during SSR
    });
  
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  
    useEffect(() => {
      if (!isSSR) {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, []);
  
    return windowSize;
  }
  // useEffect(() => {
  //   // Function to update the state with the new window width
  //   const handleResize = () => {
  //     if (typeof window !== "undefined") {
  //       // Safe to access window object
  //       setWindowWidth(window.innerWidth);
  //       console.log(window.location.href);
  //       // Adding the event listener for window resize
  //       window.addEventListener("resize", handleResize);
  //     }
  //   };

  //   // Cleanup function to remove the event listener
  //   return () => window !== null && window.removeEventListener("resize", handleResize);
  // }, []); 

  // Calculate width from columns number
  const colWidth = Math.floor(100 / cols);
  const gridStyle = {
    flexBasis: `${colWidth}%`,
    maxWidth: `${colWidth}%`,
    padding: "1rem",
  };

  const mobileGridStyle = {
    // flexBasis: `100%`,
    maxWidth: `100%`,
    padding: "1rem",
    justifyContent: "center",
  };

  const renderComponent = (type: any) => {
    console.log("type", type.fields);
    switch (type.sys.contentType.sys.id) {
      case "imageWrapper":
        return (
          <Image
            style={{
              borderRadius: "10px",
              display: "inline-block",
              margin: "0 auto",
            }}
            alt=""
            height={type?.fields?.imageAsset?.fields?.file.details.image.height}
            width={type?.fields?.imageAsset?.fields?.file.details.image.width}
            src={`https:${type?.fields?.imageAsset?.fields?.file.url}`}
          />
        );
      case "textWithCta":
        return (
          <TextWithCTA
            header={type.fields.header}
            subheader={type.fields.subHeader}
            bodyCopy={type.fields.bodyCopy}
            contentAlignment={type.fields.contentAlignment}
            ctas={type.fields.ctAs}
          />
        );
      case "linkCard":
        return (
          <LinkCard
            mainImage={`https:${type.fields.mainImage.fields.file.url}`}
            externalUrl={type.fields.externalUrl}
            imgHeight={
              type?.fields?.mainImage?.fields?.file.details.image.height
            }
            imgWidth={type?.fields?.mainImage?.fields?.file.details.image.width}
          />
        );
      case "imageCard":
        return (
          <CardComponent
            header={type.fields.cardHeader}
            subheader={type.fields.cardSubheader}
            description={type.fields.cardDescription}
            imageUrl={`https:${type.fields?.cardImage?.fields?.imageAsset?.fields?.file?.url}`}
            imageAlt={""}
            imageHeight={
              type.fields.cardImage.fields.imageAsset.fields?.file.details.image
                .height
            }
            imageWidth={
              type.fields.cardImage.fields.imageAsset.fields?.file.details.image
                .width
            }
          />
        );
      case "carousel":
        return (
          <div style={{ padding: "5rem 0" }}>
            <EmblaCarousel slides={type.fields.slides} />
          </div>
        );
      default:
        return <div>NOTHING</div>;
    }
  };

  return (
    <div className={styles.flexGridDesktop}>
      {content?.map((item) => {
        return (
          <div
            key={item?.sys.id}
            style={width > 740 ? gridStyle : mobileGridStyle}
          >
            {renderComponent(item)}
          </div>
        );
      })}
    </div>
  );
};

export default FlexGrid;
