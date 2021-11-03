export default function Link(path, content, data){
    
    return (/*html*/ `
        <a onclick="event.preventDefault(); window.navigateTo('${path}', ${data})">
            ${content}
        </a>
    `)
}