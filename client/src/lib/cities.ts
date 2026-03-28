/**
 * Données SEO pour les pages villes des Pyrénées-Orientales
 * Design: "Plomberie Méditerranéen" – Navy #0A1628 / Yellow #06b6d4
 */

export interface City {
  slug: string;
  name: string;
  postalCode: string;
  department: string;
  population: string;
  distance: string; // Distance de Perpignan
  interventionTime: string; // Délai d'intervention
  description: string; // Description locale unique
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  localContext: string; // Contexte local (quartiers, zones industrielles, etc.)
  mainServices: string[]; // Services les plus demandés dans cette ville
  neighborhoods: string[]; // Quartiers / zones notables
  nearbyCity: string; // Ville proche pour le maillage interne
  nearbyCitySlug: string;
  testimonial: {
    text: string;
    author: string;
    service: string;
  };
  faq: { question: string; answer: string }[];
}

export const cities: City[] = [
  {
    slug: "canet-en-roussillon",
    name: "Canet-en-Roussillon",
    postalCode: "66140",
    department: "Pyrénées-Orientales",
    population: "14 000",
    distance: "12 km",
    interventionTime: "30 min",
    description:
      "Station balnéaire prisée du littoral catalan, Canet-en-Roussillon concentre une forte activité résidentielle et touristique. Villas, résidences secondaires, commerces et restaurants : les besoins en plomberie y sont variés et exigeants.",
    metaTitle: "Plombier Canet-en-Roussillon 66140 – Devis Gratuit | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Canet-en-Roussillon (66140). Installation, dépannage, recherche de fuite, débouchage. Intervention rapide. Devis gratuit.",
    heroTagline: "Votre plombier de confiance à Canet-en-Roussillon",
    localContext:
      "Canet-en-Roussillon est une commune littorale dynamique avec de nombreuses résidences secondaires, villas et commerces saisonniers. La forte densité de logements anciens nécessite régulièrement des mises en conformité plomberies.",
    mainServices: ["Installation sanitaire", "Débouchage", "Recherche de fuite", "Éclairage LED"],
    neighborhoods: ["Canet-Plage", "Canet-Village", "Le Mas Guérido", "Les Capellans"],
    nearbyCity: "Saint-Cyprien",
    nearbyCitySlug: "saint-cyprien",
    testimonial: {
      text: "Intervention rapide pour la recherche de fuite de ma villa à Canet-Plage avant la vente. Travail soigné, rapport Assurance obtenu sans problème. Je recommande vivement Le Plombier du 66 !",
      author: "Pierre M.",
      service: "Débouchage",
    },
    faq: [
      {
        question: "Intervenez-vous en urgence à Canet-en-Roussillon ?",
        answer: "Oui, nous intervenons en urgence à Canet-en-Roussillon 7j/7. Délai d'intervention garanti sous 30 minutes depuis Perpignan.",
      },
      {
        question: "Proposez-vous des devis pour les résidences secondaires à Canet ?",
        answer: "Absolument. Nous intervenons régulièrement pour des propriétaires de résidences secondaires à Canet-Plage : recherche de fuite, installation de bornes IRVE, domotique.",
      },
      {
        question: "Gérez-vous les travaux pour les commerces saisonniers à Canet ?",
        answer: "Oui, nous avons une forte expérience dans le plombier des commerces et restaurants à Canet-en-Roussillon, avec des interventions planifiées hors saison.",
      },
    ],
  },
  {
    slug: "saint-esteve",
    name: "Saint-Estève",
    postalCode: "66240",
    department: "Pyrénées-Orientales",
    population: "12 500",
    distance: "5 km",
    interventionTime: "15 min",
    description:
      "Commune résidentielle limitrophe de Perpignan, Saint-Estève connaît une forte croissance démographique avec de nombreuses constructions neuves et rénovations. Idéalement située, elle bénéficie d'une intervention ultra-rapide de notre équipe.",
    metaTitle: "Plombier Saint-Estève 66240 – Intervention Rapide | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Saint-Estève (66240). Installation neuve, rénovation, chauffe-eau, dépannage. Intervention en 15 min. Devis gratuit.",
    heroTagline: "Plombier à Saint-Estève – Intervention en 15 minutes",
    localContext:
      "Saint-Estève est une commune résidentielle en forte expansion, avec de nombreux lotissements récents et des maisons individuelles. La proximité avec Perpignan permet une intervention ultra-rapide.",
    mainServices: ["Installation neuve", "Chauffe-eau", "Dépannage d'urgence", "Débouchage de canalisations"],
    neighborhoods: ["Centre-ville", "Les Aspres", "La Plaine", "Mas Balande"],
    nearbyCity: "Perpignan",
    nearbyCitySlug: "perpignan",
    testimonial: {
      text: "Remplacement de mon chauffe-eau à Saint-Estève. Le plombier est arrivé en moins de 20 minutes, travail propre et rapide. Tarif conforme au devis. Très satisfait !",
      author: "Nathalie R.",
      service: "Chauffe-eau",
    },
    faq: [
      {
        question: "Quel est le délai d'intervention à Saint-Estève ?",
        answer: "Saint-Estève étant à 5 km de Perpignan, nous intervenons en moins de 15 minutes pour les urgences. C'est l'une des communes les mieux desservies de notre zone.",
      },
      {
        question: "Intervenez-vous pour les constructions neuves à Saint-Estève ?",
        answer: "Oui, nous réalisons de nombreuses installations plomberies dans les lotissements neufs de Saint-Estève. Nous travaillons en coordination avec les constructeurs et maîtres d'œuvre.",
      },
    ],
  },
  {
    slug: "rivesaltes",
    name: "Rivesaltes",
    postalCode: "66600",
    department: "Pyrénées-Orientales",
    population: "9 000",
    distance: "14 km",
    interventionTime: "25 min",
    description:
      "Connue pour son musée mémorial et ses vignobles, Rivesaltes est une commune mixte alliant habitat résidentiel et zones d'activités. Notre équipe intervient rapidement pour les particuliers comme pour les professionnels.",
    metaTitle: "Plombier Rivesaltes 66600 – Devis Gratuit | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Rivesaltes (66600). Dépannage, installation, recherche de fuite, débouchage. Intervention rapide depuis Perpignan. Devis gratuit.",
    heroTagline: "Votre plombier certifié à Rivesaltes",
    localContext:
      "Rivesaltes dispose d'une zone industrielle active et d'un tissu résidentiel varié. La commune accueille également des caves viticoles et des exploitations agricoles avec des besoins plomberies spécifiques.",
    mainServices: ["Plomberie sanitaire", "Installation sanitaire", "Dépannage", "Chauffe-eau"],
    neighborhoods: ["Centre historique", "Zone industrielle", "Les Vignes", "Quartier Neuf"],
    nearbyCity: "Salses-le-Château",
    nearbyCitySlug: "salses-le-chateau",
    testimonial: {
      text: "Installation sanitaire complète de notre local commercial à Rivesaltes. Travail professionnel, respect des délais et du budget. Le Plombier du 66 est notre plombier de référence.",
      author: "Marc T.",
      service: "Plomberie sanitaire",
    },
    faq: [
      {
        question: "Intervenez-vous dans la zone industrielle de Rivesaltes ?",
        answer: "Oui, nous intervenons régulièrement dans la zone industrielle de Rivesaltes pour des installations tertiaires, des dépannages et des contrats de maintenance.",
      },
      {
        question: "Gérez-vous les installations pour les caves viticoles ?",
        answer: "Oui, nous avons une expérience spécifique dans le plombier des caves viticoles et exploitations agricoles : armoires plomberies, éclairage industriel, alimentation des équipements de vinification.",
      },
    ],
  },
  {
    slug: "le-boulou",
    name: "Le Boulou",
    postalCode: "66160",
    department: "Pyrénées-Orientales",
    population: "5 500",
    distance: "22 km",
    interventionTime: "30 min",
    description:
      "Porte d'entrée des Pyrénées et ville thermale, Le Boulou est un carrefour entre la plaine du Roussillon et les Albères. Avec son activité touristique et sa zone commerciale, les besoins plomberies y sont diversifiés.",
    metaTitle: "Plombier Le Boulou 66160 – Intervention Rapide | Le Plombier du 66",
    metaDescription:
      "Plombier certifié au Boulou (66160). Installation, dépannage, recherche de fuite, rénovation salle de bain. Intervention depuis Perpignan. Devis gratuit.",
    heroTagline: "Plombier au Boulou – Du Roussillon aux Albères",
    localContext:
      "Le Boulou est une commune dynamique avec un important flux touristique (thermes, autoroute A9) et une zone commerciale active. La région bénéficie d'un fort ensoleillement, idéal pour les rénovation salle de bain.",
    mainServices: ["Débouchage de canalisations", "Installation sanitaire", "Débouchage", "Éclairage LED"],
    neighborhoods: ["Centre thermal", "Zone commerciale", "Les Albères", "Mas Dieu"],
    nearbyCity: "Argelès-sur-Mer",
    nearbyCitySlug: "argeles-sur-mer",
    testimonial: {
      text: "Installation de 8 rénovation salle de bain sur ma maison au Boulou. Excellent conseil, installation soignée et démarches administratives gérées par Le Plombier du 66. Production conforme aux prévisions.",
      author: "Isabelle C.",
      service: "Débouchage de canalisations",
    },
    faq: [
      {
        question: "Les rénovation salle de bain sont-ils rentables au Boulou ?",
        answer: "Oui, Le Boulou bénéficie d'un ensoleillement exceptionnel (2 600h/an). Le retour sur investissement est de 8 à 11 ans, avec une durée de vie des panneaux de 25 à 30 ans.",
      },
      {
        question: "Intervenez-vous pour les établissements thermaux ?",
        answer: "Oui, nous avons l'expérience des installations plomberies dans les établissements de soins et hôtels, avec le respect des normes ERP spécifiques.",
      },
    ],
  },
  {
    slug: "argeles-sur-mer",
    name: "Argelès-sur-Mer",
    postalCode: "66700",
    department: "Pyrénées-Orientales",
    population: "11 000",
    distance: "22 km",
    interventionTime: "30 min",
    description:
      "Capitale européenne du camping et station balnéaire emblématique de la Côte Vermeille, Argelès-sur-Mer présente une forte saisonnalité. Résidences, campings, hôtels et commerces nécessitent une plomberie fiable et conforme.",
    metaTitle: "Plombier Argelès-sur-Mer 66700 – Devis Gratuit | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Argelès-sur-Mer (66700). Installation, dépannage, recherche de fuite, débouchage. Intervention rapide. Devis gratuit.",
    heroTagline: "Votre plombier à Argelès-sur-Mer – Côte Vermeille",
    localContext:
      "Argelès-sur-Mer est la capitale européenne du camping avec plus de 50 campings. La commune accueille également de nombreuses résidences secondaires et hôtels nécessitant des installations plomberies conformes aux normes ERP.",
    mainServices: ["Plomberie sanitaire", "Débouchage ERP", "Recherche de fuite", "Installation sanitaire"],
    neighborhoods: ["Argelès-Plage", "Argelès-Village", "Le Racou", "Les Pins"],
    nearbyCity: "Collioure",
    nearbyCitySlug: "collioure",
    testimonial: {
      text: "Mise aux normes plomberies de notre camping à Argelès. Le Plombier du 66 a géré l'ensemble du projet avec professionnalisme : audit, devis, travaux et rapport de conformité. Parfait !",
      author: "Famille Durand",
      service: "Débouchage ERP",
    },
    faq: [
      {
        question: "Intervenez-vous pour les campings à Argelès-sur-Mer ?",
        answer: "Oui, nous avons une expertise spécifique dans le plombier des campings : branchements individuels, tableaux généraux, éclairage extérieur, bornes IRVE pour camping-cars.",
      },
      {
        question: "Proposez-vous des contrats de maintenance pour les établissements touristiques ?",
        answer: "Oui, nous proposons des contrats de maintenance annuels avec visites préventives avant la saison estivale et intervention prioritaire en cas de panne.",
      },
    ],
  },
  {
    slug: "collioure",
    name: "Collioure",
    postalCode: "66190",
    department: "Pyrénées-Orientales",
    population: "3 000",
    distance: "28 km",
    interventionTime: "35 min",
    description:
      "Village de pêcheurs devenu cité des peintres, Collioure est un joyau de la Côte Vermeille. Son architecture ancienne et ses nombreux commerces touristiques nécessitent une expertise plomberie adaptée aux bâtiments historiques.",
    metaTitle: "Plombier Collioure 66190 – Bâtiments Anciens | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Collioure (66190). Rénovation plomberie, bâtiments anciens, recherche de fuite, éclairage LED. Devis gratuit.",
    heroTagline: "Plombier à Collioure – Expert rénovation et bâtiments anciens",
    localContext:
      "Collioure est classée parmi les plus beaux villages de France. Son patrimoine architectural exige une approche soignée pour les travaux plomberies, avec une expertise dans la rénovation de bâtiments anciens et classés.",
    mainServices: ["Rénovation plomberie", "Éclairage LED", "Débouchage", "Installation tertiaire"],
    neighborhoods: ["Le Mouré", "Saint-Vincent", "La Balette", "Port d'Avall"],
    nearbyCity: "Argelès-sur-Mer",
    nearbyCitySlug: "argeles-sur-mer",
    testimonial: {
      text: "Rénovation complète de le plombier de notre maison ancienne à Collioure. Le Plombier du 66 a su travailler avec soin dans ce bâtiment historique. Résultat impeccable et conforme.",
      author: "Antoine L.",
      service: "Rénovation plomberie",
    },
    faq: [
      {
        question: "Avez-vous l'expérience des bâtiments anciens à Collioure ?",
        answer: "Oui, nous intervenons régulièrement dans des maisons et commerces anciens à Collioure. Nous maîtrisons les contraintes des bâtiments historiques : passage de câbles discret, respect des structures.",
      },
      {
        question: "Peut-on installer des rénovation salle de bain à Collioure ?",
        answer: "Cela dépend des contraintes architecturales et du PLU. Nous étudions la faisabilité au cas par cas, en tenant compte des règles d'urbanisme locales.",
      },
    ],
  },
  {
    slug: "thuir",
    name: "Thuir",
    postalCode: "66300",
    department: "Pyrénées-Orientales",
    population: "7 500",
    distance: "15 km",
    interventionTime: "20 min",
    description:
      "Capitale des vins doux naturels et du Byrrh, Thuir est une commune viticole et résidentielle du Roussillon. Son tissu économique mêle caves viticoles, commerces et habitat résidentiel.",
    metaTitle: "Plombier Thuir 66300 – Devis Gratuit | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Thuir (66300). Installation, dépannage, chauffe-eau, rénovation salle de bain. Intervention rapide. Devis gratuit.",
    heroTagline: "Votre plombier à Thuir – Roussillon viticole",
    localContext:
      "Thuir abrite les célèbres caves Byrrh et de nombreux domaines viticoles. La commune dispose également d'un tissu résidentiel dense et d'une zone commerciale active.",
    mainServices: ["Installation sanitaire", "Débouchage de canalisations", "Chauffe-eau", "Éclairage LED"],
    neighborhoods: ["Centre historique", "Les Aspres", "Mas Guiter", "Zone commerciale"],
    nearbyCity: "Perpignan",
    nearbyCitySlug: "perpignan",
    testimonial: {
      text: "Installation de rénovation salle de bain sur notre domaine viticole à Thuir. Le Plombier du 66 a parfaitement géré le projet, de l'étude de faisabilité au raccordement Enedis. Très professionnel.",
      author: "Domaine Mas Guiter",
      service: "Débouchage de canalisations",
    },
    faq: [
      {
        question: "Intervenez-vous pour les caves viticoles à Thuir ?",
        answer: "Oui, nous avons une expertise dans le plombier des caves viticoles : alimentation des équipements de vinification, éclairage des chais, armoires plomberies industrielles.",
      },
    ],
  },
  {
    slug: "elne",
    name: "Elne",
    postalCode: "66200",
    department: "Pyrénées-Orientales",
    population: "8 500",
    distance: "15 km",
    interventionTime: "20 min",
    description:
      "Ancienne capitale du Roussillon, Elne conserve un riche patrimoine historique avec sa cathédrale et son cloître. Commune résidentielle dynamique, elle accueille de nombreuses familles et entreprises.",
    metaTitle: "Plombier Elne 66200 – Intervention Rapide | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Elne (66200). Installation, dépannage, recherche de fuite, débouchage. Intervention rapide depuis Perpignan. Devis gratuit.",
    heroTagline: "Plombier à Elne – Ancienne capitale du Roussillon",
    localContext:
      "Elne est une commune résidentielle en développement, avec de nombreux lotissements récents et un centre historique dense. Sa position entre Perpignan et la côte en fait un lieu de vie prisé.",
    mainServices: ["Installation neuve", "Recherche de fuite", "Chauffe-eau", "Débouchage"],
    neighborhoods: ["Centre historique", "Les Oliviers", "Mas Llaro", "La Plaine"],
    nearbyCity: "Canet-en-Roussillon",
    nearbyCitySlug: "canet-en-roussillon",
    testimonial: {
      text: "Installation d'une borne de recharge IRVE dans mon garage à Elne. Service rapide, propre et efficace. Les démarches pour l'aide CEE ont été gérées par Le Plombier du 66. Parfait !",
      author: "Sylvie B.",
      service: "Recherche de fuite",
    },
    faq: [
      {
        question: "Quel est le délai d'intervention à Elne ?",
        answer: "Elne est à 15 km de Perpignan. Nous intervenons en urgence sous 20 minutes. Pour les travaux planifiés, nous nous adaptons à votre calendrier.",
      },
    ],
  },
  {
    slug: "prades",
    name: "Prades",
    postalCode: "66500",
    department: "Pyrénées-Orientales",
    population: "6 200",
    distance: "45 km",
    interventionTime: "50 min",
    description:
      "Capitale du Conflent au pied du Canigou, Prades est une ville de montagne avec un riche patrimoine. Son éloignement relatif de Perpignan ne nous empêche pas d'y intervenir pour tous vos travaux plomberies.",
    metaTitle: "Plombier Prades 66500 – Conflent | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Prades (66500). Installation, dépannage, recherche de fuite, rénovation salle de bain. Intervention dans le Conflent. Devis gratuit.",
    heroTagline: "Plombier à Prades – Conflent et piémont du Canigou",
    localContext:
      "Prades est le chef-lieu du Conflent, une région montagneuse au pied du Canigou. Les maisons de montagne et les bâtiments anciens nécessitent souvent des mises en conformité et des rénovations plomberies.",
    mainServices: ["Rénovation plomberie", "Débouchage", "Débouchage de canalisations", "Chauffe-eau"],
    neighborhoods: ["Centre-ville", "Quartier Saint-Pierre", "Les Hameaux", "Mas Banet"],
    nearbyCity: "Perpignan",
    nearbyCitySlug: "perpignan",
    testimonial: {
      text: "Rénovation plomberie complète de notre maison de village à Prades. Malgré la distance, Le Plombier du 66 a été réactif et professionnel. Travail de qualité, je recommande.",
      author: "Bernard F.",
      service: "Rénovation plomberie",
    },
    faq: [
      {
        question: "Intervenez-vous dans le Conflent malgré la distance ?",
        answer: "Oui, nous intervenons à Prades et dans tout le Conflent. Pour les urgences, le délai est d'environ 50 minutes. Pour les travaux planifiés, nous organisons les interventions pour optimiser les déplacements.",
      },
    ],
  },
  {
    slug: "saint-cyprien",
    name: "Saint-Cyprien",
    postalCode: "66750",
    department: "Pyrénées-Orientales",
    population: "11 000",
    distance: "18 km",
    interventionTime: "25 min",
    description:
      "Station balnéaire moderne avec son port de plaisance et ses nombreuses résidences, Saint-Cyprien est l'une des communes les plus dynamiques du littoral catalan. Résidences secondaires, hôtels et commerces y sont nombreux.",
    metaTitle: "Plombier Saint-Cyprien 66750 – Devis Gratuit | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Saint-Cyprien (66750). Installation, dépannage, recherche de fuite, débouchage. Intervention rapide. Devis gratuit.",
    heroTagline: "Plombier à Saint-Cyprien – Port de plaisance et littoral",
    localContext:
      "Saint-Cyprien dispose d'un important parc de résidences secondaires et d'une activité touristique intense. Le port de plaisance et les nombreux commerces génèrent des besoins plomberies spécifiques.",
    mainServices: ["Installation sanitaire", "Recherche de fuite", "Débouchage", "Éclairage LED"],
    neighborhoods: ["Saint-Cyprien-Plage", "Saint-Cyprien-Village", "Le Port", "Les Capellans"],
    nearbyCity: "Canet-en-Roussillon",
    nearbyCitySlug: "canet-en-roussillon",
    testimonial: {
      text: "Installation sanitaire complète de notre appartement à Saint-Cyprien-Plage. Travail propre, rapide et conforme. Le Plombier du 66 a géré le Assurance sans problème. Merci !",
      author: "Christophe V.",
      service: "Installation sanitaire",
    },
    faq: [
      {
        question: "Intervenez-vous pour les résidences secondaires à Saint-Cyprien ?",
        answer: "Oui, nous intervenons régulièrement pour les propriétaires de résidences secondaires à Saint-Cyprien : recherche de fuite, installation de bornes IRVE, domotique.",
      },
    ],
  },
  {
    slug: "perpignan",
    name: "Perpignan",
    postalCode: "66000",
    department: "Pyrénées-Orientales",
    population: "123 000",
    distance: "0 km",
    interventionTime: "< 1h",
    description:
      "Capitale de la Catalogne française, Perpignan est le cœur de notre zone d'intervention. Avec ses quartiers historiques, ses zones résidentielles et son tissu économique dense, nous y réalisons la majorité de nos interventions.",
    metaTitle: "Plombier Perpignan 66000 – Intervention Rapide 7j/7 | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Perpignan (66000). Installation, dépannage urgence, chauffe-eau, débouchage, rénovation salle de bain. Devis gratuit 24h.",
    heroTagline: "Votre plombier à Perpignan – Capital de la Catalogne française",
    localContext:
      "Perpignan est la préfecture des Pyrénées-Orientales avec une grande diversité de besoins plomberies : logements anciens du centre historique, zones résidentielles pavillonnaires, zones industrielles et commerciales.",
    mainServices: ["Tous services", "Dépannage urgence", "Installation sanitaire", "Débouchage"],
    neighborhoods: ["Centre historique", "Saint-Mathieu", "Moulin à Vent", "Bas-Vernet", "Saint-Gaudérique", "Moyen-Vernet"],
    nearbyCity: "Saint-Estève",
    nearbyCitySlug: "saint-esteve",
    testimonial: {
      text: "Dépannage en urgence un dimanche soir à Perpignan. Le plombier est arrivé en 45 minutes, a identifié le problème rapidement et tout a été réparé en 2 heures. Excellent service !",
      author: "Laurence P.",
      service: "Dépannage d'urgence",
    },
    faq: [
      {
        question: "Dans quels quartiers de Perpignan intervenez-vous ?",
        answer: "Nous intervenons dans tous les quartiers de Perpignan : centre historique, Saint-Mathieu, Moulin à Vent, Bas-Vernet, Moyen-Vernet, Saint-Gaudérique, et toutes les zones résidentielles et industrielles.",
      },
      {
        question: "Quel est votre délai d'intervention à Perpignan ?",
        answer: "À Perpignan, notre délai d'intervention en urgence est inférieur à 1 heure. Pour les travaux planifiés, nous nous adaptons à votre calendrier.",
      },
    ],
  },
  {
    slug: "pia",
    name: "Pia",
    postalCode: "66380",
    department: "Pyrénées-Orientales",
    population: "7 000",
    distance: "8 km",
    interventionTime: "15 min",
    description:
      "Commune résidentielle proche de Perpignan, Pia connaît un développement rapide avec de nombreux lotissements. Sa zone commerciale et industrielle génère également des besoins en plomberie professionnelle.",
    metaTitle: "Plombier Pia 66380 – Intervention Rapide | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Pia (66380). Installation neuve, chauffe-eau, dépannage, débouchage. Intervention rapide. Devis gratuit.",
    heroTagline: "Plombier à Pia – Commune résidentielle dynamique",
    localContext:
      "Pia est une commune en forte croissance avec de nombreux lotissements récents. La zone d'activités de Pia accueille des entreprises avec des besoins en plomberie professionnelle.",
    mainServices: ["Installation neuve", "Chauffe-eau", "Recherche de fuite", "Débouchage de canalisations"],
    neighborhoods: ["Centre-ville", "Les Aspres", "Zone d'activités", "Mas Guiter"],
    nearbyCity: "Rivesaltes",
    nearbyCitySlug: "rivesaltes",
    testimonial: {
      text: "Installation sanitaire complète de notre maison neuve à Pia. Le Plombier du 66 a été présent à chaque étape du chantier, du câblage au Assurance. Travail impeccable !",
      author: "Famille Moreno",
      service: "Installation neuve",
    },
    faq: [
      {
        question: "Intervenez-vous dans la zone d'activités de Pia ?",
        answer: "Oui, nous intervenons régulièrement dans la zone d'activités de Pia pour des installations tertiaires, des dépannages et des contrats de maintenance.",
      },
    ],
  },
  {
    slug: "banyuls-sur-mer",
    name: "Banyuls-sur-Mer",
    postalCode: "66650",
    department: "Pyrénées-Orientales",
    population: "5 000",
    distance: "35 km",
    interventionTime: "45 min",
    description:
      "Perle de la Côte Vermeille, Banyuls-sur-Mer est connue pour ses vins doux naturels et sa réserve marine. Cette commune pittoresque nécessite une expertise plomberie adaptée aux bâtiments anciens et à l'environnement marin.",
    metaTitle: "Plombier Banyuls-sur-Mer 66650 – Côte Vermeille | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Banyuls-sur-Mer (66650). Installation, rénovation, recherche de fuite. Expertise bâtiments anciens. Devis gratuit.",
    heroTagline: "Plombier à Banyuls-sur-Mer – Côte Vermeille",
    localContext:
      "Banyuls-sur-Mer est une commune viticole et touristique avec de nombreuses maisons anciennes et des commerces. La proximité de la mer impose des contraintes spécifiques pour les installations plomberies.",
    mainServices: ["Rénovation plomberie", "Débouchage", "Éclairage LED", "Installation tertiaire"],
    neighborhoods: ["Centre-ville", "Le Port", "Les Elmes", "Cosprons"],
    nearbyCity: "Collioure",
    nearbyCitySlug: "collioure",
    testimonial: {
      text: "Rénovation plomberie de notre maison de village à Banyuls. Le Plombier du 66 a su travailler avec soin dans ce bâtiment ancien proche de la mer. Résultat parfait.",
      author: "Michel D.",
      service: "Rénovation plomberie",
    },
    faq: [
      {
        question: "Quelles précautions pour les installations en bord de mer à Banyuls ?",
        answer: "En milieu marin, nous utilisons des matériaux résistants à la corrosion (inox, IP élevé) et des protections renforcées contre l'humidité et le sel. C'est essentiel pour la durabilité des installations.",
      },
    ],
  },
  {
    slug: "ceret",
    name: "Céret",
    postalCode: "66400",
    department: "Pyrénées-Orientales",
    population: "7 800",
    distance: "30 km",
    interventionTime: "40 min",
    description:
      "Capitale des cerises et cité cubiste, Céret est une ville d'art et d'histoire au cœur du Vallespir. Son musée d'art moderne et ses nombreux commerces en font un pôle culturel et économique important.",
    metaTitle: "Plombier Céret 66400 – Vallespir | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Céret (66400). Installation, dépannage, recherche de fuite, rénovation salle de bain. Intervention dans le Vallespir. Devis gratuit.",
    heroTagline: "Plombier à Céret – Cité cubiste du Vallespir",
    localContext:
      "Céret est le chef-lieu du Vallespir, une région verdoyante au pied des Pyrénées. La commune accueille de nombreux artistes et touristes, avec un tissu commercial et résidentiel varié.",
    mainServices: ["Installation sanitaire", "Débouchage de canalisations", "Débouchage", "Éclairage LED"],
    neighborhoods: ["Centre historique", "Quartier des Capucins", "Les Pins", "Mas Dieu"],
    nearbyCity: "Le Boulou",
    nearbyCitySlug: "le-boulou",
    testimonial: {
      text: "Installation de rénovation salle de bain sur notre maison à Céret. Excellent ensoleillement, retour sur investissement très rapide. Le Plombier du 66 a tout géré avec professionnalisme.",
      author: "Hélène M.",
      service: "Débouchage de canalisations",
    },
    faq: [
      {
        question: "Intervenez-vous dans tout le Vallespir ?",
        answer: "Oui, nous intervenons à Céret et dans tout le Vallespir : Amélie-les-Bains, Arles-sur-Tech, Prats-de-Mollo. Le délai d'intervention est adapté à la distance.",
      },
    ],
  },
  {
    slug: "villelongue-de-la-salanque",
    name: "Villelongue-de-la-Salanque",
    postalCode: "66410",
    department: "Pyrénées-Orientales",
    population: "4 500",
    distance: "20 km",
    interventionTime: "25 min",
    description:
      "Commune résidentielle de la Salanque, Villelongue-de-la-Salanque est un village en développement avec de nombreuses constructions récentes. Sa proximité avec la mer et Perpignan en fait un lieu de vie attractif.",
    metaTitle: "Plombier Villelongue-de-la-Salanque 66410 | Le Plombier du 66",
    metaDescription:
      "Plombier certifié à Villelongue-de-la-Salanque (66410). Installation, chauffe-eau, débouchage. Intervention rapide. Devis gratuit.",
    heroTagline: "Plombier à Villelongue-de-la-Salanque",
    localContext:
      "Villelongue-de-la-Salanque est une commune résidentielle en développement avec de nombreux lotissements récents. Sa position dans la plaine de la Salanque en fait un lieu idéal pour les rénovation salle de bain.",
    mainServices: ["Installation neuve", "Débouchage de canalisations", "Chauffe-eau", "Recherche de fuite"],
    neighborhoods: ["Centre-village", "Les Vignes", "Mas Neuf", "La Salanque"],
    nearbyCity: "Rivesaltes",
    nearbyCitySlug: "rivesaltes",
    testimonial: {
      text: "Remplacement du chauffe-eau de notre maison à Villelongue. Intervention rapide, travail propre et tarif honnête. Le Plombier du 66 est notre plombier de confiance.",
      author: "Patrick R.",
      service: "Chauffe-eau",
    },
    faq: [
      {
        question: "Intervenez-vous dans toute la Salanque ?",
        answer: "Oui, nous intervenons dans toute la plaine de la Salanque : Villelongue, Saint-Laurent-de-la-Salanque, Torreilles, Le Barcarès. Délai d'intervention adapté.",
      },
    ],
  },
];

export const getCityBySlug = (slug: string) =>
  cities.find((c) => c.slug === slug);

// Villes principales pour la navigation et la section zone
export const mainCities = cities.filter((c) =>
  ["perpignan", "canet-en-roussillon", "saint-esteve", "argeles-sur-mer", "saint-cyprien", "elne", "rivesaltes", "thuir"].includes(c.slug)
);
