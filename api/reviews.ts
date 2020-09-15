import { NowRequest, NowResponse } from "@vercel/node";

import { BookReview } from "../interfaces";
import { reviews } from "../data";

type CreateParams = Pick<BookReview, "title" | "body" | "score" | "reviewer">;

// GET /api/reviews
function getReviews(_req: NowRequest, res: NowResponse) {
  res.status(200).send(reviews);
}

// POST /api/reviews
function createReview(req: NowRequest, res: NowResponse) {
  const { title, body, score, reviewer } = req.body as CreateParams;

  const id = reviews.length + 1;
  // TODO: validations
  // タイトル: 必須 / 255文字以内
  // 評価: 必須 / 1~5以内
  // レビュー内容: 自由
  // 書いた人: 必須 / 255文字以内
  reviews.push({
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
