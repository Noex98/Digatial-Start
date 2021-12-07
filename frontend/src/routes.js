// Views
import Err404 from './views/Err404.js'
import Home from './views/Home.js'
import City from './views/City.js'
import FindItem from './views/FindItem.js'
import Post from './views/Post.js'

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

export default routes