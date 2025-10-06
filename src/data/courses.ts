export interface GolfCourse {
  id: number;
  title: string;
  image: string;
  holes: number;
  par: number;
}

export const golfCourses: GolfCourse[] = [
  {
    id: 1,
    title: "West Cliffs Golf Course",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_09_Image_0002.jpg",
    holes: 18,
    par: 72
  },
  {
    id: 2,
    title: "Oitavos Golf Course",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_09_Image_0003.jpg",
    holes: 18,
    par: 72
  },
  {
    id: 3,
    title: "Dunas Golf Course",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_09_Image_0004.jpg",
    holes: 18,
    par: 71
  },
  {
    id: 4,
    title: "Ombria Golf Course",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_07_Image_0002.jpg",
    holes: 18,
    par: 72
  },
  {
    id: 5,
    title: "Monte Rei Golf Course",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_06_Image_0004.jpg",
    holes: 18,
    par: 72
  },
  {
    id: 6,
    title: "Finca Golf Course",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_05_Image_0004.jpg",
    holes: 18,
    par: 72
  },
  {
    id: 7,
    title: "La Reserva Sotogrande",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_05_Image_0003.jpg",
    holes: 18,
    par: 72
  },
  {
    id: 8,
    title: "Valderrama Golf Course",
    image: "/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_05_Image_0002.jpg",
    holes: 18,
    par: 72
  }
];
