import { Layout } from "@/components/layout/layout";
import { PageWrapper } from "@/components/page-wrapper/page-wrapper";
import { loader } from "@/contentful/contentful";
import { candal, nunito_sans } from "@/fonts/fonts";

export default async function Community() {
  const pageData = await loader();
  const communityPageData =
    pageData.props.entries.items[0].fields.sitePages.filter(
      (page: any) => page.fields.path === "/community"
    )[0];

  return (
    <>
      <head>
        <title>{communityPageData.fields.seo.fields.metaTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={communityPageData.fields.seo.fields.metaDescription}
        />
        {communityPageData.fields.seo.fields.metaKeywords && (
          <meta
            name="keywords"
            content={communityPageData.fields.seo.fields.metaKeywords
              ?.map((keyword: any) => keyword)
              .join(",")}
          />
        )}
      </head>
      <Layout>
        <PageWrapper
          pageHeader={communityPageData.fields.pageHeaderTitle}
          pageHeaderImg={`https:${communityPageData.fields.pageHeaderImage.fields.imageAsset.fields.file.url}`}
        >
          <section>
            {communityPageData.fields.pageRows.map((row: any) => {
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
