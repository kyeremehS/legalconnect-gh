import { Award, HelpCircle, Brain } from "lucide-react";

// Lawyer interface definition
export interface Lawyer {
  id: string;
  name: string;
  title: string;
  firm: string;
  location: string;
  barAdmissionYear: number;
  experience: number;
  practiceAreas: string[];
  education: string;
  barAssociation: string;
  profileImage: string;
  isConnected: boolean;
  isPending: boolean;
  connectionCount: number;
  professionalSummary: string;
  publications: string[];
  calendlyLink: string;
  email: string;
  phone: string;
  website?: string;
  detailedBio: string;
  specializations: string[];
  awards: string[];
  languages: string[];
}

// Legal Articles Data
export const legalArticles = [
  {
    id: "1",
    title: "What are your rights if arrested in Ghana?",
    category: "Criminal Law",
    excerpt:
      "Understanding your fundamental rights when facing arrest in Ghana.",
    readTime: "5 min read",
    author: "Kojo Asante, Esq.",
    publishDate: "2024-01-15",
    featured: true,
    content: `
      <p>When you're arrested in Ghana, you have specific rights protected by the 1992 Constitution. Here's what you need to know to protect yourself during this critical time.</p>

      <h2>Your Right to Remain Silent</h2>
      <p>You have the <strong>constitutional right to remain silent</strong> and not answer questions until you have a lawyer present. This is one of your most important protections. Anything you say can and will be used against you in court, so it's often best to exercise this right.</p>

      <h2>Right to Legal Representation</h2>
      <p>You have the right to a lawyer from the moment of arrest. If you cannot afford one, the state should provide legal aid through the Legal Aid Commission. <strong>Always ask for a lawyer immediately</strong> - this is not a sign of guilt, but a smart legal protection.</p>

      <h2>Right to Know the Charges</h2>
      <p>The police must clearly tell you:</p>
      <ul>
        <li>Why you're being arrested</li>
        <li>What specific charges you're facing</li>
        <li>The reason for your detention</li>
      </ul>

      <h2>Time Limits for Detention</h2>
      <p>This is crucial: <strong>You must be brought before a court within 48 hours of arrest</strong> (excluding weekends and public holidays). If this doesn't happen, your detention becomes unlawful.</p>

      <h2>Right to Contact Family</h2>
      <p>You have the right to inform someone about your arrest - usually a family member or close friend. The police should allow you to make this contact.</p>

      <h2>Protection from Torture and Abuse</h2>
      <p>You have the absolute right to be treated humanely. Any form of torture, assault, or inhumane treatment is strictly prohibited and can lead to serious consequences for the officers involved.</p>

      <h2>What to Do if Your Rights Are Violated</h2>
      <p>If any of these rights are violated, you can:</p>
      <ul>
        <li>File a complaint with the Police Professional Standards Bureau</li>
        <li>Report to the Commission on Human Rights and Administrative Justice (CHRAJ)</li>
        <li>Seek legal remedy through the courts</li>
      </ul>

      <p><strong>Remember:</strong> Knowing your rights is the first step to protecting yourself. Stay calm, be respectful, but firmly assert your rights.</p>
    `,
    relatedLawyers: ["kojo-asante", "ama-kwarteng"],
  },
  {
    id: "2",
    title: "How to register land in Ghana",
    category: "Land Law",
    excerpt:
      "Step-by-step guide to registering your land with the Lands Commission.",
    readTime: "8 min read",
    author: "Kwame Mensah, Esq.",
    publishDate: "2024-01-10",
    featured: true,
    content: `
      <p>Land registration in Ghana is crucial for securing your property rights and avoiding future disputes. This comprehensive guide will walk you through the entire process.</p>

      <h2>Why Register Your Land?</h2>
      <p>Land registration provides:</p>
      <ul>
        <li><strong>Legal security</strong> - Official government recognition of your ownership</li>
        <li><strong>Protection against fraud</strong> - Prevents illegal sales by others</li>
        <li><strong>Access to credit</strong> - Banks accept registered land as collateral</li>
        <li><strong>Easier inheritance</strong> - Clear ownership transfer to family</li>
      </ul>

      <h2>Step 1: Verify the Land</h2>
      <p>Before purchasing or registering land, always:</p>
      <ul>
        <li><strong>Conduct a search</strong> at the Lands Commission to check ownership history</li>
        <li><strong>Verify boundaries</strong> with a licensed surveyor</li>
        <li><strong>Check for disputes</strong> - Ask neighbors and local authorities</li>
        <li><strong>Confirm the seller's authority</strong> - Ensure they have the right to sell</li>
      </ul>

      <h2>Step 2: Prepare Required Documents</h2>
      <p>You'll need the following documents:</p>

      <h3>Primary Documents:</h3>
      <ul>
        <li><strong>Indenture or Deed of Conveyance</strong> - The sale agreement</li>
        <li><strong>Site plan</strong> - Prepared by a licensed surveyor</li>
        <li><strong>Search report</strong> - From the Lands Commission</li>
        <li><strong>Statutory declaration</strong> - Sworn statement about the land</li>
      </ul>

      <h3>Supporting Documents:</h3>
      <ul>
        <li>Building permit (if applicable)</li>
        <li>Tax clearance certificate</li>
        <li>Identity documents of buyer and seller</li>
        <li>Witness statements</li>
      </ul>

      <h2>Step 3: The Registration Process</h2>

      <h3>Application Submission</h3>
      <p>Submit your application to the appropriate Lands Commission office with:</p>
      <ul>
        <li>Completed application forms</li>
        <li>All required documents</li>
        <li>Payment of prescribed fees</li>
      </ul>

      <h3>Processing Timeline</h3>
      <p>The typical timeline is:</p>
      <ul>
        <li><strong>Acknowledgment</strong> - Within 7 days</li>
        <li><strong>Initial review</strong> - 14-21 days</li>
        <li><strong>Field verification</strong> - 30-45 days</li>
        <li><strong>Final processing</strong> - 60-90 days</li>
      </ul>

      <h2>Costs Involved</h2>
      <p>Registration fees vary by location and land value, but typically include:</p>
      <ul>
        <li>Search fees: GHS 20-50</li>
        <li>Registration fees: 0.5% of property value</li>
        <li>Survey fees: GHS 1,000-5,000</li>
        <li>Legal fees: GHS 500-2,000</li>
      </ul>

      <h2>Common Challenges and Solutions</h2>

      <h3>Multiple Claims</h3>
      <p>If multiple people claim the same land, the Commission will investigate and may require additional evidence or mediation.</p>

      <h3>Boundary Disputes</h3>
      <p>Accurate surveying and neighbor consultation before registration can prevent these issues.</p>

      <h3>Document Issues</h3>
      <p>Ensure all documents are properly prepared, signed, and witnessed to avoid delays.</p>

      <h2>After Registration</h2>
      <p>Once registered, you'll receive:</p>
      <ul>
        <li><strong>Land Certificate</strong> - Official proof of ownership</li>
        <li><strong>Registration number</strong> - For future reference</li>
        <li><strong>Updated site plan</strong> - With official markings</li>
      </ul>

      <p><strong>Important:</strong> Keep your land certificate safe and make certified copies for transactions. Registration protects your investment and provides peace of mind.</p>
    `,
    relatedLawyers: ["kwame-mensah", "ama-kwarteng"],
  },
  {
    id: "3",
    title: "Understanding tenancy agreements",
    category: "Property Law",
    excerpt: "Know your rights and obligations as a tenant or landlord.",
    readTime: "6 min read",
    author: "Abena Owusu, Esq.",
    publishDate: "2024-01-05",
    featured: false,
    content: `A tenancy agreement is a contract between landlord and tenant. Key elements include:

**Rent and Payment Terms**
- Amount of rent and when it's due
- Acceptable payment methods
- Late payment penalties

**Property Condition**
- Initial condition of the property
- Tenant's maintenance responsibilities
- Landlord's repair obligations

**Termination Clauses**
- Notice periods required
- Grounds for eviction
- Return of security deposits`,
    relatedLawyers: ["abena-owusu"],
  },
];

