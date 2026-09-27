import { Story } from '../types/universe';

export interface BinaryStoryPair {
  idA: string;
  idB: string;
  title: string;
  category: any;
  categoryLabel: string;
  storyA: Omit<Story, 'id' | 'companionStoryId'>;
  storyB: Omit<Story, 'id' | 'companionStoryId'>;
  sharedInsight?: string;
  relationType: 'harmonious' | 'diverging' | 'distant';
  orbitRadius?: number;
}

// ============================================================================
// ⭐ ÉTOILES SIMPLES — LES PERSONNES
// « Chaque étoile représente une personne. Elle reste dans l'univers. »
// ============================================================================

export const SINGLE_STAR_STORIES: Omit<Story, 'id'>[] = [
  // 🌱 Naissance et commencement
  {
    text: "Quelqu'un vient de naître.",
    category: 'naissance',
    categoryLabel: 'Naissance',
  },
  {
    text: "Quelqu'un vient de découvrir le monde pour la première fois.",
    category: 'naissance',
    categoryLabel: 'Commencement',
  },
  {
    text: "Quelqu'un vient de prendre son premier souffle.",
    category: 'naissance',
    categoryLabel: 'Premier souffle',
  },
  {
    text: "Quelqu'un vient de commencer une histoire dont il ignore encore la fin.",
    category: 'naissance',
    categoryLabel: 'Histoire commencée',
  },
  {
    text: "Quelqu'un vient de devenir parent.",
    category: 'famille',
    categoryLabel: 'Devenir parent',
  },
  {
    text: "Quelqu'un vient de réaliser qu'une nouvelle vie commence.",
    category: 'naissance',
    categoryLabel: 'Nouvelle vie',
  },

  // 🧒 Enfance
  {
    text: "Quelqu'un joue dehors sans savoir qu'un jour il regrettera cette simplicité.",
    category: 'enfance',
    categoryLabel: 'Enfance',
  },
  {
    text: "Quelqu'un vient de découvrir quelque chose qui lui semble merveilleux.",
    category: 'enfance',
    categoryLabel: 'Émerveillement',
  },
  {
    text: "Quelqu'un pense que l'été ne finira jamais.",
    category: 'enfance',
    categoryLabel: 'Été infini',
  },
  {
    text: "Quelqu'un vient de se faire son premier meilleur ami.",
    category: 'amitié',
    categoryLabel: 'Premier ami',
  },
  {
    text: "Quelqu'un rêve de devenir quelqu'un d'autre.",
    category: 'enfance',
    categoryLabel: 'Rêve',
  },
  {
    text: "Quelqu'un regarde le monde avec des yeux qui ne connaissent pas encore la peur.",
    category: 'enfance',
    categoryLabel: 'Innocence',
  },
  {
    text: "Quelqu'un vient de perdre sa première dent.",
    category: 'enfance',
    categoryLabel: 'Grandir',
  },
  {
    text: "Quelqu'un attend Noël avec impatience.",
    category: 'enfance',
    categoryLabel: 'Attente',
  },
  {
    text: "Quelqu'un vient de rentrer chez lui après une journée parfaite.",
    category: 'enfance',
    categoryLabel: 'Journée parfaite',
  },

  // 🌱 Grandir
  {
    text: "Quelqu'un commence à comprendre qu'il change.",
    category: 'grandir',
    categoryLabel: 'Changement',
  },
  {
    text: "Quelqu'un cherche encore qui il est.",
    category: 'grandir',
    categoryLabel: 'Quête de soi',
  },
  {
    text: "Quelqu'un se sent différent sans savoir pourquoi.",
    category: 'grandir',
    categoryLabel: 'Différence',
  },
  {
    text: "Quelqu'un vient de découvrir sa passion.",
    category: 'grandir',
    categoryLabel: 'Passion',
  },
  {
    text: "Quelqu'un pense que personne ne le comprend.",
    category: 'grandir',
    categoryLabel: 'Incompris',
  },
  {
    text: "Quelqu'un rêve de partir loin.",
    category: 'grandir',
    categoryLabel: 'Départ',
  },
  {
    text: "Quelqu'un vient de comprendre que ses parents ne seront pas toujours là.",
    category: 'grandir',
    categoryLabel: 'Prise de conscience',
  },
  {
    text: "Quelqu'un commence à écrire son propre chemin.",
    category: 'grandir',
    categoryLabel: 'Son propre chemin',
  },

  // ❤️ Amour
  {
    text: "Quelqu'un vient de tomber amoureux.",
    category: 'amour',
    categoryLabel: 'Amour',
  },
  {
    text: "Quelqu'un pense à une personne sans oser lui écrire.",
    category: 'amour',
    categoryLabel: 'Pensée secrète',
  },
  {
    text: "Quelqu'un vient de recevoir un message qu'il attendait depuis longtemps.",
    category: 'amour',
    categoryLabel: 'Message attendu',
  },
  {
    text: "Quelqu'un sourit devant son téléphone.",
    category: 'amour',
    categoryLabel: 'Sourire',
  },
  {
    text: "Quelqu'un se demande si quelqu'un pense à lui.",
    category: 'amour',
    categoryLabel: 'Pensée partagée',
  },
  {
    text: "Quelqu'un vient de comprendre ce qu'il ressent.",
    category: 'amour',
    categoryLabel: 'Sentiment',
  },
  {
    text: "Quelqu'un aime quelqu'un en silence.",
    category: 'amour',
    categoryLabel: 'Amour silencieux',
  },

  // 🌧️ Solitude
  {
    text: "Quelqu'un se sent seul au milieu de la foule.",
    category: 'solitude',
    categoryLabel: 'Foule solitaire',
  },
  {
    text: "Quelqu'un regarde les étoiles et se demande si quelqu'un d'autre fait la même chose.",
    category: 'solitude',
    categoryLabel: 'Sous les étoiles',
  },
  {
    text: "Quelqu'un aimerait simplement que quelqu'un lui demande comment il va.",
    category: 'solitude',
    categoryLabel: 'Regard bienveillant',
  },
  {
    text: "Quelqu'un vient de rentrer chez lui dans une maison silencieuse.",
    category: 'solitude',
    categoryLabel: 'Maison silencieuse',
  },
  {
    text: "Quelqu'un sourit aujourd'hui alors qu'il ne va pas très bien.",
    category: 'solitude',
    categoryLabel: 'Courage silencieux',
  },
  {
    text: "Quelqu'un pense qu'il est le seul à ressentir cela.",
    category: 'solitude',
    categoryLabel: 'Écho intérieur',
  },

  // 🌅 Espoir
  {
    text: "Quelqu'un décide de recommencer.",
    category: 'espoir',
    categoryLabel: 'Nouveau départ',
  },
  {
    text: "Quelqu'un vient de comprendre qu'il peut encore changer.",
    category: 'espoir',
    categoryLabel: 'Changement',
  },
  {
    text: "Quelqu'un prend enfin le risque dont il avait peur.",
    category: 'espoir',
    categoryLabel: 'Courage',
  },
  {
    text: "Quelqu'un commence une nouvelle vie.",
    category: 'espoir',
    categoryLabel: 'Renaissance',
  },
  {
    text: "Quelqu'un croit encore que demain sera différent.",
    category: 'espoir',
    categoryLabel: 'Espoir',
  },
  {
    text: "Quelqu'un vient de trouver une raison de continuer.",
    category: 'espoir',
    categoryLabel: 'Raison de continuer',
  },

  // 🧠 Réflexion
  {
    text: "Quelqu'un se demande quel sens donner à sa vie.",
    category: 'réflexion',
    categoryLabel: 'Sens',
  },
  {
    text: "Quelqu'un regarde le ciel et réalise à quel point il est petit.",
    category: 'réflexion',
    categoryLabel: 'Face au ciel',
  },
  {
    text: "Quelqu'un se demande si sa vie aura changé quelque chose.",
    category: 'réflexion',
    categoryLabel: 'Trace laissée',
  },
  {
    text: "Quelqu'un pense au temps qui passe.",
    category: 'réflexion',
    categoryLabel: 'Le temps',
  },
  {
    text: "Quelqu'un vient de réaliser qu'il est heureux.",
    category: 'réflexion',
    categoryLabel: 'Bonheur présent',
  },
  {
    text: "Quelqu'un se demande où il sera dans dix ans.",
    category: 'réflexion',
    categoryLabel: 'Futur',
  },
  {
    text: "Quelqu'un pense à toutes les personnes qu'il aurait pu devenir.",
    category: 'réflexion',
    categoryLabel: 'Vies possibles',
  },
];

