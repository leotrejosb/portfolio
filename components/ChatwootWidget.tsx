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
            "hideMessageBubble": false,
            "showPopoutButton": true
          };
          
          (function(d,t) {
            var BASE_URL="https://zzchatwootzz.cerebria.co";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: 'MWdFbwGURy8LGaeD96hst8BQ',
                baseUrl: BASE_URL
              });
              
              // Forzar que la burbuja siempre esté visible
              setTimeout(function() {
                // Forzar visibilidad del holder
                var holder = document.querySelector('.woot-widget-holder');
                if (holder) {
                  holder.classList.remove('woot--hide');
                  holder.style.display = 'block';
                  holder.style.visibility = 'visible';
                }
                
                // Forzar visibilidad de la burbuja
                var bubble = document.querySelector('.woot-widget-bubble');
                if (bubble) {
                  bubble.classList.remove('woot--hide');
                  bubble.style.display = 'flex';
                  bubble.style.visibility = 'visible';
                  bubble.style.opacity = '1';
                }
                
                // Forzar visibilidad del bubble holder
                var bubbleHolder = document.querySelector('.woot--bubble-holder');
                if (bubbleHolder) {
                  bubbleHolder.classList.remove('woot--hide');
                  bubbleHolder.style.display = 'flex';
                  bubbleHolder.style.visibility = 'visible';
                }
              }, 500);
              
              // Verificar cada segundo solo para mantener la burbuja visible
              setInterval(function() {
                var holder = document.querySelector('.woot-widget-holder');
                var bubble = document.querySelector('.woot-widget-bubble');
                var bubbleHolder = document.querySelector('.woot--bubble-holder');
                
                // Solo forzar visibilidad de la burbuja, no del iframe
                if (holder && !holder.classList.contains('woot--expanded')) {
                  holder.classList.remove('woot--hide');
                }
                
                if (bubble) {
                  bubble.classList.remove('woot--hide');
                }
                
                if (bubbleHolder) {
                  bubbleHolder.classList.remove('woot--hide');
                }
              }, 1000);
            }
          })(document,"script");
        `
      }}
    />
  );
}