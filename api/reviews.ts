import { NowRequest, NowResponse } from "@vercel/node";

import { BookReviewParams } from "../interfaces";
import { ReviewStore } from "../firestore";
import { validate } from "../validator";

// GET /api/reviews
async function getReviews(_req: NowRequest, res: NowResponse) {
  const reviews = await ReviewStore.get();
  res.status(200).send(reviews);
}

// POST /api/reviews
async function createReview(req: NowRequest, res: NowResponse) {
  const { title, body, score, reviewer } = req.body as BookReviewParams;

  const errors = validate({ title, body, score, reviewer });
  if (errors) {
    res.status(422).send({ errors });
    return;
  }

  await ReviewStore.add({
    title,
    body,
    score,
    reviewer,
  });
  res.status(201).end();
}

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case "POST":
      await createReview(req, res);
      return;
    default:
      await getReviews(req, res);
  }
};
