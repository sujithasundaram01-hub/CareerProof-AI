import {
  UserProfile,
  SkillItem,
  ResumeAnalysis,
  JobPosting,
  RoadmapTask,
  ProjectItem,
  GitHubData,
  SkillProofAssessment,
  MockInterviewSession,
  JobSimulationTask,
  ApplicationRecord,
  CareerReplayReport,
  CareerReadinessScore,
  NotificationItem
} from './types';

export const initialUserProfile: UserProfile = {
  id: 'user_arjun_01',
  name: 'Arjun Sharma',
  email: 'arjun.sharma2025@college.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  education: 'National Institute of Technology',
  degree: 'Bachelor of Technology (B.Tech)',
  department: 'Computer Science and Engineering',
  graduationYear: '2025',
  experienceLevel: 'Student',
  targetJobRole: 'Software Developer (Backend / Java)',
  targetCompanies: ['Amazon', 'Razorpay', 'Cisco', 'PhonePe', 'Goldman Sachs'],
  preferredTechnologies: ['Java', 'Spring Boot', 'SQL', 'Python', 'Docker', 'DSA'],
  careerGoal: 'Secure an entry-level SDE role in a high-scale product engineering team by Q3 2025.',
  availableStudyHoursPerWeek: 18,
};

export const initialSkills: SkillItem[] = [
  {
    id: 'skill-dsa',
    name: 'Data Structures & Algorithms',
    category: 'Problem Solving',
    status: 'DEMONSTRATED',
    currentEstimatedLevel: 3,
    requiredLevel: 5,
    gap: 2,
    priority: 'Critical',
    whyItMatters: 'Top product companies (Amazon, Razorpay) make live algorithmic reasoning and time/space complexity proofs the primary elimination barrier in Technical Round 1.',
    recommendedPractice: 'Solve 20 medium Graph & Tree problems; verbalize edge case trade-offs using the REACTO technique.',
    recommendedProject: 'Build a Distributed Cache Simulator showcasing LRU eviction and concurrency locks.',
    recommendedAssessment: 'SkillProof: Advanced DSA & Algorithm Trade-offs',
    verifiedScore: 62,
    sources: ['Resume', 'Interview', 'SkillProof'],
  },
  {
    id: 'skill-java',
    name: 'Java & Spring Boot',
    category: 'Languages',
    status: 'VERIFIED',
    currentEstimatedLevel: 4,
    requiredLevel: 4,
    gap: 0,
    priority: 'Low',
    whyItMatters: 'Core foundation for backend services, dependency injection, and REST API controller development.',
    recommendedPractice: 'Study JVM memory management, GC pauses, and virtual threads (Java 21).',
    recommendedProject: 'FinTrack Microservices with Spring Cloud Gateway.',
    recommendedAssessment: 'SkillProof: Java Core & Modern Concurrency',
    verifiedScore: 84,
    verifiedDate: '2026-08-20',
    sources: ['Resume', 'GitHub', 'SkillProof'],
  },
  {
    id: 'skill-sql',
    name: 'SQL & Database Indexing',
    category: 'Databases',
    status: 'VERIFIED',
    currentEstimatedLevel: 4,
    requiredLevel: 4,
    gap: 0,
    priority: 'Low',
    whyItMatters: 'Essential for query optimization, B-Tree index utilization, and schema normalization.',
    recommendedPractice: 'Analyze EXPLAIN plans for multi-table JOINs and composite indexes.',
    recommendedProject: 'E-commerce analytics pipeline with PostgreSQL partitioning.',
    recommendedAssessment: 'SkillProof: Relational Query Optimization',
    verifiedScore: 88,
    verifiedDate: '2026-08-25',
    sources: ['SkillProof', 'JobSimulation', 'Resume'],
  },
  {
    id: 'skill-rest-api',
    name: 'REST API Security & JWT',
    category: 'Frameworks',
    status: 'DEMONSTRATED',
    currentEstimatedLevel: 2,
    requiredLevel: 4,
    gap: 2,
    priority: 'High',
    whyItMatters: 'Production systems require stateless JWT authentication, RBAC authorization, and rate limiting against API abuse.',
    recommendedPractice: 'Implement Spring Security 6 filter chain with refresh token rotation.',
    recommendedProject: 'Add OAuth2 / JWT login with Redis blacklisting to FinTrack.',
    recommendedAssessment: 'SkillProof: RESTful Architecture & API Security',
    sources: ['Resume', 'GitHub'],
  },
  {
    id: 'skill-docker',
    name: 'Docker & Containerization',
    category: 'DevOps & Tools',
    status: 'CLAIMED',
    currentEstimatedLevel: 2,
    requiredLevel: 3,
    gap: 1,
    priority: 'Medium',
    whyItMatters: 'Enables consistent reproducible environments across local development and CI/CD staging servers.',
    recommendedPractice: 'Write multi-stage Dockerfiles optimizing image size under 120MB.',
    recommendedProject: 'Containerize multi-container app with docker-compose.',
    recommendedAssessment: 'SkillProof: Containerization Fundamentals',
    sources: ['Resume'],
  },
  {
    id: 'skill-cn-os',
    name: 'OS & Computer Networks',
    category: 'Core CS',
    status: 'DEMONSTRATED',
    currentEstimatedLevel: 3,
    requiredLevel: 4,
    gap: 1,
    priority: 'High',
    whyItMatters: 'Frequently probed in technical screening (TCP 3-way handshake, DNS, thread vs process, virtual memory).',
    recommendedPractice: 'Review TCP vs UDP socket flows, HTTP/2 multiplexing, and page fault handling.',
    recommendedProject: 'Multi-threaded HTTP Server in C/Java.',
    recommendedAssessment: 'SkillProof: OS Concurrency & Network Protocols',
    sources: ['Resume', 'Interview'],
  }
];

