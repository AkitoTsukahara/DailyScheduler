export default ({ store, route, redirect }: {store: any, route: any, redirect: any}) => {

    if (!store.getters.isAuthenticated && route.name !== 'login' && route.name !== 'register') {
        redirect('/login')
    }
    if (store.getters.isAuthenticated && (route.name === 'login' || route.name === 'register')) {
        redirect('/')
    }
}