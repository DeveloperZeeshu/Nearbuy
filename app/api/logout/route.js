import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET = async () => {
    (await cookies()).delete('user_access')

    return NextResponse.redirect(new URL('/', 'http://localhost:3000'))
}