export const initialResumeAnalysis: ResumeAnalysis = {
  overallScore: 81,
  atsScore: 78,
  sectionScores: {
    structure: 86,
    skills: 82,
    experience: 74,
    projects: 88,
    education: 90,
  },
  strengths: [
    'Clean single-column standard layout that passes major ATS parsers (Workday, Greenhouse).',
    'Demonstrated full-stack project (FinTrack) with modern tech stack: Spring Boot, PostgreSQL, and React.',
    'Clear educational timeline with Dean’s Honor List and relevant core CS coursework prominently listed.',
    'Consistent GitHub links and live demo deployment URLs for all major projects.'
  ],
  weaknesses: [
    'Project descriptions describe features rather than quantified engineering impact (e.g., latency, throughput, users).',
    'Technical skills section lists DevOps/Cloud tools (Docker, AWS) without concrete supporting repository commits.',
    'Missing high-frequency ATS keywords found in junior SDE job descriptions: "Unit Testing", "CI/CD", "JUnit", "Agile".'
  ],
  missingKeywords: [
    'JUnit / Mockito',
    'CI/CD GitHub Actions',
    'Docker Compose',
    'RESTful API Versioning',
    'Agile / Scrum',
    'Latency Optimization'
  ],
  suggestions: [
    'Rewrite project bullet points using Google’s X-Y-Z formula: "Engineered high-concurrency payment webhook in Java Spring Boot, reducing failure retries by 34% across 10,000 simulated requests."',
    'Add an explicit "Testing & Tools" row in your Skills section highlighting JUnit 5, Mockito, and Postman.',
    'Include your SkillProof verified badges to provide concrete proof for claimed competencies.'
  ],
  matchingSkills: ['Java', 'Spring Boot', 'Python', 'SQL', 'PostgreSQL', 'Data Structures', 'Git'],
  missingSkills: ['JUnit / Automated Testing', 'Docker Containerization', 'Distributed Systems Basics', 'API Security (OAuth2)'],
  targetJobTitle: 'Software Developer (Backend / Java)',
  targetJobDesc: 'Seeking a passionate Entry-Level Software Engineer proficient in Java, Spring Boot, and relational databases. Strong foundation in Data Structures, Algorithms, and Object-Oriented Design required. Experience with REST APIs, unit testing, and Docker is a plus.',
  lastAnalyzedDate: '2026-09-02',
  fileName: 'Arjun_Sharma_Resume_2025.pdf',
};

export const initialJobs: JobPosting[] = [
  {
    id: 'job-1',
    company: 'Amazon',
    role: 'Software Development Engineer I (SDE 1)',
    location: 'Bangalore, India (Hybrid)',
    type: 'Full-time',
    experienceReq: '0 - 1 years',
    salaryRange: '₹18L - ₹24L',
    description: 'Join Amazon’s core retail platform. You will design, develop, and maintain high-scale distributed microservices. Must have strong foundations in DSA, Java/C++, Object-Oriented Design, and multithreading.',
    requiredSkills: ['Java', 'Data Structures & Algorithms', 'Object-Oriented Design', 'Multithreading', 'SQL', 'System Design Basics'],
    fitScore: 74,
    matchTier: 'Moderate Match',
    matchReason: 'Solid match on Java & core OOP fundamentals, but DSA time-complexity follow-up handling and multithreading are at high risk based on recent mock interview evidence.',
    matchingSkills: ['Java', 'Object-Oriented Design', 'SQL', 'Git'],
    missingSkills: ['Advanced DSA (Graphs/DP)', 'Multithreading & Concurrency', 'Distributed Systems Basics'],
    projectRelevanceScore: 82,
    resumeRelevanceScore: 78,
    interviewReadinessScore: 61,
  },
  {
    id: 'job-2',
    company: 'Razorpay',
    role: 'Associate Backend Engineer',
    location: 'Bangalore, India (Onsite)',
    type: 'Full-time',
    experienceReq: '0 - 2 years',
    salaryRange: '₹15L - ₹20L',
    description: 'We are looking for engineers to build resilient fintech infrastructure handling millions of transactions daily. You will build REST APIs, optimize database queries, and ensure 99.99% system availability.',
    requiredSkills: ['Java or Go', 'Spring Boot', 'REST APIs', 'SQL Optimization', 'Docker', 'API Security'],
    fitScore: 82,
    matchTier: 'Strong Match',
    matchReason: 'Strong overlap with your FinTrack project and verified SQL query skills. Your main gap is production API security and Docker deployment proof.',
    matchingSkills: ['Java', 'Spring Boot', 'REST APIs', 'SQL Optimization'],
    missingSkills: ['API Security (OAuth/JWT)', 'Docker Containerization'],
    projectRelevanceScore: 90,
    resumeRelevanceScore: 84,
    interviewReadinessScore: 68,
  },
  {
    id: 'job-3',
    company: 'Cisco',
    role: 'Software Engineer - Cloud & Security',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    experienceReq: 'Fresher / 2025 Grad',
    salaryRange: '₹14L - ₹18L',
    description: 'Build enterprise security software and network virtualization tools. Candidates should have solid fundamentals in Operating Systems, TCP/IP networking, C++/Java, and problem solving.',
    requiredSkills: ['Java or C++', 'Computer Networks', 'Operating Systems', 'Data Structures', 'Git'],
    fitScore: 78,
    matchTier: 'Strong Match',
    matchReason: 'Good alignment with academic coursework and demonstrated CS fundamentals. Needs quick refresher on TCP socket lifecycles and thread synchronization.',
    matchingSkills: ['Java', 'Data Structures', 'Operating Systems', 'Git'],
    missingSkills: ['Advanced TCP/IP Protocols', 'Socket Programming'],
    projectRelevanceScore: 76,
    resumeRelevanceScore: 82,
    interviewReadinessScore: 70,
  },
  {
    id: 'job-4',
    company: 'Goldman Sachs',
    role: 'New Analyst - Global Markets Tech',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experienceReq: '0 - 1 years',
    salaryRange: '₹20L - ₹26L',
    description: 'Develop low-latency trade execution algorithms and financial risk analytics engines. High emphasis on rigorous algorithmic complexity, clean code, and database integrity.',
    requiredSkills: ['Java or C++', 'Data Structures & Algorithms', 'Relational Databases', 'Unix/Linux', 'Math/Statistics'],
    fitScore: 68,
    matchTier: 'Moderate Match',
    matchReason: 'Strong database background, but algorithm optimization under strict time constraints requires substantial retesting before applying.',
    matchingSkills: ['Java', 'Relational Databases', 'Git'],
    missingSkills: ['Advanced DSA', 'Unix Shell Scripting', 'Low Latency Systems'],
    projectRelevanceScore: 70,
    resumeRelevanceScore: 75,
    interviewReadinessScore: 58,
  }
];

