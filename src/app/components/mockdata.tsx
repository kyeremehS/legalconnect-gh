import { Award, HelpCircle, Brain } from "lucide-react";
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
      "Payment terms"
    ]
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
      "Confidentiality agreement"
    ]
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
      "Notarization guide"
    ]
  }
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
    description: "Videos about land rights, disputes, and property law.",
    videos: [
      {
        id: "1",
        title: "Understanding Land Ownership in Ghana",
        url: "/legal-videos/GFA and footballer.mp4",
        lawyer: "Ama Kwarteng, Esq.",
        views: "12.5K",
        duration: "5:32",
        language: "English",
        thumbnail: "/thumbnails/land1.jpg",
        description:
          "Learn about the different types of land ownership in Ghana and your rights as a landowner.",
      },
      {
        id: "2",
        title: "Resolving Land Disputes",
        url: "/legal-videos/Child-labour.mp4",
        lawyer: "Kwame Mensah, Esq.",
        views: "8.2K",
        duration: "7:15",
        language: "Twi",
        thumbnail: "/thumbnails/land2.jpg",
        description:
          "Step-by-step guide on how to resolve land disputes through legal channels.",
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
        url: "/legal-videos/GFA and footballer.mp4",
        lawyer: "Abena Owusu, Esq.",
        views: "15.1K",
        duration: "6:45",
        language: "English",
        thumbnail: "/thumbnails/family1.jpg",
        description:
          "Understanding marriage laws and divorce procedures in Ghana.",
      },
      {
        id: "4",
        title: "Child Custody Explained",
        url: "/legal-videos/GFA and footballer.mp4",
        lawyer: "Kojo Asante, Esq.",
        views: "9.8K",
        duration: "4:20",
        language: "English",
        thumbnail: "/thumbnails/family2.jpg",
        description:
          "Learn about child custody rights and how courts make decisions.",
      },
    ],
  },
  {
    label: "Employment Law",
    description:
      "Videos about employee rights, contracts, and workplace issues.",
    videos: [
      {
        id: "5",
        title: "Your Rights as an Employee",
        url: "/legal-videos/GFA and footballer.mp4",
        lawyer: "Efua Boateng, Esq.",
        views: "11.3K",
        duration: "8:12",
        language: "English",
        thumbnail: "/thumbnails/employment1.jpg",
        description:
          "Know your workplace rights and how to protect yourself from exploitation.",
      },
      {
        id: "6",
        title: "Understanding Employment Contracts",
        url: "/legal-videos/GFA and footballer.mp4", 
        lawyer: "Yaw Adu, Esq.",
        views: "6.7K",
        duration: "5:58",
        language: "Ewe",
        thumbnail: "/thumbnails/employment2.jpg",
        description:
          "What to look for in employment contracts and red flags to avoid.",
      },
    ],
  },
];
