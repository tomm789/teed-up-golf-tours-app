export interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Golf Competition & Prizes",
    image: "https://images.pexels.com/photos/1325735/pexels-photo-1325735.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "Throughout Tour"
  },
  {
    id: 2,
    title: "Welcome Reception",
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2026-09-17"
  },
  {
    id: 3,
    title: "Wine Tasting Experience",
    image: "https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2026-09-20"
  },
  {
    id: 4,
    title: "Vineyard Lunch",
    image: "https://images.pexels.com/photos/1407847/pexels-photo-1407847.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2026-09-24"
  },
  {
    id: 5,
    title: "Farewell Dinner",
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400",
    date: "2026-09-28"
  }
];