export const initialRoadmapTasks: RoadmapTask[] = [
  {
    id: 'task-1',
    week: 1,
    month: 1,
    phase: 'Phase 1: Remediation of Technical Interview Weaknesses',
    title: 'Master Graph Algorithms & Cycle Detection (BFS/DFS)',
    category: 'Coding practice',
    estimatedHours: 6,
    status: 'In Progress',
    skillTag: 'DSA',
    description: 'Implement Topological Sort, Kahn’s Algorithm, and Dijkstra’s Shortest Path. Focus on explaining worst-case complexity trade-offs verbally.',
    actionRoute: 'SkillProof'
  },
  {
    id: 'task-2',
    week: 1,
    month: 1,
    phase: 'Phase 1: Remediation of Technical Interview Weaknesses',
    title: 'Complete Mock Interview: Algorithm Follow-Up Defense',
    category: 'Interview preparation',
    estimatedHours: 3,
    status: 'Not Started',
    skillTag: 'DSA',
    description: 'Practice a 10-question Technical Mock Interview with proactive AI follow-up drills on hash collisions and space trade-offs.',
    actionRoute: 'Mock Interview'
  },
  {
    id: 'task-3',
    week: 2,
    month: 1,
    phase: 'Phase 1: Remediation of Technical Interview Weaknesses',
    title: 'Implement JWT & Spring Security Filter Chain in FinTrack',
    category: 'Projects',
    estimatedHours: 5,
    status: 'In Progress',
    skillTag: 'REST API Security',
    description: 'Add stateless token authentication, role authorization, and refresh token cookies to your portfolio backend.',
    actionRoute: 'Projects'
  },
  {
    id: 'task-4',
    week: 2,
    month: 1,
    phase: 'Phase 1: Remediation of Technical Interview Weaknesses',
    title: 'Take SkillProof: RESTful Architecture & Security Assessment',
    category: 'Assessments',
    estimatedHours: 2,
    status: 'Not Started',
    skillTag: 'REST API Security',
    description: 'Earn a verified badge in REST Security to convert this claimed skill to VERIFIED status.',
    actionRoute: 'SkillProof'
  },
  {
    id: 'task-5',
    week: 3,
    month: 1,
    phase: 'Phase 2: System Resilience & Practical Simulation',
    title: 'Job Simulation: Debug High-Latency Microservice Database Bottleneck',
    category: 'Coding practice',
    estimatedHours: 4,
    status: 'Completed',
    skillTag: 'SQL & Database Indexing',
    description: 'Diagnose N+1 query problem, introduce composite index, and benchmark latency improvement.',
    actionRoute: 'Job Simulation'
  },
  {
    id: 'task-6',
    week: 4,
    month: 1,
    phase: 'Phase 2: System Resilience & Practical Simulation',
    title: 'Retest: Advanced DSA SkillProof Assessment',
    category: 'Retesting',
    estimatedHours: 3,
    status: 'Not Started',
    skillTag: 'DSA',
    description: 'Retake the timed DSA assessment to raise your score from 62% to 80%+, unlocking Strong Match tier for Amazon & Razorpay.',
    actionRoute: 'SkillProof'
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'FinTrack: Scalable Personal Finance & Ledger Microservices',
    description: 'A modular microservices backend facilitating double-entry bookkeeping, transaction aggregation, and monthly expenditure telemetry.',
    repoUrl: 'https://github.com/arjun-sharma-dev/fintrack-microservices',
    liveUrl: 'https://fintrack-demo.dev',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis', 'React'],
    complexity: 'Advanced',
    score: 88,
    skillsDemonstrated: ['Spring Boot REST APIs', 'ACID Transactions', 'Redis Caching', 'Docker Compose', 'Microservices Architecture'],
    resumeBulletPoints: [
      'Architected high-throughput ledger microservices using Java 17 and Spring Boot, persisting 50,000+ daily mock transaction records.',
      'Configured Redis caching layer for user balance queries, slashing p99 latency from 180ms down to 14ms under load tests.',
      'Containerized PostgreSQL and auth microservices using Docker Compose, establishing clean multi-environment deployment pipelines.'
    ],
    technicalInterviewQuestions: [
      'How did you maintain data consistency across distributed transaction ledgers?',
      'Why did you choose Redis over Memcached for balance caching, and how do you handle cache invalidation?',
      'What happens if the database connection pool exhausts under peak traffic?'
    ],
    projectDefenseQuestions: [
      'If your ledger service crashes mid-transaction, how do you prevent ghost debits?',
      'How would you migrate this architecture to support asynchronous event-driven messaging using Apache Kafka?'
    ],
    improvementSuggestions: [
      'Add JUnit 5 and Testcontainers integration tests to demonstrate automated regression testing.',
      'Implement API rate-limiting using Token Bucket algorithm in Spring Cloud Gateway.'
    ],
    qualityScore: 90,
    completenessScore: 86,
    documentationScore: 88,
  },
  {
    id: 'proj-2',
    title: 'HealthPulse: Diagnostic Predictor & Analytics Webhook',
    description: 'Machine learning powered diagnostic risk classifier predicting cardiovascular anomalies from clinical telemetry with RESTful webhook endpoints.',
    repoUrl: 'https://github.com/arjun-sharma-dev/healthpulse-ml',
    liveUrl: 'https://healthpulse-preview.dev',
    techStack: ['Python', 'FastAPI', 'Scikit-Learn', 'Pandas', 'Docker'],
    complexity: 'Intermediate',
    score: 79,
    skillsDemonstrated: ['Python FastAPI', 'ML Model Serialization (Pickle/ONNX)', 'Data Preprocessing', 'Docker Containerization'],
    resumeBulletPoints: [
      'Developed low-latency FastAPI inference service delivering heart risk predictions within 45ms using trained Random Forest models.',
      'Preprocessed 100,000+ patient records using Pandas & NumPy, achieving 89.2% cross-validated classification accuracy.'
    ],
    technicalInterviewQuestions: [
      'Why did you choose FastAPI over Flask for serving the inference pipeline?',
      'How do you monitor for model drift or skew in production telemetry?'
    ],
    projectDefenseQuestions: [
      'How would you handle concurrent model inference requests without blocking Python’s GIL?'
    ],
    improvementSuggestions: [
      'Export model to ONNX format to accelerate inference execution speed.',
      'Include OpenAPI/Swagger documentation schema generation.'
    ],
    qualityScore: 80,
    completenessScore: 78,
    documentationScore: 80,
  }
];