// Legal Templates Data
export const legalTemplates = [
  {
    id: "1",
    title: "Tenancy Agreement Template",
    category: "Property Law",
    description: "Standard residential tenancy agreement for Ghana",
    downloadCount: "2.1K",
    downloads: "2100",
    fileSize: "156 KB",
    format: "PDF",
    price: "Free",
    featured: true,
    features: [
      "Legally compliant",
      "Customizable fields",
      "Landlord & tenant rights",
      "Payment terms",
    ],
  },
  {
    id: "2",
    title: "Employment Contract Template",
    category: "Employment Law",
    description: "Comprehensive employment contract template",
    downloadCount: "1.8K",
    downloads: "1800",
    fileSize: "203 KB",
    format: "Word",
    price: "Free",
    featured: false,
    features: [
      "Job description section",
      "Salary & benefits",
      "Termination clauses",
      "Confidentiality agreement",
    ],
  },
  {
    id: "3",
    title: "Power of Attorney Form",
    category: "General Law",
    description: "General power of attorney document",
    downloadCount: "1.5K",
    downloads: "1500",
    fileSize: "89 KB",
    format: "PDF",
    price: "Free",
    featured: false,
    features: [
      "Multiple authority types",
      "Witness requirements",
      "Revocation clause",
      "Notarization guide",
    ],
  },
];

