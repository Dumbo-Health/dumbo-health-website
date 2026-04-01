import type { Metadata } from "next";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IntercomProvider } from "@/components/providers/intercom-provider";
import { GTM_ID } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sleep Apnea Treatment Online | At-Home Sleep Test | Dumbo Health",
    template: "%s | Dumbo Health",
  },
  description:
    "Get diagnosed and treated for sleep apnea from home. FDA-cleared at-home sleep test for $149. Expert telehealth care in FL & TX. Start sleeping better today.",
  metadataBase: new URL("https://www.dumbo.health"),
  openGraph: {
    siteName: "Dumbo Health",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <IntercomProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </IntercomProvider>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <Script
          id="shopify-checkout"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var SHOP_DOMAIN="checkout.dumbo.health";
  var STOREFRONT_TOKEN="${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? ""}";
  var PRODUCT_NUMERIC_ID="${process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_ID ?? ""}";
  var PRODUCT_GID="gid://shopify/Product/"+PRODUCT_NUMERIC_ID;
  var QUANTITY=1;
  var SDK_URL="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  var client=null,variantId=null,sdkReady=false;
  function loadSdk(){return new Promise(function(resolve,reject){if(window.ShopifyBuy&&window.ShopifyBuy.buildClient)return resolve();var s=document.createElement("script");s.async=true;s.src=SDK_URL;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
  async function initShopify(){if(sdkReady)return;await loadSdk();client=window.ShopifyBuy.buildClient({domain:SHOP_DOMAIN,storefrontAccessToken:STOREFRONT_TOKEN});var product=await client.product.fetch(PRODUCT_GID);if(!product||!product.variants||!product.variants[0]){console.error("[Shopify] Variant not found");return;}variantId=product.variants[0].id;sdkReady=true;}
  initShopify();
  async function startCheckout(trigger){if(!sdkReady)await initShopify();if(!variantId){console.error("[Shopify] Variant ID missing");return;}if(trigger){trigger.style.pointerEvents="none";trigger.style.opacity="0.7";trigger.textContent="Loading...";}try{var checkout=await client.checkout.create();checkout=await client.checkout.addLineItems(checkout.id,[{variantId:variantId,quantity:QUANTITY}]);if(checkout&&checkout.webUrl)window.location.href=checkout.webUrl;}catch(err){console.error("[Shopify] Checkout error",err);}}
  document.addEventListener("click",function(e){var trigger=e.target.closest('[data-shopify-checkout="sleep-test"]');if(!trigger)return;e.preventDefault();startCheckout(trigger);});
})();`,
          }}
        />
      </body>
    </html>
  );
}
