import { Layout } from "@/components/layout/layout";
import { PageWrapper } from "@/components/page-wrapper/page-wrapper";
import { loader } from "@/contentful/contentful";
import { candal, nunito_sans } from "@/fonts/fonts";

export default async function OurStory() {
  const pageData = await loader();
  const ourStoryPageData =
    pageData.props.entries.items[0].fields.sitePages.filter(
      (page: any) => page?.fields?.path === "/about"
    )[0];

  console.log(
    "pageData",
    pageData.props.entries.items[0].fields.sitePages.filter(
      (page: any) => page?.fields?.path === "/about"
    )
  );

  return (
    <>
      <head>
        <title>{ourStoryPageData.fields.seo.fields.metaTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={ourStoryPageData.fields.seo.fields.metaDescription}
        />
        {ourStoryPageData.fields.seo.fields.metaKeywords && (
          <meta
            name="keywords"
            content={ourStoryPageData.fields.seo.fields.metaKeywords
              ?.map((keyword: any) => keyword)
              .join(",")}
          />
        )}
      </head>
      <Layout>
        <PageWrapper
          pageHeader={ourStoryPageData.fields.pageHeaderTitle}
          pageHeaderImg={`https:${ourStoryPageData.fields.pageHeaderImage.fields.imageAsset.fields.file.url}`}
        >
          <section>
            {ourStoryPageData.fields.pageRows.map((row: any) => {
              console.log("row", row.fields.foregroundContent[0].fields.header);

              return (
                <div key={row.fields.foregroundContent[0].fields.header}>
                  <h1 className={candal.className}>{row.fields.foregroundContent[0].fields.header}</h1>
                  <p className={nunito_sans.className}>{row.fields.foregroundContent[0].fields.bodyCopy}</p>
                </div>
              );
            })}
          </section>
        </PageWrapper>
      </Layout>
    </>
  );
}
