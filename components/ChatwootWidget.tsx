'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    chatwootSettings?: {
      position?: 'left' | 'right';
      type?: 'standard' | 'expanded_bubble' | string;
      launcherTitle?: string;
      hideMessageBubble?: boolean;
      showPopoutButton?: boolean;
    };
    chatwootSDK?: {
      run: (options: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

export default function ChatwootWidget(): null {
  useEffect(() => {
    let mounted = true;
    let retryTimer: number | undefined;
    let attempt = 0;
    const MAX_ATTEMPTS = 12; // con backoff llega a ~minutes si hace falta
    const BASE_URL = 'https://zzchatwootzz.cerebria.co';
    const SDK_PATH = '/packs/js/sdk.js';
    const SCRIPT_ID = 'chatwoot-script';
    const WEBSITE_TOKEN = 'Jv4XV7KNnB3JfSsivoj7CKeY';

    // Configuración pública (tal como te la dieron)
    window.chatwootSettings = {
      position: 'right',
      type: 'standard',
      launcherTitle: 'Chatea con nosotros',
    };

    // Limpieza de script existente si estaba corrupto (opcional)
    const removeExistingBadScript = () => {
      const existing = document.getElementById(SCRIPT_ID);
      if (existing) {
        existing.remove();
      }
    };

    // Comprueba accesibilidad del SDK usando fetch (ayuda a detectar 404/CORS)
    const canFetchSdk = async (): Promise<boolean> => {
      try {
        const resp = await fetch(`${BASE_URL}${SDK_PATH}`, { method: 'GET', cache: 'no-store' });
        // OK si status 200 y tipo texto/javascript (no siempre disponible)
        return resp.ok;
      } catch (err) {
        // fetch falló (offline, CORS bloqueado, DNS, firewall...)
        return false;
      }
    };

    // Inyecta el script y configura onload/onerror
    const injectScript = (): void => {
      if (document.getElementById(SCRIPT_ID)) {
        console.log('[chatwoot] script ya presente, esperando inicialización...');
        return;
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = `${BASE_URL}${SDK_PATH}`;
      script.async = true;

      script.onload = () => {
        console.log('[chatwoot] sdk cargado (onload). Intentando run()...');
        // Intenta inicializar; chatwootSDK puede tardar un microtick más
        const initTimeout = setTimeout(() => {
          try {
            if (window.chatwootSDK) {
              window.chatwootSDK.run({
                websiteToken: WEBSITE_TOKEN,
                baseUrl: BASE_URL,
              });
              console.log('[chatwoot] run() ejecutado correctamente.');
              // Forzar visibilidad breve después de run
              setTimeout(() => {
                const selectors = [
                  '.woot-widget-holder',
                  '.woot-widget-bubble',
                  '.woot--bubble-holder',
                  '#cw-widget-holder',
                ];
                selectors.forEach((sel) => {
                  const el = document.querySelector(sel);
                  if (el instanceof HTMLElement) {
                    el.classList.remove('woot--hide');
                    el.style.display = 'flex';
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                    el.style.pointerEvents = 'auto';
                  }
                });
              }, 500);
            } else {
              console.warn('[chatwoot] chatwootSDK no disponible justo después de onload.');
              scheduleRetry();
            }
          } catch (e) {
            console.error('[chatwoot] error al ejecutar run():', e);
            scheduleRetry();
          } finally {
            clearTimeout(initTimeout);
          }
        }, 200);
      };

      script.onerror = () => {
        console.error('[chatwoot] fallo al cargar el script.');
        script.remove();
        scheduleRetry();
      };

      document.body.appendChild(script);
    };

    // Planifica un nuevo intento con backoff exponencial
    const scheduleRetry = (forceDelay?: number): void => {
      if (!mounted) return;
      attempt += 1;
      if (attempt > MAX_ATTEMPTS) {
        console.error('[chatwoot] alcanzado número máximo de reintentos. Revisa BASE_URL, token y CORS.');
        return;
      }
      // backoff exponencial  (500ms * 2^(attempt-1)), limitado a 30s
      const backoff = forceDelay ?? Math.min(30000, 500 * Math.pow(2, Math.max(0, attempt - 1)));
      console.info(`[chatwoot] reintentando en ${backoff}ms (intento ${attempt}/${MAX_ATTEMPTS})`);
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      retryTimer = window.setTimeout(async () => {
        if (!mounted) return;
        // Si hay conectividad offline, espera al evento 'online'
        if (!navigator.onLine) {
          console.warn('[chatwoot] navegador offline, esperando reconexión...');
          // esperar al evento online
          const onOnline = () => {
            window.removeEventListener('online', onOnline);
            scheduleRetry(0);
          };
          window.addEventListener('online', onOnline);
          return;
        }

        // Primero valida que el SDK sea accesible (para detectar CORS/404)
        const ok = await canFetchSdk();
        if (ok) {
          injectScript();
        } else {
          console.warn('[chatwoot] SDK no accesible (fetch falló). Probando de nuevo...');
          scheduleRetry();
        }
      }, backoff);
    };

    // Inicio: limpia scripts viejos y lanza la primera verificación
    removeExistingBadScript();
    (async () => {
      // Si ya existe chatwootSDK, intenta run inmediatamente
      if (window.chatwootSDK) {
        try {
          window.chatwootSDK.run({
            websiteToken: WEBSITE_TOKEN,
            baseUrl: BASE_URL,
          });
          console.log('[chatwoot] chatwootSDK ya presente y run() ejecutado.');
          return;
        } catch (e) {
          console.warn('[chatwoot] error al run() con SDK ya presente:', e);
        }
      }

      const ok = await canFetchSdk();
      if (ok) {
        injectScript();
      } else {
        console.warn('[chatwoot] SDK no accesible en primer intento, programando reintentos...');
        scheduleRetry();
      }
    })();

    // cleanup
    return () => {
      mounted = false;
      if (retryTimer) window.clearTimeout(retryTimer);
    };
  }, []);

  return null;
}
