import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/cash-pay" &&
    process.env.NEXT_PUBLIC_HIDE_CASH_PAY === "true"
  ) {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }
}

export const config = {
  matcher: "/cash-pay",
};
