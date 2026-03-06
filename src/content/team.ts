export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export const scientificCommittee: TeamMember[] = [
  {
    name: "Dr. Alon Avidan, MD, MPH",
    title: "Neurologist and sleep medicine specialist",
    bio: "Director of the UCLA Sleep Disorders Center. He has extensive clinical and academic experience in sleep disorders and has published widely on the subject.",
    image: "/images/team/doctor-1.jpg",
  },
  {
    name: "Dr. Meir Kryger, MD, FRCPC",
    title: "Sleep Medicine Physician",
    bio: "Professor of Sleep Medicine at Yale School of Medicine. A recognized pioneer in the field of sleep medicine and author of foundational books such as Principles and Practice of Sleep Medicine.",
    image: "/images/team/doctor-2.jpg",
  },
  {
    name: "Dr. Guy Leschziner",
    title: "Neurologist specializing in sleep disorders",
    bio: "Practices at Guy's and St Thomas' Hospitals in London, where he leads the Sleep Disorders Centre. He is also the author of The Nocturnal Brain and other books on neurology and sleep.",
    image: "/images/team/doctor-3.jpg",
  },
  {
    name: "Dr. Guillaume Marchand",
    title: "Sleep specialist and Medical Innovation Director",
    bio: "Sleep medicine specialist and Medical Innovation Director at Hôtel Dieu (AP-HP) in Paris. He combines clinical practice with the development of innovative solutions for sleep diagnosis and treatment.",
    image: "/images/team/doctor-1.jpg",
  },
  {
    name: "Dr. Olivier Véran",
    title: "Neurologist and politician",
    bio: "Former Health Minister of France. Trained in neurology, he has a strong interest in public health policy and medical communication",
    image: "/images/team/doctor-2.jpg",
  },
];

export const medicalTeam: TeamMember[] = [
  {
    name: "Dr. Zachary Adams, MD, MBA",
    title: "Sleep Medicine Physician",
    bio: "Fellow of the American Academy of Sleep Medicine. A leader and trusted consultant in virtual sleep care.",
    image: "/images/team/doctor-3.jpg",
  },
  {
    name: "Dr. Harrison Gimbel, MD, MS",
    title: "Sleep Medicine Physician",
    bio: "An experienced clinician with a strong commitment to expanding patient access to healthcare via telemedicine solutions.",
    image: "/images/team/doctor-1.jpg",
  },
  {
    name: "Kandace Desadier, APRN, FNP-BC",
    title: "Nurse practitioner",
    bio: "An experienced nurse practitioner focused on helping people get clear sleep answers and move into the right treatment.",
    image: "/images/team/doctor-2.jpg",
  },
];
