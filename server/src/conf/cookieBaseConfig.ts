
interface BaseConfigType {
    httpOnly: boolean
    secure: boolean
    sameSite: 'none'
}

export const baseConfig: BaseConfigType = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
}

