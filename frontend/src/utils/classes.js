import ReRender from "./ReRender.js"

export class local_resource {
    constructor (path){
        this.path = path
        this.state = undefined
        this.loaded = false
    }

    get = () => {
        if (this.loaded){
            return this.state
        } else {
            this.load()
            return {loaded: false}
        }
    }

    load = async () => {
        let data = await fetch(this.path)
        this.state = await data.json()
        this.loaded = true
        ReRender()
    }
}