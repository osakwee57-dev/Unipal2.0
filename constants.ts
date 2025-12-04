import { Subject, LibraryItem, QuizQuestion } from './types';

// Comprehensive list of Nigerian Universities
export const UNIVERSITIES = [
  "University of Lagos (UNILAG)",
  "University of Ibadan (UI)",
  "Obafemi Awolowo University (OAU)",
  "Ahmadu Bello University (ABU)",
  "University of Nigeria, Nsukka (UNN)",
  "Covenant University (CU)",
  "University of Ilorin (UNILORIN)",
  "University of Benin (UNIBEN)",
  "Federal University of Technology, Akure (FUTA)",
  "Federal University of Technology, Minna (FUTMINNA)",
  "Federal University of Technology, Owerri (FUTO)",
  "Lagos State University (LASU)",
  "Babcock University",
  "Afe Babalola University (ABUAD)",
  "Bayero University Kano (BUK)",
  "University of Port Harcourt (UNIPORT)",
  "Ladoke Akintola University of Technology (LAUTECH)",
  "Olabisi Onabanjo University (OOU)",
  "Nnamdi Azikiwe University (UNIZIK)",
  "University of Jos (UNIJOS)",
  "Ekiti State University (EKSU)",
  "Delta State University (DELSU)",
  "Pan-Atlantic University (PAU)",
  "Landmark University",
  "Nile University of Nigeria",
  "Redeemer's University",
  "University of Abuja (UNIABUJA)",
  "Rivers State University (RSU)",
  "Kwara State University (KWASU)",
  "Adekunle Ajasin University (AAUA)",
  "Usman Danfodiyo University, Sokoto (UDUS)",
  "Michael Okpara University of Agriculture (MOUAU)",
  "Ebonyi State University (EBSU)",
  "Benue State University (BSU)",
  "Kaduna State University (KASU)"
].sort();

// Comprehensive list of Courses
export const COURSES = [
  "Accounting",
  "Actuarial Science",
  "Adult Education",
  "Agricultural Economics",
  "Agricultural Extension",
  "Agronomy",
  "Anatomy",
  "Animal Science",
  "Architecture",
  "Banking and Finance",
  "Biochemistry",
  "Biological Sciences",
  "Botany",
  "Building Technology",
  "Business Administration",
  "Chemical Engineering",
  "Chemistry",
  "Civil Engineering",
  "Computer Engineering",
  "Computer Science",
  "Criminology",
  "Dentistry",
  "Economics",
  "Education & Biology",
  "Education & Chemistry",
  "Education & Economics",
  "Education & English",
  "Education & Mathematics",
  "Education & Physics",
  "Electrical/Electronics Engineering",
  "English Language",
  "English Literature",
  "Environmental Management",
  "Estate Management",
  "Fisheries",
  "Food Science and Technology",
  "French",
  "Geography",
  "Geology",
  "Guidance and Counseling",
  "History and International Studies",
  "Human Kinetics",
  "Industrial Chemistry",
  "Industrial Relations and Personnel Management",
  "Insurance",
  "International Relations",
  "Law",
  "Library and Information Science",
  "Linguistics",
  "Marketing",
  "Mass Communication",
  "Mathematics",
  "Mechanical Engineering",
  "Mechatronics Engineering",
  "Medical Laboratory Science",
  "Medicine and Surgery",
  "Microbiology",
  "Music",
  "Nursing Science",
  "Nutrition and Dietetics",
  "Petroleum Engineering",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Physiology",
  "Physiotherapy",
  "Plant Science",
  "Political Science",
  "Psychology",
  "Public Administration",
  "Public Health",
  "Quantity Surveying",
  "Radiography",
  "Religious Studies",
  "Sociology",
  "Soil Science",
  "Statistics",
  "Surveying and Geoinformatics",
  "Theatre Arts",
  "Urban and Regional Planning",
  "Veterinary Medicine",
  "Zoology"
].sort();

