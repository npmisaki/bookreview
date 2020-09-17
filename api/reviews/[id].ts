import { NowRequest, NowResponse } from "@vercel/node";

import { getReview, updateReview, deleteReview } from "../../src/api/reviews";

export default async (req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case "PUT":
      await updateReview(req, res);
      return;
    case "DELETE":
      await deleteReview(req, res);
      return;
    default:
      await getReview(req, res);
  }
};
