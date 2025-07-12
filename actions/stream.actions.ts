"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_APP_SECRECT;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("API key is missing");
  if (!apiSecret) throw new Error("API secret is missing");

  const client = new StreamClient(apiKey, apiSecret);

  // optional: pass custom expiration (e.g., 1 hour = 3600 seconds)
  const token = client.generateUserToken({ user_id: user.id, validity_in_seconds: 3600 });

  return token;
};
