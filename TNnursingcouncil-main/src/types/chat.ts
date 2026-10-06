export interface ChatContentBlock {
  type: 'paragraph' | 'heading' | 'bullet-list' | 'numbered-list' | 'link';
  text?: string;
  items?: string[];
  href?: string;
  linkLabel?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  timestamp: string;
  content: string;
  blocks?: ChatContentBlock[];
  source?: string;
  attachmentName?: string;
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  messages: Message[];
}

export interface SuggestedPromptItem {
  id: string;
  label: string;
  prompt: string;
}

export const SUGGESTED_PROMPTS: SuggestedPromptItem[] = [
  {
    id: 'license-status',
    label: 'License status',
    prompt: 'How can I check my license status?',
  },
  {
    id: 'registration-docs',
    label: 'Registration',
    prompt: 'What documents are required for registration?',
  },
  {
    id: 'cne-info',
    label: 'CNE',
    prompt: 'How can I find information about CNE?',
  },
  {
    id: 'renewal-process',
    label: 'Renewal',
    prompt: 'How do I renew my registration?',
  },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-license-status',
    title: 'License Status Query',
    updatedAt: 'Today',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        timestamp: '10:14 AM',
        content: 'How can I check my license status?',
      },
      {
        id: 'msg-2',
        role: 'assistant',
        timestamp: '10:14 AM',
        content: `To check your license status, please use the **License Status** service available through the official **Tamil Nadu Nurses & Midwives Council** website.

### Steps to Verify Registration Standing

1. Visit the official **Tamil Nadu Nurses & Midwives Council** portal.
2. Navigate to the online services section and select the **License Status / Registry Verification** option.
3. Enter your registered **TNNMC Registration Number** (\`RN\`, \`RM\`, or \`ANM\`) and required verification particulars.
4. Review your current registration status and validity period as recorded in the council register.

### Standard Registration Reference Format

\`\`\`json
{
  "council": "Tamil Nadu Nurses and Midwives Council",
  "registrationCategory": "RN & RM",
  "registrationNumberFormat": "RN-XXXXXX / RM-XXXXXX",
  "verificationPortal": "https://www.tamilnadunursingcouncil.com/"
}
\`\`\`

[Tamil Nadu Nurses & Midwives Council — Official Website](https://www.tamilnadunursingcouncil.com/)`,
        source: 'Tamil Nadu Nurses & Midwives Council',
      },
    ],
  },
  {
    id: 'conv-registration-info',
    title: 'Registration Information',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 'msg-reg-1',
        role: 'user',
        timestamp: '04:20 PM',
        content: 'What documents are required for registration?',
      },
      {
        id: 'msg-reg-2',
        role: 'assistant',
        timestamp: '04:20 PM',
        content: `Applications for registration with the **Tamil Nadu Nurses & Midwives Council** require academic and identity documentation issued by recognized institutions.

### General Documentation for Registration

- **Qualifying Certificate:** Provisional or Degree / Diploma certificate from a recognized nursing institution.
- **Academic Transcripts:** Consolidated mark sheets and course completion certificate.
- **School Records:** Transfer Certificate and Secondary School Leaving Certificate (\`SSLC\`) / Higher Secondary certificate.
- **Photograph:** Recent passport-size photograph conforming to council specifications.
- **Identity Proof:** Valid government-issued identity document.

### Document Upload Specification Example

\`\`\`json
{
  "photographFormat": "JPG / PNG",
  "certificateFormat": "PDF",
  "eligibleCategories": ["ANM", "GNM", "B.Sc. Nursing", "Post-Basic B.Sc.", "M.Sc. Nursing"]
}
\`\`\`

For category-specific checklists (including **Reciprocity Registration**), please consult the official instructions on the council website.

[View Registration Guidelines on TNNMC Official Website](https://www.tamilnadunursingcouncil.com/)`,
        source: 'Tamil Nadu Nurses & Midwives Council',
      },
    ],
  },
  {
    id: 'conv-cne-info',
    title: 'CNE Information',
    updatedAt: 'Previous 7 Days',
    messages: [
      {
        id: 'msg-cne-1',
        role: 'user',
        timestamp: '11:05 AM',
        content: 'How can I find information about CNE?',
      },
      {
        id: 'msg-cne-2',
        role: 'assistant',
        timestamp: '11:05 AM',
        content: `**Continuing Nursing Education (CNE)** programs and credit hour tracking are managed through the Tamil Nadu Nurses & Midwives Council online services.

### Accessing CNE Services

- **CNE Online Portal:** Registered nursing personnel can participate in council-approved continuing education modules and webinars.
- **CNE Hours Check:** You may verify your accumulated CNE hours online using your registration details.
- **Renewal Requirement:** Completion of prescribed CNE credit hours is used for periodic registration renewal in accordance with council norms.

\`\`\`json
{
  "serviceModule": "CNE Online & Hours Check",
  "applicableTo": "Registered Nurses (RN) & Registered Midwives (RM)",
  "officialWebsite": "https://www.tamilnadunursingcouncil.com/"
}
\`\`\`

[Access CNE Resources on TNNMC Official Website](https://www.tamilnadunursingcouncil.com/)`,
        source: 'Tamil Nadu Nurses & Midwives Council',
      },
    ],
  },
  {
    id: 'conv-renewal-process',
    title: 'Renewal Process',
    updatedAt: 'Previous 7 Days',
    messages: [
      {
        id: 'msg-ren-1',
        role: 'user',
        timestamp: '02:45 PM',
        content: 'How do I renew my registration?',
      },
      {
        id: 'msg-ren-2',
        role: 'assistant',
        timestamp: '02:45 PM',
        content: `Registration renewal can be completed through the **Online Renewal & Licensure Card** portal of the Tamil Nadu Nurses & Midwives Council.

### Standard Renewal Procedure

1. Access the **Online Renewal** section through the official TNNMC website.
2. Provide your existing **TNNMC Registration Certificate** details.
3. Upload a recent passport-size photograph, valid identity proof, and original registration certificate copy.
4. Ensure required **Continuing Nursing Education (CNE)** hours are recorded where applicable.
5. Complete the prescribed renewal fee submission through the official portal.

[Tamil Nadu Nurses & Midwives Council — Online Services](https://www.tamilnadunursingcouncil.com/)`,
        source: 'Tamil Nadu Nurses & Midwives Council',
      },
    ],
  },
  {
    id: 'conv-council-services',
    title: 'Nursing Council Services',
    updatedAt: 'Previous 30 Days',
    messages: [
      {
        id: 'msg-srv-1',
        role: 'user',
        timestamp: '09:30 AM',
        content: 'What online services are provided by TNNMC?',
      },
      {
        id: 'msg-srv-2',
        role: 'assistant',
        timestamp: '09:30 AM',
        content: `The **Tamil Nadu Nurses & Midwives Council** provides online services for registered nursing personnel and recognized institutions.

### Key Digital Services Available

- **Online Registration & Additional Qualification Updates** (including Ph.D. and postgraduate details)
- **Renewal & Licensure Card Applications**
- **License Status Check & Registry Verification**
- **Continuing Nursing Education (CNE)** Online & CNE Hours Check
- **No Objection Certificate (NOC)** & Foreign Verification
- **Institution Management, Inspection Management & Online Recognition**

[Visit www.tamilnadunursingcouncil.com](https://www.tamilnadunursingcouncil.com/)`,
        source: 'Tamil Nadu Nurses & Midwives Council',
      },
    ],
  },
];

