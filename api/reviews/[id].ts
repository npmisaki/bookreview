import { NowRequest, NowResponse } from "@vercel/node";

import { BookReviewParams } from "../../interfaces";
import { ReviewStore } from "../../firestore";
import { validate } from "../../validator";

type QueryParams = { id: string };

function getId(req: NowRequest): string {
  const { id } = req.query as QueryParams;
  return id;
}

// GET /api/reviews/:id
async function getReview(req: NowRequest, res: NowResponse) {
  const id = getId(req);

  const review = await ReviewStore.get(id);
  if (review) {
    res.status(200).send(review);
    return;
  }

  res.status(404).send({ errors: ["review is not found"] });
}

// PATCH (PUT) /api/reviews/:id
async function updateReview(req: NowRequest, res: NowResponse) {
  const id = getId(req);

  const { title, body, score, reviewer } = req.body as BookReviewParams;

  const errors = validate({ title, body, score, reviewer });
  if (errors) {
    res.status(422).send({ errors });
    return;
  }

  await ReviewStore.update(id, {
    title,
    body,
    score,
    reviewer,
  });

  res.status(204).end();
}

// DELETE /api/reviews/:id
async function deleteReview(req: NowRequest, res: NowResponse) {
  const id = getId(req);
  await ReviewStore.delete(id);
  res.status(200).end();
}

export default async (req: NowRequest, res: NowResponse) => {
  if ((req.method && req.method === "PATCH") || req.method === "PUT") {
    await updateReview(req, res);
    return;
  }

  if (req.method && req.method === "DELETE") {
    await deleteReview(req, res);
    return;
  }

  await getReview(req, res);
};
