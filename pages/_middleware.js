import { verifyToken } from "../lib/utils";
import { NextResponse } from "next/server";

export async function middleware(req, ev) {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);
  const { pathname } = req.nextUrl;
  if(pathname.includes('/api/login') || userId || pathname.includes('/static')) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/signin') {
    return NextResponse.redirect('/signin');
  }
}