export function buildAssistantResponse(userPrompt: string): {
  content: string;
  blocks: ChatContentBlock[];
  source: string;
} {
  const lower = userPrompt.toLowerCase();

  if (lower.includes('license') || lower.includes('status') || lower.includes('verify')) {
    return {
      content: `To check your license status, please use the **License Status** service available through the official **Tamil Nadu Nurses & Midwives Council** website.

### How to Check License Status

1. Open the official **Tamil Nadu Nurses & Midwives Council** website.
2. Select the **License Status** service from the online services menu.
3. Enter your **TNNMC Registration Number** (\`RN\` / \`RM\` / \`ANM\`) to view current standing in the council register.

\`\`\`json
{
  "service": "License Status Verification",
  "requiredInput": "TNNMC Registration Number (RN / RM / ANM)",
  "portal": "https://www.tamilnadunursingcouncil.com/"
}
\`\`\`

[Tamil Nadu Nurses & Midwives Council — Official Website](https://www.tamilnadunursingcouncil.com/)`,
      blocks: [],
      source: 'Tamil Nadu Nurses & Midwives Council',
    };
  }

  if (lower.includes('renew')) {
    return {
      content: `To renew your registration, please use the **Online Renewal and Licensure Card** service on the official **Tamil Nadu Nurses & Midwives Council** website.

### Items Typically Required for Renewal

- **Original TNNMC Registration Certificate** details
- **Recent passport-size photograph**
- **Valid identity proof**
- **Continuing Nursing Education (CNE)** credit hours record where applicable

\`\`\`json
{
  "service": "Online Registration Renewal",
  "requiredDocuments": ["Registration Certificate", "Passport Photograph", "Identity Proof", "CNE Record"]
}
\`\`\`

[Proceed to TNNMC Official Website](https://www.tamilnadunursingcouncil.com/)`,
      blocks: [],
      source: 'Tamil Nadu Nurses & Midwives Council',
    };
  }

  if (lower.includes('cne') || lower.includes('continuing') || lower.includes('credit')) {
    return {
      content: `Information regarding **Continuing Nursing Education (CNE)** modules and credit hours is available through the CNE section on the official **Tamil Nadu Nurses & Midwives Council** website.

### CNE Online Services

- Access **accredited online study modules**, webinars, and continuing education articles.
- Check your **recorded CNE credit hours** online prior to applying for license renewal.
- Download **digital completion certificates** for completed council modules.

\`\`\`json
{
  "module": "Continuing Nursing Education (CNE)",
  "features": ["Online Study Modules", "CNE Hours Check", "Digital Certificates"]
}
\`\`\`

[Tamil Nadu Nurses & Midwives Council — CNE Portal Info](https://www.tamilnadunursingcouncil.com/)`,
      blocks: [],
      source: 'Tamil Nadu Nurses & Midwives Council',
    };
  }

  if (
    lower.includes('document') ||
    lower.includes('register') ||
    lower.includes('registration')
  ) {
    return {
      content: `Registration with the **Tamil Nadu Nurses & Midwives Council** is conducted through the online registration portal for graduates of recognized nursing institutions.

### Standard Supporting Documents

- **Qualifying Certificate:** Degree or Diploma Certificate (\`GNM\`, \`B.Sc. Nursing\`, \`Post-Basic B.Sc.\`, \`M.Sc. Nursing\`, or \`ANM\`)
- **Academic Records:** Mark sheets and transcripts from a recognized institution
- **Identity & Photograph:** Recent passport-size photograph and valid identity proof
- **Reciprocity Registration:** Nurses registered in another Indian state require their home state council certificate and **No Objection Certificate (NOC)**

\`\`\`json
{
  "registrationBody": "Tamil Nadu Nurses and Midwives Council",
  "statutoryAct": "Established 1926 under Act III",
  "categories": ["RN", "RM", "ANM", "Reciprocity"]
}
\`\`\`

[View Official Registration Requirements](https://www.tamilnadunursingcouncil.com/)`,
      blocks: [],
      source: 'Tamil Nadu Nurses & Midwives Council',
    };
  }

  if (lower.includes('noc') || lower.includes('foreign') || lower.includes('abroad')) {
    return {
      content: `Applications for a **No Objection Certificate (NOC)** or **Foreign Verification** can be submitted through the online services section of the Tamil Nadu Nurses & Midwives Council website.

### Key Requirements

- Ensure your **TNNMC registration** is currently active and in good standing.
- Keep details of the destination **State Nursing Council** or overseas regulatory authority ready.
- Refer to the **NOC and Foreign Verification** instructions on the official website for submission steps.

[Tamil Nadu Nurses & Midwives Council — Official Website](https://www.tamilnadunursingcouncil.com/)`,
      blocks: [],
      source: 'Tamil Nadu Nurses & Midwives Council',
    };
  }

  return {
    content: `For official procedures regarding **registration**, **license status verification**, **renewal**, **CNE hours**, **NOC**, and institutional services, please refer to the relevant service module on the official **Tamil Nadu Nurses & Midwives Council** website.

### Available Council Information Topics

- **License Status & Nursing Personnel Registry Verification**
- **Online Registration & Additional Qualification Updates**
- **Registration Renewal & Licensure Card**
- **Continuing Nursing Education (CNE) Credits**
- **No Objection Certificate (NOC) & Foreign Verification**

\`\`\`json
{
  "institution": "Tamil Nadu Nurses and Midwives Council",
  "contactPhone": "91-44-4678 6539",
  "contactEmail": "info@tamilnadunursingcouncil.com",
  "officialWebsite": "https://www.tamilnadunursingcouncil.com/"
}
\`\`\`

[Visit www.tamilnadunursingcouncil.com](https://www.tamilnadunursingcouncil.com/)`,
    blocks: [],
    source: 'Tamil Nadu Nurses & Midwives Council',
  };
}
