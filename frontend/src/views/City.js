import Header from "../components/Header.js"
import Spinner from "../components/Spinner.js"
import { cities, aarhus, categories } from "../Store.js"
import Link from "../utils/Link.js"
import Redirect from "../utils/Redirect.js"

export default function City(){

    let _city = cities.get()
    let _dataset = aarhus.get()
    let _categories = categories.get()

    if (_city.loaded === false || _dataset.loaded === false || _categories === false){
        return Spinner()
    }

    // Make sure we have a search query
    let city
    if (location.search){
        for (let i = 0; i < _city.length; i++){
            if (_city[i].name.en.toLowerCase() === location.search.substring(1).toLowerCase()){
                city = _city[i]
                break

            // Not found
            } else if (i === _city.length - 1){
                Redirect('/')
                return
            }
        }
    // City is not specified
    } else {
        Redirect('/')
        return
    }

    function returnCategories(){
        let output = ""
        for (const categorie of _categories){
            output += (/*html*/`
                ${Link('/findItem?type=' + categorie.Name.replace(/\s+/g, '') +'&city=' + city.name.en.toLowerCase(), /*html*/`
                    <div style="background-image: url(${categorie.ImageUrl});">
                        <div>${categorie.Name}</div>
                    </div>
                `)}
            `)
        }
        return output
    }

    
    let inspiration_showed = []

    function returnInspiration(n_repeat) {
        let output = ""
        for (let i = 0; i < n_repeat; i++){

            if (inspiration_showed.length === _dataset.length){

                output = (/*html*/`
                    <div>You have reached the end</div>
                `)

                function showmore(){
                    console.log(1)
                }

                break
            } else {

                let n = Math.floor(Math.random() * (_dataset.length - 1) + 1)
                
                // Avoid duplicate || make sure an image file is present
                while (inspiration_showed.includes(n) || !_dataset[n].Files[0]){
                    n = Math.floor(Math.random() * (_dataset.length - 1) + 1)
                }

                inspiration_showed.push(n)

                let item = _dataset[n]

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
                        ${Link('/post?city=' + city.name.en + '&post_id=' + item.Id, /*html*/`
                            <div class="btn1">
                                SE MERE <i class="fas fa-chevron-right"></i>
                            </div>
                        `)}
                    </div>
                `)
            }
        }
        return output
    }
    

    onscroll = function showmore(){
        if (location.pathname == '/city'){

            let documentHeight = document.body.scrollHeight;
            let currentScroll = window.scrollY + window.innerHeight;

            let modifier = 200; 

            if(currentScroll + modifier > documentHeight) {
                document.querySelector('.city__inspiration').innerHTML += returnInspiration(4)
            }
        } else {
            removeEventListener('onscroll', this)
        }
    }

    return (/*html*/`
        ${Header({backBtn: true, destination: '/'})}
        <div class="root__city">
            <div class="city__introImg">
                <img src="${city.img.url}" alt="${city.img.alt}" />
                <h1>${city.name.da}</h1>
            </div>
            <div class="city__introText">
                <h2>${city.description.long.title}</h2>
                <p>${city.description.long.text}</p>
            </div>
            <div class="city__categories">
                <h3 class="title">Ting at lave i ${city.name.da}</h3>
                <div class="categories__grid">
                    ${returnCategories()}
                </div>
            </div>
            <div class="city__inspiration">
                <h3 class="title">Inspiration</h3>
                ${returnInspiration(4)}
            </div>
        </div>
    `)   

}