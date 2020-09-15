import { NowRequest, NowResponse } from "@vercel/node";

import { BookReview } from "../../interfaces";
import { reviews } from "../../data";

type QueryParams = { id: string };
type UpdateParams = Pick<BookReview, "title" | "body" | "score" | "reviewer">;

function getId(req: NowRequest): number {
  const { id } = req.query as QueryParams;
  return Number(id);
}

// GET /api/reviews/:id
function getReview(req: NowRequest, res: NowResponse) {
  const id = getId(req);

  const review = reviews.find((r) => r.id === id);
  if (review) {
    res.status(200).send(review);
    return;
  }

  res.status(404).send({ errors: ["review is not found"] });
}

// PATCH (PUT) /api/reviews/:id
function updateReview(req: NowRequest, res: NowResponse) {
  const id = getId(req);

  const { title, body, score, reviewer } = req.body as UpdateParams;

  const index = reviews.findIndex((r) => r.id === id);

  // TODO: validations
  // タイトル: 必須 / 255文字以内
  // 評価: 必須 / 1~5以内
  // レビュー内容: 自由
  // 書いた人: 必須 / 255文字以内
  reviews[index] = {
    id,
    title,
    body,
    score,
    reviewer,
  };

  res.status(204).end();
}

// DELETE /api/reviews/:id
function deleteReview(req: NowRequest, res: NowResponse) {
  const id = getId(req);
  const index = reviews.findIndex((r) => r.id === id);
  reviews.splice(index, 1);
  res.status(200).end();
}

export default (req: NowRequest, res: NowResponse) => {
  if ((req.method && req.method === "PATCH") || req.method === "PUT") {
    updateReview(req, res);
    return;
  }

  if (req.method && req.method === "DELETE") {
    deleteReview(req, res);
    return;
  }

  getReview(req, res);
};
