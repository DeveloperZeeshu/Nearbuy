import { NextResponse } from "next/server"

export const middleware = (request) => {
    const token = request.cookies.get('user_access')?.value

    const protectedRoutes = ['/shop/dashboard', '/shop/products', '/shop/edit_profile']
    const currentPath = request.nextUrl.pathname

    const isProtected = protectedRoutes.some((path) => currentPath.startsWith(path))

    if (isProtected && !token)
        return NextResponse.redirect(new URL('/', request.url))

    return NextResponse.next()
}

export const config = {
    matcher: ['/shop/dashboard/:path*', '/shop/products/:path*', '/shop/edit_profile/:path*']
}