export const PIVOTAL_STORIES = SINGLE_STAR_STORIES.slice(0, 18);
export const ORDINARY_STORIES = SINGLE_STAR_STORIES.slice(18, 36);
export const SPARKLING_STORIES = SINGLE_STAR_STORIES.slice(36);

// ============================================================================
// ⭐⭐ ÉTOILES DOUBLES — LES RELATIONS (52 couples)
// « Chaque couple a deux messages : l'un a un message, l'autre a la perspective reliée »
// ============================================================================

export const BINARY_STORY_PAIRS: BinaryStoryPair[] = [
  // ## ❤️ Amour
  {
    idA: 'bin-amour-1-a',
    idB: 'bin-amour-1-b',
    title: 'Le premier regard',
    category: 'amour',
    categoryLabel: 'Amour — Le premier regard',
    storyA: {
      text: "Je l’ai remarquée immédiatement.",
      category: 'amour',
      title: 'Le premier regard',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je ne savais même pas qu’elle m’avait remarquée.",
      category: 'amour',
      title: 'Le premier regard',
      categoryLabel: 'Amour',
    },
    relationType: 'harmonious',
    orbitRadius: 52,
  },
  {
    idA: 'bin-amour-2-a',
    idB: 'bin-amour-2-b',
    title: 'Le message',
    category: 'amour',
    categoryLabel: 'Amour — Le message',
    storyA: {
      text: "J’ai attendu toute la journée qu’il me réponde.",
      category: 'amour',
      title: 'Le message',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "J’ai vu son message, mais je voulais trouver les bons mots.",
      category: 'amour',
      title: 'Le message',
      categoryLabel: 'Amour',
    },
    relationType: 'harmonious',
    orbitRadius: 50,
  },
  {
    idA: 'bin-amour-3-a',
    idB: 'bin-amour-3-b',
    title: 'Le rendez-vous',
    category: 'amour',
    categoryLabel: 'Amour — Le rendez-vous',
    storyA: {
      text: "J’étais tellement nerveux que je n’ai presque pas parlé.",
      category: 'amour',
      title: 'Le rendez-vous',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je pensais qu’il s’ennuyait avec moi.",
      category: 'amour',
      title: 'Le rendez-vous',
      categoryLabel: 'Amour',
    },
    relationType: 'harmonious',
    orbitRadius: 54,
  },
  {
    idA: 'bin-amour-4-a',
    idB: 'bin-amour-4-b',
    title: 'Le départ',
    category: 'amour',
    categoryLabel: 'Amour — Le départ',
    storyA: {
      text: "Je suis partie parce que je pensais qu’il ne ressentait plus rien.",
      category: 'amour',
      title: 'Le départ',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je l’ai laissée partir parce que je pensais qu’elle ne voulait plus de moi.",
      category: 'amour',
      title: 'Le départ',
      categoryLabel: 'Amour',
    },
    relationType: 'diverging',
    orbitRadius: 76,
  },
  {
    idA: 'bin-amour-5-a',
    idB: 'bin-amour-5-b',
    title: 'Le silence',
    category: 'amour',
    categoryLabel: 'Amour — Le silence',
    storyA: {
      text: "Je me demandais pourquoi il était devenu silencieux.",
      category: 'amour',
      title: 'Le silence',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je me taisais parce que j’avais peur de dire quelque chose qui la ferait partir.",
      category: 'amour',
      title: 'Le silence',
      categoryLabel: 'Amour',
    },
    relationType: 'harmonious',
    orbitRadius: 56,
  },
  {
    idA: 'bin-amour-6-a',
    idB: 'bin-amour-6-b',
    title: 'La dispute',
    category: 'amour',
    categoryLabel: 'Amour — La dispute',
    storyA: {
      text: "Je voulais simplement qu’il comprenne pourquoi j’étais blessée.",
      category: 'amour',
      title: 'La dispute',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je pensais qu’elle voulait avoir raison.",
      category: 'amour',
      title: 'La dispute',
      categoryLabel: 'Amour',
    },
    relationType: 'diverging',
    orbitRadius: 74,
  },
  {
    idA: 'bin-amour-7-a',
    idB: 'bin-amour-7-b',
    title: "L'amour jamais avoué",
    category: 'amour',
    categoryLabel: "Amour — L'amour jamais avoué",
    storyA: {
      text: "J’ai attendu qu’il me dise ce qu’il ressentait.",
      category: 'amour',
      title: "L'amour jamais avoué",
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "J’ai attendu qu’elle me donne une raison de lui dire.",
      category: 'amour',
      title: "L'amour jamais avoué",
      categoryLabel: 'Amour',
    },
    relationType: 'harmonious',
    orbitRadius: 55,
  },
  {
    idA: 'bin-amour-8-a',
    idB: 'bin-amour-8-b',
    title: 'La dernière soirée',
    category: 'amour',
    categoryLabel: 'Amour — La dernière soirée',
    storyA: {
      text: "Je pensais que ce serait une soirée comme les autres.",
      category: 'amour',
      title: 'La dernière soirée',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je savais que c’était probablement la dernière fois que je le verrais.",
      category: 'amour',
      title: 'La dernière soirée',
      categoryLabel: 'Amour',
    },
    relationType: 'distant',
    orbitRadius: 78,
  },
  {
    idA: 'bin-amour-9-a',
    idB: 'bin-amour-9-b',
    title: 'Le choix',
    category: 'amour',
    categoryLabel: 'Amour — Le choix',
    storyA: {
      text: "Je pensais qu’il avait choisi de partir.",
      category: 'amour',
      title: 'Le choix',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je pensais qu’elle avait choisi de ne pas me retenir.",
      category: 'amour',
      title: 'Le choix',
      categoryLabel: 'Amour',
    },
    relationType: 'diverging',
    orbitRadius: 80,
  },
  {
    idA: 'bin-amour-10-a',
    idB: 'bin-amour-10-b',
    title: 'Le “je vais bien”',
    category: 'amour',
    categoryLabel: 'Amour — Le “je vais bien”',
    storyA: {
      text: "Je lui ai dit que j’allais bien.",
      category: 'amour',
      title: 'Le “je vais bien”',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je savais qu’elle mentait, mais je ne savais pas comment l’aider.",
      category: 'amour',
      title: 'Le “je vais bien”',
      categoryLabel: 'Amour',
    },
    relationType: 'harmonious',
    orbitRadius: 54,
  },

  // ## 💔 Séparation
  {
    idA: 'bin-sep-11-a',
    idB: 'bin-sep-11-b',
    title: 'Après la rupture',
    category: 'séparation',
    categoryLabel: 'Séparation — Après la rupture',
    storyA: {
      text: "Je pensais qu’il était passé à autre chose.",
      category: 'séparation',
      title: 'Après la rupture',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "Je pensais qu’elle était déjà passée à autre chose.",
      category: 'séparation',
      title: 'Après la rupture',
      categoryLabel: 'Séparation',
    },
    relationType: 'diverging',
    orbitRadius: 82,
  },
  {
    idA: 'bin-sep-12-a',
    idB: 'bin-sep-12-b',
    title: 'Le dernier message',
    category: 'séparation',
    categoryLabel: 'Séparation — Le dernier message',
    storyA: {
      text: "J’ai écrit un long message, puis je l’ai supprimé.",
      category: 'séparation',
      title: 'Le dernier message',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "J’ai attendu un message qui n’est jamais arrivé.",
      category: 'séparation',
      title: 'Le dernier message',
      categoryLabel: 'Séparation',
    },
    relationType: 'diverging',
    orbitRadius: 85,
  },
  {
    idA: 'bin-sep-13-a',
    idB: 'bin-sep-13-b',
    title: 'Se croiser après',
    category: 'séparation',
    categoryLabel: 'Séparation — Se croiser après',
    storyA: {
      text: "Je l’ai vu dans la rue et j’ai fait semblant de ne pas le reconnaître.",
      category: 'séparation',
      title: 'Se croiser après',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "Je l’ai vu me regarder et j’ai fait semblant de ne pas le voir.",
      category: 'séparation',
      title: 'Se croiser après',
      categoryLabel: 'Séparation',
    },
    relationType: 'diverging',
    orbitRadius: 84,
  },
  {
    idA: 'bin-sep-14-a',
    idB: 'bin-sep-14-b',
    title: 'Les souvenirs',
    category: 'séparation',
    categoryLabel: 'Séparation — Les souvenirs',
    storyA: {
      text: "Je garde encore nos photos.",
      category: 'séparation',
      title: 'Les souvenirs',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "Je pensais qu’il avait supprimé toutes les nôtres.",
      category: 'séparation',
      title: 'Les souvenirs',
      categoryLabel: 'Séparation',
    },
    relationType: 'diverging',
    orbitRadius: 78,
  },
  {
    idA: 'bin-sep-15-a',
    idB: 'bin-sep-15-b',
    title: 'Les regrets',
    category: 'séparation',
    categoryLabel: 'Séparation — Les regrets',
    storyA: {
      text: "Je regrette de ne pas lui avoir dit ce que je ressentais.",
      category: 'séparation',
      title: 'Les regrets',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "Je regrette de ne pas lui avoir demandé ce qu’il ressentait.",
      category: 'séparation',
      title: 'Les regrets',
      categoryLabel: 'Séparation',
    },
    relationType: 'diverging',
    orbitRadius: 80,
  },

  // ## 🫂 Amitié
  {
    idA: 'bin-ami-16-a',
    idB: 'bin-ami-16-b',
    title: "L’ami qui s’éloigne",
    category: 'amitié',
    categoryLabel: "Amitié — L’ami qui s’éloigne",
    storyA: {
      text: "Je pensais qu’il ne voulait plus être mon ami.",
      category: 'amitié',
      title: "L’ami qui s’éloigne",
      categoryLabel: 'Amitié',
    },
    storyB: {
      text: "Je pensais qu’elle avait simplement besoin de nouvelles personnes.",
      category: 'amitié',
      title: "L’ami qui s’éloigne",
      categoryLabel: 'Amitié',
    },
    relationType: 'distant',
    orbitRadius: 75,
  },
  {
    idA: 'bin-ami-17-a',
    idB: 'bin-ami-17-b',
    title: "L’invitation",
    category: 'amitié',
    categoryLabel: "Amitié — L’invitation",
    storyA: {
      text: "Je ne l’ai pas invité parce que je pensais qu’il avait déjà quelque chose de prévu.",
      category: 'amitié',
      title: "L’invitation",
      categoryLabel: 'Amitié',
    },
    storyB: {
      text: "Je n’y suis pas allé parce que je pensais qu’elle ne voulait pas vraiment que je vienne.",
      category: 'amitié',
      title: "L’invitation",
      categoryLabel: 'Amitié',
    },
    relationType: 'harmonious',
    orbitRadius: 58,
  },
  {
    idA: 'bin-ami-18-a',
    idB: 'bin-ami-18-b',
    title: 'Le silence',
    category: 'amitié',
    categoryLabel: 'Amitié — Le silence',
    storyA: {
      text: "Je voulais lui parler, mais j’attendais qu’il fasse le premier pas.",
      category: 'amitié',
      title: 'Le silence',
      categoryLabel: 'Amitié',
    },
    storyB: {
      text: "Je voulais lui parler, mais j’attendais qu’elle fasse le premier pas.",
      category: 'amitié',
      title: 'Le silence',
      categoryLabel: 'Amitié',
    },
    relationType: 'harmonious',
    orbitRadius: 54,
  },
  {
    idA: 'bin-ami-19-a',
    idB: 'bin-ami-19-b',
    title: "L’anniversaire",
    category: 'amitié',
    categoryLabel: "Amitié — L’anniversaire",
    storyA: {
      text: "J’étais déçu qu’il ait oublié mon anniversaire.",
      category: 'amitié',
      title: "L’anniversaire",
      categoryLabel: 'Amitié',
    },
    storyB: {
      text: "J’avais préparé quelque chose pour elle, mais je n’ai jamais trouvé le courage de le lui donner.",
      category: 'amitié',
      title: "L’anniversaire",
      categoryLabel: 'Amitié',
    },
    relationType: 'harmonious',
    orbitRadius: 56,
  },
  {
    idA: 'bin-ami-20-a',
    idB: 'bin-ami-20-b',
    title: "L’aide",
    category: 'amitié',
    categoryLabel: "Amitié — L’aide",
    storyA: {
      text: "Je pensais qu’il ne voulait pas de mon aide.",
      category: 'amitié',
      title: "L’aide",
      categoryLabel: 'Amitié',
    },
    storyB: {
      text: "Je ne voulais pas être un poids pour elle.",
      category: 'amitié',
      title: "L’aide",
      categoryLabel: 'Amitié',
    },
    relationType: 'harmonious',
    orbitRadius: 52,
  },
  {
    idA: 'bin-ami-21-a',
    idB: 'bin-ami-21-b',
    title: 'Les retrouvailles',
    category: 'amitié',
    categoryLabel: 'Amitié — Les retrouvailles',
    storyA: {
      text: "J’avais peur qu’après toutes ces années, nous n’ayons plus rien à nous dire.",
      category: 'amitié',
      title: 'Les retrouvailles',
      categoryLabel: 'Amitié',
    },
    storyB: {
      text: "J’avais peur qu’elle ait oublié tout ce qu’on avait vécu.",
      category: 'amitié',
      title: 'Les retrouvailles',
      categoryLabel: 'Amitié',
    },
    relationType: 'harmonious',
    orbitRadius: 55,
  },

  // ## 👨👩👧 Famille
  {
    idA: 'bin-fam-22-a',
    idB: 'bin-fam-22-b',
    title: "L’enfant qui grandit",
    category: 'famille',
    categoryLabel: "Famille — L’enfant qui grandit",
    storyA: {
      text: "Je pensais que mes parents ne me comprenaient jamais.",
      category: 'famille',
      title: "L’enfant qui grandit",
      categoryLabel: 'Famille',
    },
    storyB: {
      text: "Nous essayions simplement de comprendre comment l’aider.",
      category: 'famille',
      title: "L’enfant qui grandit",
      categoryLabel: 'Famille',
    },
    relationType: 'harmonious',
    orbitRadius: 60,
  },
  {
    idA: 'bin-fam-23-a',
    idB: 'bin-fam-23-b',
    title: 'Le départ de la maison',
    category: 'famille',
    categoryLabel: 'Famille — Le départ de la maison',
    storyA: {
      text: "Je voulais partir pour enfin être libre.",
      category: 'famille',
      title: 'Le départ de la maison',
      categoryLabel: 'Famille',
    },
    storyB: {
      text: "Je savais qu’il devait partir, mais la maison allait sembler vide sans lui.",
      category: 'famille',
      title: 'Le départ de la maison',
      categoryLabel: 'Famille',
    },
    relationType: 'distant',
    orbitRadius: 72,
  },
  {
    idA: 'bin-fam-24-a',
    idB: 'bin-fam-24-b',
    title: 'Le père',
    category: 'famille',
    categoryLabel: 'Famille — Le père',
    storyA: {
      text: "Je pensais que mon père n’avait jamais peur.",
      category: 'famille',
      title: 'Le père',
      categoryLabel: 'Famille',
    },
    storyB: {
      text: "Je cachais mes peurs pour que mon fils ne les voie pas.",
      category: 'famille',
      title: 'Le père',
      categoryLabel: 'Famille',
    },
    relationType: 'harmonious',
    orbitRadius: 58,
  },
  {
    idA: 'bin-fam-25-a',
    idB: 'bin-fam-25-b',
    title: 'La mère',
    category: 'famille',
    categoryLabel: 'Famille — La mère',
    storyA: {
      text: "Je pensais qu’elle me disait toujours quoi faire.",
      category: 'famille',
      title: 'La mère',
      categoryLabel: 'Famille',
    },
    storyB: {
      text: "Je pensais simplement lui éviter les erreurs que j’avais faites.",
      category: 'famille',
      title: 'La mère',
      categoryLabel: 'Famille',
    },
    relationType: 'harmonious',
    orbitRadius: 56,
  },
  {
    idA: 'bin-fam-26-a',
    idB: 'bin-fam-26-b',
    title: 'Les frères et sœurs',
    category: 'famille',
    categoryLabel: 'Famille — Les frères et sœurs',
    storyA: {
      text: "Je pensais qu’il ne m’écoutait jamais.",
      category: 'famille',
      title: 'Les frères et sœurs',
      categoryLabel: 'Famille',
    },
    storyB: {
      text: "J’écoutais tout, même quand je faisais semblant de ne pas écouter.",
      category: 'famille',
      title: 'Les frères et sœurs',
      categoryLabel: 'Famille',
    },
    relationType: 'harmonious',
    orbitRadius: 52,
  },

  // ## 🧒 Enfance
  {
    idA: 'bin-enf-27-a',
    idB: 'bin-enf-27-b',
    title: 'Le jouet',
    category: 'enfance',
    categoryLabel: 'Enfance — Le jouet',
    storyA: {
      text: "Je pensais qu’il m’avait volé mon jouet.",
      category: 'enfance',
      title: 'Le jouet',
      categoryLabel: 'Enfance',
    },
    storyB: {
      text: "Je voulais seulement jouer avec lui.",
      category: 'enfance',
      title: 'Le jouet',
      categoryLabel: 'Enfance',
    },
    relationType: 'harmonious',
    orbitRadius: 48,
  },
  {
    idA: 'bin-enf-28-a',
    idB: 'bin-enf-28-b',
    title: "Le nouveau à l’école",
    category: 'enfance',
    categoryLabel: "Enfance — Le nouveau à l’école",
    storyA: {
      text: "Je pensais que personne ne voulait être mon ami.",
      category: 'enfance',
      title: "Le nouveau à l’école",
      categoryLabel: 'Enfance',
    },
    storyB: {
      text: "Je voulais lui parler, mais je pensais qu’il ne voulait pas me parler.",
      category: 'enfance',
      title: "Le nouveau à l’école",
      categoryLabel: 'Enfance',
    },
    relationType: 'harmonious',
    orbitRadius: 50,
  },
  {
    idA: 'bin-enf-29-a',
    idB: 'bin-enf-29-b',
    title: "Le dernier jour d’école",
    category: 'enfance',
    categoryLabel: "Enfance — Le dernier jour d’école",
    storyA: {
      text: "J’avais hâte que l’école soit terminée.",
      category: 'enfance',
      title: "Le dernier jour d’école",
      categoryLabel: 'Enfance',
    },
    storyB: {
      text: "Je ne savais pas que c’était la dernière fois que je verrais certains de mes amis.",
      category: 'enfance',
      title: "Le dernier jour d’école",
      categoryLabel: 'Enfance',
    },
    relationType: 'distant',
    orbitRadius: 74,
  },
  {
    idA: 'bin-enf-30-a',
    idB: 'bin-enf-30-b',
    title: 'Le dessin',
    category: 'enfance',
    categoryLabel: 'Enfance — Le dessin',
    storyA: {
      text: "Je lui ai donné mon dessin parce que je l’aimais beaucoup.",
      category: 'enfance',
      title: 'Le dessin',
      categoryLabel: 'Enfance',
    },
    storyB: {
      text: "Je l’ai gardé pendant des années sans jamais lui dire pourquoi.",
      category: 'enfance',
      title: 'Le dessin',
      categoryLabel: 'Enfance',
    },
    relationType: 'harmonious',
    orbitRadius: 52,
  },

  // ## 🕰️ Une même journée
  {
    idA: 'bin-jrn-31-a',
    idB: 'bin-jrn-31-b',
    title: 'Le banc',
    category: 'inconnu',
    categoryLabel: 'Une même journée — Le banc',
    storyA: {
      text: "Je me suis assis ici parce que je voulais être seul.",
      category: 'inconnu',
      title: 'Le banc',
      categoryLabel: 'Une même journée',
    },
    storyB: {
      text: "Je me suis assise ici parce que je ne voulais pas qu’il soit seul.",
      category: 'inconnu',
      title: 'Le banc',
      categoryLabel: 'Une même journée',
    },
    relationType: 'harmonious',
    orbitRadius: 54,
  },
  {
    idA: 'bin-jrn-32-a',
    idB: 'bin-jrn-32-b',
    title: 'Le train',
    category: 'inconnu',
    categoryLabel: 'Une même journée — Le train',
    storyA: {
      text: "Je pensais que cette personne dormait.",
      category: 'inconnu',
      title: 'Le train',
      categoryLabel: 'Une même journée',
    },
    storyB: {
      text: "Je faisais semblant de dormir parce que je n’osais pas lui parler.",
      category: 'inconnu',
      title: 'Le train',
      categoryLabel: 'Une même journée',
    },
    relationType: 'distant',
    orbitRadius: 76,
  },
  {
    idA: 'bin-jrn-33-a',
    idB: 'bin-jrn-33-b',
    title: 'Le café',
    category: 'inconnu',
    categoryLabel: 'Une même journée — Le café',
    storyA: {
      text: "Je suis venu ici pour oublier ma journée.",
      category: 'inconnu',
      title: 'Le café',
      categoryLabel: 'Une même journée',
    },
    storyB: {
      text: "Je suis venu ici pour commencer une nouvelle journée.",
      category: 'inconnu',
      title: 'Le café',
      categoryLabel: 'Une même journée',
    },
    relationType: 'harmonious',
    orbitRadius: 56,
  },
  {
    idA: 'bin-jrn-34-a',
    idB: 'bin-jrn-34-b',
    title: 'La pluie',
    category: 'inconnu',
    categoryLabel: 'Une même journée — La pluie',
    storyA: {
      text: "Je détestais cette pluie. Elle avait gâché ma journée.",
      category: 'inconnu',
      title: 'La pluie',
      categoryLabel: 'Une même journée',
    },
    storyB: {
      text: "J’adorais cette pluie. C’est elle qui m’a fait rester ici assez longtemps pour la rencontrer.",
      category: 'inconnu',
      title: 'La pluie',
      categoryLabel: 'Une même journée',
    },
    relationType: 'harmonious',
    orbitRadius: 58,
  },
  {
    idA: 'bin-jrn-35-a',
    idB: 'bin-jrn-35-b',
    title: 'Le bus',
    category: 'inconnu',
    categoryLabel: 'Une même journée — Le bus',
    storyA: {
      text: "Je pensais avoir raté mon bus.",
      category: 'inconnu',
      title: 'Le bus',
      categoryLabel: 'Une même journée',
    },
    storyB: {
      text: "Je pensais avoir raté mon bus, puis je l’ai vu arriver.",
      category: 'inconnu',
      title: 'Le bus',
      categoryLabel: 'Une même journée',
    },
    relationType: 'harmonious',
    orbitRadius: 50,
  },

  // ## 🧠 Malentendus
  {
    idA: 'bin-mal-36-a',
    idB: 'bin-mal-36-b',
    title: 'Le regard',
    category: 'réflexion',
    categoryLabel: 'Malentendus — Le regard',
    storyA: {
      text: "Je pensais qu’il me jugeait.",
      category: 'réflexion',
      title: 'Le regard',
      categoryLabel: 'Malentendus',
    },
    storyB: {
      text: "Je cherchais simplement quelqu’un qui avait l’air de comprendre.",
      category: 'réflexion',
      title: 'Le regard',
      categoryLabel: 'Malentendus',
    },
    relationType: 'harmonious',
    orbitRadius: 54,
  },
  {
    idA: 'bin-mal-37-a',
    idB: 'bin-mal-37-b',
    title: 'Le rire',
    category: 'réflexion',
    categoryLabel: 'Malentendus — Le rire',
    storyA: {
      text: "Je pensais qu’elle riait de moi.",
      category: 'réflexion',
      title: 'Le rire',
      categoryLabel: 'Malentendus',
    },
    storyB: {
      text: "Je riais parce que j’étais nerveuse.",
      category: 'réflexion',
      title: 'Le rire',
      categoryLabel: 'Malentendus',
    },
    relationType: 'harmonious',
    orbitRadius: 52,
  },
  {
    idA: 'bin-mal-38-a',
    idB: 'bin-mal-38-b',
    title: 'La porte',
    category: 'réflexion',
    categoryLabel: 'Malentendus — La porte',
    storyA: {
      text: "Je suis parti parce qu’elle m’a demandé de partir.",
      category: 'réflexion',
      title: 'La porte',
      categoryLabel: 'Malentendus',
    },
    storyB: {
      text: "Je lui ai demandé de partir parce que j’espérais qu’il me demande de rester.",
      category: 'réflexion',
      title: 'La porte',
      categoryLabel: 'Malentendus',
    },
    relationType: 'diverging',
    orbitRadius: 78,
  },
  {
    idA: 'bin-mal-39-a',
    idB: 'bin-mal-39-b',
    title: "L'appel",
    category: 'réflexion',
    categoryLabel: "Malentendus — L'appel",
    storyA: {
      text: "Je n’ai pas répondu parce que j’étais occupé.",
      category: 'réflexion',
      title: "L'appel",
      categoryLabel: 'Malentendus',
    },
    storyB: {
      text: "J’ai raccroché en pensant qu’il ne voulait pas me parler.",
      category: 'réflexion',
      title: "L'appel",
      categoryLabel: 'Malentendus',
    },
    relationType: 'distant',
    orbitRadius: 76,
  },
  {
    idA: 'bin-mal-40-a',
    idB: 'bin-mal-40-b',
    title: 'Le cadeau',
    category: 'réflexion',
    categoryLabel: 'Malentendus — Le cadeau',
    storyA: {
      text: "Je pensais qu’il n’avait pas aimé mon cadeau.",
      category: 'réflexion',
      title: 'Le cadeau',
      categoryLabel: 'Malentendus',
    },
    storyB: {
      text: "Je l’ai tellement aimé que je ne savais pas quoi dire.",
      category: 'réflexion',
      title: 'Le cadeau',
      categoryLabel: 'Malentendus',
    },
    relationType: 'harmonious',
    orbitRadius: 50,
  },

  // ## 🌌 Situations plus profondes
  {
    idA: 'bin-prof-41-a',
    idB: 'bin-prof-41-b',
    title: 'Deux personnes seules',
    category: 'solitude',
    categoryLabel: 'Situations profondes — Deux personnes seules',
    storyA: {
      text: "Je pensais être la seule personne seule dans cette pièce.",
      category: 'solitude',
      title: 'Deux personnes seules',
      categoryLabel: 'Solitude',
    },
    storyB: {
      text: "Je regardais tout le monde en espérant que quelqu’un remarque que j’étais seul.",
      category: 'solitude',
      title: 'Deux personnes seules',
      categoryLabel: 'Solitude',
    },
    relationType: 'harmonious',
    orbitRadius: 62,
  },
  {
    idA: 'bin-prof-42-a',
    idB: 'bin-prof-42-b',
    title: 'Une personne triste',
    category: 'solitude',
    categoryLabel: 'Situations profondes — Une personne triste',
    storyA: {
      text: "Personne ne semblait remarquer que je n’allais pas bien.",
      category: 'solitude',
      title: 'Une personne triste',
      categoryLabel: 'Solitude',
    },
    storyB: {
      text: "Je voulais lui demander si elle allait bien, mais j’avais peur de dépasser les limites.",
      category: 'solitude',
      title: 'Une personne triste',
      categoryLabel: 'Solitude',
    },
    relationType: 'harmonious',
    orbitRadius: 58,
  },
  {
    idA: 'bin-prof-43-a',
    idB: 'bin-prof-43-b',
    title: 'Le courage',
    category: 'espoir',
    categoryLabel: 'Situations profondes — Le courage',
    storyA: {
      text: "J’attendais qu’il fasse le premier pas.",
      category: 'espoir',
      title: 'Le courage',
      categoryLabel: 'Espoir',
    },
    storyB: {
      text: "J’attendais qu’elle me montre que je pouvais le faire.",
      category: 'espoir',
      title: 'Le courage',
      categoryLabel: 'Espoir',
    },
    relationType: 'harmonious',
    orbitRadius: 54,
  },
  {
    idA: 'bin-prof-44-a',
    idB: 'bin-prof-44-b',
    title: 'Une rencontre',
    category: 'inconnu',
    categoryLabel: 'Situations profondes — Une rencontre',
    storyA: {
      text: "Je pensais que ce serait une rencontre sans importance.",
      category: 'inconnu',
      title: 'Une rencontre',
      categoryLabel: 'Inconnu',
    },
    storyB: {
      text: "Je me souviens encore de cette rencontre des années plus tard.",
      category: 'inconnu',
      title: 'Une rencontre',
      categoryLabel: 'Inconnu',
    },
    relationType: 'harmonious',
    orbitRadius: 56,
  },
  {
    idA: 'bin-prof-45-a',
    idB: 'bin-prof-45-b',
    title: 'Le hasard',
    category: 'inconnu',
    categoryLabel: 'Situations profondes — Le hasard',
    storyA: {
      text: "Je suis arrivé ici cinq minutes plus tôt que prévu.",
      category: 'inconnu',
      title: 'Le hasard',
      categoryLabel: 'Inconnu',
    },
    storyB: {
      text: "Je suis arrivé ici cinq minutes plus tard que prévu.",
      category: 'inconnu',
      title: 'Le hasard',
      categoryLabel: 'Inconnu',
    },
    relationType: 'harmonious',
    orbitRadius: 52,
  },
  {
    idA: 'bin-prof-46-a',
    idB: 'bin-prof-46-b',
    title: 'Une personne aidée',
    category: 'espoir',
    categoryLabel: 'Situations profondes — Une personne aidée',
    storyA: {
      text: "Cette personne m’a aidé pendant l’un des pires jours de ma vie.",
      category: 'espoir',
      title: 'Une personne aidée',
      categoryLabel: 'Espoir',
    },
    storyB: {
      text: "Je ne savais même pas que ce petit geste allait autant compter pour elle.",
      category: 'espoir',
      title: 'Une personne aidée',
      categoryLabel: 'Espoir',
    },
    relationType: 'harmonious',
    orbitRadius: 55,
  },
  {
    idA: 'bin-prof-47-a',
    idB: 'bin-prof-47-b',
    title: 'Le dernier regard',
    category: 'séparation',
    categoryLabel: 'Situations profondes — Le dernier regard',
    storyA: {
      text: "Je pensais qu’il me regardait pour me dire au revoir.",
      category: 'séparation',
      title: 'Le dernier regard',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "Je la regardais parce que je savais que je ne la reverrais peut-être jamais.",
      category: 'séparation',
      title: 'Le dernier regard',
      categoryLabel: 'Séparation',
    },
    relationType: 'distant',
    orbitRadius: 78,
  },
  {
    idA: 'bin-prof-48-a',
    idB: 'bin-prof-48-b',
    title: 'Le souvenir',
    category: 'souvenirs',
    categoryLabel: 'Situations profondes — Le souvenir',
    storyA: {
      text: "Pour moi, cette journée était banale.",
      category: 'souvenirs',
      title: 'Le souvenir',
      categoryLabel: 'Souvenirs',
    },
    storyB: {
      text: "Pour moi, c’est l’un des jours dont je me souviens le mieux.",
      category: 'souvenirs',
      title: 'Le souvenir',
      categoryLabel: 'Souvenirs',
    },
    relationType: 'harmonious',
    orbitRadius: 58,
  },

  // ## 🌠 Une idée particulièrement forte pour le site
  {
    idA: 'bin-forte-49-a',
    idB: 'bin-forte-49-b',
    title: "Deux versions d'une même histoire",
    category: 'réflexion',
    categoryLabel: "Réflexion — Deux versions d'une même histoire",
    storyA: {
      text: "Voici ce dont je me souviens.",
      category: 'réflexion',
      title: "Deux versions d'une même histoire",
      categoryLabel: 'Réflexion',
    },
    storyB: {
      text: "Voici ce dont je me souviens.",
      category: 'réflexion',
      title: "Deux versions d'une même histoire",
      categoryLabel: 'Réflexion',
    },
    sharedInsight: "Deux personnes peuvent vivre exactement le même moment… et pourtant ne jamais vivre exactement la même histoire.",
    relationType: 'harmonious',
    orbitRadius: 58,
  },
  {
    idA: 'bin-forte-50-a',
    idB: 'bin-forte-50-b',
    title: 'La rencontre',
    category: 'amour',
    categoryLabel: 'Amour — La rencontre',
    storyA: {
      text: "Je pensais avoir rencontré quelqu’un par hasard.",
      category: 'amour',
      title: 'La rencontre',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je pensais avoir simplement croisé quelqu’un.",
      category: 'amour',
      title: 'La rencontre',
      categoryLabel: 'Amour',
    },
    sharedInsight: "Pour l’un, c’était une rencontre. Pour l’autre, c’était le début de quelque chose.",
    relationType: 'harmonious',
    orbitRadius: 52,
  },
  {
    idA: 'bin-forte-51-a',
    idB: 'bin-forte-51-b',
    title: 'Le départ',
    category: 'séparation',
    categoryLabel: 'Séparation — Le départ',
    storyA: {
      text: "Je pensais qu’elle m’abandonnait.",
      category: 'séparation',
      title: 'Le départ',
      categoryLabel: 'Séparation',
    },
    storyB: {
      text: "Je pensais qu’il ne me retenait pas.",
      category: 'séparation',
      title: 'Le départ',
      categoryLabel: 'Séparation',
    },
    sharedInsight: "Parfois, deux personnes attendent le même geste de l’autre. Et personne ne le fait.",
    relationType: 'diverging',
    orbitRadius: 82,
  },
  {
    idA: 'bin-forte-52-a',
    idB: 'bin-forte-52-b',
    title: 'Le silence',
    category: 'amour',
    categoryLabel: 'Amour — Le silence',
    storyA: {
      text: "Je me taisais parce que j’avais peur de la perdre.",
      category: 'amour',
      title: 'Le silence',
      categoryLabel: 'Amour',
    },
    storyB: {
      text: "Je pensais qu’il se taisait parce qu’il ne m’aimait plus.",
      category: 'amour',
      title: 'Le silence',
      categoryLabel: 'Amour',
    },
    relationType: 'diverging',
    orbitRadius: 76,
  },
];

