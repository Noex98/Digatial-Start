// Views
import Err404 from './views/Err404.js'
import Home from './views/Home.js'
import City from './views/City.js'
import FindItem from './views/FindItem.js'
import Post from './views/post.js'

const routes = [
    {
        path: '/',
        view: Home,
        title: 'Home'
    }, {
        path: '/city',
        view: City,
        title: 'By'
    }, {
        path: '/findItem',
        view: FindItem,
        title: 'x'
    }, {
        path: '/post',
        view: Post,
        title: 'x'
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

    // Scroll to top
    scrollTo(0, 0)
}

// Global navigation function
window.navigateTo = (path, data) => {
    if (path !== location.pathname){
        window.history. pushState(null, null, path)
    }
    render(data)
}

// Navigating with history api
window.onpopstate = () => render()

// First render
window.onload = () => render()