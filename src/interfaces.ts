export interface BookReview {
  id: string;
  title: string;
  body: string;
  score: number;
  reviewer: string;
}

export type BookReviewParams = Omit<BookReview, "id">;
