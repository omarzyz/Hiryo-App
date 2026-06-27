export type Post = {
  id: number;
  initials: string;
  name: string;
  time: string;
  title: string;
  body: string;
};

export const posts: Post[] = [
  {
    id: 1,
    initials: "OM",
    name: "Omar Hassan",
    time: "Just now",
    title: "My first post on Hiryo",
    body: "I am learning React Native step by step and building my first social feed.",
  },
  {
    id: 2,
    initials: "SA",
    name: "Sarah Ahmed",
    time: "12 minutes ago",
    title: "Small progress is still progress",
    body: "Today I finally understood how components work. It feels good to build something with my own hands.",
  },
  {
    id: 3,
    initials: "MK",
    name: "Mohamed Khaled",
    time: "1 hour ago",
    title: "Trying a new routine",
    body: "I started organizing my day into smaller tasks. It makes difficult work feel much more manageable.",
  },
];
