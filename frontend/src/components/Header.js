import NavigateBack from "../utils/NavigateBack.js"

export default function Header(props){

    function backBtn(){
        if (props && props.backBtn){
            return (/*html*/`
                <div class="header__backBtn">
                    ${NavigateBack(/*html*/`
                        <div><</div>
                    `)}
                </div>
            `)
        } else {
            return ''
        }
    }
    

    return (/*html*/`
        <header>
            ${backBtn()}

            <img src="../media/img/logo.svg" alt="logo" />

            <div class="header__burger">
                <div></div>
                <div></div>
                <div></div>
            </div>

            <nav>
                <ul>
                    <li>asdad</li>
                    <li>asdad</li>
                    <li>asdad</li>
                </ul>
            </nav>
        </header>
    `)
}