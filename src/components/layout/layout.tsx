import React, { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image"; // Import if needed, based on usage in the component
import { Footer } from "../footer/footer";
import MainNav from "../main-navigation/main-navigation";
// import { footerData, columns, mainNavLinks } from "../data"; // Ensure types for these imports
import { arimo, nunito_sans, grupo, staatliches } from "../../fonts/fonts"; // Ensure these are typed if necessary
import { loader } from "@/contentful/contentful";
import SEO from "../seo/seo";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = async ({
  children,
}) => {
  const pageData = await loader();

  return (
    <>
      <MainNav
        navigationLinks={
          pageData.props.entries.items[0].fields.globalHeader.fields
            .mainNavigation.fields.navigationLinks
        }
      />
      <main>{children}</main>
      <Footer
        footerLinks={
          pageData.props.entries.items[0].fields.globalFooter.fields.footerLinks
        }
      />
    </>
  );
};