// Specific subject data for popular courses
const DETAILED_SUBJECTS: Record<string, Subject[]> = {
  "Computer Science": [
    { id: 'cs1', title: 'Intro to Computer Science', code: 'CSC 101', description: 'History of computing, binary systems, and basic hardware.' },
    { id: 'cs2', title: 'Intro to Programming', code: 'CSC 102', description: 'Problem solving using Python and C++.' },
    { id: 'cs3', title: 'Digital Logic Design', code: 'CSC 201', description: 'Boolean algebra, logic gates, and circuit design.' },
    { id: 'cs4', title: 'Data Structures & Algorithms', code: 'CSC 202', description: 'Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs.' },
    { id: 'cs5', title: 'Object-Oriented Programming', code: 'CSC 203', description: 'Classes, Objects, Inheritance, and Polymorphism.' },
    { id: 'cs6', title: 'Database Management Systems', code: 'CSC 301', description: 'SQL, NoSQL, Normalization, and ER Diagrams.' },
    { id: 'cs7', title: 'Operating Systems', code: 'CSC 302', description: 'Processes, Threads, Scheduling, and Memory Management.' },
    { id: 'cs8', title: 'Software Engineering', code: 'CSC 401', description: 'SDLC, Agile methodology, and Project Management.' },
    { id: 'math1', title: 'Linear Algebra', code: 'MAT 101', description: 'Vectors, Matrices, and Determinants.' },
    { id: 'math2', title: 'Calculus I', code: 'MAT 102', description: 'Limits, Continuity, Differentiation, and Integration.' },
  ],
  "Law": [
    { id: 'law1', title: 'Nigerian Legal System', code: 'PPL 101', description: 'Sources of Nigerian Law, Courts hierarchy.' },
    { id: 'law2', title: 'Legal Methods', code: 'PPL 102', description: 'Legal reasoning, writing, and research.' },
    { id: 'law3', title: 'Constitutional Law', code: 'PUL 201', description: 'Separation of powers, Fundamental Human Rights.' },
    { id: 'law4', title: 'Law of Contract', code: 'PPL 202', description: 'Offer, Acceptance, Consideration, and Breach.' },
    { id: 'law5', title: 'Criminal Law', code: 'PUL 203', description: 'Criminal responsibility, offences against persons and property.' },
    { id: 'law6', title: 'Law of Torts', code: 'PPL 301', description: 'Negligence, Nuisance, Defamation, and Trespass.' },
    { id: 'law7', title: 'Land Law', code: 'PPL 401', description: 'Customary land tenure, Land Use Act.' },
    { id: 'law8', title: 'Equity and Trusts', code: 'PPL 402', description: 'Principles of Equity, Creation of Trusts.' },
  ],
  "Medicine and Surgery": [
    { id: 'med1', title: 'General Anatomy', code: 'ANA 201', description: 'Gross anatomy of upper and lower limbs.' },
    { id: 'med2', title: 'General Physiology', code: 'PHS 201', description: 'Cell physiology, blood, and body fluids.' },
    { id: 'med3', title: 'Medical Biochemistry', code: 'BCH 201', description: 'Carbohydrates, Proteins, Lipids metabolism.' },
    { id: 'med4', title: 'Neuroanatomy', code: 'ANA 301', description: 'Structure of the nervous system.' },
    { id: 'med5', title: 'Pathology', code: 'PAT 301', description: 'General pathology and immunology.' },
    { id: 'med6', title: 'Pharmacology', code: 'PHA 301', description: 'Pharmacokinetics and Pharmacodynamics.' },
    { id: 'med7', title: 'Microbiology', code: 'MIC 301', description: 'Bacteriology, Virology, and Parasitology.' },
  ],
  "Accounting": [
    { id: 'acc1', title: 'Principles of Accounting', code: 'ACC 101', description: 'Double entry system, Trial Balance.' },
    { id: 'acc2', title: 'Financial Accounting', code: 'ACC 201', description: 'Preparation of financial statements.' },
    { id: 'acc3', title: 'Cost Accounting', code: 'ACC 202', description: 'Cost classification, overheads, and job costing.' },
    { id: 'acc4', title: 'Management Accounting', code: 'ACC 301', description: 'Budgeting, Variance Analysis, and Decision Making.' },
    { id: 'acc5', title: 'Auditing', code: 'ACC 302', description: 'Audit process, internal controls, and ethics.' },
    { id: 'acc6', title: 'Taxation', code: 'ACC 401', description: 'Personal and Company Income Tax.' },
  ]
};

