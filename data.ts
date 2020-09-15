import { BookReview } from "./interfaces";

const _reviews: BookReview[] = [
  {
    id: 1,
    title: "たのしいRuby 第6版",
    body: "とてもよい",
    score: 4,
    reviewer: "mmyoji",
  },
  {
    id: 2,
    title: "プログラミングTypeScript",
    body: "読んでない",
    score: 2,
    reviewer: "mmyoji",
  },
  {
    id: 3,
    title: "オブジェクト指向のこころ",
    body: "何度でも読み返したい",
    score: 5,
    reviewer: "mmyoji",
  },
  {
    id: 4,
    title: "みんなのGo言語",
    body: "Gopherくんかわいい",
    score: 4,
    reviewer: "mmyoji",
  },
];

export const ReviewStore = {
  get(id?: number) {
    if (id) {
      return _reviews.find((r) => r.id === id);
    }

    return _reviews;
  },

  add(item: BookReview) {
    _reviews.push(item);
  },

  update(
    id: number,
    item: Pick<BookReview, "title" | "body" | "score" | "reviewer">
  ) {
    const index = _reviews.findIndex((r) => r.id === id);
    if (!index) {
      return;
    }

    _reviews[index] = {
      id,
      ...item,
    };
  },

  delete(id: number) {
    const index = _reviews.findIndex((r) => r.id === id);
    if (!index) return;

    _reviews.splice(index, 1);
  },
};
