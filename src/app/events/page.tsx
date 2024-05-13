import Calendar from "@/components/calendar/calendar";
import { Layout } from "@/components/layout/layout";
import { PageWrapper } from "@/components/page-wrapper/page-wrapper";
import { loader } from "@/contentful/contentful";
import { candal, nunito_sans } from "@/fonts/fonts";

export default async function Events() {
  const pageData = await loader();
  const eventsPageData =
    pageData.props.entries.items[0].fields.sitePages.filter(
      (page: any) => page.fields.path === "/events"
    )[0];

  return (
    <>
      <head>
        <title>{eventsPageData.fields.seo.fields.metaTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={eventsPageData.fields.seo.fields.metaDescription}
        />
        {eventsPageData.fields.seo.fields.metaKeywords && (
          <meta
            name="keywords"
            content={eventsPageData.fields.seo.fields.metaKeywords
              ?.map((keyword: any) => keyword)
              .join(",")}
          />
        )}
      </head>
      <Layout>
        <PageWrapper
          pageHeader={eventsPageData.fields.pageHeaderTitle}
          pageHeaderImg={`https:${eventsPageData.fields.pageHeaderImage.fields.imageAsset.fields.file.url}`}
        >
          <section>
            {eventsPageData.fields.pageRows.map((row: any) => {
              console.log("row", row.fields.foregroundContent[0].fields.header);

              return (
                <div key={row.fields.foregroundContent[0].fields.header}>
                  <h1 className={candal.className}>{row.fields.foregroundContent[0].fields.header}</h1>
                  <p className={nunito_sans.className}>{row.fields.foregroundContent[0].fields.bodyCopy}</p>
                </div>
              );
            })}
          </section>
          <Calendar />
        </PageWrapper>
      </Layout>
    </>
  );
}
