import routes from './routes.js'
import { handleWillUnmount, handleDidMount} from './utils/Lifecycle.js'

let root = document.getElementById('root')  // Root div

// Render view in the DOM
function render(data){

    // willUnmount triggered
    handleWillUnmount()

    // Mount
    ;(() => {
        let target = routes.find(element => element.path === window.location.pathname)
        if (target === undefined){
            root.innerHTML = Err404()
            document.title = 'Not found'
        } else {
            root.innerHTML = target.view(data)
            document.title = target.title
        }
        // Scroll to top
        scrollTo(0, 0)
    })()

    // didMount triggered
    handleDidMount()
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