export const initialGitHubData: GitHubData = {
  username: 'arjun-sharma-dev',
  connected: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  publicRepos: 18,
  topLanguages: [
    { name: 'Java', percentage: 54 },
    { name: 'Python', percentage: 26 },
    { name: 'TypeScript', percentage: 14 },
    { name: 'C++', percentage: 6 }
  ],
  totalCommitsLastYear: 384,
  consistencyStreakDays: 24,
  repoQualityScore: 82,
  verifiedEvidenceSkills: ['Java (12 Repos)', 'Spring Boot (4 Repos)', 'Python (5 Repos)', 'Git (384 Commits)', 'PostgreSQL / SQL'],
  recentRepos: [
    {
      name: 'fintrack-microservices',
      stars: 14,
      language: 'Java',
      description: 'Double-entry personal finance ledger microservices with Spring Boot and PostgreSQL',
      lastPushed: '2 days ago',
      hasReadme: true
    },
    {
      name: 'dsa-competitive-vault',
      stars: 8,
      language: 'Java',
      description: 'Curated implementations of 220+ LeetCode problems with complexity breakdowns',
      lastPushed: 'Yesterday',
      hasReadme: true
    },
    {
      name: 'healthpulse-ml',
      stars: 6,
      language: 'Python',
      description: 'Diagnostic classification API powered by FastAPI and Scikit-Learn',
      lastPushed: '1 week ago',
      hasReadme: true
    },
    {
      name: 'distributed-rate-limiter',
      stars: 19,
      language: 'Java',
      description: 'Token bucket and sliding window rate limiter implementation in Java 21',
      lastPushed: '2 weeks ago',
      hasReadme: true
    }
  ]
};