// Helper to generate generic subjects for any course not in the specific list
const generateGenericSubjects = (courseName: string): Subject[] => {
  const codes = ['101', '102', '201', '202', '301', '302', '401', '402'];
  const codePrefix = courseName.substring(0, 3).toUpperCase();
  
  return [
    { id: 'gen1', title: `Introduction to ${courseName}`, code: `${codePrefix} 101`, description: `Fundamental concepts and history of ${courseName}.` },
    { id: 'gen2', title: `${courseName} Methods`, code: `${codePrefix} 102`, description: `Research methods and basic techniques in ${courseName}.` },
    { id: 'gen3', title: `Intermediate ${courseName}`, code: `${codePrefix} 201`, description: `Deep dive into core theories of ${courseName}.` },
    { id: 'gen4', title: `Ethics in ${courseName}`, code: `${codePrefix} 202`, description: 'Professional ethics and legal frameworks.' },
    { id: 'gen5', title: `Advanced ${courseName} I`, code: `${codePrefix} 301`, description: 'Complex case studies and advanced theory.' },
    { id: 'gen6', title: `Field Work / Practical ${courseName}`, code: `${codePrefix} 302`, description: 'Practical application of learned concepts.' },
    { id: 'gen7', title: `Research Project in ${courseName}`, code: `${codePrefix} 401`, description: 'Final year research methodology and thesis.' },
    { id: 'gen8', title: `Contemporary Issues in ${courseName}`, code: `${codePrefix} 402`, description: 'Current trends and future outlook.' },
  ];
};

export const getSubjectsForCourse = (course: string): Subject[] => {
  if (DETAILED_SUBJECTS[course]) {
    return DETAILED_SUBJECTS[course];
  }
  return generateGenericSubjects(course);
};


export const MOCK_LIBRARY: LibraryItem[] = [
  { id: '1', title: 'Modern Operating Systems', type: 'Textbook', author: 'Tanenbaum', course: "Computer Science" },
  { id: '2', title: 'CSC 201 Past Questions (2018-2023)', type: 'Past Question', author: 'Faculty of Science', course: "Computer Science" },
  { id: '3', title: 'Nigerian Law of Contract', type: 'Textbook', author: 'Sagay', course: "Law" },
  { id: '4', title: 'Gray\'s Anatomy', type: 'Textbook', author: 'Susan Standring', course: "Medicine and Surgery" },
  { id: '5', title: 'GST 101 Handout', type: 'Handout', author: 'General Studies Dept', course: "Other" },
  { id: '6', title: 'Intro to Algorithms', type: 'Textbook', author: 'CLRS', course: "Computer Science" },
  { id: '7', title: 'Financial Reporting Standards', type: 'Textbook', author: 'ICAN', course: "Accounting" },
  { id: '8', title: 'Engineering Mathematics', type: 'Textbook', author: 'K.A Stroud', course: "Mechanical Engineering" },
];

export const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of these is NOT a primitive data type in Java?",
    options: ["int", "float", "boolean", "String"],
    correctAnswer: 3
  },
  {
    id: 2,
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Strong Question Language", "Structured Question List", "Simple Query Logic"],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "In the Nigerian Legal System, which court is the highest?",
    options: ["Court of Appeal", "Federal High Court", "Supreme Court", "Magistrate Court"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Who is the current Vice Chancellor of UNILAG (Hypothetical)?",
    options: ["Prof. Ogundipe", "Prof. Salami", "Prof. Folasade Ogunsola", "Prof. Adebayo"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Kano", "Abuja", "Port Harcourt"],
    correctAnswer: 2
  }
];