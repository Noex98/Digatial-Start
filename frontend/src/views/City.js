import Header from "../components/Header.js"
import Spinner from "../components/Spinner.js"
import { cities, aarhus } from "../Store.js"
import Link from "../utils/Link.js"
import Redirect from "../utils/Redirect.js"

export default function City(){

    let city_data = cities.get()
    let dataset = aarhus.get()

    if (city_data.loaded === false || aarhus.loaded === false){
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
    // City is not specified
    } else {
        Redirect('/')
        return
    }

    let inspiration_showed = []

    function returnInspiration(n_repeat) {

        let output = ""

        for (let i = 0; i < n_repeat; i++){
            
            let n = Math.floor(Math.random() * (dataset.length - 1) + 1)

            // Avoid duplicate || make sure an image file is present
            while (inspiration_showed.includes(n) || !dataset[n].Files[0]){
                n = Math.floor(Math.random() * (dataset.length - 1) + 1)
            }

            inspiration_showed.push(n)

            let item = dataset[n]

            output += (/*html*/`
                <div class="inspiration__item">
                    <div class="item__imgWrap">
                        <img src="${item.Files[0].Uri}" alt="${item.Files[0].AltText}"/>
                        <div class="imgWrap__text">
                            ${item.Name}
                        </div>
                    </div>
                    <div class="item__text">
                        ${item.Descriptions[item.Descriptions.length - 1].Text}
                    </div>
                    <div class="item__cta">
                        SE MERE <i class="fas fa-chevron-right"></i>
                    </div>

                </div>
            `)
        }

        return output
        
    }

    window.showMore = () => {
        document.querySelector('.city__inspiration').innerHTML += returnInspiration(3)
    }

    return (/*html*/`
        ${Header({backBtn: true, destination: '/'})}
        <div class="root__city">
            <div class="city__introImg">
                <img src="${city.img.url}" alt="${city.img.alt}" />
                <h1>${city.name.da}</h1>
            </div>
            <div class="city__introText">
                <h2>Tekst</h2>
                <p>${city.description.medium}</p>
            </div>
            <div class="city__categories">
                <h4>Ting at lave i ${city.name.da}</h4>
                <div class="categories__grid">
                    <div>
                        <div>Attraktioner</div>
                    </div>
                    <div>
                        <div>Begivenheder</div>
                    </div>
                    <div>
                        <div>Aktiviteter</div>
                    </div>
                    <div>
                        <div>Mad og drikke</div>
                    </div>
                </div>
            </div>
            <div class="city__inspiration">
                ${returnInspiration(4)}
            </div>
            <div class="city__showMore" onclick="showMore()">Se flere</div>
        </div>
    `)   

}