// Display component
let link = document.querySelector('link[id=importBookListingBlock]');
let listingComponent = link.import.querySelector('#bookListingBlock');
document.body.appendChild(listingComponent.cloneNode(true));