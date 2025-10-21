'use client';

import Script from 'next/script';

export default function ChatwootWidget() {
  return (
    <>
      <Script
        id="chatwoot-settings"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.chatwootSettings = {
              position: "right",
              type: "standard",
              launcherTitle: "Chatea con nosotros"
            };
          `,
        }}
      />
      <Script
        id="chatwoot-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d, t) {
              var BASE_URL = "https://zzchatwootzz.cerebria.co";
              var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
              g.src = BASE_URL + "/packs/js/sdk.js";
              g.async = true;
              s.parentNode.insertBefore(g, s);
              g.onload = function() {
                if (window.chatwootSDK) {
                  window.chatwootSDK.run({
                    websiteToken: "Jv4XV7KNnB3JfSsivoj7CKeY",
                    baseUrl: BASE_URL
                  });
                } else {
                  console.error("Chatwoot SDK no se cargó correctamente.");
                }
              };
            })(document, "script");
          `,
        }}
      />
    </>
  );
}