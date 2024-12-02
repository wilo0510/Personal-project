import { NextResponse } from 'next/server';
export function middleware(request:Request){
    console.log('Middleware called');
}
export const config={
    matcher:['/dashboard/*'],
}