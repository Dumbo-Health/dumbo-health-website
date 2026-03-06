export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Too often insurance makes CPAP care frustrating and expensive. Dumbo Health cuts through the red tape so patients can focus on feeling better.",
    name: "Dr. Ennis, MD",
    title: "Certified Sleep Doctor",
    image: "/images/team/placeholder.svg",
  },
  {
    quote:
      "For patients without insurance or with limited coverage, Dumbo Health brings real hope and practical solutions.",
    name: "Dr. Fong Balart",
    title: "Obesity Medicine Specialist",
    image: "/images/team/placeholder.svg",
  },
  {
    quote:
      "Dumbo Health is such a meaningful service. It finally makes sleep studies easy to access for people who have struggled to get help.",
    name: "Dr. Hopkins, MD",
    title: "Certified Sleep Doctor",
    image: "/images/team/placeholder.svg",
  },
];
