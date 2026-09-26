import { Story } from '../types/universe';

// Primary stories from the brief and poetic life moments
export const PIVOTAL_STORIES: Omit<Story, 'id'>[] = [
  {
    text: "Quelque part dans l'univers, quelqu'un vient de naître.",
    category: 'naissance',
    categoryLabel: 'Naissance',
    isPivotal: true,
  },
  {
    text: "Quelqu'un vient de tomber amoureux.",
    category: 'amour',
    categoryLabel: 'Amour',
    isPivotal: true,
  },
  {
    text: "Quelqu'un vient de perdre une personne qu'il aimait.",
    category: 'perte',
    categoryLabel: 'Adieu',
    isPivotal: true,
  },
  {
    text: "Quelqu'un regarde les étoiles en se demandant s'il est seul.",
    category: 'solitude',
    categoryLabel: 'Solitude',
    isPivotal: true,
  },
  {
    text: "Quelqu'un vient de réaliser qu'il veut changer sa vie.",
    category: 'découverte',
    categoryLabel: 'Éveil',
    isPivotal: true,
  },
  {
    text: "Quelqu'un vient de dire au revoir sans savoir que c'était la dernière fois.",
    category: 'perte',
    categoryLabel: 'Mémoire',
    isPivotal: true,
  },
  {
    text: "Quelqu'un vient de rencontrer la personne qui changera sa vie.",
    category: 'amour',
    categoryLabel: 'Rencontre',
    isPivotal: true,
  },
  {
    text: "Quelqu'un est heureux sans savoir que ce moment deviendra un souvenir.",
    category: 'souvenirs',
    categoryLabel: 'Souvenir',
    isPivotal: true,
  },
  {
    text: "Quelqu'un pleure en silence.",
    category: 'solitude',
    categoryLabel: 'Secret',
    isPivotal: true,
  },
  {
    text: "Quelqu'un vient de réaliser qu'il est aimé.",
    category: 'amour',
    categoryLabel: 'Grâce',
    isPivotal: true,
  },
  {
    text: "Quelqu'un regarde le même ciel que toi.",
    category: 'solitude',
    categoryLabel: 'Connexion',
    isPivotal: true,
  },
  {
    text: "Quelqu'un a enfin pardonné après dix ans de rancœur.",
    category: 'espoir',
    categoryLabel: 'Délivrance',
    isPivotal: true,
  },
  {
    text: "Quelqu'un a surmonté la peur d'être soi-même ce matin.",
    category: 'réussite',
    categoryLabel: 'Courage',
    isPivotal: true,
  },
  {
    text: "Quelqu'un vient de prononcer les mots qu'il gardait au fond du cœur depuis l'enfance.",
    category: 'découverte',
    categoryLabel: 'Vérité',
    isPivotal: true,
  },
  {
    text: "Quelqu'un a fermé un livre et sait qu'il ne verra plus jamais le monde de la même manière.",
    category: 'découverte',
    categoryLabel: 'Révélation',
    isPivotal: true,
  },
  {
    text: "Quelqu'un a osé tout quitter pour poursuivre son rêve d'enfant.",
    category: 'rêves',
    categoryLabel: 'Élan',
    isPivotal: true,
  },
  {
    text: "Quelqu'un a regardé la mer et a senti une paix infinie envahir son âme.",
    category: 'souvenirs',
    categoryLabel: 'Sérénité',
    isPivotal: true,
  },
  {
    text: "Quelqu'un a sauvé une vie aujourd'hui, sans que personne ne le sache.",
    category: 'réussite',
    categoryLabel: 'Héroïsme discret',
    isPivotal: true,
  },
  {
    text: "Deux personnes regardent le même ciel sans savoir qu'elles pensent l'une à l'autre.",
    category: 'amour',
    categoryLabel: 'Pensée partagée',
    isPivotal: true,
  },
  {
    text: "Ils avaient des vies différentes. Puis leurs trajectoires se sont croisées.",
    category: 'amour',
    categoryLabel: 'Trajectoires',
    isPivotal: true,
  },
  {
    text: "Elle est devenue son chez-soi.",
    category: 'amour',
    categoryLabel: 'Refuge',
    isPivotal: true,
  },
  {
    text: "Deux étoiles n'ont pas choisi de se rencontrer. Elles sont nées dans le même univers.",
    category: 'famille',
    categoryLabel: 'Origine',
    isPivotal: true,
  },
  {
    text: "Un parent regarde son enfant grandir sans réaliser à quelle vitesse le temps passe.",
    category: 'famille',
    categoryLabel: 'Temps qui passe',
    isPivotal: true,
  },
  {
    text: "Certaines personnes arrivent comme des inconnus et repartent comme une partie de nous.",
    category: 'amitié',
    categoryLabel: 'Empreinte',
    isPivotal: true,
  },
  {
    text: "Ils n'avaient rien en commun. C'est peut-être pour cela qu'ils sont devenus amis.",
    category: 'amitié',
    categoryLabel: 'Complémentarité',
    isPivotal: true,
  },
  {
    text: "Deux étoiles peuvent s'éloigner sans cesser d'avoir partagé le même ciel.",
    category: 'séparation',
    categoryLabel: 'Ciel partagé',
    isPivotal: true,
  },
  {
    text: "Ils sont devenus des inconnus qui se connaissent très bien.",
    category: 'séparation',
    categoryLabel: 'Inconnus familiers',
    isPivotal: true,
  },
  {
    text: "Leur histoire est terminée. Leur lumière, elle, continue de voyager.",
    category: 'séparation',
    categoryLabel: 'Lumière éternelle',
    isPivotal: true,
  },
  {
    text: "Certaines relations ne meurent pas. Elles deviennent simplement des souvenirs.",
    category: 'changement',
    categoryLabel: 'Mémoire douce',
    isPivotal: true,
  },
  {
    text: "Parfois, aimer quelqu'un signifie accepter que sa trajectoire ne soit plus la nôtre.",
    category: 'changement',
    categoryLabel: 'Acceptation',
    isPivotal: true,
  },
  {
    text: "Deux inconnus viennent de se croiser. Aucun des deux ne saura jamais à quel point l'autre était important.",
    category: 'inconnu',
    categoryLabel: 'Croisement fugace',
    isPivotal: true,
  },
  {
    text: "Deux personnes vivent des vies complètement différentes sous le même ciel.",
    category: 'inconnu',
    categoryLabel: 'Vies parallèles',
    isPivotal: true,
  },
  {
    text: "Quelque part, quelqu'un que tu ne rencontreras jamais est en train de vivre une journée qui ressemble à la tienne.",
    category: 'inconnu',
    categoryLabel: 'Écho universel',
    isPivotal: true,
  }
];

