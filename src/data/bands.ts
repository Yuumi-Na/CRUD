import { Band } from "@/types/band";

export const bands: Band[] = [
  {
    id: 1,
    name: "LANDOKMAI",
    genre: "Indie",
    formedYear: 2018,
    imageUrl: "/images/bands/band-a.jpg",
    description: "An iconic Thai indie-dream pop female duo signed under the What The Duck record label.",
    members: [
      { id: 1, name: "Landokmai Sripasang", role: "Lead vocalist", photoUrl: "/images/bands/LANDOKMAI/UpimLandokmai.jpg" },
      { id: 2, name: "Manassanan Kingkasem", role: "Lead guitarist", photoUrl: "/images/bands/LANDOKMAI/AntLandokmai.jpg" },
    ],
  },
  {
    id: 2,
    name: "The 1975",
    genre: "Pop rock",
    formedYear: 2002,
    imageUrl: "/images/bands/band-b.jpg",
    members: [
      { id: 1, name: "Matty Healy", role: "Lead vocalist", photoUrl: "/images/bands/The1975/Matty1975.jpg" },
      { id: 2, name: "Adam Hann", role: "Lead guitarist", photoUrl: "/images/bands/The1975/Adam1975.jpg" },
      { id: 3, name: "Ross MacDonald", role: "Bassist", photoUrl: "/images/bands/The1975/Ross1975.jpg" },
      { id: 4, name: "George Daniel", role: "Drummer", photoUrl: "/images/bands/The1975/George1975.jpg" },
    ],
  },
  {
    id: 3,
    name: "The Marías",
    genre: "Indie/Alternative pop",
    formedYear: 2016,
    imageUrl: "/images/bands/band-c.jpg",
    description: "An American indie-pop and psychedelic-soul band from Los Angeles known for their dreamy, bilingual sound.",
    members: [
      { id: 1, name: "María Zardoya", role: "Lead vocalist", photoUrl: "/images/bands/TheMarias/MariatheMarias.jpg" },
      { id: 2, name: "Josh Conway", role: "Drummer and producer", photoUrl: "/images/bands/TheMarias/JoshtheMarias.jpg" },
      { id: 3, name: "Jesse Perlman", role: "Guitarist", photoUrl: "/images/bands/TheMarias/JessetheMarias.jpg" },
      { id: 4, name: "Edward James", role: "Keyboardist", photoUrl: "/images/bands/TheMarias/EdwardtheMarias.jpg" },
    ],
  },
];