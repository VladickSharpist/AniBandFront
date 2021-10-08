const routes = {
    home: '/',
    login: '/login',
    admin: '/admin',
    registration: '/registration',
    noAccess: '/noAccess',
    season(seasonId: string){
        return `/season/${seasonId}`;
    },
    episode(seasonId: string, episodeId: string){
        return `/season/${ seasonId }/episode/${ episodeId }`;
    },
}

export { routes };