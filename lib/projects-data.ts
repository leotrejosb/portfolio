export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  architecture?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Secure Cloud Infrastructure',
    slug: 'secure-cloud-infrastructure',
    shortDescription: 'Enterprise-grade AWS infrastructure with automated security scanning',
    fullDescription: 'A comprehensive cloud infrastructure solution built on AWS with automated security compliance checking, real-time threat detection, and scalable microservices architecture.',
    challenge: 'The client needed a highly secure, scalable cloud infrastructure that could handle sensitive data while maintaining compliance with industry standards (SOC 2, HIPAA).',
    solution: 'Designed and implemented a multi-tier AWS architecture using Lambda, ECS, RDS, and S3 with automated security scanning via AWS Security Hub and custom Python scripts for compliance monitoring.',
    results: [
      '99.99% uptime achieved',
      '40% reduction in infrastructure costs',
      'Passed SOC 2 Type II audit',
      'Zero security incidents in production'
    ],
    technologies: ['AWS Lambda', 'AWS ECS', 'PostgreSQL', 'Python', 'Terraform', 'Docker', 'CloudWatch'],
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    githubUrl: '#'
  },
  {
    id: '2',
    title: 'Real-Time Threat Detection System',
    slug: 'threat-detection-system',
    shortDescription: 'ML-powered cybersecurity monitoring and incident response platform',
    fullDescription: 'An intelligent threat detection system that uses machine learning to identify and respond to security threats in real-time across enterprise networks.',
    challenge: 'Organizations were experiencing delayed threat detection and overwhelming false positives, leading to security fatigue and missed critical alerts.',
    solution: 'Built a Next.js dashboard with Django backend that processes network logs using ML models to identify anomalies, integrated with SIEM tools for automated incident response.',
    results: [
      '85% reduction in false positives',
      'Average threat detection time reduced from hours to seconds',
      'Prevented 50+ potential security breaches',
      'Integrated with 10+ security tools'
    ],
    technologies: ['Next.js', 'Django', 'TensorFlow', 'PostgreSQL', 'Redis', 'Elasticsearch', 'WebSocket'],
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'Encrypted Communication Platform',
    slug: 'encrypted-communication-platform',
    shortDescription: 'End-to-end encrypted messaging with zero-knowledge architecture',
    fullDescription: 'A secure communication platform featuring end-to-end encryption, zero-knowledge architecture, and compliance with data protection regulations.',
    challenge: 'Healthcare organizations needed a HIPAA-compliant communication platform that ensured patient data privacy while maintaining usability.',
    solution: 'Developed a React/Next.js application with Django backend implementing Signal Protocol for encryption, with AWS infrastructure for scalability and reliability.',
    results: [
      'HIPAA and GDPR compliant',
      '100K+ daily active users',
      'Zero data breaches',
      'Sub-second message delivery'
    ],
    technologies: ['React', 'Django', 'WebRTC', 'Signal Protocol', 'AWS', 'PostgreSQL', 'Redis'],
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: '4',
    title: 'Automated Penetration Testing Suite',
    slug: 'automated-penetration-testing',
    shortDescription: 'Comprehensive security testing automation with detailed reporting',
    fullDescription: 'An automated penetration testing platform that performs comprehensive security assessments and generates actionable reports for development teams.',
    challenge: 'Manual penetration testing was time-consuming, expensive, and often delayed product releases, leaving vulnerabilities unaddressed.',
    solution: 'Created a Python-based automation suite with web interface that runs OWASP Top 10 tests, API security assessments, and infrastructure scans, integrated into CI/CD pipelines.',
    results: [
      'Reduced testing time by 75%',
      'Identified 200+ vulnerabilities before production',
      'Integrated with GitHub, GitLab, and Jenkins',
      'Saved $100K+ in external security audits'
    ],
    technologies: ['Python', 'Next.js', 'Docker', 'PostgreSQL', 'Metasploit', 'OWASP ZAP', 'Burp Suite API'],
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    githubUrl: '#'
  },
  {
    id: '5',
    title: 'Serverless API Gateway',
    slug: 'serverless-api-gateway',
    shortDescription: 'High-performance API gateway with advanced rate limiting and authentication',
    fullDescription: 'A serverless API gateway solution providing authentication, rate limiting, request transformation, and comprehensive analytics for microservices.',
    challenge: 'Microservices architecture needed centralized authentication, rate limiting, and monitoring without introducing a single point of failure.',
    solution: 'Built a serverless gateway using AWS Lambda, API Gateway, and DynamoDB with JWT authentication, Redis caching, and CloudWatch integration for monitoring.',
    results: [
      'Handles 10M+ requests per day',
      '99.95% availability',
      '60% cost reduction vs traditional solutions',
      'Sub-100ms latency at p95'
    ],
    technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Redis', 'Node.js', 'TypeScript'],
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    githubUrl: '#'
  },
  {
    id: '6',
    title: 'Blockchain Security Audit Tool',
    slug: 'blockchain-security-audit',
    shortDescription: 'Smart contract vulnerability scanner and auditing platform',
    fullDescription: 'A comprehensive security auditing tool for blockchain smart contracts that identifies vulnerabilities, suggests fixes, and generates detailed audit reports.',
    challenge: 'DeFi protocols faced significant security risks from smart contract vulnerabilities, leading to millions in losses from exploits.',
    solution: 'Developed a static analysis tool using Python that scans Solidity contracts for common vulnerabilities (reentrancy, integer overflow, etc.) with a React dashboard for results.',
    results: [
      'Audited 100+ smart contracts',
      'Identified critical vulnerabilities preventing $5M+ in potential losses',
      'Reduced audit time from weeks to hours',
      'Integrated with developer workflows'
    ],
    technologies: ['Python', 'React', 'Solidity', 'Web3.js', 'PostgreSQL', 'Docker'],
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1200',
    demoUrl: '#',
    githubUrl: '#'
  }
];
