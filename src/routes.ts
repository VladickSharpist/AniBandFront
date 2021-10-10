import { history } from "./history";

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

function openRouteLogin() {
    history.push(routes.login);
  }

function openRouteHome() {
    history.push(routes.home);
    window.location.reload();
  }

export { 
    routes, 
    openRouteLogin,
    openRouteHome
};