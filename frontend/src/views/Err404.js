import Header from "../components/Header.js"

export default function Err404(){

    return (/*html*/`
        ${Header({backBtn: true, destination: '/'})}
        <div>404</div>
    `)
}