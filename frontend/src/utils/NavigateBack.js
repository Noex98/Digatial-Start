export default function NavigateBack(content){
    
    return (/*html*/ `
        <a onclick="event.preventDefault(); window.history.back()">
            ${content}
        </a>
    `)
}