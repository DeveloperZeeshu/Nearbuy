import conf from "./conf.js";

interface BaseConfigType {
    httpOnly: boolean
    secure: boolean
    sameSite: 'none' | 'lax'
    path: string
}

export const baseConfig: BaseConfigType = {
    httpOnly: true,
    secure: true,
    sameSite: conf.environment === 'production' ? 'none' : 'lax',
    path: '/'
}

