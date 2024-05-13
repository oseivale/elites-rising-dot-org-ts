import { Layout } from "@/components/layout/layout";
import { PageWrapper } from "@/components/page-wrapper/page-wrapper";

export default async function EventDetails() {
    return (
        <Layout>
          <PageWrapper
                pageHeader={"Event Details"}
                pageHeaderImg={"/zachary-nelson-98Elr-LIvD8-unsplash (1).jpg"}>
          </PageWrapper>
        </Layout>
      );
}