export const ORDINARY_STORIES: Omit<Story, 'id'>[] = [
  {
    text: "Ils s'aiment. Pour l'instant, cela leur suffit.",
    category: 'amour',
    categoryLabel: 'Simplicité',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un vient de trouver une personne avec qui le silence ne semble plus vide.",
    category: 'amour',
    categoryLabel: 'Silence partagé',
    isOrdinary: true,
  },
  {
    text: "Ils ne savaient pas combien de temps cela durerait. Ils ont choisi de vivre le moment.",
    category: 'amour',
    categoryLabel: 'L’instant présent',
    isOrdinary: true,
  },
  {
    text: "Il sera toujours son petit garçon, même lorsqu'il sera devenu grand.",
    category: 'famille',
    categoryLabel: 'Tendresse infinie',
    isOrdinary: true,
  },
  {
    text: "Ils ont grandi sous le même ciel.",
    category: 'famille',
    categoryLabel: 'Même ciel',
    isOrdinary: true,
  },
  {
    text: "Deux vies différentes, une même origine.",
    category: 'famille',
    categoryLabel: 'Même racine',
    isOrdinary: true,
  },
  {
    text: "Ils se sont rencontrés par hasard. Leur amitié n'était pas prévue.",
    category: 'amitié',
    categoryLabel: 'Hasard heureux',
    isOrdinary: true,
  },
  {
    text: "Ils riront de cette journée pendant encore des années.",
    category: 'amitié',
    categoryLabel: 'Rires d’avenir',
    isOrdinary: true,
  },
  {
    text: "Ils s'aimaient encore. Ils ne savaient simplement plus comment rester ensemble.",
    category: 'séparation',
    categoryLabel: 'Adieu tendre',
    isOrdinary: true,
  },
  {
    text: "Ils ne se parlent plus. Mais chacun se souvient encore de l'autre.",
    category: 'séparation',
    categoryLabel: 'Souvenir secret',
    isOrdinary: true,
  },
  {
    text: "Ils étaient deux étoiles proches. Le temps a simplement agrandi la distance.",
    category: 'changement',
    categoryLabel: 'Temps et distance',
    isOrdinary: true,
  },
  {
    text: "Ils ne se sont pas perdus en une journée. Ils se sont éloignés lentement.",
    category: 'changement',
    categoryLabel: 'Éloignement doux',
    isOrdinary: true,
  },
  {
    text: "Ils ont grandi dans des directions différentes.",
    category: 'changement',
    categoryLabel: 'Trajectoires',
    isOrdinary: true,
  },
  {
    text: "Ils étaient importants l'un pour l'autre. Ils le sont peut-être encore.",
    category: 'changement',
    categoryLabel: 'Lien silencieux',
    isOrdinary: true,
  },
  {
    text: "Ils se sont assis côte à côte sans jamais se parler.",
    category: 'inconnu',
    categoryLabel: 'Silence partagé',
    isOrdinary: true,
  },
  {
    text: "Ils ne se connaissent pas. Pourtant, leurs histoires se touchent.",
    category: 'inconnu',
    categoryLabel: 'Frôlement',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un vient de boire son premier café de la journée.",
    category: 'ordinaire',
    categoryLabel: 'Matin',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un vient de rire pour une raison complètement idiote.",
    category: 'ordinaire',
    categoryLabel: 'Joie simple',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un regarde la pluie par sa fenêtre.",
    category: 'ordinaire',
    categoryLabel: 'Contemplation',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un est en retard.",
    category: 'ordinaire',
    categoryLabel: 'Course',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un vient de retrouver une vieille photo.",
    category: 'ordinaire',
    categoryLabel: 'Retrouvailles',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un pense à quelqu'un qu'il n'a pas vu depuis longtemps.",
    category: 'ordinaire',
    categoryLabel: 'Nostalgie',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un attend que son thé refroidisse sur la table de chevet.",
    category: 'ordinaire',
    categoryLabel: 'Attente',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un fredonne une chanson dont il a oublié le titre.",
    category: 'ordinaire',
    categoryLabel: 'Écho',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un hésite devant les étals d'une librairie de quartier.",
    category: 'ordinaire',
    categoryLabel: 'Détour',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un allume une veilleuse avant de s'endormir.",
    category: 'ordinaire',
    categoryLabel: 'Crépuscule',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un nettoie la buée sur la vitre d'un train en marche.",
    category: 'ordinaire',
    categoryLabel: 'Trajet',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un vient de sentir l'odeur du pain chaud dans une ruelle fraîche.",
    category: 'ordinaire',
    categoryLabel: 'Sensation',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un lace ses chaussures avant de partir marcher dans la brume.",
    category: 'ordinaire',
    categoryLabel: 'Départ',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un a arrosé une plante verte qui commençait à flétrir.",
    category: 'ordinaire',
    categoryLabel: 'Attention',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un sourit en voyant un chien courir après une feuille morte.",
    category: 'ordinaire',
    categoryLabel: 'Éphémère',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un replie soigneusement un vieux ticket de cinéma.",
    category: 'ordinaire',
    categoryLabel: 'Traces',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un écoute le bruit du vent dans les branches au coucher du soleil.",
    category: 'ordinaire',
    categoryLabel: 'Silence',
    isOrdinary: true,
  },
  {
    text: "Quelqu'un s'est arrêté une seconde pour admirer les nuages.",
    category: 'ordinaire',
    categoryLabel: 'Ralentir',
    isOrdinary: true,
  }
];

