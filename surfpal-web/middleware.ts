import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    await supabase.auth.getSession();
    
    // const {data: {user}} = await supabase.auth.getUser();

    // const pathname = new URL(req.url, 'http://dummyurl').pathname;
    
    // if(user && pathname === '/') {
    //     return NextResponse.redirect(new URL('/myAccount', req.url));
    // }
    
    // if(!user && pathname === '/myAccount') {
    //     return NextResponse.redirect(new URL('/login', req.url));
    // }

    return res;
}

// export const config = {
//     matcher: ['/', '/myAccount']
// } 