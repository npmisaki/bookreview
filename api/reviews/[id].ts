import { NowRequest, NowResponse } from "@vercel/node";

import { getReview, updateReview, deleteReview } from "../../src/api/reviews";

function setCORSHeaders(res: NowResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case "OPTIONS":
      setCORSHeaders(res);
      res.status(200).end();
      return;
    case "GET":
      setCORSHeaders(res);
      await getReview(req, res);
      return;
    case "PUT":
      setCORSHeaders(res);
      await updateReview(req, res);
      return;
    case "DELETE":
      setCORSHeaders(res);
      await deleteReview(req, res);
      return;
    default:
      res.status(404).end();
  }
};
