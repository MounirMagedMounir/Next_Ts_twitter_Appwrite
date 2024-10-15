import { NextResponse, NextRequest } from "next/server";


export async function middleware (request: NextRequest) {

const isPublic = request.nextUrl.pathname.startsWith('/login')||request.nextUrl.pathname.startsWith('/signup');

const isAuthorized =  await request.cookies.has("token");

  if (!isAuthorized && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if(isAuthorized && isPublic ){
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher:[ "/","/login","/user/:path*","/dashboard","/signup","/signout","/updateUser","/adduser","/post/:path*","/product/:path*"],
};
