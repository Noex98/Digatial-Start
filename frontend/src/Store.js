import { endpoint } from "./utils/Http.js";

export let x = new endpoint(
    location.origin,
    '/api/test',
)

/*

export let user = {
    loaded: false,
    dataStore: undefined,
    data: () => {
        if (user.loaded){
            return user.dataStore
        } else {
            fetch(__ENV + '/api/user')
                .then(res => res.json())
                .then(data => {
                    if (data.auth === false){
                        Redirect('/login')
                    } else {
                        user.dataStore = data 
                        user.loaded = true
                        ReRender()
                    }
                })
        }
    },
    update: () => {

        user.loaded = false,
        user.dataStore = undefined,

        user.data = () => {
            if (user.loaded){
                return user.dataStore
            } else {
                fetch(__ENV + '/api/user')
                    .then(res => res.json())
                    .then(data => {
                        if (data.auth === false){
                            Redirect('/login')
                        } else {
                            user.dataStore = data 
                            user.loaded = true
                            ReRender()
                        }
                    })
            }
        }
    }
}

*/