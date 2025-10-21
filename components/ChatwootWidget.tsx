'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ChatwootWidget() {
  useEffect(() => {
    // Observador para detectar cuando el widget se carga
    const observer = new MutationObserver(() => {
      const holder = document.getElementById('cw-widget-holder');
      const iframe = document.getElementById('chatwoot_live_chat_widget') as HTMLIFrameElement;
      
      if (holder && iframe) {
        // Remover la clase que oculta el widget
        holder.classList.remove('woot--hide');
        
        // Forzar visibilidad del iframe
        iframe.style.visibility = 'visible';
        iframe.style.display = 'block';
        
        // Detener el observador una vez que el widget esté visible
        observer.disconnect();
      }
    });

    // Observar cambios en el body
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Limpiar el observador al desmontar
    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    // Intentar mostrar el widget después de un pequeño delay
    setTimeout(() => {
      const holder = document.getElementById('cw-widget-holder');
      const iframe = document.getElementById('chatwoot_live_chat_widget') as HTMLIFrameElement;
      
      if (holder) {
        holder.classList.remove('woot--hide');
      }
      
      if (iframe) {
        iframe.style.visibility = 'visible';
        iframe.style.display = 'block';
      }
    }, 500);
  };

  return (
    <Script 
      id="chatwoot-widget" 
      strategy="afterInteractive"
      onLoad={handleLoad}
    >
      {`
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
            
            // Forzar visibilidad después de inicializar
            setTimeout(function() {
              var holder = document.getElementById('cw-widget-holder');
              var iframe = document.getElementById('chatwoot_live_chat_widget');
              
              if (holder) {
                holder.classList.remove('woot--hide');
                holder.style.display = 'block';
              }
              
              if (iframe) {
                iframe.style.visibility = 'visible';
                iframe.style.display = 'block';
              }
            }, 1000);
          }
        })(document,"script");
      `}
    </Script>
  );
}