export const initialSkillProofAssessments: SkillProofAssessment[] = [
  {
    id: 'sp-dsa-1',
    title: 'Data Structures & Algorithms (Advanced)',
    category: 'DSA',
    type: 'MCQ',
    difficulty: 'Advanced',
    questionCount: 15,
    durationMinutes: 25,
    completed: true,
    score: 62,
    accuracy: 64,
    timeSpentMinutes: 22,
    topicBreakdown: [
      { topic: 'Array & Two Pointers', score: 85 },
      { topic: 'Binary Trees & BST', score: 75 },
      { topic: 'Graph Traversals (BFS/DFS)', score: 45 },
      { topic: 'Time & Space Complexity Proofs', score: 40 },
      { topic: 'Dynamic Programming', score: 50 }
    ],
    strengths: ['Linear data structures', 'Binary Search implementations'],
    weaknesses: ['Amortized time complexity analysis', 'Graph cycle detection and Dijkstra edge-cases'],
    awardedSkillLevel: 'Intermediate',
    lastAttemptedDate: '2026-08-28',
    mcqQuestions: [
      {
        id: 1,
        question: 'What is the amortized time complexity of inserting N elements into a dynamic array (like ArrayList in Java) starting from capacity 1 with doubling strategy?',
        options: ['O(N^2)', 'O(N log N)', 'O(N) overall, averaging O(1) per insertion', 'O(log N)'],
        correctAnswer: 2,
        explanation: 'Because array doubling occurs only at powers of 2 (1, 2, 4, 8... N), the sum of copied elements is 1 + 2 + 4 + ... + N ≈ 2N. Across N insertions, total work is O(N), yielding amortized O(1) per operation.',
        topic: 'Time & Space Complexity Proofs'
      },
      {
        id: 2,
        question: 'In a hash table utilizing separate chaining, what is the worst-case lookup time complexity if all keys hash to the identical bucket?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'In the degenerate worst case where every key collides into one bucket, the bucket becomes a linked list of length N, degrading lookup to O(N). (In Java 8+, this turns into a red-black tree when bucket size exceeds 8, improving to O(log N)).',
        topic: 'Time & Space Complexity Proofs'
      },
      {
        id: 3,
        question: 'Which algorithm is guaranteed to detect a cycle in a directed graph in O(V + E) time?',
        options: ['Dijkstra with priority queue', 'Kruskal Algorithm', 'Depth First Search (DFS) with 3-color node states (White/Gray/Black)', 'Prim Algorithm'],
        correctAnswer: 2,
        explanation: 'DFS with recursion stack tracking (Gray state) immediately detects a back-edge pointing to an ancestor currently in the DFS call stack, confirming a cycle in O(V + E).',
        topic: 'Graph Traversals (BFS/DFS)'
      },
      {
        id: 4,
        question: 'What is the optimal auxiliary space complexity of Morris In-Order Tree Traversal?',
        options: ['O(1)', 'O(N)', 'O(H) where H is tree height', 'O(log N)'],
        correctAnswer: 0,
        explanation: 'Morris Traversal temporarily establishes threaded pointers (predecessor right pointer pointing back to current node), enabling in-order traversal with strictly O(1) additional memory without recursion stack.',
        topic: 'Binary Trees & BST'
      }
    ]
  },
  {
    id: 'sp-sql-1',
    title: 'SQL & Relational Indexing Master',
    category: 'SQL',
    type: 'MCQ',
    difficulty: 'Intermediate',
    questionCount: 15,
    durationMinutes: 20,
    completed: true,
    score: 88,
    accuracy: 90,
    timeSpentMinutes: 16,
    topicBreakdown: [
      { topic: 'B-Tree Indexes', score: 95 },
      { topic: 'Window Functions (ROW_NUMBER, RANK)', score: 90 },
      { topic: 'ACID Transactions & Isolation Levels', score: 85 },
      { topic: 'Subqueries & CTEs', score: 85 }
    ],
    strengths: ['Index coverage', 'Window functions', 'Join optimization'],
    weaknesses: ['Phantom read mitigation under Repeatable Read'],
    awardedSkillLevel: 'Advanced',
    lastAttemptedDate: '2026-08-25'
  },
  {
    id: 'sp-java-1',
    title: 'Java Core & Modern Concurrency',
    category: 'Java',
    type: 'MCQ',
    difficulty: 'Intermediate',
    questionCount: 15,
    durationMinutes: 20,
    completed: true,
    score: 84,
    accuracy: 86,
    timeSpentMinutes: 18,
    topicBreakdown: [
      { topic: 'Memory Model & Garbage Collection', score: 80 },
      { topic: 'Collections & Generics', score: 90 },
      { topic: 'ExecutorService & CompletableFuture', score: 85 },
      { topic: 'OOP Principles', score: 95 }
    ],
    strengths: ['OOP hierarchy', 'Stream API & Lambdas', 'Generics'],
    weaknesses: ['G1GC tuning parameters'],
    awardedSkillLevel: 'Advanced',
    lastAttemptedDate: '2026-08-20'
  },
  {
    id: 'sp-dsa-coding-1',
    title: 'Interactive DSA Coding Challenge: LRU Cache Eviction',
    category: 'DSA',
    type: 'Coding',
    difficulty: 'Intermediate',
    questionCount: 1,
    durationMinutes: 30,
    completed: false,
    codingQuestion: {
      id: 101,
      title: 'Design and Implement an LRU (Least Recently Used) Cache',
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache with `get(key)` and `put(key, value)` both running in O(1) average time complexity.',
      starterCode: `class LRUCache {
    private int capacity;
    // TODO: Define HashMap and Doubly-Linked List pointers here

    public LRUCache(int capacity) {
        this.capacity = capacity;
    }
    
    public int get(int key) {
        // Implement O(1) retrieval and move node to head
        return -1;
    }
    
    public void put(int key, int value) {
        // Implement O(1) insertion, update, and capacity eviction from tail
    }
}`,
      language: 'java',
      solutionHint: 'Combine a HashMap<Integer, Node> for O(1) lookup with a Doubly Linked List for O(1) removal and insertion at head.',
      testCases: [
        { input: 'put(1, 1), put(2, 2), get(1), put(3, 3), get(2)', expectedOutput: '[null, null, 1, null, -1]' },
        { input: 'put(2, 1), get(2), put(3, 2), get(2), get(3)', expectedOutput: '[null, 1, null, 1, 2]' }
      ]
    }
  }
];

