import { NowRequest, NowResponse } from "@vercel/node";

import { getReviews, createReview } from "../src/api/reviews";
import { setCORSHeaders, setCacheHeaders } from "../src/http_headers";

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
      setCacheHeaders(res);
      await getReviews(req, res);
      return;
    default:
      res.status(404).end();
  }
};
