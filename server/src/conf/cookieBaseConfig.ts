
interface BaseConfigType {
    httpOnly: boolean
    secure: boolean
    sameSite: 'none'
    path: string
}

export const baseConfig: BaseConfigType = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
}

