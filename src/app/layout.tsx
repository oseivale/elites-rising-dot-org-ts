import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { loader } from "@/contentful/contentful";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

// eslint-disable-next-line @next/next/no-async-client-component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageData = await loader();
  const homePageData = pageData.props.entries.items[0].fields.sitePages.filter(
    (page: any) => page.fields.path === '/'
  )[0];

  console.log('pageData', pageData)

  return (
    <>
      <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </>
  
  );
}
