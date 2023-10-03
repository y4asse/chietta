import { cookies } from "next/headers";
import { kv } from "@vercel/kv";
import dynamic from "next/dynamic";

await kv.set("user_1_session", "session_token_value");
const session = await kv.get("user_1_session");
