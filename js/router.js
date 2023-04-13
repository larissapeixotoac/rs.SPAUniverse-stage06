class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event.preventDefault()
        event = event || window.event

        window.history.pushState({}, '', event.target.href)
        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]

        this.handleMenu(route)

        fetch(route)
            .then((data) => data.text())
            .then(html => { document.querySelector('#app').innerHTML = html})

    }

    handleMenu(route) {
        const home = document.querySelector('.main')
        const universe = document.querySelector('.universe')
        const exploration = document.querySelector('.exploration')

        if (route === '/pages/home.html') {
            home.classList.add('bold')
            universe.classList.remove('bold')
            exploration.classList.remove('bold')

        } if (route === '/pages/universe.html') {
            home.classList.remove('bold')
            universe.classList.add('bold')
            exploration.classList.remove('bold')

        } if (route === '/pages/exploration.html') {
            home.classList.remove('bold')
            universe.classList.remove('bold')
            exploration.classList.add('bold')
        }
    }
}

export { Router }