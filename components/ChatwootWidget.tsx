'use client';

import Script from 'next/script';

export default function ChatwootWidget() {
  return (
    <Script 
      id="chatwoot-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.chatwootSettings = {
            "position": "right",
            "type": "expanded_bubble",
            "launcherTitle": "Chatea con nosotros",
            "hideMessageBubble": false
          };
          
          (function(d,t) {
            var BASE_URL="https://zzchatwootzz.cerebria.co";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: '4VcyLAofaVmTTCWxjincMHrS',
                baseUrl: BASE_URL
              });
              
              // Forzar visibilidad de la burbuja flotante
              setTimeout(function() {
                var holder = document.querySelector('.woot-widget-holder');
                var bubble = document.querySelector('.woot-widget-bubble');
                var bubbleHolder = document.querySelector('.woot--bubble-holder');
                
                // Remover clases que ocultan
                if (holder) {
                  holder.classList.remove('woot--hide');
                }
                
                if (bubbleHolder) {
                  bubbleHolder.classList.remove('woot--hide');
                }
                
                // Hacer visible la burbuja
                if (bubble) {
                  bubble.classList.remove('woot--hide');
                  bubble.style.visibility = 'visible';
                  bubble.style.display = 'flex';
                  bubble.style.opacity = '1';
                }
              }, 1500);
            }
          })(document,"script");
        `
      }}
    />
  );
}