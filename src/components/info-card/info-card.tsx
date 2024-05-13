import React from "react";
import styles from "./info-card.module.css"; // Import the CSS module
import Image from "next/image";
import { candal, nunito_sans } from "@/fonts/fonts";

// Define the prop types
interface CardProps {
  header?: string;
  subheader?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const CardComponent: React.FC<CardProps> = ({
  header,
  subheader,
  description,
  imageUrl,
  imageAlt,
  imageHeight,
  imageWidth,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageUrl && (
          <Image
            src={imageUrl || ""}
            alt={imageAlt || ""}
            className={styles.cardImage}
            height={imageHeight}
            width={imageWidth}
          />
        )}
      </div>
      <div className={styles.cardContent}>
        <h2 className={`${styles.cardHeader} ${candal.className}`}>{header}</h2>
        <h3 className={styles.cardSubheader}>{subheader}</h3>
        <p className={`${styles.cardDescription} ${nunito_sans.className}`}>{description}</p>
      </div>
    </div>
  );
};

export default CardComponent;
