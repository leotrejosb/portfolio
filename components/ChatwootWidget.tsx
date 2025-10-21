'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    chatwootSettings?: Record<string, any>;
    chatwootSDK?: {
      run: (options: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

export default function ChatwootWidget() {
  useEffect(() => {
    // Evita recargar el script si ya existe
    if (document.getElementById('chatwoot-script')) return;

    const BASE_URL = 'https://zzchatwootzz.cerebria.co';
    window.chatwootSettings = {
      position: 'right',
      type: 'standard',
      launcherTitle: 'Chatea con nosotros',
    };

    const g = document.createElement('script');
    g.id = 'chatwoot-script';
    g.src = `${BASE_URL}/packs/js/sdk.js`;
    g.async = true;
    document.body.appendChild(g);

    g.onload = () => {
      // Asegura que chatwootSDK esté disponible antes de usarlo
      const tryInit = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken: 'Jv4XV7KNnB3JfSsivoj7CKeY',
            baseUrl: BASE_URL,
          });

          // Forzar visibilidad después de iniciar
          setTimeout(() => {
            const elements = [
              document.querySelector('.woot-widget-holder'),
              document.querySelector('.woot-widget-bubble'),
              document.querySelector('.woot--bubble-holder'),
            ];
            elements.forEach((el) => {
              if (el instanceof HTMLElement) {
                el.classList.remove('woot--hide');
                el.style.display = 'flex';
                el.style.visibility = 'visible';
                el.style.opacity = '1';
              }
            });
          }, 800);
        } else {
          // Reintentar si todavía no cargó completamente
          setTimeout(tryInit, 500);
        }
      };

      tryInit();
    };
  }, []);

  return null;
}
