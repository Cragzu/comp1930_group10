// Display component
let link = document.querySelector('link[rel=import]');
let content = link.import.querySelector('#bookListingBlock');
document.body.appendChild(content.cloneNode(true));