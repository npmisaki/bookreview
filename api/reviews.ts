import { NowRequest, NowResponse } from "@vercel/node";

import { getReviews, createReview } from "../src/api/reviews";

function setCORSHeaders(res: NowResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case "OPTIONS":
      setCORSHeaders(res);
      res.status(200).end();
      return;
    case "POST":
      setCORSHeaders(res);
      await createReview(req, res);
      return;
    case "GET":
      setCORSHeaders(res);
      await getReviews(req, res);
      return;
    default:
      res.status(404).end();
  }
};