export const SPARKLING_STORIES: Omit<Story, 'id'>[] = [
  {
    text: "Un jour, ils repenseront à cette époque avec nostalgie.",
    category: 'souvenirs',
    categoryLabel: 'Nostalgie douce',
  },
  {
    text: "Une fois, ces deux étoiles étaient inséparables.",
    category: 'séparation',
    categoryLabel: 'Inséparables autrefois',
  },
  {
    text: "Elles tournaient l'une autour de l'autre. Puis leurs trajectoires ont changé.",
    category: 'séparation',
    categoryLabel: 'Trajectoires',
  },
  {
    text: "Quelqu'un se remémore l'odeur de la maison de ses grands-parents en été.",
    category: 'souvenirs',
    categoryLabel: 'Mémoire',
  },
  {
    text: "Quelqu'un rouvre un cahier d'écolier aux pages jaunies par les années.",
    category: 'souvenirs',
    categoryLabel: 'Temps passé',
  },
  {
    text: "Quelqu'un revoit la lumière dorée d'une fin d'après-midi sur la plage avec ses amis.",
    category: 'souvenirs',
    categoryLabel: 'Nostalgie',
  },
  {
    text: "Quelqu'un écoute un vinyle rayé qui tournait lors de son premier slow.",
    category: 'souvenirs',
    categoryLabel: 'Mélodie',
  },
  {
    text: "Quelqu'un se rappelle une promesse faite sous un chêne centenaire.",
    category: 'souvenirs',
    categoryLabel: 'Serment',
  },
  {
    text: "Quelqu'un sourit en pensant à une gaffe commise il y a vingt ans.",
    category: 'souvenirs',
    categoryLabel: 'Légèreté',
  },
  {
    text: "Quelqu'un a retrouvé le parfum que portait son père.",
    category: 'souvenirs',
    categoryLabel: 'Présence',
  },
  {
    text: "Quelqu'un se souvient du premier jour où il a vu la neige tomber.",
    category: 'souvenirs',
    categoryLabel: 'Émerveillement',
  }
];

