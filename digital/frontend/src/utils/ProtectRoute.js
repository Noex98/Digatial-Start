import __ENV from '../env.js'
import Redirect from './Redirect.js'

export default function ProtectRoute(){
    fetch(__ENV + '/api/auth', {
        withCredentails: true,
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
    })
        .then(res => res.json())
        .then(data => {
            if (data.auth !== true){
                Redirect('/login')
                return 123
            }
        })
}   