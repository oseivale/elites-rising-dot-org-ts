import React, { ReactNode } from "react";
import Link from "next/link";
import style from "./page-wrapper.module.css";
// import {
//   arimo,
//   candal,
//   nunito_sans,
//   raleway,
//   titillium_web,
// } from '@/fonts/fonts';
import { Truculenta } from "next/font/google";
import Image from "next/image";
import { candal, nunito_sans } from "@/fonts/fonts";

// Define the type for the props
interface PageWrapperProps {
  pageHeader: string;
  children?: ReactNode;
  pageHeaderImg: string;
}

// Functional component with typed props
export const PageWrapper: React.FC<PageWrapperProps> = ({
  pageHeader,
  children,
  pageHeaderImg,
}) => {
  return (
    <div className={style.pageContainer}>
      <section className={style.pageHeader}>
        <div className={` ${style.headerWrapper}`}>
          <h1 className={candal.className}>{pageHeader}</h1>
        </div>
        <div
          style={{ backgroundImage: `url(${pageHeaderImg})` }}
          className={style.imageWrapper}
        ></div>
        <div className={style.mobileHeaderImgWrapper}>
          <Image
            className={style.mobileHeaderImg}
            alt=""
            src={pageHeaderImg}
            height={200}
            width={200}
          />
        </div>
      </section>
      <div className={style.contentWrapper}>
        <aside className={`${style.sideBar}`}>
          <div>
            <h1 className={candal.className}>Address</h1>
            <p className={nunito_sans.className}>4 Disan Court,</p>
            <p className={nunito_sans.className}>Toronto ON</p>
          </div>
          {/* <Link className={style.quickLink} href='#'>Blog</Link> */}

          <div>
            <h1 className={candal.className}>Contact Info</h1>
            <p className={nunito_sans.className}>elitesrising@gmail.com</p>
            <p className={nunito_sans.className}>+1 (647) 572-7559</p>
          </div>
        </aside>
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};
