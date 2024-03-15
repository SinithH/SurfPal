import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    const session = await supabase.auth.getSession();
    const {data: {user}} = await supabase.auth.getUser();

    if(session && user) {
        return res;
    }


    

    // const pathname = new URL(req.url, 'http://dummyurl').pathname;
    
    // if(user && pathname === '/') {
    //     return NextResponse.redirect(new URL('/myAccount', req.url));
    // }
    
    // if(!user && pathname === '/myAccount') {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)

}

export const config = {
    matcher: ['/myAccount']
} 