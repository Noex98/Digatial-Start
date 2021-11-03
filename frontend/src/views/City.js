import Header from "../components/Header.js"
import Spinner from "../components/Spinner.js"
import { cities } from "../Store.js"
import Link from "../utils/Link.js"
import Redirect from "../utils/Redirect.js"

export default function City(){

    let city_data = cities.get()
    if (city_data.loaded === false){
        return Spinner()
    }

    // Make sure we have a search query
    let city
    if (location.search){
        for (let i = 0; i < city_data.length; i++){
            if (city_data[i].name.en.toLowerCase() === location.search.substring(1).toLowerCase()){
                city = city_data[i]
                break

            // Not found
            } else if (i === city_data.length - 1){
                Redirect('/')
                return
            }
        }
    } else {
        Redirect('/')
        return
    }

    return (/*html*/`
        <div class="root__city">
            ${Header({backBtn: true})}
            <div class="city__introImg">
                <img src="${city.img.url}" alt="${city.img.alt}" />
                <h1>${city.name.da}</h1>
            </div>
            <div class="city__introText">
                <h2>Tekst</h2>
                <p>${city.description}</p>
            </div>
        </div>
    `)   

}