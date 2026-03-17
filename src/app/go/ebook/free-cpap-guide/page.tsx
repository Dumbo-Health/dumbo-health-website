import type { Metadata } from "next";
import EbookHero from "@/components/go/ebook/EbookHero";
import EbookContents from "@/components/go/ebook/EbookContents";
import EbookSneakPeek from "@/components/go/ebook/EbookSneakPeek";
import EbookExperts from "@/components/go/ebook/EbookExperts";
import EbookTestimonials from "@/components/go/ebook/EbookTestimonials";
import EbookWhyDumbo from "@/components/go/ebook/EbookWhyDumbo";
import FAQSection from "@/components/go/legacy/sections/FAQSection";
import EbookBlog from "@/components/go/ebook/EbookBlog";
import PrimaryCTASection from "@/components/go/legacy/sections/PrimaryCTASection";
import EbookFooter from "@/components/go/ebook/EbookFooter";

export const metadata: Metadata = {
  title: "Free CPAP Guide | Dumbo Health",
  description:
    "Sleep apnea affects 80+ million Americans. Download our free CPAP ebook, a practical, human-centered guide for people with sleep apnea.",
};

export default function EbookPage() {
  return (
    <main>
      <EbookHero
        eyebrow="Free CPAP Guide:"
        title="Stop struggling with CPAP, start sleeping better"
        description="Sleep apnea affects 80+ million Americans. Download our free CPAP ebook to learn how CPAP works, what to expect on your first night, and practical tips to make therapy comfortable and part of your routine. Expert answers and clear guidance."
        ctaText="Get the Free Guide"
        bulletPoints={[
          "Fix mask leaks + discomfort",
          "Reduce dryness, marks, and irritation",
          "Build a simple nightly routine you can maintain",
        ]}
        coverSrc="/ebook/ebook-ultimate-guide-to-cpap.png"
        coverAlt="The Ultimate Guide to the CPAP Machine"
      />
      <EbookContents
        title="The Ultimate Guide to the CPAP Machine"
        iconsSrc="/blue-moon-sun-x.png"
        iconsAlt="Sleep, comfort, and routine icons"
        intro="Our free ebook, The Ultimate Guide to the CPAP Machine, offers clear answers and real-world advice. Inside, you'll find:"
        chapters={[
          {
            number: "01",
            accentColor: "#FF8361",
            title: "Understand the CPAP machine and its impact on your health",
            description:
              "A clear look at what's inside a CPAP machine, how each part works, and how the right mask fit makes or breaks success. You'll also see the real health benefits, from better heart health to sharper focus and happier mornings for you (and your partner).",
          },
          {
            number: "02",
            accentColor: "#031F3D",
            title: "Let's get set-up! Your first night with CPAP",
            description:
              "Step-by-step guidance for your first night: how to prepare during the day, what to expect once the mask is on, and how to handle common hiccups like leaks, chipmunk cheeks, or dry mouth. Learn how small wins in the early days build toward long-term success.",
          },
          {
            number: "03",
            accentColor: "#78BFBC",
            title: "Let's make it last. Building a long term relationship with CPAP",
            description:
              "Tips for turning CPAP into a habit, avoiding common mistakes, and handling everyday challenges like colds, travel, or power outages. Includes an FAQ with simple answers to the worries most people have when starting out.",
          },
          {
            number: "04",
            accentColor: "#FFD6AD",
            title: "How to be money smart when buying a CPAP machine",
            description:
              "The financial side of CPAP, what machines and supplies really cost, how insurance coverage works, and how to avoid surprises. Learn the difference between renting and buying, what happens if you don't meet compliance rules, and how to budget for the extras without breaking the bank.",
          },
        ]}
        closing="This isn't just about what CPAP is. It's about how to live well with CPAP: comfortably, consistently, and with support."
      />
      <EbookSneakPeek
        title="Sneak peek inside the guide"
        pages={[
          {
            caption: "Finding the Right Mask Fit and Setup",
            src: "/ebook/sneakpeak-1.png",
            alt: "Ebook page: Finding the Right Mask Fit and Setup",
          },
          {
            caption: "Health Benefits of CPAP",
            src: "/ebook/sneakpeak-2.png",
            alt: "Ebook page: Health Benefits of CPAP",
          },
          {
            caption: "FAQs and Common Mistakes to Avoid",
            src: "/ebook/sneakpeak-3.png",
            alt: "Ebook page: FAQs and Common Mistakes to Avoid",
          },
          {
            caption: "Smart Money Tips",
            src: "/ebook/sneakpeak-4.png",
            alt: "Ebook page: Smart Money Tips",
          },
        ]}
        iconsSrc="/white-moon-sun-x.png"
        iconsAlt="Sleep, comfort, and routine icons"
      />
      <EbookExperts
        title="Meet the experts behind the ebook"
        experts={[
          {
            name: "Dr. Meir Kryger, MD, FRCPC",
            role: "Sleep Medicine Physician",
            bio: "Professor Emeritus of Medicine at Yale School of Medicine and a pioneering authority in sleep medicine, Dr. Kryger founded Canada's first sleep-breathing disorders laboratory at the University of Manitoba and was the first physician in North America to describe obstructive sleep apnea. With over 200 publications, he has led both national and international sleep organizations and received top honors such as the Distinguished Scientist Award from the American Thoracic Society.",
            photoSrc: "/ebook/dr_meir.jpg",
            photoAlt: "Dr. Meir Kryger",
            accentColor: "#FF8361",
          },
          {
            name: "Dr. Harrison Gimbel, MD, MS",
            role: "Sleep Doctor at Dumbo Health",
            bio: "Double board-certified in Sleep Medicine and Family Medicine, Dr. Gimbel brings a strong academic foundation, including a master's degree in Physiology and Biophysics from Georgetown University. He specializes in the diagnosis and comprehensive management of obstructive sleep apnea across diverse patient populations. Dedicated to evidence-based care, he integrates the latest advancements in sleep science to deliver personalized, effective treatment strategies that improve both sleep and overall quality of life.",
            photoSrc: "/ebook/dr_harrison.jpg",
            photoAlt: "Dr. Harrison Gimbel",
            accentColor: "#78BFBC",
          },
          {
            name: "Dr. Zachary Adams, MD, MBA",
            role: "Sleep Doctor at Dumbo Health",
            bio: "Dr. Zachary Adams is a board-certified sleep medicine physician and Fellow of the American Academy of Sleep Medicine. Trained in both medicine and business, he brings expertise in clinical care and in advancing new approaches to sleep health. His work spans CPAP therapy, oral appliance alternatives, and digital health innovation, with a focus on helping patients find treatments they can stick with for the long term.",
            photoSrc: "/ebook/dr_zachary.jpg",
            photoAlt: "Dr. Zachary Adams",
            accentColor: "#031F3D",
          },
        ]}
      />
      <EbookTestimonials
        title="What Sleep Experts Are Saying About Dumbo Health"
        testimonials={[
          {
            quote:
              '"Too often insurance makes CPAP care frustrating and expensive. Dumbo Health cuts through the red tape so patients can focus on feeling better."',
            name: "Dr. Ennis, MD",
            title: "Certified Sleep Doctor",
          },
          {
            quote:
              '"For patients without insurance or with limited coverage, Dumbo Health brings real hope and practical solutions."',
            name: "Dr. Fong Balart",
            title: "Obesity Medicine Specialist",
          },
          {
            quote:
              '"Dumbo Health is such a meaningful service. It finally makes sleep studies easy to access for people who have struggled to get help."',
            name: "Dr. Hopkins, MD",
            title: "Certified Sleep Doctor",
          },
        ]}
        iconsSrc="/blue-moon-sun-x.png"
        iconsAlt="Sleep, comfort, and routine icons"
      />
      <EbookWhyDumbo
        title="Why Dumbo Health?"
        imageSrc="/ebook/happy-couple.jpg"
        imageAlt="Happy couple enjoying life after better sleep"
        overlayText="Dumbo Health helps patients navigate sleep apnea and CPAP with tools, education, and support"
        ctaText="Explore Our Tools"
        ctaHref="/go/tools"
        tools={[
          "Sleep Schedule Calculator",
          "CPAP Mask Selector Quiz",
          "Sleep Diary",
        ]}
      />
      <FAQSection
        title="FAQs"
        subtitle="Everything you need to know about sleep apnea, CPAP therapy, and getting started with Dumbo Health."
        faqs={[
          {
            question: "What is sleep apnea?",
            answer:
              "Sleep apnea affects 80+ million Americans. It's a condition where breathing repeatedly stops and starts during sleep, leading to disrupted rest and potential health risks. Common symptoms include loud snoring, daytime fatigue, and morning headaches.",
          },
          {
            question: "What is a CPAP machine, and why would I need one?",
            answer:
              "A CPAP (Continuous Positive Airway Pressure) machine gently helps you breathe better during sleep by keeping your airway open. Dumbo Health offers easy-to-use machines delivered right to your door, ensuring you're comfortable every night.",
          },
          {
            question: "Is a CPAP machine uncomfortable or loud?",
            answer:
              "Not anymore! Dumbo Health provides the latest CPAP machines that are quiet, comfortable, and user-friendly. Plus, our sleep coaches help you find the perfect fit.",
          },
          {
            question: "Are there any hidden fees?",
            answer:
              "No. We believe in transparent pricing. All costs are clearly outlined upfront, with no surprise charges.",
          },
          {
            question: "Do I need a prescription to start my treatment?",
            answer:
              "Yes, you'll need a prescription for sleep apnea treatment. Great news: Dumbo Health can handle this right here on our website! Our doctors can prescribe everything you need, quickly and easily. If you prefer, we can also give you the prescription directly.",
          },
          {
            question: "Are there any side effects of CPAP therapy?",
            answer:
              "Some people experience minor side effects like dryness or nasal congestion, but these usually go away with adjustments. Dumbo Health's sleep specialists will help you get comfortable with your treatment.",
          },
          {
            question: "Can I travel with my CPAP machine?",
            answer:
              "Yes. CPAP machines are considered medical devices, so you can bring them on flights in addition to your carry-on. Always pack your CPAP in carry-on (not checked luggage), and bring distilled water or plan to buy some at your destination.",
          },
        ]}
        calloutText="Still have questions?"
        calloutLink="/go/sleep-hub"
        calloutLinkText="Visit FAQs"
        backgroundColor="#F5E6D1"
        variant="ebook"
      />
      <EbookBlog
        title="CPAP Blog"
        imageSrc="/ebook/guy-screen.jpg"
        imageAlt="Man reading on tablet in bed"
        links={[
          { label: "What is a CPAP machine?", href: "/go/sleep-hub/what-is-cpap" },
          {
            label: "How to Choose Your CPAP Mask Type?",
            href: "/go/sleep-hub/cpap-mask-types",
          },
          {
            label: "Is CPAP covered by insurance?",
            href: "/go/sleep-hub/cpap-insurance-coverage",
          },
        ]}
        closingText="Find answers in our blog!"
        ctaText="CPAP Blog"
        ctaHref="https://dumbo.health/blog-category/cpap"
      />
      <PrimaryCTASection
        title="Explore the Dumbo Health Sleep Hub"
        subtitle="Tools, guides, and expert resources to help you sleep better: sleep schedule calculator, CPAP mask quiz, sleep diary, and more."
        ctaText="Visit Sleep Hub"
        ctaLink="/go/sleep-hub"
      />
      <EbookFooter />
    </main>
  );
}
