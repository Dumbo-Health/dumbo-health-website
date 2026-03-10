import type { Metadata } from "next";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sleep Apnea Treatment Online | At-Home Sleep Test | Dumbo Health",
    template: "%s | Dumbo Health",
  },
  description:
    "Get diagnosed and treated for sleep apnea from home. FDA-approved at-home sleep test for $149. Expert telehealth care in FL & TX. Start sleeping better today.",
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
        <TooltipProvider>{children}</TooltipProvider>
        <Script
          id="shopify-checkout"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var SHOP_DOMAIN="checkout.dumbo.health";
  var STOREFRONT_TOKEN="aa64f3017acd47798db553248a5ec0a2";
  var PRODUCT_NUMERIC_ID="8933198397592";
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
