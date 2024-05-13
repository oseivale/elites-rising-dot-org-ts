import Head from 'next/head';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    ogType?: string;
    ogUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, author, ogType, ogUrl, ogTitle, ogDescription, ogImage }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {author && <meta name="author" content={author} />}
            {ogType && <meta property="og:type" content={ogType} />}
            {ogUrl && <meta property="og:url" content={ogUrl} />}
            {ogTitle && <meta property="og:title" content={ogTitle} />}
            {ogDescription && <meta property="og:description" content={ogDescription} />}
            {ogImage && <meta property="og:image" content={ogImage} />}
        </Head>
    );
};

export default SEO;
