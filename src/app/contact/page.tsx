import ContactForm from "@/components/contact-form/contact-form";
import { Layout } from "@/components/layout/layout";
import { PageWrapper } from "@/components/page-wrapper/page-wrapper";
import { loader } from "@/contentful/contentful";
import { candal, nunito_sans } from "@/fonts/fonts";

export default async function Contact() {
  const pageData = await loader();
  const contactPageData =
    pageData.props.entries.items[0].fields.sitePages.filter(
      (page: any) => page?.fields?.path === "/contact"
    )[0];

  return (
    <>
      <head>
        <title>{contactPageData?.fields?.seo?.fields?.metaTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={contactPageData?.fields?.seo?.fields?.metaDescription}
        />
        {contactPageData?.fields?.seo?.fields?.metaKeywords && (
          <meta
            name="keywords"
            content={contactPageData.fields.seo.fields.metaKeywords
              ?.map((keyword: any) => keyword)
              .join(",")}
          />
        )}
      </head>
      <Layout>
        <PageWrapper
          pageHeader={contactPageData?.fields?.pageHeaderTitle}
          pageHeaderImg={`https:${contactPageData?.fields?.pageHeaderImage?.fields?.imageAsset?.fields?.file?.url}` || ''}
        >
          <section>
            {contactPageData?.fields?.pageRows?.map((row: any) => {

              return (
                <div key={row.fields.foregroundContent[0].fields.header}>
                  <h1 className={candal.className}>{row.fields.foregroundContent[0].fields.header}</h1>
                  <p className={nunito_sans.className}>{row.fields.foregroundContent[0].fields.bodyCopy}</p>
                  <h2 className={candal.className}>Fill out the form below and one of our members will be in touch!</h2>
                  <ContactForm />
                </div>
              );
            })}
          </section>
        </PageWrapper>
      </Layout>
    </>
  );
}
