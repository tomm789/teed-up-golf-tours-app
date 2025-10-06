export interface Activity {
  id: number;
  title: string;
  image: string;
  season: string;
}

export const activities: Activity[] = [
  {
    id: 1,
    title: "Welcome Drinks at Porto Bay",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_08_Image_0002.jpg",
    season: "Welcome Event"
  },
  {
    id: 2,
    title: "Wine Tasting at Quinta do Sanguinhal", 
    image: "/assets/wine tasting quinta.jpeg",
    season: "Portugal"
  },
  {
    id: 3,
    title: "Vineyard Lunch at Morgado do Quintao",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_10_Image_0003.jpg",
    season: "Algarve"
  },
  {
    id: 4,
    title: "Tapas Lunch at Monte Rei",
    image: "/assets/Tapas Lunch at Monte Rei.jpeg",
    season: "Golf Course"
  },
  {
    id: 5,
    title: "Farewell Dinner at Kempinski Bahia",
    image: "/assets/Farewell Dinner at Kempinski Bahia.jpeg", 
    season: "Farewell Event"
  }
];
