import { NowResponse } from "@vercel/node";

export function setCORSHeaders(res: NowResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function setCacheHeaders(res: NowResponse) {
  res.setHeader("Cache-Control", "max-age=5, public");
}
