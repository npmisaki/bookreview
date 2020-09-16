import { NowRequest, NowResponse } from "@vercel/node";

import { BookReview } from "../interfaces";
import { ReviewStore } from "../firestore";
import { validator } from "../validator";

type CreateParams = Pick<BookReview, "title" | "body" | "score" | "reviewer">;

// GET /api/reviews
async function getReviews(_req: NowRequest, res: NowResponse) {
  const reviews = await ReviewStore.get();
  res.status(200).send(reviews);
}

// POST /api/reviews
async function createReview(req: NowRequest, res: NowResponse) {
  const { title, body, score, reviewer } = req.body as CreateParams;

  const result = validator.validate({ title, body, score, reviewer });
  if (result.error) {
    res
      .status(422)
      .send({
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
