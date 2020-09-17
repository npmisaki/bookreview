import { NowRequest, NowResponse } from "@vercel/node";

import { BookReviewParams } from "../interfaces";
import { ReviewStore } from "../firestore";
import { validator } from "../validator";

// GET /api/reviews
async function getReviews(_req: NowRequest, res: NowResponse) {
  const reviews = await ReviewStore.get();
  res.status(200).send(reviews);
}

// POST /api/reviews
async function createReview(req: NowRequest, res: NowResponse) {
  const { title, body, score, reviewer } = req.body as BookReviewParams;

  const result = validator.validate(
    { title, body, score, reviewer },
    { abortEarly: false, allowUnknown: true, stripUnknown: true }
  );
  if (result.error) {
    res.status(422).send({
      errors: result.error.details.map(({ message }) => message).join(","),
    });
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
  if (req.method && req.method === "POST") {
    await createReview(req, res);
    return;
  }

  await getReviews(req, res);
};