export const EPHEMERAL_TEXTS = {
  initial: "Certaines lumières ne durent qu'un instant.",
  afterglow: "Le moment est passé. Le souvenir est resté.",
};

// ============================================================================
// ☄️ ÉTOILES FILANTES — LES MOMENTS ÉPHÉMÈRES
// ============================================================================

export const SHOOTING_STAR_STORIES: string[] = [
  // 🕰️ Nostalgie
  "C'était notre dernier été.",
  "Tu ne savais pas que c'était la dernière fois.",
  "Quelqu'un aimerait revivre une seule journée.",
  "Cette journée semblait ordinaire. Elle est devenue un souvenir.",
  "Quelqu'un vient de retrouver une vieille photographie.",
  "Une chanson vient de ramener quelqu'un dix ans en arrière.",
  "Quelqu'un repense à une maison où il ne vit plus.",
  "Quelqu'un vient de revoir un endroit de son enfance.",
  "Quelqu'un vient de se souvenir d'une personne qu'il n'a pas vue depuis longtemps.",
  "Quelqu'un aimerait pouvoir arrêter le temps.",

  // 💔 Dernière fois
  "Ils viennent de se dire au revoir pour la dernière fois. Ils ne le savent pas encore.",
  "Quelqu'un vient de fermer une porte qu'il ne rouvrira jamais.",
  "Deux inconnus viennent de se croiser pour la dernière fois.",
  "Quelqu'un vient de prendre une photo d'un moment qui appartient déjà au passé.",
  "Quelqu'un vient de dire “à demain”.",
  "Quelqu'un vient de vivre son dernier jour sans le savoir.",
  "Quelqu'un vient de quitter un endroit pour la dernière fois.",

  // ❤️ Moments d'amour
  "Quelqu'un vient de recevoir son premier “je t'aime”.",
  "Quelqu'un vient de tenir une main qu'il ne veut pas lâcher.",
  "Quelqu'un vient de réaliser qu'il est amoureux.",
  "Quelqu'un vient de rencontrer quelqu'un qu'il n'oubliera jamais.",
  "Quelqu'un vient de recevoir un message qui changera sa journée.",
  "Deux personnes viennent de se regarder sans trouver les mots.",

  // 🧸 Enfance
  "Quelqu'un vient de quitter son enfance sans s'en rendre compte.",
  "Quelqu'un vient de rentrer de son dernier jour d'école sans le savoir.",
  "Quelqu'un vient de jouer dehors pour la dernière fois.",
  "Quelqu'un vient de passer son dernier été avant de grandir.",
  "Quelqu'un se souvient de l'époque où le plus gros problème était de rentrer avant la nuit.",
  "Quelqu'un aimerait redevenir l'enfant qu'il était hier.",

  // 🌧️ Perte
  "Quelqu'un vient de perdre une personne qu'il pensait avoir encore longtemps.",
  "Quelqu'un vient de comprendre qu'il ne pourra plus appeler cette personne.",
  "Quelqu'un regarde une place désormais vide.",
  "Quelqu'un entend encore une voix qui n'est plus là.",
  "Quelqu'un garde un dernier message qu'il n'effacera jamais.",
  "Quelqu'un vient de réaliser qu'un souvenir est tout ce qui lui reste.",

  // 🌠 Très philosophiques
  "Le moment est passé. Le souvenir est resté.",
  "Certaines lumières ne durent qu'un instant.",
  "Tout ce qui est beau finit par devenir un souvenir.",
  "Hier était autrefois demain.",
  "Tu es peut-être déjà en train de vivre un souvenir.",
  "Nous ne remarquons pas toujours les derniers instants pendant qu'ils arrivent.",
  "Certaines choses sont précieuses parce qu'elles ne durent pas.",
  "Le temps emporte tout. Pas toujours ce que nous en avons fait.",
  "Ce moment ne reviendra jamais.",
  "Un jour, aujourd'hui sera hier.",
];

