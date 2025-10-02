import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  return (
    <Html lang="en">
      <Head>
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href
                  });
                  console.log('Google Analytics initialized with ID: ${GA_ID}');
                `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
