export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqCategories = [
  { id: "testing", label: "Testing & Preparation" },
  { id: "insurance", label: "Insurance & Pricing" },
  { id: "treatment", label: "Sleep Apnea & Treatment" },
  { id: "cpap", label: "CPAP Equipment & Maintenance" },
  { id: "troubleshooting", label: "Troubleshooting & Support" },
  { id: "differentiators", label: "Dumbo Health Differentiators" },
  { id: "prescriptions", label: "Prescriptions" },
  { id: "subscriptions", label: "Subscription & Bundle" },
  { id: "dot", label: "DOT Compliance" },
  { id: "getting-started", label: "Getting Started" },
] as const;

export const faqs: FAQItem[] = [
  // Testing & Preparation
  {
    question: "How do I prepare for the home sleep test?",
    answer: "Preparation is simple. Avoid caffeine and alcohol before bedtime, and follow the instructions provided with your test kit. The device is designed for ease of use, ensuring a comfortable testing experience.",
    category: "testing",
  },
  {
    question: "What is a home sleep test, and how does it work?",
    answer: "A home sleep test is a convenient way to assess for sleep apnea from the comfort of your own bed. You'll receive an FDA-cleared small device that monitors your breathing, oxygen levels, and heart rate overnight. After the test, our sleep specialists analyze the data to provide an accurate diagnosis and tell you if you have sleep apnea. No need to visit any doctors or any sleep clinic, all of this from the comfort of your home",
    category: "testing",
  },
  {
    question: "When will I receive my results?",
    answer: "Our team typically analyzes the data and provides results within a few days (most results within 48h). We'll then discuss the findings and next steps with you.",
    category: "testing",
  },
  {
    question: "Is a home sleep test as accurate as an in-lab study?",
    answer: "For many individuals, especially those with a high likelihood of obstructive sleep apnea, home sleep tests offer reliable results. However, certain complex cases might require an in-lab study for comprehensive evaluation. We will of course let you know if it's the case.",
    category: "testing",
  },
  {
    question: "How does the testing process work?",
    answer: "After completing a sleep questionnaire, our team ships the Home Sleep test to your home in about three business days. Setup is simple: pair the device with your phone, put it on your finger or hand, and keep it on all night.",
    category: "testing",
  },
  {
    question: "What is an At-home sleep test?",
    answer: "A small finger-worn device tracks how you breathe, how your heart beats, how much oxygen you have, and how long you sleep. It uses a light sensor on your finger and connects to an app on your phone. All the data is combined into one score that shows how many times your breathing slows or stops each hour.",
    category: "testing",
  },
  {
    question: "Can this home sleep test really find sleep apnea?",
    answer: "Yes. It's FDA-cleared and built to measure the signals needed to diagnose sleep apnea. It's been used on tens of thousands of people with strong accuracy.",
    category: "testing",
  },
  {
    question: "Do I ever need a sleep lab?",
    answer: "Almost never. Fewer than one percent of people need a full lab test with many sensors. Most people get everything they need from the home test.",
    category: "testing",
  },
  {
    question: "What if my home sleep test doesn't record properly?",
    answer: "Don't worry! If your test data isn't sufficient, we'll promptly send you another kit at no extra charge. Our goal is to ensure you receive accurate results quickly and easily.",
    category: "testing",
  },
  {
    question: "Why is testing important?",
    answer: "When your throat narrows during sleep, your oxygen drops. This stresses your heart, brain, and the rest of your organs. Untreated sleep apnea is linked to diabetes, stroke, heart attack, daytime sleepiness, and loss of sexual energy.",
    category: "testing",
  },

  // Insurance & Pricing
  {
    question: "Will my insurance cover the at-home sleep test?",
    answer: "At the moment, Dumbo Health is out-of-pocket, but insurance coverage is coming very soon! Remember, once you factor in co-pays, deductibles, and extra fees from traditional insurance, our at-home sleep test often turns out to be more affordable than using your insurance.",
    category: "insurance",
  },
  {
    question: "How much does the home sleep test cost?",
    answer: "Our home sleep test is priced at $149 (including device and its delivery, doctor interpretation and a telehealth call with a doctor that will explain your results), offering an affordable alternative to traditional in-lab studies, which can cost between $2,000 and $5,000 per night.",
    category: "insurance",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No. We believe in transparent pricing. All costs are clearly outlined upfront, with no surprise charges.",
    category: "insurance",
  },
  {
    question: "Can I use my HSA or FSA for payment?",
    answer: "Yes, you can use your HSA or FSA to pay for Dumbo Health services. Contact us for more details.",
    category: "insurance",
  },
  {
    question: "Can I use insurance with Dumbo?",
    answer: "Dumbo Health is cash pay first with transparent monthly plans.",
    category: "insurance",
  },
  {
    question: "Is cash pay really cheaper?",
    answer: "For many people, yes. High deductibles and rental terms can make insurance more expensive over time. Cash pay gives you one clear price and you own the device.",
    category: "insurance",
  },

  // Sleep Apnea & Treatment
  {
    question: "What is sleep apnea?",
    answer: "Sleep apnea is a condition where breathing repeatedly stops and starts during sleep, leading to disrupted rest and potential health risks. Common symptoms include loud snoring, daytime fatigue, and morning headaches.",
    category: "treatment",
  },
  {
    question: "What are the treatment options for sleep apnea?",
    answer: "Treatment varies based on severity. Options include lifestyle changes, Continuous Positive Airway Pressure (CPAP) therapy, oral appliances, and, in some cases, surgery.",
    category: "treatment",
  },
  {
    question: "Can changes to my lifestyle help with sleep apnea?",
    answer: "Absolutely! Making healthy changes like eating well, exercising regularly, and managing your weight can greatly help with sleep apnea. Dumbo Health makes these changes easier through personalized treatment, ongoing support from sleep coaches, regular check-ins from our doctors, and engagement programs backed by real data and sleep specialists.",
    category: "treatment",
  },
  {
    question: "What is a CPAP machine, and why would I need one?",
    answer: "A CPAP (Continuous Positive Airway Pressure) machine gently helps you breathe better during sleep by keeping your airway open. Dumbo Health offers easy-to-use machines delivered right to your door, ensuring you're comfortable every night.",
    category: "treatment",
  },
  {
    question: "Is a CPAP machine uncomfortable or loud?",
    answer: "Not anymore! Dumbo Health provides the latest CPAP machines that are quiet, comfortable, and user-friendly. Plus, our sleep coaches help you find the perfect fit.",
    category: "treatment",
  },
  {
    question: "What is CPAP therapy?",
    answer: "CPAP stands for continuous positive airway pressure. It is a common treatment for obstructive sleep apnea that helps keep your airway open while you sleep so breathing stays steady through the night.",
    category: "treatment",
  },

  // CPAP Equipment & Maintenance
  {
    question: "How do I maintain my CPAP equipment?",
    answer: "Maintaining CPAP equipment can be tricky, but Dumbo Health makes it simple. Depending on your subscription level, Dumbo Health includes everything, from fresh accessories regularly shipped to you, automatic equipment upgrades, and even unlimited telehealth support from our sleep specialists. With Dumbo Health, your CPAP equipment stays clean, fresh, and working perfectly for better sleep.",
    category: "cpap",
  },
  {
    question: "Are there any side effects of CPAP therapy?",
    answer: "Some people experience minor side effects like dryness or nasal congestion, but these usually go away with adjustments. Dumbo Health's sleep specialists will help you get comfortable with your treatment.",
    category: "cpap",
  },
  {
    question: "What happens if my CPAP machine stops working?",
    answer: "No worries, Dumbo Health's got your back! Depending on your subscription, we handle quick replacements and offer round-the-clock support to ensure uninterrupted restful sleep.",
    category: "cpap",
  },
  {
    question: "How often should I replace my CPAP mask and accessories?",
    answer: "CPAP equipment performs best when regularly refreshed. Dumbo Health's subscriptions automatically handle replacements, ensuring your equipment is always at its best. No remembering, no hassle, just restful sleep.",
    category: "cpap",
  },
  {
    question: "Can I travel with my CPAP machine?",
    answer: "Yes. CPAP machines are considered medical devices, so you can bring them on flights in addition to your carry-on. At security, you may need to remove the device from its case for screening. If you plan to use it during the flight, notify your airline in advance and ask about power options, or bring a travel battery. Always pack your CPAP in carry-on (not checked luggage), and bring distilled water or plan to buy some at your destination.",
    category: "cpap",
  },

  // Troubleshooting & Support
  {
    question: "What if I have trouble using the device?",
    answer: "Our support team is available to assist you. If you encounter any issues, don't hesitate to reach out for guidance.",
    category: "troubleshooting",
  },
  {
    question: "How do I return the at-home kit after the test?",
    answer: "You don't have to return anything! Our at-home test kit is completely disposable, making it super convenient. No extra trips, no waiting, just quick and easy results.",
    category: "troubleshooting",
  },
  {
    question: "What if a part breaks early?",
    answer: "Reach out. We're here to keep therapy working, not leave you stuck.",
    category: "troubleshooting",
  },

  // Dumbo Health Differentiators
  {
    question: "What makes Dumbo Health's service different?",
    answer: "Board-certified sleep specialists read your results. FDA-cleared devices are used for testing and diagnosis. You get support through each step.",
    category: "differentiators",
  },
  {
    question: "What makes Dumbo Health's sleep coaches special?",
    answer: "Our dedicated sleep coaches and doctors offer personalized guidance based on your unique data, provide ongoing support, and ensure you're always comfortable with your treatment. They're here to help you succeed every step of the way!",
    category: "differentiators",
  },

  // Prescriptions
  {
    question: "Do I need a prescription to start my treatment?",
    answer: "Yes, you'll need a prescription for sleep apnea treatment. Great news: Dumbo Health can handle this right here on our website! Our doctors can prescribe everything you need, quickly and easily. If you prefer, we can also give you the prescription directly.",
    category: "prescriptions",
  },
  {
    question: "Why do I need to upload a prescription?",
    answer: "Sleep apnea treatments like CPAP machines and masks are regulated medical devices. A valid prescription is required before we can process your order or ship any equipment.",
    category: "prescriptions",
  },
  {
    question: "What type of prescription is accepted?",
    answer: "Any prescription written by a licensed healthcare provider that clearly states your need for sleep apnea therapy. It can come from an in-lab sleep study or an at-home sleep test interpreted by a qualified physician.",
    category: "prescriptions",
  },
  {
    question: "How do I upload my prescription?",
    answer: "Use the secure upload form. Take a clear photo or scan of your prescription and submit it along with your order ID.",
    category: "prescriptions",
  },
  {
    question: "Does the prescription need to include specific settings?",
    answer: "Yes. If you're ordering a CPAP or APAP device, the prescription should include your pressure settings or a note allowing auto-titration. If settings are missing, your provider may need to update the prescription.",
    category: "prescriptions",
  },
  {
    question: "Can I use an old prescription?",
    answer: "Most prescriptions for sleep apnea therapy do not expire, but some providers set time limits. If your prescription is unclear or outdated, you may be asked to provide a new one.",
    category: "prescriptions",
  },
  {
    question: "What if I lost my prescription?",
    answer: "Contact the doctor who diagnosed your sleep apnea or interpreted your home sleep study. They can issue a copy or write a new prescription.",
    category: "prescriptions",
  },
  {
    question: "Can Dumbo Health write my prescription?",
    answer: "If you complete a sleep evaluation through Dumbo Health and receive a diagnosis, our board-certified sleep physicians can write or update your prescription.",
    category: "prescriptions",
  },
  {
    question: "Is my information secure when I upload it?",
    answer: "Yes. Uploads are encrypted and stored securely. Only authorized clinical staff can access your file.",
    category: "prescriptions",
  },
  {
    question: "How long does it take to verify my prescription?",
    answer: "Most prescriptions are reviewed within one business day. If anything is missing or unclear, we'll notify you.",
    category: "prescriptions",
  },
  {
    question: "What happens after my prescription is approved?",
    answer: "Your order moves into processing. If you're ordering a device, it will be set up with your prescribed settings before shipping.",
    category: "prescriptions",
  },
  {
    question: "Do I need a prescription to reorder supplies like masks or tubing?",
    answer: "No. Most CPAP accessories do not require a prescription. Only the device itself and certain mask types do.",
    category: "prescriptions",
  },
  {
    question: "Can I upload my prescription from outside the United States?",
    answer: "No. For regulatory reasons, Dumbo Health can only accept prescriptions written by licensed U.S. providers.",
    category: "prescriptions",
  },
  {
    question: "What if I still haven't completed a sleep test?",
    answer: "You must complete a sleep study and receive a diagnosis before a prescription can be issued. Dumbo Health offers at-home sleep testing if you need one.",
    category: "prescriptions",
  },
  {
    question: "What makes a prescription invalid?",
    answer: "Blurry images, missing provider details, missing pressure settings for CPAP/APAP, no indication of therapy type, prescriptions from non-U.S. providers. If invalid, you'll be asked to upload a corrected version.",
    category: "prescriptions",
  },
  {
    question: "Do I need a prescription for CPAP?",
    answer: "Yes. CPAP therapy requires a valid prescription from a licensed medical provider. If you already have one our team can review it. If not a sleep test and medical review may be needed first.",
    category: "prescriptions",
  },

  // Subscription & Bundle
  {
    question: "Can I switch subscription plans later?",
    answer: "Absolutely! Dumbo Health is all about flexibility. You can easily upgrade or downgrade your subscription anytime based on your needs. Just reach out, and we'll handle everything for you.",
    category: "subscriptions",
  },
  {
    question: "Why do I pay monthly if deliveries come every three months?",
    answer: "Paying monthly keeps the cost small and steady. But the boxes still come every quarter.",
    category: "subscriptions",
  },
  {
    question: "What is this bundle?",
    answer: "It's a plan that sends you the CPAP parts you need all year. You don't have to remember anything. Fresh pieces just show up.",
    category: "subscriptions",
  },
  {
    question: "Do I have to remember when to replace things?",
    answer: "No. That's the whole point. We track the timing. You just open the box.",
    category: "subscriptions",
  },
  {
    question: "Will this help my sleep?",
    answer: "Yes. Clean, fresh parts make it easier to breathe, reduce leaks, and help you stay asleep longer.",
    category: "subscriptions",
  },
  {
    question: "How often do I get deliveries?",
    answer: "Every three months. Four times a year. Like seasons, but for your sleep.",
    category: "subscriptions",
  },
  {
    question: "Why this plan instead of buying things one by one?",
    answer: "It's cheaper than buying separately, easier to manage, and keeps your therapy on track without effort.",
    category: "subscriptions",
  },
  {
    question: "Can I change what I get?",
    answer: "If your needs change, the plan can adjust. You're not stuck.",
    category: "subscriptions",
  },
  {
    question: "What comes in the shipments?",
    answer: "A mix of new masks, cushions, tubes, filters, and wipes. Everything your CPAP needs to stay clean and comfortable.",
    category: "subscriptions",
  },
  {
    question: "Is this for new CPAP users or experienced ones?",
    answer: "Both. New users get an easy start. Experienced users stop worrying about worn-out equipment.",
    category: "subscriptions",
  },
  {
    question: "Why do I need new parts?",
    answer: "CPAP parts get old, dirty, or worn out. When that happens, sleep gets worse. New parts keep the machine working the right way.",
    category: "subscriptions",
  },
  {
    question: "Do I pick my mask?",
    answer: "Yes. You choose the mask style that fits you best. We send fresh replacements on schedule.",
    category: "subscriptions",
  },

  // DOT Compliance
  {
    question: "Will my examiner accept this?",
    answer: "Yes. Our reports are built for DOT exams and include the clinical details examiners look for. Thousands of drivers use home sleep tests like this every year to stay certified.",
    category: "dot",
  },
  {
    question: "Do I need insurance?",
    answer: "No. This is flat price and cash pay. No insurance delays, no approvals, and no waiting weeks. It is faster and built for tight DOT timelines.",
    category: "dot",
  },
  {
    question: "What if I need CPAP?",
    answer: "We walk you through the next steps and DOT compliance tracking. You get clear guidance so you can stay on the road without guessing what comes next.",
    category: "dot",
  },

  // Getting Started
  {
    question: "How soon can I begin treatment after ordering?",
    answer: "Very quickly! Once you place your order, your home test kit usually arrives within a few days. After completing your test, you'll receive results promptly and can start treatment right away. No more waiting to see a sleep doctor for months.",
    category: "getting-started",
  },
  {
    question: "How fast can I start?",
    answer: "Most people complete testing and begin therapy in days once a diagnosis is confirmed.",
    category: "getting-started",
  },
  {
    question: "How do I get started with CPAP through Dumbo Health?",
    answer: "After purchase you will submit your prescription or complete any required medical steps. Once approved we prepare your equipment and guide you through setup and onboarding.",
    category: "getting-started",
  },
  {
    question: "What if I already have a sleep apnea diagnosis?",
    answer: "If you have already been diagnosed and have a valid prescription you can move forward without repeating testing. Our medical team reviews your information and helps you get set up.",
    category: "getting-started",
  },
  {
    question: "What if CPAP does not feel comfortable at first?",
    answer: "Adjusting can take time. Our support team helps you work through comfort questions and common challenges so therapy feels easier to stick with over time.",
    category: "getting-started",
  },
  {
    question: "Will someone help me set up my CPAP?",
    answer: "Yes. We provide guided onboarding with an expert to help you get ready for your first night including setup support and answers to common questions.",
    category: "getting-started",
  },
  {
    question: "What kind of support do I get after I start therapy?",
    answer: "You will have access to ongoing coaching and in app guidance through your Dumbo Health dashboard including nightly reports AI insights and treatment information.",
    category: "getting-started",
  },
  {
    question: "Will I lose support if I do not go through insurance?",
    answer: "No. Our team provides coaching, mask fit help, and Telehealth visits so you get results without the usual hassle.",
    category: "getting-started",
  },
];