export interface BinaryStoryPair {
  idA: string;
  idB: string;
  storyA: Omit<Story, 'id' | 'companionStoryId'>;
  storyB: Omit<Story, 'id' | 'companionStoryId'>;
  relationType: 'harmonious' | 'diverging' | 'distant';
  orbitRadius?: number;
}

export const BINARY_STORY_PAIRS: BinaryStoryPair[] = [
  // 💔 Séparation — Étoiles doubles dont la trajectoire a changé ou s'éloigne
  {
    idA: 'bin-sep-1-a',
    idB: 'bin-sep-1-b',
    relationType: 'diverging',
    orbitRadius: 75,
    storyA: {
      text: "Elles tournaient l'une autour de l'autre. Puis leurs trajectoires ont changé.",
      category: 'séparation',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "Deux étoiles peuvent s'éloigner sans cesser d'avoir partagé le même ciel.",
      category: 'séparation',
      categoryLabel: 'Ciel partagé',
    },
  },
  {
    idA: 'bin-sep-2-a',
    idB: 'bin-sep-2-b',
    relationType: 'diverging',
    orbitRadius: 85,
    storyA: {
      text: "Ils s'aimaient encore. Ils ne savaient simplement plus comment rester ensemble.",
      category: 'séparation',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "Une fois, ces deux étoiles étaient inséparables.",
      category: 'séparation',
      categoryLabel: 'Souvenir',
    },
  },
  {
    idA: 'bin-sep-3-a',
    idB: 'bin-sep-3-b',
    relationType: 'diverging',
    orbitRadius: 80,
    storyA: {
      text: "Ils sont devenus des inconnus qui se connaissent très bien.",
      category: 'séparation',
      categoryLabel: 'Inconnus familiers',
    },
    storyB: {
      text: "Ils ne se parlent plus. Mais chacun se souvient encore de l'autre.",
      category: 'séparation',
      categoryLabel: 'Mémoire secrète',
    },
  },
  {
    idA: 'bin-sep-4-a',
    idB: 'bin-sep-4-b',
    relationType: 'diverging',
    orbitRadius: 90,
    storyA: {
      text: "Leur histoire est terminée.",
      category: 'séparation',
      categoryLabel: 'Fin d’un cycle',
    },
    storyB: {
      text: "Leur lumière, elle, continue de voyager.",
      category: 'séparation',
      categoryLabel: 'Lumière éternelle',
    },
  },
  {
    idA: 'bin-sep-5-a',
    idB: 'bin-sep-5-b',
    relationType: 'diverging',
    orbitRadius: 78,
    storyA: {
      text: "Deux personnes se sont aimées de tout leur cœur autrefois.",
      category: 'séparation',
      categoryLabel: 'Autrefois',
    },
    storyB: {
      text: "Aujourd'hui, elles se croisent sans oser se parler, mais avec une silencieuse gratitude.",
      category: 'séparation',
      categoryLabel: 'Gratitude',
    },
  },

  // 🕰️ Relations qui changent
  {
    idA: 'bin-chg-1-a',
    idB: 'bin-chg-1-b',
    relationType: 'distant',
    orbitRadius: 88,
    storyA: {
      text: "Ils étaient deux étoiles proches. Le temps a simplement agrandi la distance.",
      category: 'changement',
      categoryLabel: 'Temps & distance',
    },
    storyB: {
      text: "Ils ne se sont pas perdus en une journée. Ils se sont éloignés lentement.",
      category: 'changement',
      categoryLabel: 'Éloignement lent',
    },
  },
  {
    idA: 'bin-chg-2-a',
    idB: 'bin-chg-2-b',
    relationType: 'distant',
    orbitRadius: 95,
    storyA: {
      text: "Certaines relations ne meurent pas. Elles deviennent simplement des souvenirs.",
      category: 'changement',
      categoryLabel: 'Mémoire vivante',
    },
    storyB: {
      text: "Parfois, aimer quelqu'un signifie accepter que sa trajectoire ne soit plus la nôtre.",
      category: 'changement',
      categoryLabel: 'Trajectoire libre',
    },
  },
  {
    idA: 'bin-chg-3-a',
    idB: 'bin-chg-3-b',
    relationType: 'distant',
    orbitRadius: 82,
    storyA: {
      text: "Ils ont grandi dans des directions différentes.",
      category: 'changement',
      categoryLabel: 'Chemins différents',
    },
    storyB: {
      text: "Ils étaient importants l'un pour l'autre. Ils le sont peut-être encore.",
      category: 'changement',
      categoryLabel: 'Lien silencieux',
    },
  },

  // ❤️ Amour — Gravitation étroite et lumineuse
  {
    idA: 'bin-love-1-a',
    idB: 'bin-love-1-b',
    relationType: 'harmonious',
    orbitRadius: 42,
    storyA: {
      text: "Deux personnes viennent de se rencontrer. Elles ne savent pas encore qu'elles vont changer leurs vies.",
      category: 'amour',
      categoryLabel: 'Rencontre',
    },
    storyB: {
      text: "Quelqu'un vient de trouver une personne avec qui le silence ne semble plus vide.",
      category: 'amour',
      categoryLabel: 'Silence partagé',
    },
  },
  {
    idA: 'bin-love-2-a',
    idB: 'bin-love-2-b',
    relationType: 'harmonious',
    orbitRadius: 46,
    storyA: {
      text: "Deux personnes regardent le même ciel sans savoir qu'elles pensent l'une à l'autre.",
      category: 'amour',
      categoryLabel: 'Pensée céleste',
    },
    storyB: {
      text: "Elle est devenue son chez-soi.",
      category: 'amour',
      categoryLabel: 'Refuge',
    },
  },
  {
    idA: 'bin-love-3-a',
    idB: 'bin-love-3-b',
    relationType: 'harmonious',
    orbitRadius: 48,
    storyA: {
      text: "Ils avaient des vies différentes. Puis leurs trajectoires se sont croisées.",
      category: 'amour',
      categoryLabel: 'Croisement',
    },
    storyB: {
      text: "Ils ne savaient pas combien de temps cela durerait. Ils ont choisi de vivre le moment.",
      category: 'amour',
      categoryLabel: 'Vivre l’instant',
    },
  },
  {
    idA: 'bin-love-4-a',
    idB: 'bin-love-4-b',
    relationType: 'harmonious',
    orbitRadius: 38,
    storyA: {
      text: "Ils s'aiment. Pour l'instant, cela leur suffit.",
      category: 'amour',
      categoryLabel: 'Amour pur',
    },
    storyB: {
      text: "Deux regards qui se reconnaissent et s’apaisent dans la nuit cosmique.",
      category: 'amour',
      categoryLabel: 'Apaisement',
    },
  },
  {
    idA: 'bin-love-5-a',
    idB: 'bin-love-5-b',
    relationType: 'harmonious',
    orbitRadius: 44,
    storyA: {
      text: "Quelqu'un attend sous l'abri d'un arrêt de bus, le cœur battant à tout rompre.",
      category: 'amour',
      categoryLabel: 'Attente',
    },
    storyB: {
      text: "Quelqu'un court sous la pluie pour ne pas manquer leur tout premier regard.",
      category: 'amour',
      categoryLabel: 'Rendez-vous',
    },
  },

  // 👨👩👧 Famille — Racines communes et transmission
  {
    idA: 'bin-fam-1-a',
    idB: 'bin-fam-1-b',
    relationType: 'harmonious',
    orbitRadius: 46,
    storyA: {
      text: "Deux étoiles n'ont pas choisi de se rencontrer. Elles sont nées dans le même univers.",
      category: 'famille',
      categoryLabel: 'Même univers',
    },
    storyB: {
      text: "Deux vies différentes, une même origine.",
      category: 'famille',
      categoryLabel: 'Même origine',
    },
  },
  {
    idA: 'bin-fam-2-a',
    idB: 'bin-fam-2-b',
    relationType: 'harmonious',
    orbitRadius: 50,
    storyA: {
      text: "Un parent regarde son enfant grandir sans réaliser à quelle vitesse le temps passe.",
      category: 'famille',
      categoryLabel: 'Temps qui passe',
    },
    storyB: {
      text: "Il sera toujours son petit garçon, même lorsqu'il sera devenu grand.",
      category: 'famille',
      categoryLabel: 'Tendresse infinie',
    },
  },
  {
    idA: 'bin-fam-3-a',
    idB: 'bin-fam-3-b',
    relationType: 'harmonious',
    orbitRadius: 44,
    storyA: {
      text: "Ils ont grandi sous le même ciel.",
      category: 'famille',
      categoryLabel: 'Fratrie',
    },
    storyB: {
      text: "Ils seront le refuge inébranlable l'un de l'autre tout au long de leur vie.",
      category: 'famille',
      categoryLabel: 'Refuge',
    },
  },
  {
    idA: 'bin-fam-4-a',
    idB: 'bin-fam-4-b',
    relationType: 'harmonious',
    orbitRadius: 48,
    storyA: {
      text: "Une mère tient la main de son enfant qui apprend timidement à marcher.",
      category: 'famille',
      categoryLabel: 'Transmission',
    },
    storyB: {
      text: "Bien des années plus tard, l'enfant tiendra la sienne avec la même tendresse infinie.",
      category: 'famille',
      categoryLabel: 'Génération',
    },
  },

  // 🤝 Amitié — Complicité inattendue et serments
  {
    idA: 'bin-ami-1-a',
    idB: 'bin-ami-1-b',
    relationType: 'harmonious',
    orbitRadius: 48,
    storyA: {
      text: "Ils se sont rencontrés par hasard. Leur amitié n'était pas prévue.",
      category: 'amitié',
      categoryLabel: 'Hasard heureux',
    },
    storyB: {
      text: "Certaines personnes arrivent comme des inconnus et repartent comme une partie de nous.",
      category: 'amitié',
      categoryLabel: 'Partage',
    },
  },
  {
    idA: 'bin-ami-2-a',
    idB: 'bin-ami-2-b',
    relationType: 'harmonious',
    orbitRadius: 44,
    storyA: {
      text: "Ils n'avaient rien en commun. C'est peut-être pour cela qu'ils sont devenus amis.",
      category: 'amitié',
      categoryLabel: 'Complémentarité',
    },
    storyB: {
      text: "Ils riront de cette journée pendant encore des années.",
      category: 'amitié',
      categoryLabel: 'Rires d’avenir',
    },
  },
  {
    idA: 'bin-ami-3-a',
    idB: 'bin-ami-3-b',
    relationType: 'harmonious',
    orbitRadius: 46,
    storyA: {
      text: "Deux enfants se sont promis de ne jamais s'oublier devant le phare.",
      category: 'amitié',
      categoryLabel: 'Amitié fidèle',
    },
    storyB: {
      text: "Trente ans plus tard, malgré les tempêtes, ils partagent un éclat de rire intact.",
      category: 'amitié',
      categoryLabel: 'Fidélité',
    },
  },

  // 🌌 Deux inconnus — Frôlements dans l'immensité
  {
    idA: 'bin-inc-1-a',
    idB: 'bin-inc-1-b',
    relationType: 'distant',
    orbitRadius: 78,
    storyA: {
      text: "Deux inconnus viennent de se croiser. Aucun des deux ne saura jamais à quel point l'autre était important.",
      category: 'inconnu',
      categoryLabel: 'Croisement fugace',
    },
    storyB: {
      text: "Ils se sont assis côte à côte sans jamais se parler.",
      category: 'inconnu',
      categoryLabel: 'Silence partagé',
    },
  },
  {
    idA: 'bin-inc-2-a',
    idB: 'bin-inc-2-b',
    relationType: 'distant',
    orbitRadius: 85,
    storyA: {
      text: "Deux personnes vivent des vies complètement différentes sous le même ciel.",
      category: 'inconnu',
      categoryLabel: 'Vies parallèles',
    },
    storyB: {
      text: "Ils ne se connaissent pas. Pourtant, leurs histoires se touchent.",
      category: 'inconnu',
      categoryLabel: 'Frôlement de destins',
    },
  },
  {
    idA: 'bin-inc-3-a',
    idB: 'bin-inc-3-b',
    relationType: 'distant',
    orbitRadius: 82,
    storyA: {
      text: "Quelque part, quelqu'un que tu ne rencontreras jamais est en train de vivre une journée qui ressemble à la tienne.",
      category: 'inconnu',
      categoryLabel: 'Écho lointain',
    },
    storyB: {
      text: "Deux inconnus ont échangé un regard furtif sur un quai de gare bondé.",
      category: 'inconnu',
      categoryLabel: 'Regard furtif',
    },
  },
];

