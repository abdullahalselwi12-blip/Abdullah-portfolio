export type Language = 'en' | 'ar';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      certificates: 'Certificates',
      projects: 'Projects',
      gallery: 'Gallery',
      resume: 'Resume',
      services: 'Services',
      testimonials: 'Testimonials',
      blog: 'Blog',
      contact: 'Contact',
      dashboard: 'Dashboard',
    },
    hero: {
      greeting: "Hello, I'm",
      roles: [
        'Cybersecurity Enthusiast',
        'Computer Science Student',
        'Full Stack Developer',
        'AI Researcher',
      ],
      subtitle:
        'Bridging security, intelligence, and elegant engineering to build resilient systems for tomorrow.',
      downloadCv: 'Download CV',
      contactMe: 'Contact Me',
      scroll: 'Scroll to explore',
    },
    about: {
      title: 'About Me',
      subtitle: 'Get to know me',
      bio: [
        "I'm a third-year Computer Science student at Sana'a University, driven by a deep curiosity for how systems work — and how they break. My journey blends the rigor of academic research with the pragmatism of building real, usable software.",
        "I'm passionate about cybersecurity, artificial intelligence, and the intersection where they meet: securing intelligent systems and the IoT networks they live on. From penetration testing with Kali Linux to architecting full-stack applications, I treat every project as a chance to learn something new and raise the bar for what I can deliver.",
        "Beyond the screen, I believe in continuous learning, clear communication, and leadership that lifts the whole team. I'm always exploring the next technology, the next vulnerability, the next idea worth turning into something real.",
      ],
      interestsTitle: 'Areas of Interest',
      interests: [
        { name: 'Cybersecurity', icon: 'Shield' },
        { name: 'Artificial Intelligence', icon: 'Brain' },
        { name: 'IoT Security', icon: 'Wifi' },
        { name: 'Full Stack Development', icon: 'Code' },
        { name: 'Networking', icon: 'Network' },
        { name: 'Cloud Computing', icon: 'Cloud' },
        { name: 'Python Development', icon: 'Terminal' },
        { name: 'Research', icon: 'Search' },
        { name: 'Continuous Learning', icon: 'BookOpen' },
      ],
      stats: [
        { value: '3+', label: 'Years Studying' },
        { value: '10+', label: 'Certificates' },
        { value: '6+', label: 'Projects' },
        { value: '27', label: 'Skills' },
      ],
    },
    skills: {
      title: 'Skills & Expertise',
      subtitle: 'Technologies I work with',
      categories: {
        programming: 'Programming Languages',
        web: 'Web Development',
        security: 'Cybersecurity',
        tools: 'Tools & Platforms',
        soft: 'Soft Skills',
        office: 'Office & Marketing',
      },
    },
    experience: {
      title: 'Experience',
      subtitle: 'My professional journey',
      role: 'Sales Representative',
      company: 'Redline for Industrial Equipment and Safety Tools',
      period: 'Professional Experience',
      responsibilities: [
        'Customer Management',
        'Excel Reports',
        'Data Entry',
        'Office Documentation',
        'Administrative Tasks',
        'Time Management',
        'Professional Communication',
      ],
    },
    certificates: {
      title: 'Certificates',
      subtitle: 'Credentials & achievements',
      items: [
        'ICDL',
        'Cybersecurity Awareness',
        'Office Management',
        'Administrative Correspondence',
        'Digital Marketing',
        'Charisma',
        'Leadership',
        'English Diploma',
        'Organizational Archiving',
        'Self Marketing',
      ],
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Things I have built',
      viewCode: 'View Code',
      liveDemo: 'Live Demo',
      gallery: 'Gallery',
      technologies: 'Technologies',
      items: [
        {
          title: 'Smart Home Intrusion Detection System using AI',
          description:
            'An AI-powered system that monitors smart home networks and detects anomalous behavior in real time, combining machine learning with IoT security principles.',
          tech: ['Python', 'TensorFlow', 'IoT', 'Cybersecurity'],
        },
        {
          title: 'Portfolio Website',
          description:
            'A premium, bilingual, fully-responsive personal portfolio with animated dark/light themes, glassmorphism, and a CMS-driven content model.',
          tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        },
        {
          title: 'Cybersecurity Learning Platform',
          description:
            'An interactive platform for learning offensive and defensive security concepts, with hands-on labs and progress tracking.',
          tech: ['React', 'Node.js', 'Supabase', 'Kali Linux'],
        },
        {
          title: 'IoT Security Dashboard',
          description:
            'A monitoring dashboard that visualizes IoT device security posture, network traffic, and threat alerts in a single pane.',
          tech: ['Next.js', 'TypeScript', 'Wireshark', 'Nmap'],
        },
        {
          title: 'ZIDO STORE',
          description:
            'A full-featured e-commerce storefront with product catalog, cart, and secure checkout — built for speed and conversion.',
          tech: ['React', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
        },
        {
          title: 'University Projects',
          description:
            'A collection of academic projects spanning algorithms, databases, software engineering, and networking — each built to production standards.',
          tech: ['Java', 'Python', 'SQL', 'Git'],
        },
      ],
    },
    gallery: {
      title: 'Gallery',
      subtitle: 'A visual showcase',
      categories: { all: 'All', projects: 'Projects', certificates: 'Certificates', events: 'Events' },
    },
    resume: {
      title: 'Resume',
      subtitle: 'My professional timeline',
      download: 'Download PDF',
      preview: 'Preview',
      education: 'Education',
      degree: 'B.Sc. Computer Science',
      university: "Sana'a University",
      duration: '2022 — Present',
      experience: 'Experience',
      skills: 'Skills',
      certificates: 'Certificates',
    },
    services: {
      title: 'Services',
      subtitle: 'What I can do for you',
      items: [
        {
          title: 'Web Development',
          description:
            'Modern, responsive, and performant web applications built with Next.js, TypeScript, and Tailwind CSS.',
          icon: 'Code',
        },
        {
          title: 'Cybersecurity Consulting',
          description:
            'Security assessments, vulnerability analysis, and hardening guidance using industry-standard tools.',
          icon: 'Shield',
        },
        {
          title: 'AI Solutions',
          description:
            'Machine learning model integration, research prototyping, and intelligent automation pipelines.',
          icon: 'Brain',
        },
        {
          title: 'Python Development',
          description:
            'Scripts, automation, data processing, and backend services engineered in clean, idiomatic Python.',
          icon: 'Terminal',
        },
        {
          title: 'Networking & IoT',
          description:
            'Network design, traffic analysis, and IoT security reviews to keep your connected systems safe.',
          icon: 'Network',
        },
        {
          title: 'Technical Research',
          description:
            'Deep-dive research, technical writing, and proof-of-concept development for emerging technologies.',
          icon: 'Search',
        },
      ],
    },
    testimonials: {
      title: 'Testimonials',
      subtitle: 'What people say',
      items: [
        {
          quote:
            'Abdullah brings a rare combination of security mindset and product sensibility. His work is thorough and always thoughtful.',
          author: 'University Supervisor',
          role: 'Computer Science Dept.',
        },
        {
          quote:
            'Reliable, detail-oriented, and genuinely curious. Abdullah elevated every project he touched on our team.',
          author: 'Project Teammate',
          role: 'Software Engineering Course',
        },
        {
          quote:
            'He communicates clearly, manages his time impeccably, and always delivers more than expected.',
          author: 'Colleague',
          role: 'Redline',
        },
      ],
    },
    blog: {
      title: 'Blog',
      subtitle: 'Thoughts & insights',
      readMore: 'Read more',
      searchPlaceholder: 'Search articles...',
      categories: { all: 'All', security: 'Security', ai: 'AI', web: 'Web', research: 'Research' },
      posts: [
        {
          title: 'Securing the Smart Home: An AI Approach',
          excerpt:
            'How machine learning can detect intrusions in IoT-heavy home networks before damage is done.',
          category: 'security',
          date: '2025-03-12',
        },
        {
          title: 'Why TypeScript Changed How I Build',
          excerpt:
            'A reflection on type safety, developer experience, and scaling frontend codebases.',
          category: 'web',
          date: '2025-02-02',
        },
        {
          title: 'From Nmap to Burp Suite: A Recon Mindset',
          excerpt:
            'A practical walkthrough of the reconnaissance phase of a security assessment.',
          category: 'security',
          date: '2025-01-18',
        },
        {
          title: 'Research as a Superpower for Developers',
          excerpt:
            'Why reading papers and reproducing results makes you a better engineer.',
          category: 'research',
          date: '2024-12-05',
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      subtitle: "Let's work together",
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Something went wrong. Please try again.',
      info: 'Contact Information',
      location: "Sana'a, Yemen",
      workingHours: 'Working Hours',
      workingHoursValue: 'Sat — Thu, 9:00 — 18:00',
      formTitle: 'Send me a message',
    },
    footer: {
      about:
        'Computer Science student, cybersecurity enthusiast, and full-stack developer building resilient, intelligent systems.',
      quickLinks: 'Quick Links',
      newsletter: 'Newsletter',
      newsletterDesc: 'Subscribe to get my latest articles and updates.',
      subscribe: 'Subscribe',
      emailPlaceholder: 'Enter your email',
      backToTop: 'Back to top',
      rights: 'All rights reserved.',
      madeWith: 'Designed & built with care.',
    },
    common: {
      loading: 'Loading...',
      language: 'Language',
      theme: 'Theme',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      skills: 'المهارات',
      experience: 'الخبرة',
      certificates: 'الشهادات',
      projects: 'المشاريع',
      gallery: 'المعرض',
      resume: 'السيرة الذاتية',
      services: 'الخدمات',
      testimonials: 'آراء',
      blog: 'المدونة',
      contact: 'تواصل',
      dashboard: 'لوحة التحكم',
    },
    hero: {
      greeting: 'مرحباً، أنا',
      roles: [
        'متخصص في الأمن السيبراني',
        'طالب علوم حاسوب',
        'مطور Full Stack',
        'باحث في الذكاء الاصطناعي',
      ],
      subtitle:
        'أربط بين الأمن والذكاء الاصطناعي والهندسة الأنيقة لبناء أنظمة مرنة لمستقبل الغد.',
      downloadCv: 'تحميل السيرة',
      contactMe: 'تواصل معي',
      scroll: 'مرر للاستكشاف',
    },
    about: {
      title: 'نبذة عني',
      subtitle: 'تعرف علي',
      bio: [
        'أنا طالب علوم حاسوب في السنة الثالثة بجامعة صنعاء، يحركني فضول عميق لفهم كيف تعمل الأنظمة — وكيف تنكسر. تجمع رحلتي بين صرامة البحث الأكاديمي وبراغماتية بناء برمجيات حقيقية قابلة للاستخدام.',
        'أشغف بالأمن السيبراني والذكاء الاصطناعي ونقطة التقاءهما: تأمين الأنظمة الذكية وشبكات إنترنت الأشياء التي تعيش عليها. من اختبار الاختراق باستخدام Kali Linux إلى تصميم تطبيقات Full Stack، أعتبر كل مشروع فرصة لتعلم شيء جديد ورفع سقف ما يمكنني تقديمه.',
        'خارج الشاشة، أؤمن بالتعلم المستمر والتواصل الواضح والقيادة التي ترفع الفريق بأكمله. أستكشف دائماً التقنية التالية، والثغرة التالية، والفكرة التالية التي تستحق أن تتحول إلى شيء حقيقي.',
      ],
      interestsTitle: 'مجالات الاهتمام',
      interests: [
        { name: 'الأمن السيبراني', icon: 'Shield' },
        { name: 'الذكاء الاصطناعي', icon: 'Brain' },
        { name: 'أمن إنترنت الأشياء', icon: 'Wifi' },
        { name: 'تطوير Full Stack', icon: 'Code' },
        { name: 'الشبكات', icon: 'Network' },
        { name: 'الحوسبة السحابية', icon: 'Cloud' },
        { name: 'تطوير Python', icon: 'Terminal' },
        { name: 'البحث العلمي', icon: 'Search' },
        { name: 'التعلم المستمر', icon: 'BookOpen' },
      ],
      stats: [
        { value: '3+', label: 'سنوات دراسة' },
        { value: '10+', label: 'شهادة' },
        { value: '6+', label: 'مشاريع' },
        { value: '27', label: 'مهارة' },
      ],
    },
    skills: {
      title: 'المهارات والخبرات',
      subtitle: 'التقنيات التي أعمل بها',
      categories: {
        programming: 'لغات البرمجة',
        web: 'تطوير الويب',
        security: 'الأمن السيبراني',
        tools: 'الأدوات والمنصات',
        soft: 'المهارات الشخصية',
        office: 'المكتب والتسويق',
      },
    },
    experience: {
      title: 'الخبرة',
      subtitle: 'رحلتي المهنية',
      role: 'مندوب مبيعات',
      company: 'Redline للمعدات الصناعية وأدوات السلامة',
      period: 'خبرة مهنية',
      responsibilities: [
        'إدارة العملاء',
        'تقارير Excel',
        'إدخال البيانات',
        'توثيق المكتب',
        'المهام الإدارية',
        'إدارة الوقت',
        'التواصل المهني',
      ],
    },
    certificates: {
      title: 'الشهادات',
      subtitle: 'المؤهلات والإنجازات',
      items: [
        'الرخصة الدولية لقيادة الحاسوب ICDL',
        'الوعي بالأمن السيبراني',
        'إدارة المكتب',
        'المراسلات الإدارية',
        'التسويق الرقمي',
        'الجاذبية والكاريزما',
        'القيادة',
        'دبلوم اللغة الإنجليزية',
        'الأرشفة التنظيمية',
        'التسويق الذاتي',
      ],
    },
    projects: {
      title: 'مشاريع مختارة',
      subtitle: 'ما قمت ببنائه',
      viewCode: 'الكود',
      liveDemo: 'عرض مباشر',
      gallery: 'المعرض',
      technologies: 'التقنيات',
      items: [
        {
          title: 'نظام كشف التسلط للمنازل الذكية باستخدام الذكاء الاصطناعي',
          description:
            'نظام مدعوم بالذكاء الاصطناعي يراقب شبكات المنازل الذكية ويكشف السلوك الشاذ في الوقت الحقيقي، يجمع بين تعلم الآلة ومبادئ أمن إنترنت الأشياء.',
          tech: ['Python', 'TensorFlow', 'IoT', 'الأمن السيبراني'],
        },
        {
          title: 'موقع البورتفوليو',
          description:
            'بورتفوليو شخصي ثنائي اللغة ومتجاوب بالكامل مع سمات داكنة/فاتحة متحركة وتأثيرات زجاجية ونظام محتوى قابل للإدارة.',
          tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        },
        {
          title: 'منصة تعلم الأمن السيبراني',
          description:
            'منصة تفاعلية لتعلم مفاهيم الأمن الهجومي والدفاعي مع مختبرات عملية وتتبع التقدم.',
          tech: ['React', 'Node.js', 'Supabase', 'Kali Linux'],
        },
        {
          title: 'لوحة أمن إنترنت الأشياء',
          description:
            'لوحة مراقبة تعرض حالة أمان أجهزة إنترنت الأشياء وحركة الشبكة وتنبيهات التهديدات في لوحة واحدة.',
          tech: ['Next.js', 'TypeScript', 'Wireshark', 'Nmap'],
        },
        {
          title: 'ZIDO STORE',
          description:
            'واجهة متجر إلكتروني متكامل مع كتالوج منتجات وسلة دفع آمن — مبني للسرعة والتحويل.',
          tech: ['React', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
        },
        {
          title: 'مشاريع جامعية',
          description:
            'مجموعة من المشاريع الأكاديمية تشمل الخوارزميات وقواعد البيانات وهندسة البرمجيات والشبكات — مبنية بمعايير الإنتاج.',
          tech: ['Java', 'Python', 'SQL', 'Git'],
        },
      ],
    },
    gallery: {
      title: 'المعرض',
      subtitle: 'عرض بصري',
      categories: { all: 'الكل', projects: 'المشاريع', certificates: 'الشهادات', events: 'الفعاليات' },
    },
    resume: {
      title: 'السيرة الذاتية',
      subtitle: 'مسيرتي المهنية',
      download: 'تحميل PDF',
      preview: 'معاينة',
      education: 'التعليم',
      degree: 'بكالوريوس علوم حاسوب',
      university: 'جامعة صنعاء',
      duration: '2022 — حتى الآن',
      experience: 'الخبرة',
      skills: 'المهارات',
      certificates: 'الشهادات',
    },
    services: {
      title: 'الخدمات',
      subtitle: 'ما يمكنني تقديمه لك',
      items: [
        {
          title: 'تطوير الويب',
          description: 'تطبيقات ويب حديثة ومتجاوبة وعالية الأداء مبنية بـ Next.js و TypeScript و Tailwind CSS.',
          icon: 'Code',
        },
        {
          title: 'استشارات الأمن السيبراني',
          description: 'تقييمات أمنية وتحليل الثغرات وإرشادات التحصين باستخدام أدوات قياسية في الصناعة.',
          icon: 'Shield',
        },
        {
          title: 'حلول الذكاء الاصطناعي',
          description: 'دمج نماذج تعلم الآلة ونماذج البحث الأولية وخطوط الأتمتة الذكية.',
          icon: 'Brain',
        },
        {
          title: 'تطوير Python',
          description: 'سكربتات وأتمتة ومعالجة بيانات وخدمات خلفية بـ Python نظيفة وأنيقة.',
          icon: 'Terminal',
        },
        {
          title: 'الشبكات وإنترنت الأشياء',
          description: 'تصميم الشبكات وتحليل حركة المرور ومراجعات أمان إنترنت الأشياء.',
          icon: 'Network',
        },
        {
          title: 'البحث التقني',
          description: 'أبحاث متعمقة وكتابة تقنية وتطوير إثبات المفهوم للتقنيات الناشئة.',
          icon: 'Search',
        },
      ],
    },
    testimonials: {
      title: 'آراء',
      subtitle: 'ما يقوله الناس',
      items: [
        {
          quote: 'يجمع عبدالله بين عقلية الأمن والحس المنتجي بشكل نادر. عمله دقيق ومفكر دائماً.',
          author: 'مشرف جامعي',
          role: 'قسم علوم الحاسوب',
        },
        {
          quote: 'موثوق ودقيق وفضولي بحق. رفع عبدالله كل مشروع لمسه في فريقنا.',
          author: 'زميل في الفريق',
          role: 'مساق هندسة البرمجيات',
        },
        {
          quote: 'يتواصل بوضوح ويدير وقته بإتقان ويقدم دائماً أكثر من المتوقع.',
          author: 'زميل عمل',
          role: 'Redline',
        },
      ],
    },
    blog: {
      title: 'المدونة',
      subtitle: 'أفكار ورؤى',
      readMore: 'اقرأ المزيد',
      searchPlaceholder: 'ابحث عن المقالات...',
      categories: { all: 'الكل', security: 'الأمن', ai: 'الذكاء الاصطناعي', web: 'الويب', research: 'البحث' },
      posts: [
        {
          title: 'تأمين المنزل الذكي: نهج بالذكاء الاصطناعي',
          excerpt: 'كيف يمكن لتعلم الآلة كشف التسلط في شبكات إنترنت الأشياء المنزلية قبل وقوع الضرر.',
          category: 'security',
          date: '2025-03-12',
        },
        {
          title: 'كيف غيّر TypeScript طريقة بنائي',
          excerpt: 'تأملات في أمان الأنواع وتجربة المطور وتوسيع قواعد الكود الأمامية.',
          category: 'web',
          date: '2025-02-02',
        },
        {
          title: 'من Nmap إلى Burp Suite: عقلية الاستطلاع',
          excerpt: 'شرح عملي لمرحلة الاستطلاع في تقييم أمني.',
          category: 'security',
          date: '2025-01-18',
        },
        {
          title: 'البحث كقوة خارقة للمطورين',
          excerpt: 'لماذا تجعل قراءة الأوراق وإعادة إنتاج النتائج منك مهندساً أفضل.',
          category: 'research',
          date: '2024-12-05',
        },
      ],
    },
    contact: {
      title: 'تواصل معي',
      subtitle: 'لنعمل معاً',
      name: 'اسمك',
      email: 'بريدك الإلكتروني',
      subject: 'الموضوع',
      message: 'رسالتك',
      send: 'إرسال',
      sending: 'جارٍ الإرسال...',
      success: 'تم إرسال الرسالة بنجاح!',
      error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      info: 'معلومات التواصل',
      location: 'صنعاء، اليمن',
      workingHours: 'ساعات العمل',
      workingHoursValue: 'السبت — الخميس، 9:00 — 18:00',
      formTitle: 'أرسل لي رسالة',
    },
    footer: {
      about:
        'طالب علوم حاسوب ومتخصص في الأمن السيبراني ومطور Full Stack يبني أنظمة مرنة وذكية.',
      quickLinks: 'روابط سريعة',
      newsletter: 'النشرة البريدية',
      newsletterDesc: 'اشترك للحصول على أحدث مقالاتي وتحديثاتي.',
      subscribe: 'اشترك',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      backToTop: 'العودة للأعلى',
      rights: 'جميع الحقوق محفوظة.',
      madeWith: 'صُمم وبُني بعناية.',
    },
    common: {
      loading: 'جارٍ التحميل...',
      language: 'اللغة',
      theme: 'السمة',
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
