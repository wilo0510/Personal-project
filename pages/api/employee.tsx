import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken, AuthenticatedRequest } from "@/lib/authMiddleware";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Example: Only authenticated users can fetch employees
    res.status(200).json({ message: "Welcome! Here are your employees.", user: req.user });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export default verifyToken(handler);
