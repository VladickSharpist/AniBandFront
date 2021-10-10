export type ApproveUser = {
    id: number,
    userName: string,
    email: string,
    registrationDate: Date
}

export type RefreshResponse = {
    token: string,
    refreshToken: string
}

export type RefreshToken = {
    refreshToken: string
}
