import { NowRequest, NowResponse } from "@vercel/node";

import { getReviews, createReview } from "../src/api/reviews";

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case "POST":
      await createReview(req, res);
      return;
    default:
      await getReviews(req, res);
  }
};
