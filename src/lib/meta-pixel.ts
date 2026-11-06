export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID?.trim() || "";

type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (!META_PIXEL_ID || typeof window === "undefined") return;

  const waitAndTrack = (attempt = 0) => {
    if (typeof window.fbq === "function") {
      if (params) {
        window.fbq("track", eventName, params);
      } else {
        window.fbq("track", eventName);
      }
      return;
    }

    if (attempt < 20) {
      window.setTimeout(() => waitAndTrack(attempt + 1), 100);
    }
  };

  waitAndTrack();
}

export async function trackLeadConversion(): Promise<void> {
  trackMetaEvent("Lead", {
    content_name: "Landing Page Karuí Cosméticos/Alto Padrão Invisível",
    content_category: "Marketing Olfativo",
  });

  // tempo pro Pixel enviar antes do redirect ao WhatsApp
  await new Promise((resolve) => setTimeout(resolve, 500));
}
