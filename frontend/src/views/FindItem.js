import Header from "../components/Header.js"
import Spinner from "../components/Spinner.js"
import { cities, aarhus, categories} from "../Store.js"
import Link from "../utils/Link.js"
import Redirect from "../utils/Redirect.js"

export default function FindItem(){

    // Get JSON data
    let _cities = cities.get()
    let _dataset = aarhus.get()
    let _categories = categories.get()

    // Return spinner while loading
    if (_cities.loaded === false || _dataset.loaded === false || _categories.loaded === false){
        return Spinner()
    }

    let city = undefined
    let type = undefined

    // Extract search param data
    ;(() => {
        let params = {}
        let kv_pairs = location.search.substring(1).split('&')
        for (let i = 0; i < kv_pairs.length; i++){
            let x = kv_pairs[i].split('=')
            params = {...params, [x[0]]: x[1]}
        }

        // Validate input
        try {
            city = _cities.find(e => e.name.en.toLowerCase() == params.city.toLowerCase())
            type = _categories.find(e => e.Name.replace(/\s+/g, '').toLowerCase() == params.type.toLowerCase())
            if (city == undefined || type == undefined){
                Redirect('/')
                return
            }
        } catch (err) {
            console.log(err)
            Redirect('/')
            return
        }
    })()
    

    return (/*html*/`
        ${Header({backBtn: true, destination: `/city?${city.name.en}`})}
        <div class="root__findItem">
            123
        </div>
    `)
}