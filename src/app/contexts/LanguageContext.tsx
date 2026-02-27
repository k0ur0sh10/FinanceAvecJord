import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      booking: "Book Appointment",
      about: "About",
      contact: "Contact",
      admin: "Admin"
    },
    home: {
      badge: "Trusted Insurance Advisory Since 1999",
      hero: {
        title1: "Protect What Matters.",
        title2: "Plan With Confidence.",
        subtitle: "Comprehensive insurance solutions and wealth management strategies tailored for discerning individuals and businesses who demand excellence.",
        cta1: "Book an Appointment",
        cta2: "Explore Insurance Products"
      },
      stats: {
        experience: "Years of Experience",
        clients: "Clients Protected",
        satisfaction: "Client Satisfaction",
        products: "Insurance Products"
      },
      features: {
        title: "Why Choose",
        titleAccent: "Finance Avec Jordi",
        subtitle: "Experience the difference of working with a premier insurance advisory firm dedicated to your financial security and peace of mind.",
        protection: {
          title: "Comprehensive Protection",
          desc: "Tailored insurance solutions that protect what matters most to you and your family."
        },
        expertise: {
          title: "Expert Guidance",
          desc: "Industry-certified advisors with decades of experience in wealth and risk management."
        },
        service: {
          title: "Personalized Service",
          desc: "White-glove service with dedicated advisors who understand your unique needs."
        },
        investment: {
          title: "Investment Planning",
          desc: "Strategic insurance and investment solutions for long-term wealth preservation."
        }
      },
      trust: {
        title: "Certified &",
        titleAccent: "Trusted",
        licensed: {
          title: "Licensed & Certified",
          desc: "Fully licensed insurance advisors with industry certifications"
        },
        privacy: {
          title: "Privacy Guaranteed",
          desc: "Your information is protected with enterprise-grade security"
        },
        fiduciary: {
          title: "Fiduciary Duty",
          desc: "We always act in your best interest, period"
        }
      },
      cta: {
        title: "Ready to Secure Your Future?",
        subtitle: "Schedule a complimentary consultation with one of our expert advisors. Let's discuss your insurance needs and create a personalized protection strategy.",
        button: "Schedule Your Consultation"
      }
    },
    services: {
      hero: {
        title: "Premium Insurance",
        titleAccent: "Solutions",
        subtitle: "Discover our comprehensive range of insurance products designed to protect your assets, family, and future with unmatched expertise and personalized service."
      },
      products: {
        life: {
          title: "Life Insurance",
          desc: "Comprehensive life insurance policies to protect your loved ones and secure their financial future.",
          features: ["Term Life Insurance", "Whole Life Insurance", "Universal Life Insurance", "Estate Planning Integration"]
        },
        health: {
          title: "Health Insurance",
          desc: "Premium health coverage options ensuring you receive the best care without financial burden.",
          features: ["Individual Health Plans", "Family Coverage", "Critical Illness Insurance", "Long-Term Care Insurance"]
        },
        auto: {
          title: "Auto Insurance",
          desc: "Superior auto insurance protection with competitive rates and exceptional service.",
          features: ["Comprehensive Coverage", "Collision Protection", "Liability Insurance", "Luxury Vehicle Specialists"]
        },
        home: {
          title: "Home Insurance",
          desc: "Protect your most valuable asset with tailored homeowner's insurance solutions.",
          features: ["Property Coverage", "Contents Insurance", "Liability Protection", "High-Value Home Specialists"]
        },
        business: {
          title: "Business Insurance",
          desc: "Comprehensive business protection strategies for enterprises of all sizes.",
          features: ["General Liability", "Professional Indemnity", "Business Interruption", "Commercial Property"]
        },
        wealth: {
          title: "Wealth Management",
          desc: "Strategic insurance-based investment solutions for long-term wealth preservation.",
          features: ["Investment-Linked Insurance", "Retirement Planning", "Tax-Efficient Solutions", "Wealth Transfer Strategies"]
        }
      },
      learnMore: "Learn More",
      cta: {
        title: "Not Sure Which Product is Right for You?",
        subtitle: "Our expert advisors will help you navigate your options and create a customized insurance portfolio tailored to your unique needs.",
        button: "Schedule a Consultation"
      }
    },
    booking: {
      confirmationBadge: "Confidential & Secure",
      hero: {
        title: "Schedule Your",
        titleAccent: "Consultation",
        subtitle: "Book a personalized consultation with our expert advisors. We're here to understand your needs and provide tailored insurance solutions."
      },
      benefits: {
        consultation: {
          title: "Free Consultation",
          desc: "No obligation, complimentary advice"
        },
        expert: {
          title: "Expert Advisor",
          desc: "Certified insurance professional"
        },
        flexible: {
          title: "Flexible Scheduling",
          desc: "Choose a time that works for you"
        }
      },
      form: {
        name: "Full Name",
        namePlaceholder: "John Smith",
        email: "Email Address",
        emailPlaceholder: "john@example.com",
        phone: "Phone Number",
        phonePlaceholder: "+1 (555) 123-4567",
        insuranceType: "Insurance Type",
        insuranceTypePlaceholder: "Select insurance type...",
        date: "Preferred Date",
        time: "Preferred Time",
        timePlaceholder: "Select time...",
        notes: "Additional Notes",
        notesPlaceholder: "Tell us more about your insurance needs...",
        privacy: "Your privacy is our priority. All information is encrypted and handled in strict confidence.",
        submit: "Confirm Appointment"
      },
      insuranceTypes: {
        life: "Life Insurance",
        health: "Health Insurance",
        auto: "Auto Insurance",
        home: "Home Insurance",
        business: "Business Insurance",
        investment: "Investment & Retirement",
        general: "General Consultation"
      },
      confirmation: {
        title: "Appointment Confirmed",
        message: "Thank you for scheduling a consultation with Finance Avec Jordi. We've sent a confirmation email to",
        details: "Appointment Details:",
        name: "Name:",
        date: "Date:",
        time: "Time:",
        type: "Insurance Type:",
        email: "Email:",
        phone: "Phone:",
        next: "What's Next?",
        step1: "You'll receive a confirmation email with calendar invite",
        step2: "Our advisor will review your information",
        step3: "We'll call if we need any additional details",
        backButton: "Book Another Appointment",
        homeButton: "Return to Home"
      }
    },
    about: {
      hero: {
        title: "Meet Your",
        titleAccent: "Trusted Advisor",
        subtitle: "Jordan Beaulieu brings over 25 years of expertise in insurance advisory and wealth management, dedicated to protecting what matters most to you."
      },
      badge: "25+ Years Experience",
      profile: {
        name: "Jordan Beaulieu",
        title: "Senior Insurance Advisor & Wealth Strategist",
        affiliation: "Affiliated with IA Groupe Financier",
        bio1: "With over two decades of experience in the insurance and financial services industry, Jordan has helped thousands of individuals and businesses secure their financial futures through comprehensive insurance strategies and wealth management solutions.",
        bio2: "Specializing in high-net-worth clients and complex insurance portfolios, Jordan brings a personalized, client-first approach to every consultation. His expertise spans life insurance, investment strategies, estate planning, and business succession planning.",
        certifications: "Certifications & Licenses",
        certs: [
          "Chartered Financial Consultant (ChFC)",
          "Certified Insurance Counselor (CIC)",
          "Life Insurance License - Quebec & Canada",
          "Mutual Funds Representative License"
        ]
      },
      values: {
        title: "Our Core",
        titleAccent: "Values",
        subtitle: "The principles that guide every client relationship and business decision we make.",
        integrity: {
          title: "Integrity First",
          desc: "Transparent advice and honest recommendations, always putting your interests first."
        },
        excellence: {
          title: "Excellence",
          desc: "Delivering exceptional service and expertise in every client interaction."
        },
        trust: {
          title: "Trust & Confidentiality",
          desc: "Your privacy and trust are paramount to everything we do."
        },
        innovation: {
          title: "Innovation",
          desc: "Leveraging cutting-edge solutions to provide the best outcomes for our clients."
        }
      },
      affiliations: {
        title: "Professional",
        titleAccent: "Affiliations",
        subtitle: "Proud member of leading industry organizations and professional bodies.",
        list: [
          "IA Groupe Financier - Official Partner",
          "Chambre de la sécurité financière (CSF)",
          "Financial Planning Standards Council (FPSC)",
          "Canadian Life and Health Insurance Association (CLHIA)",
          "Insurance Institute of Canada"
        ]
      }
    },
    contact: {
      hero: {
        title: "Let's Start a",
        titleAccent: "Conversation",
        subtitle: "Have questions about our services or want to discuss your insurance needs? We're here to help and look forward to hearing from you."
      },
      info: {
        phone: {
          title: "Phone",
          value: "+1 (555) 123-4567"
        },
        email: {
          title: "Email",
          value: "contact@financeavecjordi.com"
        },
        location: {
          title: "Office",
          value: "123 Luxury Plaza, Suite 800\nMontreal, QC H3B 2Y5"
        }
      },
      form: {
        title: "Send us a Message",
        name: "Your Name",
        namePlaceholder: "John Smith",
        email: "Email Address",
        emailPlaceholder: "john@example.com",
        phone: "Phone Number (Optional)",
        phonePlaceholder: "+1 (555) 123-4567",
        subject: "Subject",
        subjectPlaceholder: "How can we help?",
        message: "Message",
        messagePlaceholder: "Tell us more about your inquiry...",
        submit: "Send Message"
      },
      confirmation: {
        title: "Message Sent!",
        subtitle: "Thank you for contacting us. We'll get back to you within 24 hours."
      },
      cta: {
        title: "Prefer to Talk in Person?",
        subtitle: "Schedule a face-to-face consultation at our office or virtually via video call.",
        button: "Book Private Consultation"
      }
    },
    footer: {
      tagline: "Protecting what matters most with personalized insurance solutions and expert guidance.",
      quickLinks: "Quick Links",
      services: "Our Services",
      servicesList: {
        life: "Life Insurance",
        health: "Health Insurance",
        business: "Business Insurance",
        wealth: "Wealth Management"
      },
      contact: "Contact Us",
      copyright: "© 2026 Finance Avec Jordi. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      legal: "Legal"
    },
    admin: {
      login: {
        title: "Admin Login",
        subtitle: "Secure access to dashboard",
        email: "Email Address",
        emailPlaceholder: "admin@financeavecjordi.com",
        password: "Password",
        passwordPlaceholder: "Enter your password",
        forgot: "Forgot Password?",
        submit: "Sign In",
        security: "Secure Admin Access - All activity is logged"
      },
      dashboard: {
        title: "Dashboard Overview",
        stats: {
          total: "Total Appointments",
          today: "Today's Appointments",
          upcoming: "Upcoming",
          completed: "Completed"
        },
        views: {
          list: "List View",
          calendar: "Calendar View"
        },
        addButton: "New Appointment",
        table: {
          client: "Client",
          date: "Date",
          time: "Time",
          type: "Type",
          status: "Status",
          actions: "Actions",
          zoom: "Zoom Link",
          copyZoom: "Copy Link",
          addZoom: "Add Zoom Link"
        },
        form: {
          title: "Add New Appointment",
          clientName: "Client Name",
          email: "Email",
          phone: "Phone",
          type: "Insurance Type",
          typePlaceholder: "Select type...",
          date: "Date",
          time: "Time",
          timePlaceholder: "Select time...",
          notes: "Notes (Optional)",
          cancel: "Cancel",
          submit: "Add Appointment"
        },
        empty: "No appointments scheduled yet",
        emptyDesc: "Start by adding your first appointment using the button above."
      },
      calendar: {
        title: "Appointment Calendar",
        subtitle: "View and manage all scheduled appointments",
        selectedDate: "Selected Date",
        noAppointments: "No appointments on this date",
        appointmentDetails: "Appointment Details"
      },
      clients: {
        title: "Client Management",
        subtitle: "View and manage all client information",
        search: "Search clients...",
        table: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          appointments: "Appointments",
          lastVisit: "Last Visit",
          actions: "Actions"
        },
        empty: "No clients yet",
        emptyDesc: "Clients will appear here once appointments are booked."
      },
      sidebar: {
        dashboard: "Dashboard",
        calendar: "Calendar",
        clients: "Clients",
        logout: "Logout",
        adminDashboard: "Admin Dashboard"
      }
    },
    notFound: {
      title: "Page Not Found",
      subtitle: "The page you're looking for doesn't exist or has been moved.",
      home: "Back to Home",
      back: "Go Back"
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      booking: "Prendre Rendez-vous",
      about: "À Propos",
      contact: "Contact",
      admin: "Admin"
    },
    home: {
      badge: "Conseiller en assurance de confiance depuis 1999",
      hero: {
        title1: "Protégez ce qui compte.",
        title2: "Planifiez en toute confiance.",
        subtitle: "Solutions d'assurance complètes et stratégies de gestion de patrimoine adaptées aux particuliers et aux entreprises exigeants.",
        cta1: "Prendre Rendez-vous",
        cta2: "Découvrir nos Produits"
      },
      stats: {
        experience: "Années d'Expérience",
        clients: "Clients Protégés",
        satisfaction: "Satisfaction Client",
        products: "Produits d'Assurance"
      },
      features: {
        title: "Pourquoi Choisir",
        titleAccent: "Finance Avec Jordi",
        subtitle: "Découvrez la différence de travailler avec une firme de conseil en assurance de premier plan dédiée à votre sécurité financière et à votre tranquillité d'esprit.",
        protection: {
          title: "Protection Complète",
          desc: "Solutions d'assurance sur mesure qui protègent ce qui compte le plus pour vous et votre famille."
        },
        expertise: {
          title: "Expertise Professionnelle",
          desc: "Conseillers certifiés avec des décennies d'expérience en gestion de patrimoine et des risques."
        },
        service: {
          title: "Service Personnalisé",
          desc: "Service haut de gamme avec des conseillers dédiés qui comprennent vos besoins uniques."
        },
        investment: {
          title: "Planification d'Investissement",
          desc: "Solutions d'assurance et d'investissement stratégiques pour la préservation du patrimoine à long terme."
        }
      },
      trust: {
        title: "Certifié &",
        titleAccent: "Fiable",
        licensed: {
          title: "Licencié & Certifié",
          desc: "Conseillers en assurance entièrement licenciés avec certifications professionnelles"
        },
        privacy: {
          title: "Confidentialité Garantie",
          desc: "Vos informations sont protégées par une sécurité de niveau entreprise"
        },
        fiduciary: {
          title: "Devoir Fiduciaire",
          desc: "Nous agissons toujours dans votre meilleur intérêt, point final"
        }
      },
      cta: {
        title: "Prêt à Sécuriser Votre Avenir?",
        subtitle: "Planifiez une consultation gratuite avec l'un de nos conseillers experts. Discutons de vos besoins en assurance et créons une stratégie de protection personnalisée.",
        button: "Planifier Votre Consultation"
      }
    },
    services: {
      hero: {
        title: "Solutions d'Assurance",
        titleAccent: "Premium",
        subtitle: "Découvrez notre gamme complète de produits d'assurance conçus pour protéger vos actifs, votre famille et votre avenir avec une expertise inégalée et un service personnalisé."
      },
      products: {
        life: {
          title: "Assurance Vie",
          desc: "Polices d'assurance vie complètes pour protéger vos proches et sécuriser leur avenir financier.",
          features: ["Assurance Vie Temporaire", "Assurance Vie Entière", "Assurance Vie Universelle", "Intégration Planification Successorale"]
        },
        health: {
          title: "Assurance Santé",
          desc: "Options de couverture santé premium garantissant les meilleurs soins sans fardeau financier.",
          features: ["Plans Santé Individuels", "Couverture Familiale", "Assurance Maladies Graves", "Assurance Soins de Longue Durée"]
        },
        auto: {
          title: "Assurance Auto",
          desc: "Protection automobile supérieure avec des tarifs compétitifs et un service exceptionnel.",
          features: ["Couverture Complète", "Protection Collision", "Assurance Responsabilité", "Spécialistes Véhicules de Luxe"]
        },
        home: {
          title: "Assurance Habitation",
          desc: "Protégez votre actif le plus précieux avec des solutions d'assurance habitation sur mesure.",
          features: ["Couverture Propriété", "Assurance Contenu", "Protection Responsabilité", "Spécialistes Résidences Haut de Gamme"]
        },
        business: {
          title: "Assurance Entreprise",
          desc: "Stratégies de protection d'entreprise complètes pour toutes tailles d'entreprises.",
          features: ["Responsabilité Générale", "Indemnité Professionnelle", "Interruption des Affaires", "Propriété Commerciale"]
        },
        wealth: {
          title: "Gestion de Patrimoine",
          desc: "Solutions d'investissement basées sur l'assurance pour la préservation du patrimoine à long terme.",
          features: ["Assurance Liée à l'Investissement", "Planification Retraite", "Solutions Fiscalement Avantageuses", "Stratégies Transfert de Patrimoine"]
        }
      },
      learnMore: "En Savoir Plus",
      cta: {
        title: "Pas Sûr du Produit qui Vous Convient?",
        subtitle: "Nos conseillers experts vous aideront à naviguer vos options et créer un portefeuille d'assurance personnalisé adapté à vos besoins uniques.",
        button: "Planifier une Consultation"
      }
    },
    booking: {
      confirmationBadge: "Confidentiel & Sécurisé",
      hero: {
        title: "Planifiez Votre",
        titleAccent: "Consultation",
        subtitle: "Réservez une consultation personnalisée avec nos conseillers experts. Nous sommes là pour comprendre vos besoins et fournir des solutions d'assurance sur mesure."
      },
      benefits: {
        consultation: {
          title: "Consultation Gratuite",
          desc: "Sans obligation, conseils gratuits"
        },
        expert: {
          title: "Conseiller Expert",
          desc: "Professionnel d'assurance certifié"
        },
        flexible: {
          title: "Horaire Flexible",
          desc: "Choisissez une heure qui vous convient"
        }
      },
      form: {
        name: "Nom Complet",
        namePlaceholder: "Jean Dupont",
        email: "Adresse Courriel",
        emailPlaceholder: "jean@example.com",
        phone: "Numéro de Téléphone",
        phonePlaceholder: "+1 (555) 123-4567",
        insuranceType: "Type d'Assurance",
        insuranceTypePlaceholder: "Sélectionner le type d'assurance...",
        date: "Date Préférée",
        time: "Heure Préférée",
        timePlaceholder: "Sélectionner l'heure...",
        notes: "Notes Additionnelles",
        notesPlaceholder: "Parlez-nous de vos besoins en assurance...",
        privacy: "Votre vie privée est notre priorité. Toutes les informations sont cryptées et traitées en toute confidentialité.",
        submit: "Confirmer le Rendez-vous"
      },
      insuranceTypes: {
        life: "Assurance Vie",
        health: "Assurance Santé",
        auto: "Assurance Auto",
        home: "Assurance Habitation",
        business: "Assurance Entreprise",
        investment: "Investissement & Retraite",
        general: "Consultation Générale"
      },
      confirmation: {
        title: "Rendez-vous Confirmé",
        message: "Merci d'avoir planifié une consultation avec Finance Avec Jordi. Nous avons envoyé un courriel de confirmation à",
        details: "Détails du Rendez-vous:",
        name: "Nom:",
        date: "Date:",
        time: "Heure:",
        type: "Type d'Assurance:",
        email: "Courriel:",
        phone: "Téléphone:",
        next: "Prochaines Étapes?",
        step1: "Vous recevrez un courriel de confirmation avec invitation au calendrier",
        step2: "Notre conseiller examinera vos informations",
        step3: "Nous vous appellerons si nous avons besoin de détails supplémentaires",
        backButton: "Réserver un Autre Rendez-vous",
        homeButton: "Retour à l'Accueil"
      }
    },
    about: {
      hero: {
        title: "Rencontrez Votre",
        titleAccent: "Conseiller de Confiance",
        subtitle: "Jordan Beaulieu apporte plus de 25 ans d'expertise en conseil en assurance et gestion de patrimoine, dédiée à protéger ce qui compte le plus pour vous."
      },
      badge: "25+ Ans d'Expérience",
      profile: {
        name: "Jordan Beaulieu",
        title: "Conseiller Principal en Assurance & Stratège Patrimonial",
        affiliation: "Affilié à IA Groupe Financier",
        bio1: "Avec plus de deux décennies d'expérience dans l'industrie de l'assurance et des services financiers, Jordan a aidé des milliers de particuliers et d'entreprises à sécuriser leur avenir financier grâce à des stratégies d'assurance complètes et des solutions de gestion de patrimoine.",
        bio2: "Spécialisé dans les clients fortunés et les portefeuilles d'assurance complexes, Jordan apporte une approche personnalisée axée sur le client à chaque consultation. Son expertise couvre l'assurance vie, les stratégies d'investissement, la planification successorale et la planification de la relève d'entreprise.",
        certifications: "Certifications & Licences",
        certs: [
          "Conseiller Financier Agréé (ChFC)",
          "Conseiller en Assurance Certifié (CIC)",
          "Licence d'Assurance Vie - Québec & Canada",
          "Licence de Représentant en Fonds Communs"
        ]
      },
      values: {
        title: "Nos Valeurs",
        titleAccent: "Fondamentales",
        subtitle: "Les principes qui guident chaque relation client et décision d'affaires que nous prenons.",
        integrity: {
          title: "Intégrité d'Abord",
          desc: "Conseils transparents et recommandations honnêtes, toujours en mettant vos intérêts en premier."
        },
        excellence: {
          title: "Excellence",
          desc: "Offrir un service et une expertise exceptionnels dans chaque interaction client."
        },
        trust: {
          title: "Confiance & Confidentialité",
          desc: "Votre vie privée et votre confiance sont primordiales dans tout ce que nous faisons."
        },
        innovation: {
          title: "Innovation",
          desc: "Tirer parti de solutions de pointe pour fournir les meilleurs résultats à nos clients."
        }
      },
      affiliations: {
        title: "Affiliations",
        titleAccent: "Professionnelles",
        subtitle: "Fier membre d'organisations industrielles de premier plan et d'organismes professionnels.",
        list: [
          "IA Groupe Financier - Partenaire Officiel",
          "Chambre de la sécurité financière (CSF)",
          "Conseil des normes de planification financière (FPSC)",
          "Association canadienne des compagnies d'assurances de personnes (ACCAP)",
          "Institut d'assurance du Canada"
        ]
      }
    },
    contact: {
      hero: {
        title: "Entamons une",
        titleAccent: "Conversation",
        subtitle: "Vous avez des questions sur nos services ou souhaitez discuter de vos besoins en assurance? Nous sommes là pour vous aider et avons hâte de vous entendre."
      },
      info: {
        phone: {
          title: "Téléphone",
          value: "+1 (555) 123-4567"
        },
        email: {
          title: "Courriel",
          value: "contact@financeavecjordi.com"
        },
        location: {
          title: "Bureau",
          value: "123 Luxury Plaza, Suite 800\nMontréal, QC H3B 2Y5"
        }
      },
      form: {
        title: "Envoyez-nous un Message",
        name: "Votre Nom",
        namePlaceholder: "Jean Dupont",
        email: "Adresse Courriel",
        emailPlaceholder: "jean@example.com",
        phone: "Numéro de Téléphone (Optionnel)",
        phonePlaceholder: "+1 (555) 123-4567",
        subject: "Sujet",
        subjectPlaceholder: "Comment pouvons-nous vous aider?",
        message: "Message",
        messagePlaceholder: "Parlez-nous de votre demande...",
        submit: "Envoyer le Message"
      },
      confirmation: {
        title: "Message Envoyé!",
        subtitle: "Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures."
      },
      cta: {
        title: "Préférez Parler en Personne?",
        subtitle: "Planifiez une consultation en face-à-face à notre bureau ou virtuellement par appel vidéo.",
        button: "Réserver une Consultation Privée"
      }
    },
    footer: {
      tagline: "Protéger ce qui compte le plus avec des solutions d'assurance personnalisées et des conseils d'experts.",
      quickLinks: "Liens Rapides",
      services: "Nos Services",
      servicesList: {
        life: "Assurance Vie",
        health: "Assurance Santé",
        business: "Assurance Entreprise",
        wealth: "Gestion de Patrimoine"
      },
      contact: "Contactez-nous",
      copyright: "© 2026 Finance Avec Jordi. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      legal: "Légal"
    },
    admin: {
      login: {
        title: "Connexion Admin",
        subtitle: "Accès sécurisé au tableau de bord",
        email: "Adresse Courriel",
        emailPlaceholder: "admin@financeavecjordi.com",
        password: "Mot de Passe",
        passwordPlaceholder: "Entrez votre mot de passe",
        forgot: "Mot de passe oublié?",
        submit: "Se Connecter",
        security: "Accès Admin Sécurisé - Toute activité est enregistrée"
      },
      dashboard: {
        title: "Aperçu du Tableau de Bord",
        stats: {
          total: "Total des Rendez-vous",
          today: "Rendez-vous Aujourd'hui",
          upcoming: "À Venir",
          completed: "Complétés"
        },
        views: {
          list: "Vue Liste",
          calendar: "Vue Calendrier"
        },
        addButton: "Nouveau Rendez-vous",
        table: {
          client: "Client",
          date: "Date",
          time: "Heure",
          type: "Type",
          status: "Statut",
          actions: "Actions",
          zoom: "Lien Zoom",
          copyZoom: "Copier le Lien",
          addZoom: "Ajouter Lien Zoom"
        },
        form: {
          title: "Ajouter un Nouveau Rendez-vous",
          clientName: "Nom du Client",
          email: "Courriel",
          phone: "Téléphone",
          type: "Type d'Assurance",
          typePlaceholder: "Sélectionner le type...",
          date: "Date",
          time: "Heure",
          timePlaceholder: "Sélectionner l'heure...",
          notes: "Notes (Optionnel)",
          cancel: "Annuler",
          submit: "Ajouter le Rendez-vous"
        },
        empty: "Aucun rendez-vous planifié pour le moment",
        emptyDesc: "Commencez par ajouter votre premier rendez-vous en utilisant le bouton ci-dessus."
      },
      calendar: {
        title: "Calendrier des Rendez-vous",
        subtitle: "Voir et gérer tous les rendez-vous planifiés",
        selectedDate: "Date Sélectionnée",
        noAppointments: "Aucun rendez-vous à cette date",
        appointmentDetails: "Détails du Rendez-vous"
      },
      clients: {
        title: "Gestion des Clients",
        subtitle: "Voir et gérer toutes les informations clients",
        search: "Rechercher des clients...",
        table: {
          name: "Nom",
          email: "Courriel",
          phone: "Téléphone",
          appointments: "Rendez-vous",
          lastVisit: "Dernière Visite",
          actions: "Actions"
        },
        empty: "Aucun client pour le moment",
        emptyDesc: "Les clients apparaîtront ici une fois les rendez-vous réservés."
      },
      sidebar: {
        dashboard: "Tableau de Bord",
        calendar: "Calendrier",
        clients: "Clients",
        logout: "Déconnexion",
        adminDashboard: "Tableau de Bord Admin"
      }
    },
    notFound: {
      title: "Page Non Trouvée",
      subtitle: "La page que vous recherchez n'existe pas ou a été déplacée.",
      home: "Retour à l'Accueil",
      back: "Retour"
    }
  }
};
