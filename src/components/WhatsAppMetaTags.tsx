import React from 'react';
import Head from '@docusaurus/Head';

export default function WhatsAppMetaTags(): JSX.Element {
  return (
    <Head>
      {/* WhatsApp-specific meta tags */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content="https://docs.wp-llm.com/img/og-image.png" />
      
      {/* Additional WhatsApp compatibility tags */}
      <meta property="og:image:alt" content="WP LLM - Supercharge WordPress with AI" />
      <meta name="twitter:image:alt" content="WP LLM - Supercharge WordPress with AI" />
      
      {/* Cache busting for WhatsApp (optional) */}
      <meta property="og:image" content="https://docs.wp-llm.com/img/og-image.png?v=1" />
    </Head>
  );
}
