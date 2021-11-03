import Redirect from "./Redirect.js"
import ReRender from "./ReRender.js"

export class endpoint {

    constructor(origin, path){
        this.origin = origin
        this.path = path
        this.state = undefined
    }

    get_state(){
        return this.state
    }

    async http_req(req_data, query){
        const response = await fetch(this.origin + this.path + query, req_data)
        try {
            return response.json()
        } catch (err){
            console.log(err)
            return ({
                status: failed,
                err: err,
            })
        }
    }
}