export const initialMockInterviews: MockInterviewSession[] = [
  {
    id: 'mock-session-01',
    date: '2026-08-30',
    role: 'Software Development Engineer I',
    type: 'Technical',
    companyStyle: 'Amazon',
    questionCount: 5,
    difficulty: 'Medium',
    mode: 'Text',
    completed: true,
    overallScore: 61,
    categoryScores: {
      technicalKnowledge: 70,
      problemSolving: 60,
      communication: 68,
      structure: 58,
      followUpHandling: 50
    },
    strongAnswers: [
      'Gave an accurate definition of Polymorphism with method overloading vs overriding.',
      'Clearly explained why immutable classes are inherently thread-safe in concurrent environments.'
    ],
    weakAnswers: [
      'Stumbled when asked to justify why an O(N) array-shift approach for LRU cache is inadequate compared to a Doubly-Linked List.',
      'Hesitated significantly when the interviewer asked a follow-up on Hash Collision mitigation in Java 8+ HashMap.'
    ],
    missingPoints: [
      'Did not mention red-black tree conversion (TREEIFY_THRESHOLD = 8) when bucket collision occurs.',
      'Failed to verbalize amortized O(1) vs worst-case O(N) scenarios.'
    ],
    betterApproach: 'Structure algorithmic responses with the REACTO method. Whenever an interviewer asks a follow-up ("What if N grows to 1 billion?"), proactively state memory constraints and explore external sorting or distributed sharding.',
    topicsToPractice: [
      'Algorithmic Complexity Trade-offs under scale',
      'Hash Table collision internals (Robin Hood vs Separate Chaining)',
      'Verbal explanation of Graph BFS vs DFS space usage'
    ],
    readinessVerdict: 'Needs Revision',
    questions: [
      {
        id: 1,
        question: 'Explain how a HashMap handles collisions in Java 8 and why that design was introduced.',
        expectedKeyPoints: ['Separate chaining', 'LinkedList to Red-Black Tree threshold of 8', 'O(log N) worst case instead of O(N)', 'Preventing HashDoS vulnerability'],
        candidateAnswer: 'In Java, a HashMap uses buckets with linked lists. If two keys have the same hashcode, they go to the same list. Java 8 improves this.',
        followUpQuestion: 'What specific data structure replaces the linked list when too many collisions accumulate, and what is the exact threshold?',
        candidateFollowUpAnswer: 'It turns into a binary tree I think, but I am not certain about the threshold number.',
        feedback: 'Good initial grasp, but weak follow-up handling. Failed to cite the Red-Black Tree and TREEIFY_THRESHOLD of 8.',
        rating: 6
      },
      {
        id: 2,
        question: 'Given an array of integers, how would you find the maximum subarray sum in O(N) time? Explain your logic.',
        expectedKeyPoints: ['Kadane Algorithm', 'Current sum vs element comparison', 'Resetting sum when negative', 'O(1) space complexity'],
        candidateAnswer: 'We can use Kadane’s algorithm. We maintain a current sum and max sum. If current sum becomes negative we reset it to 0.',
        followUpQuestion: 'What if all numbers in the array are negative? How does your condition handle [-5, -2, -8]?',
        candidateFollowUpAnswer: 'If all are negative, resetting to 0 would give 0 which might not be an element in the array. We should instead initialize max sum with Integer.MIN_VALUE or array[0].',
        feedback: 'Handled follow-up edge case correctly with prompt recovery.',
        rating: 8
      },
      {
        id: 3,
        question: 'How would you implement an LRU cache with O(1) get and O(1) put operations?',
        expectedKeyPoints: ['HashMap for O(1) lookup', 'Doubly linked list for O(1) node removal and addition at head', 'Tail eviction'],
        candidateAnswer: 'We can use a list to keep track of items and a map to look them up.',
        followUpQuestion: 'If you use a standard ArrayList, what is the time complexity to remove an item from the middle and move it to the front?',
        candidateFollowUpAnswer: 'It is O(N) because elements have to shift. That is why an ArrayList is slow.',
        feedback: 'Correct, but did not immediately volunteer the Doubly-Linked List solution until probed.',
        rating: 6
      }
    ]
  }
];

export const initialJobSimulations: JobSimulationTask[] = [
  {
    id: 'sim-dev-01',
    role: 'Software Developer',
    title: 'Production Incident: Fix N+1 Query & Latency Spike in Payment Microservice',
    difficulty: 'Junior',
    scenario: 'The checkout team reports that the `/api/v1/orders/summary` endpoint is timing out during peak flash sales. APM traces indicate 500+ database roundtrips per single HTTP request.',
    objective: 'Refactor the repository query to eliminate the N+1 select problem using JPA JOIN FETCH and implement a thread-safe cache invalidator.',
    files: [
      {
        name: 'OrderService.java',
        language: 'java',
        content: `// Buggy OrderService triggering N+1 queries
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<OrderDTO> getRecentOrdersWithItems(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        // CRITICAL DEFECT: Calling order.getItems() triggers a separate SQL SELECT for every single order!
        return orders.stream().map(order -> {
            List<OrderItem> items = order.getItems(); // N queries executed here
            return new OrderDTO(order.getId(), order.getTotal(), items.size());
        }).collect(Collectors.toList());
    }
}`
      },
      {
        name: 'OrderRepository.java',
        language: 'java',
        content: `public interface OrderRepository extends JpaRepository<Order, Long> {
    // Problematic query returning un-fetched lazy items
    List<Order> findByUserId(Long userId);

    // REFACTORED SOLUTION NEEDED:
    // @Query("SELECT o FROM Order o LEFT JOIN FETCH o.items WHERE o.userId = :userId")
    // List<Order> findByUserIdWithItemsEagerly(@Param("userId") Long userId);
}`
      }
    ],
    instructions: [
      'Examine the APM trace logs showing 500 individual SELECT queries for line items.',
      'Refactor `OrderRepository.java` to declare an optimized JOIN FETCH query.',
      'Update `OrderService.java` to invoke the unified fetch query in 1 single database roundtrip.',
      'Run the verification test suite to ensure latency drops under 40ms with 100% item integrity.'
    ],
    starterCode: `@Query("SELECT o FROM Order o LEFT JOIN FETCH o.items WHERE o.userId = :userId")
List<Order> findByUserIdWithItemsEagerly(@Param("userId") Long userId);`,
    testRunner: {
      description: 'Executes benchmark test with 1,000 orders and verifies SQL count == 1.',
      expectedResult: 'Passed: 1 SQL Query Executed, Latency: 28ms (Down from 840ms).'
    },
    completed: true,
    score: 85,
    evaluation: {
      correctness: 90,
      problemSolving: 85,
      codeQuality: 85,
      timeManagement: 80,
      feedback: 'Excellent diagnosis of the Hibernate N+1 issue. Identified JOIN FETCH and eliminated redundant round-trips seamlessly.'
    }
  },
  {
    id: 'sim-data-01',
    role: 'Data Analyst',
    title: 'SQL Intelligence: Cohort Retention & Churn Diagnostic',
    difficulty: 'Junior',
    scenario: 'The growth team noticed user drop-offs after Day 7 of signing up. You need to write a window function query calculating Day 1, Day 7, and Day 30 cohort retention metrics.',
    objective: 'Author a clean PostgreSQL query using CTEs and `DENSE_RANK() / DATE_TRUNC` to output monthly cohort retention matrices.',
    files: [
      {
        name: 'retention_query.sql',
        language: 'sql',
        content: `-- Calculate Monthly Retention Cohorts
WITH user_activities AS (
    SELECT user_id, DATE_TRUNC('month', signup_date) as cohort_month, activity_date
    FROM users JOIN logins ON users.id = logins.user_id
)
SELECT cohort_month,
       COUNT(DISTINCT user_id) as cohort_size,
       COUNT(DISTINCT CASE WHEN activity_date >= cohort_month + INTERVAL '7 days' THEN user_id END) as day_7_active
FROM user_activities
GROUP BY 1 ORDER BY 1;`
      }
    ],
    instructions: [
      'Group users by signup month.',
      'Calculate percentage retained at 7 days and 30 days.',
      'Identify the top drop-off bottleneck.'
    ],
    starterCode: `WITH cohorts AS (
  SELECT user_id, DATE_TRUNC('month', created_at) AS cohort_date FROM users
) ...`,
    testRunner: {
      description: 'Validates SQL output matches ground truth cohort matrix.',
      expectedResult: 'Passed: Retention rates calculated accurately across 12 monthly cohorts.'
    },
    completed: false
  },
  {
    id: 'sim-backend-01',
    role: 'Backend Developer',
    title: 'API Architecture: Implement Token Bucket Rate Limiter',
    difficulty: 'Mid-Level',
    scenario: 'High-frequency scrapers are abusing the public product lookup endpoints. Build a thread-safe in-memory Token Bucket rate limiter with refill replenishment.',
    objective: 'Implement an atomic rate-limiting filter allowing 10 requests per second with burst capacity of 20.',
    files: [
      {
        name: 'RateLimiter.java',
        language: 'java',
        content: `public class TokenBucketRateLimiter {
    private final long capacity;
    private final double refillRatePerSecond;
    private double availableTokens;
    private long lastRefillTimestamp;

    public synchronized boolean tryAcquire(long tokens) {
        refill();
        if (availableTokens >= tokens) {
            availableTokens -= tokens;
            return true;
        }
        return false;
    }

    private void refill() {
        long now = System.currentTimeMillis();
        double elapsedSeconds = (now - lastRefillTimestamp) / 1000.0;
        availableTokens = Math.min(capacity, availableTokens + elapsedSeconds * refillRatePerSecond);
        lastRefillTimestamp = now;
    }
}`
      }
    ],
    instructions: [
      'Ensure thread-safe synchronization under concurrent worker threads.',
      'Prevent integer overflow when calculating elapsed time.',
      'Handle burst scenarios properly.'
    ],
    starterCode: `public class TokenBucketRateLimiter { ... }`,
    testRunner: {
      description: 'Simulates 50 concurrent threads firing 500 requests against rate limiter.',
      expectedResult: 'Passed: Rate limit strictly enforced at 10 req/sec; bursts absorbed correctly.'
    },
    completed: false
  }
];

