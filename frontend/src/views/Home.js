import Header from "../components/Header.js"

export default function Home(){

    

    return (/*html*/`
        <div class="root__home">
            ${Header({backBtn: true})}
            <h1>home</h1>
        </div>
    `)   
}