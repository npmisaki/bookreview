import { NowRequest, NowResponse } from "@vercel/node";

import { BookReview } from "../interfaces";
import { ReviewStore } from "../data";

type CreateParams = Pick<BookReview, "title" | "body" | "score" | "reviewer">;

// GET /api/reviews
function getReviews(_req: NowRequest, res: NowResponse) {
  res.status(200).send(ReviewStore.get());
}

// POST /api/reviews
function createReview(req: NowRequest, res: NowResponse) {
  const { title, body, score, reviewer } = req.body as CreateParams;

  const id = (ReviewStore.get() as BookReview[]).length + 1;
  // TODO: validations
  // タイトル: 必須 / 255文字以内
  // 評価: 必須 / 1~5以内
  // レビュー内容: 自由
  // 書いた人: 必須 / 255文字以内
  ReviewStore.add({
    id,
    title,
    body,
    score,
    reviewer,
  });
  res.status(201).end();
}

export default (req: NowRequest, res: NowResponse) => {
  if (req.method && req.method === "POST") {
    createReview(req, res);
    return;
  }

  getReviews(req, res);
};
