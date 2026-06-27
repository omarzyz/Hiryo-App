export type HiryoComment = {
  id: number;
  postId: number;
  initials: string;
  name: string;
  text: string;
};

export const comments: HiryoComment[] = [
  {
    id: 1,
    postId: 1,
    initials: "SA",
    name: "Sarah Ahmed",
    text: "That is a great start. Keep building one small feature at a time.",
  },
  {
    id: 2,
    postId: 1,
    initials: "MK",
    name: "Mohamed Khaled",
    text: "React Native becomes much easier once you understand components and props.",
  },
  {
    id: 3,
    postId: 2,
    initials: "OM",
    name: "Omar Hassan",
    text: "I agree. Small daily progress really adds up.",
  },
  {
    id: 4,
    postId: 2,
    initials: "MK",
    name: "Mohamed Khaled",
    text: "Nice work. The important thing is to keep practicing.",
  },
  {
    id: 5,
    postId: 3,
    initials: "SA",
    name: "Sarah Ahmed",
    text: "That sounds like a useful routine. I may try it too.",
  },
];
