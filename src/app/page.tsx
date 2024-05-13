import { EmblaCarousel } from "@/components/carousel/carousel";
import FlexGrid from "@/components/flex-grid";
import { HeroBanner } from "@/components/hero-banner/hero-banner";
import { Layout } from "@/components/layout/layout";
import Navbar from "@/components/main-navigation/main-navigation";
import { PageWrapper } from "@/components/page-wrapper/page-wrapper";
import { SectionWrapper } from "@/components/section-wrapper/section-wrapper";
import SEO from "@/components/seo/seo";
import { TextWithCTA } from "@/components/text-with-cta/text-with-cta";
import { loader } from "@/contentful/contentful";
import { useMetadata } from "@/contexts/metadata";
import Image from "next/image";
import { useParams } from "next/navigation";

export default async function Home() {
  const pageData = await loader();
  const homePageData = pageData.props.entries.items[0].fields.sitePages.filter(
    (page: any) => page.fields.path === "/"
  )[0];
  console.log("home data", homePageData.fields.seo.fields);

  // const { metadata, setMetadata } = useMetadata();
  // setMetadata({ title: homePageData.fields.seo.fields.metaTitle, description: homePageData.fields.seo.fields.metaDescription, keywords: homePageData.fields.seo.fields.metaKeywords.map((keyword:any) => keyword).join(",") });

  // return <Navbar logo={''} navigationLinks={navigationLinks} />
  console.log(
    "HERO",
    pageData.props.entries.items[0].fields.globalHeader.fields.heroSection
      .fields.foregroundContent
  );

  const heroData =
    pageData.props.entries.items[0].fields.globalHeader.fields.heroSection;

  const createSection = (pageRows: any) => {
    return pageRows.map((row: any) => {
      console.log("row", row.fields);

      return (
        <SectionWrapper
          key={row?.sys.id}
          hashId={row?.fields?.hashId}
          sectionHeader={row?.fields?.sectionHeader}
        >
          <FlexGrid
            content={row?.fields?.foregroundContent}
            cols={row.fields.numberOfColumnsDesktop}
          />
        </SectionWrapper>
      );
    });
  };

  return (
    <>
      <head>
        <title>{homePageData.fields.seo.fields.metaTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={homePageData.fields.seo.fields.metaDescription}
        />
        {homePageData.fields.seo.fields.metaKeywords && (
          <meta
            name="keywords"
            content={homePageData.fields.seo.fields.metaKeywords
              ?.map((keyword: any) => keyword)
              .join(",")}
          />
        )}
      </head>
      <Layout>
        <HeroBanner
          desktopBgImage={""}
          sectionHeader={heroData.fields.sectionHeader}
          sectionSubheader={heroData.fields.sectionSubheader}
          ctas={heroData.fields.foregroundContent}
        />
        {createSection(homePageData.fields.pageRows)}
      </Layout>
    </>
  );
}