export const NOSTALGIC_SHOOTING_STAR_STORIES: string[] = [
  "C'était notre dernier été.",
  "Tu ne savais pas que c'était la dernière fois.",
  "Cette journée semblait ordinaire. Elle est devenue un souvenir.",
  "Tu es peut-être déjà en train de vivre un souvenir.",
  "Un jour, aujourd'hui sera hier.",
  "Quelqu'un aimerait pouvoir arrêter le temps.",
];

export const MISSED_SHOOTING_STAR_TEXT = {
  line1: "Le moment est passé.",
  line2: "Certaines lumières ne durent qu'un instant.",
};

export const FINAL_SHOOTING_STAR_SEQUENCE = {
  starText: "Un jour, aujourd'hui sera hier.",
  thought1: "Tu es peut-être déjà en train de vivre un souvenir.",
  thought2: "Certaines choses sont précieuses parce qu'elles ne durent pas.",
};

export const MILESTONES = {
  firstTier: {
    triggerCount: 3,
    line1: "Chaque étoile est une personne.",
    line2: "Chaque couple est une relation.",
  },
  secondTier: {
    triggerCount: 8,
    lines: [
      "Les étoiles sont les personnes.",
      "Les étoiles filantes sont les moments.",
      "Et nous sommes faits des deux.",
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
