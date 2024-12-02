import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request:Request){
    const token = request.cookies.get('authToken').value; // Assuming the token is in cookies

    if (token) {
      try {
        // Validate the token
        const {payload} = await jwtVerify(token,new TextEncoder().encode(process.env.JWT_SECRET))
        return NextResponse.next(); // Allow the request to continue to the protected route
      } catch (error) {
        console.error('JWT Verification Failed:', error.message);
        return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if the token is invalid
      }
    }
  
    // If no token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
}
export const config={
    matcher:['/dashboard/:path*'],
}