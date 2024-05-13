import { createClient, ContentfulClientApi } from 'contentful';
import LoaderFunction from "next/app";

let clientInstance: ContentfulClientApi<undefined>| null = null;

// Define a type for what the loader will return as props to the component
interface LoaderData {
    data: any; // Specify more specific type based on what fetchDataBasedOnPath returns
    pathname: string;
}

export function getContentfulClient(): ContentfulClientApi<undefined>  {
  if (!clientInstance) {
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful space ID and access token must be provided.");
    }

    clientInstance = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
  }

  return clientInstance;
}

export const loader: LoaderFunction = async () => {
    // Fetch data here
    const client = getContentfulClient();
    
    
    // Assuming you know your Content Type ID, for example, 'blogPost'
    const entries = await client.getEntries<Document>({
      content_type: 'siteConfiguration',
      include: 10
    });

     // Getting the pathname from the request URL
    //  const url = new URL(request.url);
    //  const pathname = url.pathname;
  
    return {
      props: {
        entries,
        // pathname
      },
      revalidate: 1, // Enable Incremental Static Regeneration (ISR)
    };
  };