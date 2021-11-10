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
            type = _categories.find(e => e.Name.replace(/\s+/g, '').toLowerCase() == params.type.toLowerCase()) // /\s+/g  === whitespace
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

    // Update global data for faster searching
    _dataset = _dataset.filter(x => x.MainCategory.Id === type.Id)

    // Open accordion
    window.openAccordion = () => {
        document.querySelector('.findItem__accordion').classList.toggle('findItem__accordion--active')
    }

    function returnFilter(){
        let output = ""
        if (type.Children.length > 1){

            let filters = ""

            for (let subType of type.Children){
                filters += (/*html*/`
                    <div onclick="filterUpdate('categories', this)" data-value="${subType.Id}">${subType.Name}</div>
                `)
            }

            output += (/*html */`
                <div class="accordion__filter">
                    <h4>Filter</h4>
                    <div class="filter__resetBtn" onclick="resetSearchState()">Nulstil</div>
                    <div class="filter__cont">
                        ${filters}
                    </div>
                </div>
            `)   
        } else if (type.Id == 58){
            output += (/*html */`
                <div class="accordion__filter">
                    <div class="filter__resetBtn" onclick="resetSearchState()">Nulstil</div>

                    <h4>Sortér</h4>
                    <div class="filter__cont">
                        <div>Dato</div>
                        <div>Pris</div>
                        <div style="opacity: 0; pointer-events:none;"></div>
                    </div>
                    <h4>Filter</h4>

                    <h5>Aldersgruppe</h5>
                    <div class="filter__cont">
                        <div>Børn</div>
                        <div>Unge</div>
                        <div>Voksne</div>
                    </div>
                    
                    <h5>Sted</h5>
                    <div class="filter__cont">
                        <div>Ude</div>
                        <div>Inde</div>
                        <div style="opacity: 0; pointer-events:none;"></div>
                        </div>
                </div>
            `)  
        }

        return output
    }

    // Init empty search state
    let searchState = {
        query: "",
        filter: {
            categories: [],
            age: "",
            place : "",
        },
        sortBy: "",
        data: _dataset,
        data_sorted: _dataset,
        posts_shown: 0
    }

    window.resetSearchState = () => {
        searchState = {
            query: "",
            filter: {
                categories: [],
                age: "",
                place : "",
            },
            sortBy: "",
            data: _dataset,
            posts_shown: 0
        }
        document.querySelector('.search__inputCont input').value = ''
        let btns = document.querySelectorAll('.filter__cont div')
        for (let i = 0; i < btns.length; i++){
            btns[i].classList.remove('--active')
        }
        updateData()
    }

    // Update search state when writing text input
    window.searchQuery = (value) => {
        searchState.query = value;
        updateData()
    }

    // Update filter search state
    window.filterUpdate = (type, element) => {
        if (type == 'age' || type == 'place'){
            searchState.filter[type] = element.dataset.value
        } else if (type == 'categories'){

            // Toggle modifier calss
            element.classList.toggle('--active')

            // toggle the element in the array
            if (searchState.filter.categories.includes(element.dataset.value)){ 
                let i = searchState.filter.categories.indexOf(element.dataset.value)
                searchState.filter.categories.splice(i, 1)
            } else {
                searchState.filter.categories.push(element.dataset.value)
            }
        }

        updateData()
    }

    // Update the shown results
    function updateData(){
        
        //Filter through data
        let data = _dataset.filter(item => {

            // Search query (input field)
            if (searchState.query.length > 0){
                if (!item.Name.toLowerCase().includes(searchState.query.toLowerCase())){
                    return false
                }
            }
            // Categories
            if (searchState.filter.categories.length > 0){
                let found = false
                for (let i = 0; i < searchState.filter.categories.length; i++){
                    if (searchState.filter.categories[i] == item.Category.Id){
                        found = true
                        break
                    }
                }
                if (!found){
                    return false
                }
            } 
            // Item did not fail test
            return true
        })

        searchState.data = data
        searchState.posts_shown = 0

        document.querySelector('.findItem__resultCont').innerHTML = returnItems(3)
    }

    function returnImg(product) {
        if (product.Files.length > 0){
            return (/*html*/`<img src="${product.Files[0].Uri}" alt="${product.Files[0].AltText}" />`)
        } else {
            return (/*html*/`<div class="imgWrap__noImg">No image</div>`)
        }
    }


    function returnItems(n){
        let output = ""

        if (searchState.posts_shown == searchState.data.length){
            document.querySelector('.findItem__end').innerText = 'Ingen yderligere resultater'
            return ''
        }

        for (let i = 0; i < n; i++){

            if (searchState.posts_shown >= searchState.data.length){
                document.querySelector('.findItem__end').innerText = 'Ingen yderligere resultater'
                break
            } else {
                let item = searchState.data[searchState.posts_shown]

                output += (/*html*/`
                    <div class="resultCont__item">
                        <div class="item__imgWrap">
                            ${returnImg(item)}
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

                searchState.posts_shown += 1
            }

        }
        
        return output
    }

    onscroll = function showmore(){
        if (location.pathname == '/findItem'){

            let documentHeight = document.body.scrollHeight;
            let currentScroll = window.scrollY + window.innerHeight;

            let modifier = 200; 

            if(currentScroll + modifier > documentHeight) {
                document.querySelector('.findItem__resultCont').innerHTML += returnItems(4)
            }
        } else {
            removeEventListener('onscroll', this)
        }
    }

    return (/*html*/`
        ${Header({backBtn: true, destination: `/city?${city.name.en}`})}
        <div class="root__findItem">
            <div class="findItem__crumbs breadcrumbs">
                ${Link('/', 'Byer')}
                <span><i class="fas fa-chevron-right"></i></span>
                ${Link('/city?' + city.name.en, city.name.da)}
                <span><i class="fas fa-chevron-right"></i></span>
                ${Link('/findItem?city=' + city.name.en + '&type=' + type.Name, type.Name)}
            </div>

            <div class="findItem__search">
                <div class="search__accBtn" onclick="openAccordion()">
                    <i class="fas fa-sliders-h"></i>
                </div>
                <div class="search__inputCont">
                    <input onkeyup="searchQuery(this.value)" placeholder="Søg..." type="text" />
                </div>
            </div>

            <div class="findItem__accordion">
                ${returnFilter()}
            </div>

            <div class="findItem__resultCont">
                ${returnItems(3)}
            </div>
            <div class="findItem__end"></div>

        </div>
    `)
}