export const EPHEMERAL_TEXTS = {
  initial: "Certaines lumières ne restent pas éternellement.",
  afterglow: "Une personne peut disparaître. Ce qu'elle a laissé derrière elle continue de voyager.",
};

export const SHOOTING_STAR_STORIES: string[] = [
  "Quelqu'un vient de comprendre que c'était la dernière fois.",
  "Quelqu'un vient de réaliser que son enfance est terminée.",
  "Quelqu'un vient de retrouver une photo d'une époque qu'il ne retrouvera jamais.",
  "Deux inconnus viennent de se croiser pour la dernière fois. Ils ne le savent pas encore.",
  "Quelqu'un vient de regarder le coucher du soleil pour la dernière fois sans le savoir.",
  "Quelqu'un vient d'entendre une chanson qui le ramène dix ans en arrière.",
  "Quelqu'un vient de dire “à demain”.",
  "Quelqu'un vient de fermer une porte qu'il ne rouvrira jamais.",
  "Quelqu'un aimerait pouvoir revivre une seule journée.",
  "Quelqu'un vient de sourire à quelqu'un qu'il ne reverra jamais.",
  "Quelqu'un pense à une personne qu'il ne pourra plus appeler.",
  "Quelqu'un vient de comprendre que le moment est déjà devenu un souvenir.",
  "Un éclat de rire partagé sous une pluie d'été, avant que chacun ne prenne un train différent.",
  "Une dernière étreinte sur le quai d'une gare déserte.",
  "Une conversation à cœur ouvert au milieu de la nuit, que personne ne répétera jamais.",
];

