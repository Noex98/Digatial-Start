import Header from "../components/Header.js"
import Spinner from "../components/Spinner.js"
import { cities, aarhus} from "../Store.js"
import Link from "../utils/Link.js"
import Redirect from "../utils/Redirect.js"

export default function Post() {
    // Get JSON data
    let _cities = cities.get()
    let _dataset = aarhus.get()

    // Return spinner while loading
    if (_cities.loaded === false || _dataset.loaded === false){
        return Spinner()
    }

    let city = undefined
    let post = undefined

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
            post = _dataset.find(e => e.Id == params.post_id)
            if (city == undefined || post == undefined){
                Redirect('/404')
                return
            }
        } catch (err) {
            console.log(err)
            Redirect('/404')
            return
        }
    })()

    function returnVideo(){
        for (let i = 0; i < post.Descriptions.length; i++){
            if (post.Descriptions[i].DescriptionType == "FILM"){

                let video = post.Descriptions[i].Html.replace(/width=("|'|`)(.*?)("|'|`)/, 'width="100%"')

                return (/*html*/`
                    <div class="post__video">
                        ${video}
                    </div>
                `)
            }
        }
        return ''
    }

    function returnRelated(){

        let output = ''

        if (post.RelatedProducts.length > 0){

            let related = ''
            for (const relatedProduct of post.RelatedProducts){

                let product = _dataset.find(x => x.Id == relatedProduct.Id)

                if (product != undefined){

                    related += Link('/post?city=Aarhus&post_id=' + product.Id, /*html*/`
                        
                        <div class="main__product">
                            <div class="product__txt">
                                <div>${product.Name}</div>
                                <div class="txt__categories">
                                    <div>${product.MainCategory.Name}</div>
                                    <div>${product.Category.Name}</div>
                                </div>
                            </div>
                            <div class="product__img">
                                ${returnImg(product)}
                            </div>
                        </div>
                    `)
                }
            }

            return (/*html*/`
                <div class="post__related">
                    <div class="related__title">Forslag</div>
                    <div class="related__main">
                        ${related}
                    </div>
                </div>
            `)
        }

        
        return output
    }

    function returnImg(product) {
        if (product.Files.length > 0){
            return (/*html*/`<img src="${product.Files[0].Uri}" alt="${product.Files[0].AltText}" />`)
        } else {
            return (/*html*/`<img src="x"/>`)
        }
    }
    
    return (/*html*/`
        ${Header({backBtn: true, destination: '/findItem?type=' + post.MainCategory.Name + '&city=' + city.name.en})}
        <div class="root__post">
            <div class="post__crumbs breadcrumbs">
                ${Link('/', 'Byer')}
                <span> -> </span>
                ${Link('/city?' + city.name.en, city.name.da)}
                <span> -> </span>
                ${Link('/fintItem?city=' + city.name.en + '&type=' + post.MainCategory.Name, post.MainCategory.Name)}
            </div>
            <div class="post__introImg">
                ${returnImg(post)}
                <h1 class="banner__text">${post.Name}</h1>
            </div>
            <div class="post__introText">
                ${post.Descriptions[post.Descriptions.length - 1].Html}
            </div>

            <div class="post__adress"></div>
            
            ${returnVideo()}

            <div class="post__mainText">
                ${post.Descriptions[0].Html}
            </div>

            ${returnRelated()}

        </div>
    `)

}