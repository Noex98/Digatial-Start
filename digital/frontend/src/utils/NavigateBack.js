export default function Link(content){
    
    return (/*html*/ `
        <a onclick="event.preventDefault(); window.history.back()">
            ${content}
        </a>
    `)
}