export const NOSTALGIC_SHOOTING_STAR_STORIES: string[] = [
  "Tu te souviens de cet endroit ?",
  "Il y a des années, quelqu'un était heureux ici.",
  "Cette journée semblait ordinaire. Elle est devenue un souvenir.",
  "Tu ne savais pas que tu vivais un souvenir.",
  "Un jour, tu repenseras à aujourd'hui.",
];

export const MISSED_SHOOTING_STAR_TEXT = {
  line1: "Tu l'as manquée.",
  line2: "Comme nous manquons parfois certains moments.",
};

export const FINAL_SHOOTING_STAR_SEQUENCE = {
  starText: "Un jour, tout ce que tu vis aujourd'hui deviendra un souvenir.",
  thought1: "Alors regarde autour de toi.",
  thought2: "Tu es peut-être déjà en train de vivre un moment que tu regretteras de ne pas avoir davantage regardé.",
};

export const MILESTONES = {
  firstTier: {
    triggerCount: 3,
    line1: "Combien d'histoires crois-tu avoir traversées ?",
    line2: "Et combien ne verras-tu jamais ?",
  },
  secondTier: {
    triggerCount: 8,
    lines: [
      "Tu ne peux pas toutes les connaître.",
      "Personne ne le peut.",
      "Mais chacune existe.",
    ],
  },
};

export const ENDING_VERSES = [
  "Nous passons notre vie à chercher notre place dans l'univers.",
  "Peut-être oublions-nous simplement que nous en faisons déjà partie.",
  "Les étoiles sont les personnes. Les étoiles filantes sont les moments. Et nous sommes faits des deux.",
  "L'univers n'est pas seulement immense. Il est rempli d'existences. Et chacune d'elles ne dure qu'un instant.",
  "Et maintenant, quelqu'un vient de commencer à explorer.",
];

export const EARTH_REVELATION_SEQUENCE = ENDING_VERSES;

