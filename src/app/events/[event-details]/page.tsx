import { Layout } from "@/components/layout/layout";
import { PageLink } from "@/components/link/link";
import { PageWrapper } from "@/components/page-wrapper/page-wrapper";
import { loader } from "@/contentful/contentful";
import { candal, nunito_sans } from "@/fonts/fonts";
import Image from "next/image";

export default async function EventDetails() {
  const eventDetailsPageData = await loader();
  // console.log('eventDetailsPageData', eventDetailsPageData.props.entries.items[0].fields.sitePages)
  const eventsPageData =
    eventDetailsPageData.props.entries.items[0].fields.sitePages.filter(
      (page: any) =>
        page.fields.path === "/events/official-launch-of-elites-rising"
    )[0];

  const columnWrapper = {
    marginBottom: '3rem'
  }

  return (
    <Layout>
      <PageWrapper
        pageHeader={eventsPageData.fields.pageHeaderTitle}
        pageHeaderImg={`https:${eventsPageData.fields.pageHeaderImage.fields.imageAsset.fields.file.url}`}
      >
        <section>
          <div>
            <div style={columnWrapper}>
              <h1 className={candal.className}>
                {
                  eventsPageData.fields.pageRows[0].fields.foregroundContent[0]
                    .fields.eventName
                }
              </h1>
              {eventsPageData.fields.pageRows[0].fields.foregroundContent[0].fields.eventDescription
                .split(/\n/)
                .map((text: any) => {
                  return (
                    <p key={""} className={nunito_sans.className}>
                      {text}
                      <br />
                    </p>
                  );
                })}

              <div>
                <PageLink
                  path={
                    eventsPageData.fields.pageRows[0].fields
                      .foregroundContent[0].fields.eventLink[0].fields
                      .externalUrl
                  }
                  linkLabel={
                    eventsPageData.fields.pageRows[0].fields
                      .foregroundContent[0].fields.eventLink[0].fields.linkLabel
                  }
                  type={"linkSecondary"}
                />
              </div>
            </div>

            <div style={columnWrapper}>
              <h1 className={candal.className}>{"Meet our Panelists"}</h1>
              <div>
                <Image
                  alt={""}
                  height={
                    eventsPageData.fields.pageRows[0].fields
                      .foregroundContent[0].fields.featureImage.fields
                      .imageAsset.fields.file.details.image.height
                  }
                  width={
                    eventsPageData.fields.pageRows[0].fields
                      .foregroundContent[0].fields.featureImage.fields
                      .imageAsset.fields.file.details.image.width
                  }
                  src={`https:${eventsPageData.fields.pageRows[0].fields.foregroundContent[1].fields.imageAsset.fields.file.url}`}
                />
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </Layout>
  );
}
