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

    // Open accordion
    window.openAccordion = () => {
        document.querySelector('.findItem__accordion').classList.toggle('findItem__accordion--active')
    }

    function returnFilter(){
        let output = ""
        if (type.Children.length > 1){
            
            for (let subType of type.Children){
                output += (/*html*/`
                    <div onclick="filterUpdate('categories', this)" data-value="${subType.Id}">${subType.Name}</div>
                `)
            }

        }
        return output
    }

    // Init empty search state
    let searchState = {
        searchQuery: "",
        filter: {
            categories: [],
            age: "",
            place : "",
        },
        sortBy: "",
    }

    // Update search state when writing text input
    window.searchQuery = (value) => {
        searchState.searchQuery = value;
        updateResults(searchState)
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

        updateResults(searchState)
    }

    // Update the shown results
    function updateResults(state){
        console.log(state)
    }

    return (/*html*/`
        ${Header({backBtn: true, destination: `/city?${city.name.en}`})}
        <div class="root__findItem">
            <div class="findItem__crumbs breadcrumbs">
                ${Link('/', 'Byer')}
                <span> -> </span>
                ${Link('/city?' + city.name.en, city.name.da)}
                <span> -> </span>
                ${Link('/findItem?city=' + city.name.en + '&type=' + type.Name, type.Name)}
            </div>

            <div class="findItem__search">
                <div class="search__accBtn" onclick="openAccordion()">
                    <i class="fas fa-sliders-h"></i>
                </div>
                <div class="search__inputCont">
                    <input onkeyup="searchQuery(this.value)" type="text" />
                </div>
            </div>

            <div class="findItem__accordion">
                <div class="accordion__filter">
                    <h4>Filter</h4>
                    <div class="filter__cont">
                        ${returnFilter()}
                    </div>
                </div>
            </div>

        </div>
    `)
}