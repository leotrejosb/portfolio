'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

// Declaración de tipos para window
declare global {
  interface Window {
    chatwootSettings?: {
      position: string;
      type: string;
      launcherTitle: string;
      hideMessageBubble: boolean;
    };
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
    $chatwoot?: unknown;
  }
}

export default function ChatwootWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Configuración de Chatwoot
    window.chatwootSettings = {
      position: "right",
      type: "standard",
      launcherTitle: "Chatea con nosotros",
      hideMessageBubble: false,
    };

    console.log('Chatwoot settings configurados:', window.chatwootSettings);
  }, []);

  const handleLoad = () => {
    console.log('Script de Chatwoot cargado');
    
    const BASE_URL = "https://zzchatwootzz.cerebria.co";
    
    if (window.chatwootSDK) {
      console.log('chatwootSDK detectado, inicializando...');
      window.chatwootSDK.run({
        websiteToken: "Jv4XV7KNnB3JfSsivoj7CKeY",
        baseUrl: BASE_URL
      });
      setIsLoaded(true);
      console.log('Chatwoot inicializado correctamente');
    } else {
      console.error('chatwootSDK no está disponible después de cargar el script');
    }
  };

  const handleError = (error: Error) => {
    console.error('Error cargando Chatwoot SDK:', error);
  };

  return (
    <>
      <Script
        id="chatwoot-sdk"
        src="https://zzchatwootzz.cerebria.co/packs/js/sdk.js"
        strategy="lazyOnload"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Indicador visual temporal para debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          background: isLoaded ? 'green' : 'red',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 999999
        }}>
          Chatwoot: {isLoaded ? '✓ Cargado' : '✗ No cargado'}
        </div>
      )}
    </>
  );
}