// Quiz Data
export const legalQuizzes = [
  {
    id: "1",
    title: "Know Your Rights",
    description: "Test your knowledge of basic legal rights in Ghana",
    category: "General",
    questions: 10,
    duration: "5 minutes",
    difficulty: "Beginner",
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "Which Lawyer Do You Need?",
    description: "Find out what type of legal help you require",
    category: "Assessment",
    questions: 8,
    duration: "3 minutes",
    difficulty: "All Levels",
    icon: <HelpCircle className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "Can You Sue?",
    description: "Interactive scenarios to test your legal knowledge",
    category: "Scenarios",
    questions: 12,
    duration: "8 minutes",
    difficulty: "Intermediate",
    icon: <Brain className="w-6 h-6" />,
  },
];

// Video categories and data
export const videoCategories = [
  {
    label: "Land Law",
    description: "Videos about Landlord and tenants rights.",
    videos: [
      {
        id: "1",
        title: "Understanding Landlord and Tenant Rights",
        url: "/legal-videos/tenant-and-landlord.mp4",
        lawyer: "Yudah Brown, Esq.",
        views: "12.5K",
        duration: "5:32",
        language: "English",
        thumbnail: "/thumbnails/land1.jpg",
        description:
          "Education on getting a rent card from the landlord and understanding your rights as a tenant.",
      },
      {
        id: "2",
        title: "Building without permits",
        url: "/legal-videos/building-without-permit.mp4",
        lawyer: "Yudah Brown, Esq.",
        views: "8.2K",
        duration: "7:15",
        language: "English",
        thumbnail: "/thumbnails/land2.jpg",
        description:
          "Education on being served with a notice to stop building without a permit and the legal implications.",
      },
    ],
  },
  {
    label: "Family Law",
    description:
      "Videos about marriage, divorce, child custody, and related issues.",
    videos: [
      {
        id: "3",
        title: "Marriage and Divorce Laws",
        url: "/legal-videos/getting-divorce-in-ghana.mp4",
        lawyer: "Tina, Esq.",
        views: "15.1K",
        duration: "3:09",
        language: "Twi",
        thumbnail: "/thumbnails/family1.jpg",
        description: "Understanding how to get a divorce in a Ghanaian court.",
      },
      {
        id: "4",
        title: "Child Custody and Labour Explained",
        url: "/legal-videos/Child-labour.mp4",
        lawyer: "Yudah Brown, Esq.",
        views: "9.8K",
        duration: "1:36",
        language: "English",
        thumbnail: "/thumbnails/family2.jpg",
        description: "Learn about what qualifies to be child labour.",
      },
    ],
  },
  {
    label: "Criminal Law",
    description:
      "Video about explaining what it means to plead guilty or not guilty in court.",
    videos: [
      {
        id: "5",
        title: "Pleading guilty or not guilty in court",
        url: "/legal-videos/Pleading-guilty-in-court.mp4",
        lawyer: "Tina, Esq.",
        views: "11.3K",
        duration: "2:58",
        language: "Twi",
        thumbnail: "/thumbnails/employment1.jpg",
        description:
          "Understanding the meaning of pleading guilty or not guilty in court and its implications.",
      },
    ],
  },
  {
    label: "Association Law",
    description: "Videos about the rules and regulations of associations.",
    videos: [
      {
        id: "6",
        title: "Understanding the Law of Association",
        url: "/legal-videos/GFA and footballer.mp4",
        lawyer: "Yudah Brown, Esq.",
        views: "6.7K",
        duration: "5:58",
        language: "English",
        thumbnail: "/thumbnails/Association-rules.jpg",
        description:
          "Know the rules and regulations of the association you are affiliated to.",
      },
    ],
  },
];

