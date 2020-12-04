import { NowRequest, NowResponse } from "@vercel/node";

import { getReview, updateReview, deleteReview } from "../../src/api/reviews";
import { setCORSHeaders, setCacheHeaders } from "../../src/http_headers";

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case "OPTIONS":
      setCORSHeaders(res);
      res.status(200).end();
      return;
    case "GET":
      setCORSHeaders(res);
      setCacheHeaders(res);
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
