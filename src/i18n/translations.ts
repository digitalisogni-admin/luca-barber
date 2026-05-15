export type Locale = 'en' | 'fr' | 'it' | 'ar';

export interface Translations {
  nav: {
    home: string;
    services: string;
    gallery: string;
    about: string;
    contact: string;
    book: string;
  };
  hero: {
    tagline: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    scroll: string;
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    items: {
      name: string;
      price: string;
      duration: string;
      desc: string;
    }[];
    bookCta: string;
  };
  about: {
    label: string;
    title: string;
    p1: string;
    p2: string;
    stats: { value: string; label: string }[];
  };
  gallery: {
    label: string;
    title: string;
    subtitle: string;
  };
  marquee: string;
  ctaSection: {
    title: string;
    subtitle: string;
    button: string;
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    address: string;
    hours: string;
    hoursDetail: string;
    phone: string;
    location: string;
    inquiry: string;
    followUs: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      success: string;
      error: string;
    };
  };
  team: {
    label: string;
    title: string;
    expert: string;
    roles: {
      master: string;
      artist: string;
      specialist: string;
      junior: string;
    };
  };
  accessibility: {
    title: string;
    subtitle: string;
    reset: string;
    highContrast: { label: string; desc: string };
    largeText: { label: string; desc: string };
    reducedMotion: { label: string; desc: string };
    focusOutlines: { label: string; desc: string };
    dyslexiaFont: { label: string; desc: string };
    aria: {
      open: string;
      close: string;
      settings: string;
    };
  };
  marquees: {
    branding: string;
    values: string;
  };
  footer: {
    rights: string;
    crafted: string;
    navigation: string;
    legal: string;
    social: string;
  };
  cookies: {
    title: string;
    message: string;
    accept: string;
    decline: string;
    privacy: string;
    secure: string;
  };
  legal: {
    privacyTitle: string;
    privacyContent: string;
    termsTitle: string;
    termsContent: string;
    close: string;
    inquiriesTitle: string;
    email: string;
    phone: string;
    address: string;
  };
  gdpr: {
    title: string;
    description: string;
    privacyPolicy: string;
    cookiePolicy: string;
    acceptAll: string;
    rejectOptional: string;
    customise: string;
    savePreferences: string;
    categories: {
      necessary: { label: string; desc: string };
      functional: { label: string; desc: string };
      analytics: { label: string; desc: string };
      marketing: { label: string; desc: string };
    };
    legalFootnote: string;
    customiseMessage: string;
    aria: {
      consent: string;
    };
  };
  common: {
    conciergeLink: string;
    followJourney: string;
    today: string;
    and: string;
    themeToggle: string;
  };
  booking: {
    steps: {
      service: string;
      barber: string;
      timing: string;
      details: string;
      payment: string;
      success: string;
    };
    summary: {
      title: string;
      service: string;
      master: string;
      schedule: string;
      total: string;
    };
    controls: {
      back: string;
      next: string;
      confirm: string;
      pay: string;
      close: string;
    };
    placeholders: {
      name: string;
      email: string;
      phone: string;
    };
    aria: {
      system: string;
      close: string;
      scrollLeft: string;
      scrollRight: string;
      acceptLegal: string;
      back: string;
      next: string;
    };
    legal: {
      agreement: string;
    };
    success: {
      title: string;
      subtitle: string;
    };
    labels: {
      luxuryGrooming: string;
      concierge: string;
      theCollection: string;
      tailoredExperiences: string;
      masterArtisans: string;
      chronosPrecision: string;
      chooseDay: string;
      availableHours: string;
      legacyRegistration: string;
      encrypted: string;
      stepOf: string;
      stepLabel: string;
      today: string;
    };
    payment: {
      secureZone: string;
      cardNumber: string;
      expiry: string;
      cvc: string;
      authenticating: string;
      confirmPay: string;
      verified: string;
      receiptEmail: string;
      smsConfirmation: string;
      payOnline: string;
      payOnSpot: string;
      orPayWithCard: string;
      bookNowPayLater: string;
      spotDescription: string;
      confirmAppointment: string;
    };
    errors: {
      payment: string;
    };
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      gallery: 'Gallery',
      about: 'About',
      contact: 'Contact',
      book: 'Book Now',
    },
    hero: {
      tagline: 'Est. 2018 — Turin, Italy',
      title1: 'The Art of',
      title2: 'Grooming',
      subtitle: 'Where tradition meets modern elegance. A premium barbershop experience crafted for the discerning gentleman.',
      cta: 'Reserve Your Chair',
      scroll: 'Scroll to explore',
    },
    services: {
      label: 'Our Craft',
      title: 'Premium Services',
      subtitle: 'Every service is a ritual — precision, care, and an unwavering commitment to excellence.',
      items: [
        { name: "Gentleman's Cut", price: '€35', duration: '45 min', desc: 'Precision scissor-over-comb tapering with hot towel finish' },
        { name: 'Beard Sculpture', price: '€25', duration: '30 min', desc: 'Hand-sculpted beard shaping with premium oils and balms' },
        { name: 'Royal Shave', price: '€30', duration: '40 min', desc: 'Traditional straight razor shave with warm lather ritual' },
        { name: 'The Full Experience', price: '€75', duration: '90 min', desc: 'Cut, beard sculpt, royal shave, and scalp massage' },
        { name: 'Hair & Beard Combo', price: '€50', duration: '60 min', desc: 'Complete haircut and beard grooming package' },
        { name: 'Kids Cut', price: '€20', duration: '30 min', desc: 'Precision cuts for the young gentlemen under 12' },
      ],
      bookCta: 'Book This Service',
    },
    about: {
      label: 'Our Story',
      title: 'Tradition Meets Precision',
      p1: 'Founded in the heart of Turin, Luca Barber Barber Shop has been redefining men\'s grooming since 2018. Our master barbers blend time-honored techniques with contemporary style.',
      p2: 'Every visit is more than a haircut — it\'s an experience. From the warm towel to the final touch, we ensure every gentleman leaves feeling exceptional.',
      stats: [
        { value: '8+', label: 'Years of Craft' },
        { value: '15K+', label: 'Happy Clients' },
        { value: '5', label: 'Master Barbers' },
        { value: '4.9', label: 'Google Rating' },
      ],
    },
    gallery: {
      label: 'Portfolio',
      title: 'Our Work Speaks',
      subtitle: 'A curated showcase of precision cuts and timeless styles.',
    },
    marquee: 'PRECISION  ·  TRADITION  ·  ELEGANCE  ·  CRAFTSMANSHIP  ·  ',
    ctaSection: {
      title: 'Ready for Your Next Ritual?',
      subtitle: 'Join the circle of distinguished gentlemen. Your chair, your style, your legacy.',
      button: 'Book Your Session',
    },
    contact: {
      label: 'Visit Us',
      title: "Your Chair Awaits",
      subtitle: 'Walk-ins welcome. Appointments recommended for premium services.',
      followUs: 'Follow our journey',
      address: 'Via Roma 42, 10121 Turin, Italy',
      hours: 'Hours',
      hoursDetail: 'Tue – Sat: 9:00 – 20:00  |  Sun – Mon: Closed',
      phone: '+39 011 234 5678',
      location: 'Location',
      inquiry: 'Inquiry',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        send: 'Send Message',
        success: 'Message Sent Perfectly.',
        error: 'Something went wrong. Try again.',
      },
    },
    team: {
      label: 'The Craftsmen',
      title: 'Meet the Masters',
      expert: 'Expert',
      roles: {
        master: 'Master Barber',
        artist: 'Art Director',
        specialist: 'Fade Specialist',
        junior: 'Junior Talent',
      },
    },
    accessibility: {
      title: 'Accessibility',
      subtitle: 'Personalise your experience',
      reset: 'Reset All Settings',
      highContrast: { label: 'High Contrast', desc: 'Increase color contrast' },
      largeText: { label: 'Large Text', desc: 'Increase font sizes' },
      reducedMotion: { label: 'Reduced Motion', desc: 'Disable animations' },
      focusOutlines: { label: 'Focus Outlines', desc: 'Show keyboard focus' },
      dyslexiaFont: { label: 'Dyslexia Font', desc: 'OpenDyslexic typeface' },
      aria: {
        open: 'Accessibility options',
        close: 'Close accessibility panel',
        settings: 'Accessibility settings',
      },
    },
    marquees: {
      branding: 'LUCA BARBER  ·  PREMIUM GROOMING  ·  TURIN  ·  EST. 2018  ·  ',
      values: 'EXCELLENCE · TRADITION · INNOVATION · LUCA BARBER · ',
    },
    footer: {
      rights: '© 2026 Luca Barber Barber Shop. All rights reserved.',
      crafted: 'Crafted with precision in Turin',
      navigation: 'Navigation',
      legal: 'Legal Rituals',
      social: 'Social Connection',
    },
    cookies: {
      title: 'Cookie Policy',
      message: 'To enhance your ritual, we use cookies to ensure you have the best experience on our site.',
      accept: 'Accept All',
      decline: 'Decline',
      privacy: 'Privacy Ritual',
      secure: 'Private & Secure',
    },
    legal: {
      privacyTitle: 'Privacy Ritual',
      privacyContent: 'Your data is handled with the same precision as our cuts. We only collect information necessary for your booking and never share it with third parties. All personal data is stored securely in accordance with GDPR regulations.',
      termsTitle: 'Terms of the Club',
      termsContent: 'By reserving a chair, you agree to our house rules. Please arrive 5 minutes early. No-shows may be subject to a fee. We reserve the right to provide an exceptional experience.',
      close: 'Back to Ritual',
      inquiriesTitle: 'Contact for Legal Inquiries',
      email: 'Email: legal@lucabarber.it',
      phone: 'Phone: +39 011 234 5678',
      address: 'Address: Via Roma 42, 10121 Turin, Italy',
    },
    gdpr: {
      title: 'Your Privacy Matters',
      description: 'We use cookies to enhance your browsing experience, serve personalised content, and analyse our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with our',
      privacyPolicy: 'Privacy Policy',
      cookiePolicy: 'Cookie Policy',
      acceptAll: 'Accept All',
      rejectOptional: 'Reject Optional',
      customise: 'Customise',
      savePreferences: 'Save Preferences',
      categories: {
        necessary: { label: 'Essential Cookies', desc: 'Required for the website to function. Cannot be disabled.' },
        functional: { label: 'Functional Cookies', desc: 'Enable personalised features like language preferences and theme settings.' },
        analytics: { label: 'Analytics Cookies', desc: 'Help us understand how visitors interact with the website to improve the experience.' },
        marketing: { label: 'Marketing Cookies', desc: 'Used to deliver relevant advertisements and measure campaign effectiveness.' },
      },
      legalFootnote: 'Data processed under GDPR Art. 6(1)(a) consent and Art. 6(1)(f) legitimate interest. Controller: Luca Barber Premium Barber, Turin, Italy. You may withdraw consent at any time.',
      customiseMessage: 'You can customise your preferences below.',
      aria: {
        consent: 'Cookie consent',
      },
    },
    common: {
      conciergeLink: 'Concierge Link',
      followJourney: 'Follow our journey',
      today: 'Today',
      and: 'and',
      themeToggle: 'Toggle theme',
    },
    booking: {
      steps: {
        service: 'Select Service',
        barber: 'Your Master',
        timing: 'Timing & Precision',
        details: 'Guest Details',
        payment: 'Secure Payment',
        success: 'Ritual Confirmed',
      },
      summary: {
        title: 'Final Summary',
        service: 'Ritual',
        master: 'Master',
        schedule: 'Schedule',
        total: 'Total',
      },
      controls: {
        back: 'Back',
        next: 'Continue',
        confirm: 'Confirm Booking',
        pay: 'Confirm & Pay',
        close: 'Legacy Continues',
      },
      placeholders: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
      },
      aria: {
        system: 'Booking System',
        close: 'Close booking',
        scrollLeft: 'Scroll dates left',
        scrollRight: 'Scroll dates right',
        acceptLegal: 'Accept privacy policy and terms',
        back: 'Go back',
        next: 'Continue to next step',
      },
      legal: {
        agreement: 'I accept the privacy policy and terms of service. I understand that my details are used only for booking management.',
      },
      success: {
        title: 'Confirmed',
        subtitle: 'The chair is yours. Welcome to the elite society of Luca Barber. Your master {master} awaits your arrival.',
      },
      labels: {
        luxuryGrooming: 'Luxury Grooming',
        concierge: 'Concierge',
        theCollection: 'The Collection',
        tailoredExperiences: 'Tailored Experiences',
        masterArtisans: 'Master Artisans',
        chronosPrecision: 'Chronos & Precision',
        chooseDay: 'Choose your day',
        availableHours: 'Available Hours',
        legacyRegistration: 'Legacy Registration',
        encrypted: 'Fully Encrypted Transaction',
        stepOf: 'Step {current} of {total}',
        stepLabel: 'Step',
        today: 'Today',
      },
      payment: {
        secureZone: 'Secure Payment Zone',
        cardNumber: 'Card Number',
        expiry: 'Expiry',
        cvc: 'CVC',
        authenticating: 'Authenticating...',
        confirmPay: 'Confirm & Pay',
        verified: 'Stripe Verified Secure',
        receiptEmail: 'Receipt will be sent to your email',
        smsConfirmation: 'Confirmation sent via SMS',
        payOnline: 'Pay Online',
        payOnSpot: 'Pay on Spot',
        orPayWithCard: 'or pay with card',
        bookNowPayLater: 'Book Now, Pay Later',
        spotDescription: 'Your appointment will be secured instantly. Payment will be collected after your grooming session at the salon via Cash or Card.',
        confirmAppointment: 'Confirm Appointment',
      },
      errors: {
        payment: 'Payment failed. Please try again or choose pay on spot.',
      },
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      gallery: 'Galerie',
      about: 'À Propos',
      contact: 'Contact',
      book: 'Réserver',
    },
    hero: {
      tagline: 'Depuis 2018 — Turin, Italie',
      title1: "L'Art du",
      title2: 'Grooming',
      subtitle: "Là où la tradition rencontre l'élégance moderne. Une expérience de barbier premium pour l'homme exigeant.",
      cta: 'Réservez Votre Place',
      scroll: 'Défiler pour explorer',
    },
    services: {
      label: 'Notre Savoir-Faire',
      title: 'Services Premium',
      subtitle: "Chaque service est un rituel — précision, soin et un engagement sans faille envers l'excellence.",
      items: [
        { name: 'Coupe Gentleman', price: '€35', duration: '45 min', desc: 'Coupe de précision aux ciseaux avec finition serviette chaude' },
        { name: 'Sculpture de Barbe', price: '€25', duration: '30 min', desc: 'Modelage artisanal avec huiles et baumes premium' },
        { name: 'Rasage Royal', price: '€30', duration: '40 min', desc: 'Rasage traditionnel au coupe-chou avec rituel de mousse chaude' },
        { name: "L'Expérience Complète", price: '€75', duration: '90 min', desc: 'Coupe, barbe, rasage royal et massage du cuir chevelu' },
        { name: 'Combo Cheveux & Barbe', price: '€50', duration: '60 min', desc: 'Forfait coupe complète et entretien de la barbe' },
        { name: 'Coupe Enfant', price: '€20', duration: '30 min', desc: 'Coupes de précision pour les jeunes messieurs de moins de 12 ans' },
      ],
      bookCta: 'Réserver Ce Service',
    },
    about: {
      label: 'Notre Histoire',
      title: 'Tradition & Précision',
      p1: "Fondé au cœur de Turin, Luca Barber Barber Shop redéfinit le grooming masculin depuis 2018. Nos maîtres barbiers allient techniques ancestrales et style contemporain.",
      p2: "Chaque visite est plus qu'une coupe — c'est une expérience. De la serviette chaude à la touche finale, nous veillons à ce que chaque gentleman reparte en se sentant exceptionnel.",
      stats: [
        { value: '8+', label: 'Ans de Métier' },
        { value: '15K+', label: 'Clients Satisfaits' },
        { value: '5', label: 'Maîtres Barbiers' },
        { value: '4.9', label: 'Note Google' },
      ],
    },
    gallery: {
      label: 'Portfolio',
      title: 'Notre Travail Parle',
      subtitle: 'Une vitrine de coupes précises et de styles intemporels.',
    },
    marquee: 'PRÉCISION  ·  TRADITION  ·  ÉLÉGANCE  ·  SAVOIR-FAIRE  ·  ',
    ctaSection: {
      title: 'Prêt pour Votre Prochain Rituel ?',
      subtitle: 'Rejoignez le cercle des gentlemen distingués. Votre fauteuil, votre style, votre héritage.',
      button: 'Réserver Ma Séance',
    },
    contact: {
      label: 'Nous Rendre Visite',
      title: 'Votre Fauteuil Vous Attend',
      subtitle: 'Sans rendez-vous accepté. Réservation recommandée pour les services premium.',
      followUs: 'Suivez notre voyage',
      address: 'Via Roma 42, 10121 Turin, Italie',
      hours: 'Horaires',
      hoursDetail: 'Mar – Sam : 9h – 20h  |  Dim – Lun : Fermé',
      phone: '+39 011 234 5678',
      location: 'Localisation',
      inquiry: 'Demande',
      form: {
        name: 'Votre Nom',
        email: 'Votre Email',
        message: 'Votre Message',
        send: 'Envoyer',
        success: 'Message Envoyé Parfaitement.',
        error: 'Une erreur est survenue. Réessayez.',
      },
    },
    team: {
      label: 'Les Artisans',
      title: 'Rencontrez les Maîtres',
      expert: 'Expert',
      roles: {
        master: 'Maître Barbier',
        artist: 'Directeur Artistique',
        specialist: 'Spécialiste du Dégradé',
        junior: 'Talent Émergent',
      },
    },
    accessibility: {
      title: 'Accessibilité',
      subtitle: 'Personnalisez votre expérience',
      reset: 'Réinitialiser tous les paramètres',
      highContrast: { label: 'Contraste Élevé', desc: 'Augmenter le contraste des couleurs' },
      largeText: { label: 'Texte Agrandi', desc: 'Augmenter la taille de la police' },
      reducedMotion: { label: 'Mouvements Réduits', desc: 'Désactiver les animations' },
      focusOutlines: { label: 'Contours de Mise au Point', desc: 'Afficher le focus clavier' },
      dyslexiaFont: { label: 'Police Dyslexie', desc: 'Police de caractères OpenDyslexic' },
      aria: {
        open: "Options d'accessibilité",
        close: "Fermer le panneau d'accessibilité",
        settings: "Paramètres d'accessibilité",
      },
    },
    marquees: {
      branding: 'LUCA BARBER  ·  GROOMING PREMIUM  ·  TURIN  ·  DEPUIS 2018  ·  ',
      values: 'EXCELLENCE · TRADITION · INNOVATION · LUCA BARBER · ',
    },
    footer: {
      rights: '© 2026 Luca Barber Barber Shop. Tous droits réservés.',
      crafted: 'Conçu avec précision à Turin',
      navigation: 'Navigation',
      legal: 'Rituels Légaux',
      social: 'Connexion Sociale',
    },
    cookies: {
      title: 'Politique des Cookies',
      message: 'Pour sublimer votre visite, nous utilisons des cookies afin de vous garantir la meilleure expérience possible.',
      accept: 'Tout Accepter',
      decline: 'Refuser',
      privacy: 'Rituel de Confidentialité',
      secure: 'Privé et Sécurisé',
    },
    legal: {
      privacyTitle: 'Rituel de Confidentialité',
      privacyContent: 'Vos données sont traitées avec la même précision que nos coupes. Nous ne collectons que les informations nécessaires à votre réservation et ne les partageons jamais avec des tiers. Toutes les données personnelles sont stockées en toute sécurité conformément au RGPD.',
      termsTitle: 'Règles du Club',
      termsContent: 'En réservant un fauteuil, vous acceptez nos règles de la maison. Veuillez arriver 5 minutes à l\'avance. Les absences peuvent faire l\'objet de frais. Nous nous réservons le droit de vous offrir une expérience exceptionnelle.',
      close: 'Retour au Rituel',
      inquiriesTitle: 'Contact pour Demandes Légales',
      email: 'Email: legal@lucabarber.it',
      phone: 'Téléphone: +39 011 234 5678',
      address: 'Adresse: Via Roma 42, 10121 Turin, Italie',
    },
    gdpr: {
      title: 'Votre Confidentialité Compte',
      description: 'Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser des contenus personnalisés et analyser notre trafic. En cliquant sur "Tout Accepter", vous consentez à notre utilisation des cookies conformément à notre',
      privacyPolicy: 'Politique de Confidentialité',
      cookiePolicy: 'Politique des Cookies',
      acceptAll: 'Tout Accepter',
      rejectOptional: 'Refuser les Optionnels',
      customise: 'Personnaliser',
      savePreferences: 'Enregistrer les Préférences',
      categories: {
        necessary: { label: 'Cookies Essentiels', desc: 'Requis pour le fonctionnement du site. Ne peuvent pas être désactivés.' },
        functional: { label: 'Cookies Fonctionnels', desc: 'Permettent des fonctionnalités personnalisées comme les préférences de langue.' },
        analytics: { label: 'Cookies Analytiques', desc: 'Nous aident à comprendre comment les visiteurs interagissent avec le site.' },
        marketing: { label: 'Cookies Marketing', desc: 'Utilisés pour diffuser des publicités pertinentes et mesurer l\'efficacité.' },
      },
      legalFootnote: 'Données traitées selon le consentement (RGPD Art. 6(1)(a)). Responsable : Luca Barber Premium Barber, Turin, Italie.',
      customiseMessage: 'Vous pouvez personnaliser vos préférences ci-dessous.',
      aria: {
        consent: 'Consentement aux cookies',
      },
    },
    common: {
      conciergeLink: 'Lien Conciergerie',
      followJourney: 'Suivez notre voyage',
      today: "Aujourd'hui",
      and: 'et',
      themeToggle: 'Changer le thème',
    },
    booking: {
      steps: {
        service: 'Choisir le Service',
        barber: 'Votre Maître',
        timing: 'Heure et Précision',
        details: 'Détails de l\'Invité',
        payment: 'Paiement Sécurisé',
        success: 'Rituel Confirmé',
      },
      summary: {
        title: 'Résumé Final',
        service: 'Rituel',
        master: 'Maître',
        schedule: 'Horaire',
        total: 'Total',
      },
      controls: {
        back: 'Retour',
        next: 'Continuer',
        confirm: 'Confirmer la Réservation',
        pay: 'Confirmer et Payer',
        close: 'L\'Héritage Continue',
      },
      placeholders: {
        name: 'Nom Complet',
        email: 'Adresse Email',
        phone: 'Numéro de Téléphone',
      },
      aria: {
        system: 'Système de réservation',
        close: 'Fermer la réservation',
        scrollLeft: 'Faire défiler les dates vers la gauche',
        scrollRight: 'Faire défiler les dates vers la droite',
        acceptLegal: 'Accepter la politique de confidentialité et les conditions',
        back: 'Retour',
        next: "Passer à l'étape suivante",
      },
      legal: {
        agreement: 'J\'accepte la politique de confidentialité et les conditions de service. Je comprends que mes coordonnées sont utilisées uniquement pour la gestion des réservations.',
      },
      success: {
        title: 'Confirmé',
        subtitle: 'Le fauteuil est à vous. Bienvenue dans l\'élite d\'Luca Barber. Votre maître {master} attend votre arrivée.',
      },
      labels: {
        luxuryGrooming: 'Soins de Luxe',
        concierge: 'Conciergerie',
        theCollection: 'La Collection',
        tailoredExperiences: 'Expériences Sur Mesure',
        masterArtisans: 'Maîtres Artisans',
        chronosPrecision: 'Chronos & Précision',
        chooseDay: 'Choisissez votre jour',
        availableHours: 'Heures Disponibles',
        legacyRegistration: 'Inscription à l\'Héritage',
        encrypted: 'Transaction Entièrement Cryptée',
        stepOf: 'Étape {current} sur {total}',
        stepLabel: 'Étape',
        today: "Aujourd'hui",
      },
      payment: {
        secureZone: 'Zone de Paiement Sécurisée',
        cardNumber: 'Numéro de Carte',
        expiry: 'Expiration',
        cvc: 'CVC',
        authenticating: 'Authentification...',
        confirmPay: 'Confirmer & Payer',
        verified: 'Sécurisé par Stripe',
        receiptEmail: 'Le reçu sera envoyé à votre email',
        smsConfirmation: 'Confirmation envoyée par SMS',
        payOnline: 'Payer en Ligne',
        payOnSpot: 'Payer sur Place',
        orPayWithCard: 'ou payer par carte',
        bookNowPayLater: 'Réservez Maintenant, Payez Plus Tard',
        spotDescription: 'Votre rendez-vous sera sécurisé instantanément. Le paiement sera effectué après votre séance au salon en espèces ou par carte.',
        confirmAppointment: 'Confirmer le Rendez-vous',
      },
      errors: {
        payment: 'Le paiement a échoué. Veuillez réessayer ou choisir le paiement sur place.',
      },
    },
  },

  it: {
    nav: {
      home: 'Home',
      services: 'Servizi',
      gallery: 'Galleria',
      about: 'Chi Siamo',
      contact: 'Contatti',
      book: 'Prenota',
    },
    hero: {
      tagline: 'Dal 2018 — Torino, Italia',
      title1: "L'Arte del",
      title2: 'Grooming',
      subtitle: "Dove la tradizione incontra l'eleganza moderna. Un'esperienza di barberia premium per l'uomo raffinato.",
      cta: 'Prenota la Tua Poltrona',
      scroll: 'Scorri per esplorare',
    },
    services: {
      label: 'Il Nostro Mestiere',
      title: 'Servizi Premium',
      subtitle: "Ogni servizio è un rituale — precisione, cura e un impegno incrollabile verso l'eccellenza.",
      items: [
        { name: 'Taglio Gentleman', price: '€35', duration: '45 min', desc: 'Taglio di precisione a forbice con finitura asciugamano caldo' },
        { name: 'Scultura Barba', price: '€25', duration: '30 min', desc: 'Modellatura artigianale con oli e balsami premium' },
        { name: 'Rasatura Reale', price: '€30', duration: '40 min', desc: 'Rasatura tradizionale a rasoio con rituale di schiuma calda' },
        { name: "L'Esperienza Completa", price: '€75', duration: '90 min', desc: 'Taglio, barba, rasatura reale e massaggio del cuoio capelluto' },
        { name: 'Combo Capelli & Barba', price: '€50', duration: '60 min', desc: 'Pacchetto taglio completo e cura della barba' },
        { name: 'Taglio Bambino', price: '€20', duration: '30 min', desc: 'Tagli di precisione per giovani gentiluomini sotto i 12 anni' },
      ],
      bookCta: 'Prenota Questo Servizio',
    },
    about: {
      label: 'La Nostra Storia',
      title: 'Tradizione e Precisione',
      p1: "Fondato nel cuore di Torino, Luca Barber Barber Shop ridefinisce il grooming maschile dal 2018. I nostri maestri barbieri fondono tecniche tradizionali e stile contemporaneo.",
      p2: "Ogni visita è più di un taglio — è un'esperienza. Dall'asciugamano caldo all'ultimo tocco, ci assicuriamo che ogni gentiluomo se ne vada sentendosi eccezionale.",
      stats: [
        { value: '8+', label: 'Anni di Mestiere' },
        { value: '15K+', label: 'Clienti Soddisfatti' },
        { value: '5', label: 'Maestri Barbieri' },
        { value: '4.9', label: 'Voto Google' },
      ],
    },
    gallery: {
      label: 'Portfolio',
      title: 'Il Nostro Lavoro Parla',
      subtitle: 'Una vetrina di tagli precisi e stili senza tempo.',
    },
    marquee: 'PRECISIONE  ·  TRADIZIONE  ·  ELEGANZA  ·  MAESTRIA  ·  ',
    ctaSection: {
      title: 'Pronto per il Tuo Prossimo Rituale?',
      subtitle: 'Entra nel cerchio dei gentiluomini distinti. La tua poltrona, il tuo stile, la tua leggenda.',
      button: 'Prenota la Tua Sessione',
    },
    contact: {
      label: 'Vieni a Trovarci',
      title: 'La Tua Poltrona Ti Aspetta',
      subtitle: 'Accesso libero benvenuto. Prenotazione consigliata per i servizi premium.',
      followUs: 'Segui il nostro viaggio',
      address: 'Via Roma 42, 10121 Torino, Italia',
      hours: 'Orari',
      hoursDetail: 'Mar – Sab: 9:00 – 20:00  |  Dom – Lun: Chiuso',
      phone: '+39 011 234 5678',
      location: 'Posizione',
      inquiry: 'Richiesta',
      form: {
        name: 'Il Tuo Nome',
        email: 'La Tua Email',
        message: 'Il Tuo Messaggio',
        send: 'Invia Messaggio',
        success: 'Messaggio Inviato Perfettamente.',
        error: 'Qualcosa è andato storto. Riprova.',
      },
    },
    team: {
      label: 'Gli Artigiani',
      title: 'Incontra i Maestri',
      expert: 'Esperto',
      roles: {
        master: 'Maestro Barbiere',
        artist: 'Direttore Artistico',
        specialist: 'Specialista Sfumature',
        junior: 'Talento Emergente',
      },
    },
    accessibility: {
      title: 'Accessibilità',
      subtitle: 'Personalizza la tua esperienza',
      reset: 'Ripristina Tutte le Impostazioni',
      highContrast: { label: 'Contrasto Elevato', desc: 'Aumenta il contrasto dei colori' },
      largeText: { label: 'Testo Grande', desc: 'Aumenta la dimensione del carattere' },
      reducedMotion: { label: 'Movimento Ridotto', desc: 'Disattiva le animazioni' },
      focusOutlines: { label: 'Contorni di Messa a Fuoco', desc: 'Mostra il focus della tastiera' },
      dyslexiaFont: { label: 'Carattere per Dislessia', desc: 'Carattere OpenDyslexic' },
      aria: {
        open: 'Opzioni di accessibilità',
        close: 'Chiudi il pannello di accessibilità',
        settings: 'Impostazioni di accessibilità',
      },
    },
    marquees: {
      branding: 'LUCA BARBER  ·  GROOMING PREMIUM  ·  TORINO  ·  DAL 2018  ·  ',
      values: 'ECCELLENZA · TRADIZIONE · INNOVAZIONE · LUCA BARBER · ',
    },
    footer: {
      rights: '© 2026 Luca Barber Barber Shop. Tutti i diritti riservati.',
      crafted: 'Realizzato con precisione a Torino',
      navigation: 'Navigazione',
      legal: 'Rituali Legali',
      social: 'Connessione Sociale',
    },
    cookies: {
      title: 'Politica dei Cookie',
      message: 'Per migliorare il tuo rituale, utilizziamo i cookie per garantirti la migliore esperienza sul nostro sito.',
      accept: 'Accetta Tutti',
      decline: 'Rifiuta',
      privacy: 'Rituale della Privacy',
      secure: 'Privato e Sicuro',
    },
    legal: {
      privacyTitle: 'Rituale della Privacy',
      privacyContent: 'I tuoi dati sono trattati con la stessa precisione dei nostri tagli. Raccogliamo solo le informazioni necessarie per la tua prenotazione e non le condividiamo mai con terzi. Tutti i dati personali sono conservati in modo sicuro in conformità con il GDPR.',
      termsTitle: 'Regole del Club',
      termsContent: 'Prenotando una poltrona, accetti le nostre regole della casa. Si prega di arrivare 5 minuti prima. Le mancate presentazioni possono essere soggette a una penale. Ci riserviamo il diritto di offrire un\'esperienza eccezionale.',
      close: 'Torna al Rituale',
      inquiriesTitle: 'Contatti per Richieste Legali',
      email: 'Email: legal@lucabarber.it',
      phone: 'Telefono: +39 011 234 5678',
      address: 'Indirizzo: Via Roma 42, 10121 Torino, Italia',
    },
    gdpr: {
      title: 'La Tua Privacy è Importante',
      description: 'Utilizziamo i cookie per migliorare la tua esperienza di navigazione, servire contenuti personalizzati e analizzare il nostro traffico. Cliccando su "Accetta Tutto", acconsenti al nostro utilizzo dei cookie in conformità con la nostra',
      privacyPolicy: 'Informativa sulla Privacy',
      cookiePolicy: 'Politica sui Cookie',
      acceptAll: 'Accetta Tutto',
      rejectOptional: 'Rifiuta Opzionali',
      customise: 'Personalizza',
      savePreferences: 'Salva Preferenze',
      categories: {
        necessary: { label: 'Cookie Essenziali', desc: 'Necessari per il funzionamento del sito. Non possono essere disattivati.' },
        functional: { label: 'Cookie Funzionali', desc: 'Abilitano funzionalità personalizzate come le preferenze di lingua.' },
        analytics: { label: 'Cookie Analitici', desc: 'Ci aiutano a capire come i visitatori interagiscono con il sito.' },
        marketing: { label: 'Cookie di Marketing', desc: 'Utilizzati per fornire pubblicità pertinenti e misurare l\'efficacia.' },
      },
      legalFootnote: 'Dati trattati in base al consenso (GDPR Art. 6(1)(a)). Titolare: Luca Barber Premium Barber, Torino, Italia.',
      customiseMessage: 'Puoi personalizzare le tue preferenze qui sotto.',
      aria: {
        consent: 'Consenso ai cookie',
      },
    },
    common: {
      conciergeLink: 'Link Concierge',
      followJourney: 'Segui il nostro viaggio',
      today: 'Oggi',
      and: 'e',
      themeToggle: 'Cambia tema',
    },
    booking: {
      steps: {
        service: 'Seleziona Servizio',
        barber: 'Il Tuo Maestro',
        timing: 'Orario e Precisione',
        details: 'Dettagli Ospite',
        payment: 'Pagamento Sicuro',
        success: 'Rituale Confermato',
      },
      summary: {
        title: 'Riepilogo Finale',
        service: 'Rituale',
        master: 'Maestro',
        schedule: 'Programma',
        total: 'Totale',
      },
      controls: {
        back: 'Indietro',
        next: 'Continua',
        confirm: 'Conferma Prenotazione',
        pay: 'Conferma e Paga',
        close: 'Il Legato Continua',
      },
      placeholders: {
        name: 'Nome Completo',
        email: 'Indirizzo Email',
        phone: 'Numero di Telefono',
      },
      aria: {
        system: 'Sistema di prenotazione',
        close: 'Chiudi prenotazione',
        scrollLeft: 'Scorri le date a sinistra',
        scrollRight: 'Scorri le date a destra',
        acceptLegal: 'Accetta la privacy policy e i termini',
        back: 'Torna indietro',
        next: 'Continua al passaggio successivo',
      },
      legal: {
        agreement: 'Accetto l\'informativa sulla privacy e i termini di servizio. Comprendo che i miei dati sono utilizzati solo per la gestione della prenotazione.',
      },
      success: {
        title: 'Confermato',
        subtitle: 'La poltrona è tua. Benvenuto nell\'élite di Luca Barber. Il tuo maestro {master} attende il tuo arrivo.',
      },
      labels: {
        luxuryGrooming: 'Grooming di Lusso',
        concierge: 'Concierge',
        theCollection: 'La Collezione',
        tailoredExperiences: 'Esperienze Su Misura',
        masterArtisans: 'Maestri Artigiani',
        chronosPrecision: 'Chronos e Precisione',
        chooseDay: 'Scegli il tuo giorno',
        availableHours: 'Orari Disponibili',
        legacyRegistration: 'Registrazione Legacy',
        encrypted: 'Transazione Completamente Criptata',
        stepOf: 'Passaggio {current} di {total}',
        stepLabel: 'Passaggio',
        today: 'Oggi',
      },
      payment: {
        secureZone: 'Zona di Pagamento Sicura',
        cardNumber: 'Numero Carta',
        expiry: 'Scadenza',
        cvc: 'CVC',
        authenticating: 'Autenticazione...',
        confirmPay: 'Conferma e Paga',
        verified: 'Verificato da Stripe',
        receiptEmail: 'La ricevuta verrà inviata alla tua email',
        smsConfirmation: 'Conferma inviata via SMS',
        payOnline: 'Paga Online',
        payOnSpot: 'Paga in Sede',
        orPayWithCard: 'o paga con carta',
        bookNowPayLater: 'Prenota Ora, Paga Dopo',
        spotDescription: 'Il tuo appuntamento sarà confermato istantaneamente. Il pagamento verrà effettuato in sede dopo la sessione in contanti o carta.',
        confirmAppointment: 'Conferma Appuntamento',
      },
      errors: {
        payment: 'Pagamento fallito. Riprova o scegli il pagamento in loco.',
      },
    },
  },

  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      gallery: 'المعرض',
      about: 'من نحن',
      contact: 'اتصل بنا',
      book: 'احجز الآن',
    },
    hero: {
      tagline: 'منذ ٢٠١٨ — تورينو، إيطاليا',
      title1: 'فن',
      title2: 'العناية',
      subtitle: 'حيث يلتقي التراث بالأناقة العصرية. تجربة حلاقة فاخرة صُممت للرجل المتميز.',
      cta: 'احجز مقعدك',
      scroll: 'مرر لاستكشاف المزيد',
    },
    services: {
      label: 'حرفتنا',
      title: 'خدمات فاخرة',
      subtitle: 'كل خدمة هي طقس — دقة، عناية، والتزام راسخ بالتميز.',
      items: [
        { name: 'قصة الجنتلمان', price: '٣٥€', duration: '٤٥ دقيقة', desc: 'قص دقيق بالمقص مع لمسة نهائية بالمنشفة الساخنة' },
        { name: 'نحت اللحية', price: '٢٥€', duration: '٣٠ دقيقة', desc: 'تشكيل يدوي للحية بزيوت وبلسم فاخر' },
        { name: 'الحلاقة الملكية', price: '٣٠€', duration: '٤٠ دقيقة', desc: 'حلاقة تقليدية بالموس مع رغوة دافئة' },
        { name: 'التجربة الكاملة', price: '٧٥€', duration: '٩٠ دقيقة', desc: 'قص، نحت لحية، حلاقة ملكية، وتدليك فروة الرأس' },
        { name: 'باقة الشعر واللحية', price: '٥٠€', duration: '٦٠ دقيقة', desc: 'باقة قص شعر كاملة والعناية باللحية' },
        { name: 'قصة الأطفال', price: '٢٠€', duration: '٣٠ دقيقة', desc: 'قصات دقيقة للشباب الصغار تحت سن ١٢' },
      ],
      bookCta: 'احجز هذه الخدمة',
    },
    about: {
      label: 'قصتنا',
      title: 'التراث يلتقي بالدقة',
      p1: 'تأسس في قلب تورينو، صالون لوكا باربر للحلاقة يعيد تعريف العناية الرجالية منذ ٢٠١٨. حلاقونا المحترفون يمزجون التقنيات العريقة بالأسلوب المعاصر.',
      p2: 'كل زيارة هي أكثر من مجرد قصة شعر — إنها تجربة. من المنشفة الدافئة إلى اللمسة الأخيرة، نحرص على أن يغادر كل رجل وهو يشعر بالتميز.',
      stats: [
        { value: '+٨', label: 'سنوات من الحرفة' },
        { value: '+١٥ ألف', label: 'عميل سعيد' },
        { value: '٥', label: 'حلاقين محترفين' },
        { value: '٤.٩', label: 'تقييم جوجل' },
      ],
    },
    gallery: {
      label: 'أعمالنا',
      title: 'عملنا يتحدث',
      subtitle: 'عرض منسق لقصات دقيقة وأساليب خالدة.',
    },
    marquee: 'دقة  ·  تراث  ·  أناقة  ·  حرفية  ·  ',
    ctaSection: {
      title: 'هل أنت مستعد لطقسك القادم؟',
      subtitle: 'انضم إلى حلقة السادة المتميزين. مقعدك، أسلوبك، إرثك.',
      button: 'احجز جلستك',
    },
    contact: {
      label: 'زورونا',
      title: 'مقعدك بانتظارك',
      subtitle: 'نرحب بالزيارات بدون موعد. نوصي بالحجز للخدمات المميزة.',
      followUs: 'تابع رحلتنا',
      address: 'فيا روما ٤٢، ١٠١٢١ تورينو، إيطاليا',
      hours: 'ساعات العمل',
      hoursDetail: 'الثلاثاء – السبت: ٩:٠٠ – ٢٠:٠٠  |  الأحد – الاثنين: مغلق',
      phone: '+39 011 234 5678',
      location: 'الموقع',
      inquiry: 'الاستفسارات',
      form: {
        name: 'اسمك',
        email: 'بريدك الإلكتروني',
        message: 'رسالتك',
        send: 'إرسال الرسالة',
        success: 'تم إرسال الرسالة بنجاح.',
        error: 'حدث خطأ ما. حاول مرة أخرى.',
      },
    },
    team: {
      label: 'الحرفيون',
      title: 'قابل الأساتذة',
      expert: 'خبير',
      roles: {
        master: 'كبير الحلاقين',
        artist: 'المدير الفني',
        specialist: 'خبير التدرج',
        junior: 'موهبة صاعدة',
      },
    },
    accessibility: {
      title: 'إمكانية الوصول',
      subtitle: 'خصص تجربتك',
      reset: 'إعادة ضبط الإعدادات',
      highContrast: { label: 'تباين عالٍ', desc: 'زيادة تباين الألوان' },
      largeText: { label: 'نص كبير', desc: 'تكبير أحجام الخطوط' },
      reducedMotion: { label: 'حركة مخفضة', desc: 'تعطيل الحركات' },
      focusOutlines: { label: 'حدود التركيز', desc: 'إظهار تركيز لوحة المفاتيح' },
      dyslexiaFont: { label: 'خط عسر القراءة', desc: 'خط OpenDyslexic' },
      aria: {
        open: 'خيارات إمكانية الوصول',
        close: 'إغلاق لوحة إمكانية الوصول',
        settings: 'إعدادات إمكانية الوصول',
      },
    },
    marquees: {
      branding: 'لوكا باربر  ·  عناية فاخرة  ·  تورينو  ·  منذ ٢٠١٨  ·  ',
      values: 'تميز · تراث · ابتكار · لوكا باربر · ',
    },
    footer: {
      rights: '© ٢٠٢٦ صالون لوكا باربر للحلاقة. جميع الحقوق محفوظة.',
      crafted: 'صُنع بدقة في تورينو',
      navigation: 'التنقل',
      legal: 'الطقوس القانونية',
      social: 'التواصل الاجتماعي',
    },
    cookies: {
      title: 'سياسة الكوكيز',
      message: 'لتحسين تجربتك، نستخدم ملفات تعريف الارتباط لضمان حصولك على أفضل تجربة على موقعنا.',
      accept: 'قبول الكل',
      decline: 'رفض',
      privacy: 'خصوصية الطقوس',
      secure: 'خاص وآمن',
    },
    legal: {
      privacyTitle: 'خصوصية الطقوس',
      privacyContent: 'يتم التعامل مع بياناتك بنفس دقة قصاتنا. نحن نجمع فقط المعلومات الضرورية لحجزك ولا نشاركها أبدًا مع أطراف ثالثة. يتم تخزين جميع البيانات الشخصية بأمان وفقًا للوائح العامة لحماية البيانات (GDPR).',
      termsTitle: 'شروط النادي',
      termsContent: 'من خلال حجز مقعد، فإنك توافق على قواعد منزلنا. يرجى الوصول قبل ٥ دقائق. قد تخضع حالات عدم الحضور لرسوم. نحن نحتفظ بالحق في تقديم تجربة استثنائية.',
      close: 'العودة إلى الطقوس',
      inquiriesTitle: 'الاتصال للاستفسارات القانونية',
      email: 'البريد الإلكتروني: legal@lucabarber.it',
      phone: 'الهاتف: +39 011 234 5678',
      address: 'العنوان: Via Roma 42, 10121 Turin, Italy',
    },
    gdpr: {
      title: 'خصوصيتك تهمنا',
      description: 'نحن نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك، وتقديم محتوى مخصص، وتحليل حركة المرور لدينا. بالنقر فوق "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط وفقًا لـ',
      privacyPolicy: 'سياسة الخصوصية',
      cookiePolicy: 'سياسة الكوكيز',
      acceptAll: 'قبول الكل',
      rejectOptional: 'رفض الاختياري',
      customise: 'تخصيص',
      savePreferences: 'حفظ التفضيلات',
      categories: {
        necessary: { label: 'ملفات تعريف الارتباط الأساسية', desc: 'مطلوبة لعمل الموقع. لا يمكن تعطيلها.' },
        functional: { label: 'ملفات تعريف الارتباط الوظيفية', desc: 'تمكن الميزات المخصصة مثل تفضيلات اللغة وإعدادات المظهر.' },
        analytics: { label: 'ملفات تعريف الارتباط التحليلية', desc: 'تساعدنا على فهم كيفية تفاعل الزوار مع الموقع لتحسين التجربة.' },
        marketing: { label: 'ملفات تعريف الارتباط التسويقية', desc: 'تستخدم لتقديم إعلانات ذات صلة وقياس فعالية الحملات.' },
      },
      legalFootnote: 'تمت معالجة البيانات بموجب موافقة المادة 6 (1) (أ) من GDPR والمصلحة المشروعة للمادة 6 (1) (ف). المسؤول: لوكا باربر بريميوم باربر، تورينو، إيطاليا. يمكنك سحب الموافقة في أي وقت.',
      customiseMessage: 'يمكنك تخصيص تفضيلاتك أدناه.',
      aria: {
        consent: 'الموافقة على ملفات تعريف الارتباط',
      },
    },
    common: {
      conciergeLink: 'رابط الكونسيرج',
      followJourney: 'تابع رحلتنا',
      today: 'اليوم',
      and: 'و',
      themeToggle: 'تبديل المظهر',
    },
    booking: {
      steps: {
        service: 'اختر الخدمة',
        barber: 'سيدك الحلاق',
        timing: 'التوقيت والدقة',
        details: 'تفاصيل الضيف',
        payment: 'دفع آمن',
        success: 'تم تأكيد الطقس',
      },
      summary: {
        title: 'الملخص النهائي',
        service: 'الطقس',
        master: 'السيد الحلاق',
        schedule: 'الجدول',
        total: 'المجموع',
      },
      controls: {
        back: 'رجوع',
        next: 'استمرار',
        confirm: 'تأكيد الحجز',
        pay: 'تأكيد ودفع',
        close: 'الإرث يستمر',
      },
      placeholders: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
      },
      aria: {
        system: 'نظام الحجز',
        close: 'إغلاق الحجز',
        scrollLeft: 'تمرير التواريخ لليسار',
        scrollRight: 'تمرير التواريخ لليمين',
        acceptLegal: 'الموافقة على سياسة الخصوصية والشروط',
        back: 'العودة',
        next: 'المتابعة للخطوة التالية',
      },
      legal: {
        agreement: 'أوافق على سياسة الخصوصية وشروط الخدمة. أتفهم أن التفاصيل الخاصة بي تستخدم فقط لإدارة الحجز.',
      },
      success: {
        title: 'تم التأكيد',
        subtitle: 'المقعد لك. مرحبًا بك في مجتمع لوكا باربر المتميز. سيدك {master} في انتظار وصولك.',
      },
      labels: {
        luxuryGrooming: 'عناية فاخرة',
        concierge: 'كونسيرج',
        theCollection: 'المجموعة',
        tailoredExperiences: 'تجارب مخصصة',
        masterArtisans: 'حرفيون مهرة',
        chronosPrecision: 'كرونوس والدقة',
        chooseDay: 'اختر يومك',
        availableHours: 'الساعات المتاحة',
        legacyRegistration: 'تسجيل الإرث',
        encrypted: 'عملية مشفرة بالكامل',
        stepOf: 'الخطوة {current} من {total}',
        stepLabel: 'الخطوة',
        today: 'اليوم',
      },
      payment: {
        secureZone: 'منطقة دفع آمنة',
        cardNumber: 'رقم البطاقة',
        expiry: 'تاريخ الانتهاء',
        cvc: 'رمز الأمان',
        authenticating: 'جاري التحقق...',
        confirmPay: 'تأكيد ودفع',
        verified: 'موثق من Stripe',
        receiptEmail: 'سيتم إرسال الإيصال إلى بريدك الإلكتروني',
        smsConfirmation: 'تم إرسال التأكيد عبر رسالة نصية',
        payOnline: 'الدفع عبر الإنترنت',
        payOnSpot: 'الدفع في الصالون',
        orPayWithCard: 'أو الدفع بالبطاقة',
        bookNowPayLater: 'احجز الآن، ادفع لاحقاً',
        spotDescription: 'سيتم تأمين موعدك على الفور. سيتم تحصيل الدفع بعد جلسة الحلاقة في الصالون نقداً أو بالبطاقة.',
        confirmAppointment: 'تأكيد الموعد',
      },
      errors: {
        payment: 'فشل عملية الدفع. يرجى المحاولة مرة أخرى أو اختيار الدفع في الموقع.',
      },
    },
  },
};

export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};