export const lawyers: Lawyer[] = [
  {
    id: "1",
    name: "Ama Kwarteng",
    title: "Senior Partner",
    firm: "Kwarteng & Associates",
    location: "Accra, Ghana",
    barAdmissionYear: 2008,
    experience: 15,
    practiceAreas: ["Corporate Law", "Commercial Litigation", "Contract Law"],
    education: "University of Ghana School of Law, LLB (2007)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/ama-kwarteng.jpg",
    isConnected: false,
    isPending: false,
    connectionCount: 500,
    professionalSummary: "Legal practitioner specializing in corporate and commercial matters.",
    publications: ["Understanding Corporate Governance in Ghana", "Contract Law Basics"],
    calendlyLink: "https://calendly.com/affum3331/30min",
    email: "ama@kwartenglaw.com",
    phone: "+233 24 123 4567",
    website: "www.kwartenglaw.com",
    detailedBio: "Ama Kwarteng is a highly experienced corporate lawyer with over 15 years of practice in Ghana. She specializes in corporate governance, mergers and acquisitions, and commercial litigation. She has advised numerous multinational corporations and local businesses on complex legal matters.",
    specializations: ["Mergers & Acquisitions", "Securities Law", "International Trade"],
    awards: ["Ghana Law Awards - Corporate Lawyer of the Year 2022", "Outstanding Legal Practitioner 2021"],
    languages: ["English", "Twi", "French"]
  },
  {
    id: "2",
    name: "Kwame Mensah",
    title: "Legal Practitioner",
    firm: "Mensah Legal Consultancy",
    location: "Kumasi, Ghana",
    barAdmissionYear: 2011,
    experience: 12,
    practiceAreas: ["Land Law", "Property Law", "Real Estate"],
    education: "KNUST Faculty of Law, LLB (2010)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/kwame-mensah.jpg",
    isConnected: true,
    isPending: false,
    connectionCount: 342,
    professionalSummary: "Legal practitioner with focus on land and property law matters.",
    publications: ["Land Rights in Ghana: A Guide"],
    calendlyLink: "https://calendly.com/kwame-mensah/consultation",
    email: "kwame@mensahlegal.com",
    phone: "+233 20 987 6543",
    detailedBio: "Kwame Mensah has dedicated his career to property and land law in Ghana. He has successfully handled over 200 land disputes and property transactions, making him one of the most sought-after property lawyers in the Ashanti region.",
    specializations: ["Land Disputes", "Property Transactions", "Real Estate Development"],
    awards: ["Best Property Lawyer - Ashanti Region 2020"],
    languages: ["English", "Twi", "Asante Twi"]
  },
  {
    id: "3",
    name: "Abena Owusu",
    title: "Family Law Practitioner",
    firm: "Owusu Family Law Chambers",
    location: "Takoradi, Ghana",
    barAdmissionYear: 2013,
    experience: 10,
    practiceAreas: ["Family Law", "Matrimonial Law", "Child Welfare"],
    education: "University of Cape Coast Faculty of Law, LLB (2012)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/abena-owusu.jpg",
    isConnected: false,
    isPending: true,
    connectionCount: 278,
    professionalSummary: "Legal practitioner focusing on family and matrimonial law.",
    publications: ["Family Law in Ghana: Know Your Rights"],
    calendlyLink: "https://calendly.com/abena-owusu/family-law-session",
    email: "abena@owusufamilylaw.com",
    phone: "+233 31 456 7890",
    detailedBio: "Abena Owusu is a compassionate family law practitioner who has helped hundreds of families navigate complex legal situations. She specializes in divorce proceedings, child custody, and domestic violence cases.",
    specializations: ["Divorce & Separation", "Child Custody", "Domestic Violence"],
    awards: ["Family Law Excellence Award 2021"],
    languages: ["English", "Fante", "Twi"]
  },
  {
    id: "4",
    name: "Kojo Asante",
    title: "Criminal Law Practitioner",
    firm: "Asante Defense Chambers",
    location: "Accra, Ghana",
    barAdmissionYear: 2005,
    experience: 18,
    practiceAreas: ["Criminal Law", "Constitutional Law", "Human Rights"],
    education: "Ghana School of Law, BL (2005)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/kojo-asante.jpg",
    isConnected: false,
    isPending: false,
    connectionCount: 612,
    professionalSummary: "Legal practitioner with experience in criminal and constitutional matters.",
    publications: ["Understanding Your Rights Under Ghana's Constitution", "Criminal Procedure Guide"],
    calendlyLink: "https://calendly.com/kojo-asante/criminal-defense",
    email: "kojo@asantedefense.com",
    phone: "+233 26 789 0123",
    website: "www.asantedefense.com",
    detailedBio: "Kojo Asante is a renowned criminal defense lawyer with an impressive track record in high-profile criminal and constitutional cases. He has successfully defended clients in the Supreme Court and is known for his expertise in human rights law.",
    specializations: ["Criminal Defense", "Constitutional Law", "Human Rights Advocacy"],
    awards: ["Criminal Defense Lawyer of the Year 2019", "Human Rights Advocate 2020"],
    languages: ["English", "Twi", "Ga"]
  },
  {
    id: "5",
    name: "Efua Boateng",
    title: "Employment Law Practitioner",
    firm: "Boateng Legal Services",
    location: "Tema, Ghana",
    barAdmissionYear: 2015,
    experience: 8,
    practiceAreas: ["Employment Law", "Labour Law", "Industrial Relations"],
    education: "University of Professional Studies Law School, LLB (2014)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/efua-boateng.jpg",
    isConnected: false,
    isPending: false,
    connectionCount: 289,
    professionalSummary: "Legal practitioner specializing in employment and labour law.",
    publications: ["Workers' Rights in Ghana: An Overview"],
    calendlyLink: "https://calendly.com/efua-boateng/employment-consultation",
    email: "efua@boatenglegal.com",
    phone: "+233 30 234 5678",
    detailedBio: "Efua Boateng is a dedicated employment lawyer who advocates for workers' rights and helps businesses navigate complex employment regulations. She has extensive experience in labor disputes and employment contract negotiations.",
    specializations: ["Employment Contracts", "Labor Disputes", "Workplace Rights"],
    awards: ["Rising Star in Employment Law 2022"],
    languages: ["English", "Twi", "Ewe"]
  },
];