export const initialApplications: ApplicationRecord[] = [
  {
    id: 'app-amazon-01',
    company: 'Amazon',
    jobRole: 'Software Development Engineer I (SDE 1)',
    jobDescription: 'High-scale distributed systems and cloud services. Rigorous focus on DSA, system reliability, and algorithm complexity proofs.',
    applicationDate: '2026-08-15',
    resumeVersion: 'Arjun_Sharma_Resume_v1.pdf',
    jobFitScore: 74,
    currentStage: 'Rejected',
    stageHistory: ['Applied', 'Assessment', 'Technical Round 1'],
    interviewStage: 'Technical Round 1',
    outcome: 'Rejected',
    rejectionReason: 'Candidate struggled with time-complexity justifications when asked follow-up optimization questions on graph cycle detection and hash map collision degradation.',
    recruiterFeedback: 'Arjun showed good programming discipline in Java, but the technical bar for algorithmic defense in Round 1 was not satisfied. Needs deeper conceptual grounding in complexity proofs.',
    interviewFeedback: 'Passed initial coding prompt, but froze when asked: "What happens to the time complexity if your hash function produces identical hashes for all inputs?" Could not explain the Red-Black tree conversion in Java 8 or amortized costs.',
    knownReason: 'Weak DSA explanation and technical follow-up handling.',
    skillGapsAtTime: ['Advanced DSA (Graphs)', 'Algorithmic Complexity Proofs', 'Hash Collision Mechanics'],
    assessmentScoreAtTime: 82,
    interviewScoreAtTime: 58,
    notes: 'Cleared online assessment with 82/100, but failed live 45-minute technical screen.'
  },
  {
    id: 'app-razorpay-01',
    company: 'Razorpay',
    jobRole: 'Associate Backend Engineer',
    jobDescription: 'FinTech payment routing and transaction ledgers. Required deep understanding of REST APIs, database queries, and algorithmic trade-offs.',
    applicationDate: '2026-08-22',
    resumeVersion: 'Arjun_Sharma_Resume_v2.pdf',
    jobFitScore: 82,
    currentStage: 'Rejected',
    stageHistory: ['Applied', 'Assessment', 'Technical Round 1'],
    interviewStage: 'Technical Round 1',
    outcome: 'Rejected',
    rejectionReason: 'Technical interviewer noted difficulty in articulating space vs time trade-offs during a live LRU Cache design question.',
    recruiterFeedback: 'Strong project portfolio with FinTrack, but candidate struggled during the problem-solving defense round.',
    interviewFeedback: 'When asked to optimize from O(N) array search to O(1) Doubly Linked List, candidate took substantial prompting to reach the conclusion and could not justify pointer manipulation edge-cases.',
    knownReason: 'Weak live technical defense and hesitation under algorithmic follow-up queries.',
    skillGapsAtTime: ['LRU Cache Design', 'O(1) Data Structures', 'Verbal Problem Solving'],
    assessmentScoreAtTime: 86,
    interviewScoreAtTime: 62,
    notes: 'Interviewer was positive on database questions, but rejected based on the algorithm follow-up portion.'
  },
  {
    id: 'app-cisco-01',
    company: 'Cisco',
    jobRole: 'Software Engineer - Cloud & Security',
    jobDescription: 'Enterprise networking, cloud security microservices, and distributed Linux environments.',
    applicationDate: '2026-08-29',
    resumeVersion: 'Arjun_Sharma_Resume_v2.pdf',
    jobFitScore: 78,
    currentStage: 'Assessment',
    stageHistory: ['Applied', 'Assessment'],
    interviewStage: 'Online Assessment',
    outcome: 'Pending',
    skillGapsAtTime: ['TCP/IP Socket Lifecycles', 'Advanced DSA'],
    assessmentScoreAtTime: 79,
    notes: 'Online assessment submitted on Aug 30. Awaiting shortlist for Round 1 Technical Interview.'
  }
];

