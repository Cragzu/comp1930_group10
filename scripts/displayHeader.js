// Display header
let link = document.querySelector('link[rel=import]');
let content = link.import.querySelector('#mainHeader');
document.body.appendChild(content.cloneNode(true));