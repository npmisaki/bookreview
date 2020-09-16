import { NowRequest, NowResponse } from "@vercel/node";

import { BookReview } from "../interfaces";
import { ReviewStore } from "../firestore";

type CreateParams = Pick<BookReview, "title" | "body" | "score" | "reviewer">;

// GET /api/reviews
async function getReviews(_req: NowRequest, res: NowResponse) {
  const reviews = await ReviewStore.get();
  res.status(200).send(reviews);
}

// POST /api/reviews
async function createReview(req: NowRequest, res: NowResponse) {
  const { title, body, score, reviewer } = req.body as CreateParams;

  // TODO: validations
  // タイトル: 必須 / 255文字以内
  // 評価: 必須 / 1~5以内
  // レビュー内容: 自由
  // 書いた人: 必須 / 255文字以内
  await ReviewStore.add({
    title,
    body,
    score,
    reviewer,
  });
  res.status(201).end();
}

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method && req.method === "POST") {
    await createReview(req, res);
    return;
  }

  await getReviews(req, res);
};