export const initialCareerReplayReport: CareerReplayReport = {
  analyzedApplicationsCount: 3,
  detectedPattern: 'DSA explanation and technical follow-up handling appear repeatedly weak across Round 1 Technical Evaluations.',
  confidence: 'Evidence-supported',
  rootCauseAnalysis: 'Across 2 separate application rejections (Amazon & Razorpay), you passed the initial resume screening and online assessments with high marks (82% and 86%). However, drop-offs consistently occurred during live problem-solving follow-ups where interviewers probed algorithmic time complexity trade-offs and edge-case justifications.',
  repeatedFailurePoints: [
    'Hesitation and uncertainty when asked to prove worst-case vs amortized time complexity.',
    'Difficulty articulating internal data structure mechanisms (e.g., Java 8 HashMap red-black tree threshold, Doubly-Linked List pointers in LRU cache).',
    'Passive problem-solving approach: not verbalizing thought process out loud before typing code.'
  ],
  stageDropoffs: [
    { stage: 'Resume Screening', dropCount: 0 },
    { stage: 'Online Assessment', dropCount: 0 },
    { stage: 'Technical Round 1', dropCount: 2 },
    { stage: 'Technical Round 2', dropCount: 0 },
    { stage: 'HR / Managerial Round', dropCount: 0 }
  ],
  actionablePlan: [
    'Retake the Advanced DSA SkillProof assessment focusing on Graph Traversals and Complexity Proofs to raise score from 62% to 80%+.',
    'Conduct a 10-question Hard Technical Mock Interview with follow-up mode enabled, using the REACTO verbalization formula.',
    'Complete the "LRU Cache Eviction" interactive coding challenge with live test execution.',
    'Re-apply to target company pipeline (e.g., Cisco, PhonePe) with verified skill credentials attached.'
  ],
  recommendedSkillProofTest: 'Data Structures & Algorithms (Advanced)',
  recommendedMockInterview: 'Technical Deep-Dive: Algorithm Trade-offs & Data Structure Defense',
  previousPerformance: {
    stage: 'Technical Round 1 (Amazon & Razorpay)',
    failureNote: 'Struggled on complexity follow-up questions and hash collision mechanisms.',
    interviewScore: 61
  },
  currentPerformance: {
    retestedDate: '2026-09-02',
    newInterviewScore: 74,
    scoreDelta: 13,
    retestStatus: 'Improved',
    validationNote: 'Demonstrated clear recovery on Kadane negative array edge cases and HashMap treeify threshold in recent mock drills.'
  }
};

export const initialCareerReadinessScore: CareerReadinessScore = {
  overall: 69,
  resume: 81,
  jobFit: 76,
  skills: 67,
  projects: 84,
  skillProof: 71,
  interview: 61,
  jobSimulation: 85,
  biggestImprovementOpportunity: 'Technical Interview + DSA Follow-up Defense'
};

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Repeated Pattern Detected by Career Replay',
    message: 'Your past 2 rejections at Amazon and Razorpay share the exact same drop-off: Technical Round 1 DSA follow-ups. See recommended remediation plan.',
    type: 'critical',
    timestamp: '2 hours ago',
    actionTab: 'Career Replay',
    actionLabel: 'View Career Replay',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Critical Skill Gap Alert',
    message: 'Your Data Structures & Algorithms gap is marked Critical for your target role Software Developer (Backend).',
    type: 'warning',
    timestamp: '5 hours ago',
    actionTab: 'Skill Gap',
    actionLabel: 'Analyze Skill Gap',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Mock Interview Score Improved by 13%',
    message: 'Recent follow-up drills raised your simulated technical interview score from 61% to 74%.',
    type: 'success',
    timestamp: '1 day ago',
    actionTab: 'Mock Interview',
    actionLabel: 'Review Session',
    read: true
  },
  {
    id: 'notif-4',
    title: 'New Application Stage Update: Cisco',
    message: 'Cisco SDE online assessment is submitted. Preparing your personalized Interview Playbook.',
    type: 'info',
    timestamp: '2 days ago',
    actionTab: 'Applications',
    actionLabel: 'Track Application',
    read: true
  }
];

export const demoUser = initialUserProfile;
export const demoCareerReadiness = initialCareerReadinessScore;
export const demoSkills = initialSkills;
export const demoResumeAnalysis = initialResumeAnalysis;
export const demoJobs = initialJobs;
export const demoRoadmap = initialRoadmapTasks;
export const demoProjects = initialProjects;
export const demoGitHubData = initialGitHubData;
export const demoSkillProofAssessments = initialSkillProofAssessments;
export const demoMockInterviews = initialMockInterviews;
export const demoJobSimulations = initialJobSimulations;
export const demoApplications = initialApplications;
export const demoCareerReplay = initialCareerReplayReport;
export const demoNotifications = initialNotifications;

