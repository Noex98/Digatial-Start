// Views
import Err404 from './views/Err404.js'
import Home from './views/Home.js'

const routes = [
    {
        path: '/',
        view: Home,
        auth: true,
        title: 'Home'
    }
]

let root = document.getElementById('root')

// Render view in the DOM
function render(data){
    let target = routes.find(element => element.path === window.location.pathname);
    
    if (target === undefined){
        root.innerHTML = Err404()
        document.title = 'Not found'
    } else {
        root.innerHTML = target.view(data)
        document.title = target.title
    }
}

// Global navigation function
window.navigateTo = (path, data) => {
    window.history. pushState(null, null, path)
    render(data)
}

// Navigating with history api
window.onpopstate = () => render()

// First render
window.onload = () => render()