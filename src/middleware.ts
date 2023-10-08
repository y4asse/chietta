import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  // if (request.nextUrl.pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl));
  // }
};
