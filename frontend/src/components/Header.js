import Link from "../utils/Link.js"

export default function Header(props){

    function backBtn(){
        if (props && props.backBtn && props.destination){
            return (/*html*/`
                <div class="content__backBtn">
                    ${Link(props.destination, /*html*/`
                        <i class="fas fa-chevron-left"></i>
                    `)}
                </div>
            `)
        } else {
            return ''
        }
    }

    window.burgerClick = () => {
        // Toggle modefier classes
        let burger = document.querySelector('.content__burger')
        let header = document.querySelector('header')
        burger.classList.toggle('burger--active')
        header.classList.toggle('header--active')

        // Dissable scroll while burger open
        document.body.classList.toggle('--noScroll')
    }
    

    return (/*html*/`
        <header class="header">

            <div class="header__content">
                ${backBtn()}

                <div class="content__logo">
                    ${Link('/', /*html*/`
                        <img src="../media/img/logo.svg" alt="logo" />
                    `)}
                </div>

                <div class="content__burger" onclick="burgerClick()">
                    <div class="burger__line1"></div>
                    <div class="burger__line2"></div>
                    <div class="burger__line3"></div>
                </div>
            </div>

            <nav class="header__nav">
                <ul>
                    <li>asdad</li>
                    <li>asdad</li>
                    <li>asdad</li>
                </ul>
            </nav>
        </header>
    `)
}