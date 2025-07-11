export interface CxoDetails {
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
  keyAchievements: string[];
  expertise: string[];
}

export const cxoData: Record<string, CxoDetails> = {
  CMO: {
    name: "Alice Johnson",
    title: "Chief Marketing Officer",
    imageUrl: "/profile-images/alice-johnson.jpg",
    bio: "Alice Johnson is a visionary marketing leader with over 15 years of experience in driving brand growth and market penetration for global tech companies. She specializes in digital marketing, data-driven strategy, and customer engagement.",
    keyAchievements: [
      "Launched a multi-channel campaign that increased lead generation by 150% in one year.",
      "Grew brand awareness by 40% through strategic partnerships and influencer marketing.",
      "Led the digital transformation of the marketing department, adopting new martech stacks.",
    ],
    expertise: ["Digital Strategy", "Brand Management", "Content Marketing", "Market Analysis", "SEO/SEM"],
  },
  CEO: {
    name: "John Davis",
    title: "Chief Executive Officer",
    imageUrl: "/profile-images/john-davis.jpg",
    bio: "John Davis has a proven track record of leading technology companies through periods of rapid growth and innovation. His leadership has been instrumental in scaling operations and securing market leadership.",
    keyAchievements: [
      "Successfully led the company through a $200M Series C funding round.",
      "Expanded the company's footprint into three new international markets.",
      "Oversaw a 300% increase in revenue over four years.",
    ],
    expertise: ["Corporate Strategy", "Venture Capital", "Mergers & Acquisitions", "Leadership", "Product Management"],
  },
  CTO: {
    name: "Samantha Rivera",
    title: "Chief Technology Officer",
    imageUrl: "/profile-images/samantha-rivera.jpg",
    bio: "Samantha Rivera is a hands-on technology executive with expertise in building and scaling high-performance engineering teams. She is passionate about leveraging AI and machine learning to solve complex business problems.",
    keyAchievements: [
      "Architected and launched a new cloud-native platform, reducing infrastructure costs by 40%.",
      "Grew the engineering team from 15 to 75 developers while maintaining a high bar for talent.",
      "Spearheaded the company's open-source program, enhancing developer relations.",
    ],
    expertise: ["Cloud Architecture", "SaaS", "AI/ML", "Team Leadership", "DevOps"],
  },
};