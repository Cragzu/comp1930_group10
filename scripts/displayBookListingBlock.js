// Constants
const book = db.collection("books");
let size;
let index;
let idList;

function blockComponent(title, desc, docId, i) {
    // This object constructor will take the book title, book description, document name ( which is docId), and i (which is index)

    this.title = title;
    this.description = desc;
    this.docId = docId;
    this.i = i;
    // This is an index to keep track of each unique div that is created.
    // The index will allow us to add a eventListener later

    this.titleText = document.createElement('h1');
    this.descText = document.createElement('p');
    this.displayListingBlock = function () {
        document.body.innerHTML += (`
            <div class="container-fluid" id="bookListingBlock">
                <div class="row">
                    <div class="col-sm-2"></div>
                    
                    <div class="col-sm-8 clickable" id="${this.i}">
                   
                        <div class="col-sm-4">
                            <img class="bookImage"
                                 src="images/bookPlaceholder.jpg"/>
                        </div>
                        <div class="col-sm-8" id="bookInfoContainer"> <!--Book title and description will go here-->
                        </div>
                     
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>
    `);

        // Create text pieces
        this.titleText.appendChild(document.createTextNode(title));
        this.descText.appendChild(document.createTextNode(desc));

        // Add them into the container component
        document.getElementById('bookInfoContainer').appendChild(this.titleText);
        document.getElementById('bookInfoContainer').appendChild(this.descText);

        // Remove id from container so we can set up the next element
        document.getElementById('bookInfoContainer').removeAttribute('id');

    }
}

function addOnClick() {
    for (let j = 0; j < size; j++) {
        document.getElementById(`${j}`).addEventListener("click", function () {
            // The goal of this event listener is to make it so the docId gets written to local storage then can be called later when we look at the listing page.

            if (localStorage.getItem("docId") === idList[j]) {
                // If the stored id is already matching the id of the div that was clicked on the you don't need to store the local info again

                // Just move to the page
                document.location.href = "bookListing.html"
            } else {
                localStorage.setItem("docId", idList[j]);
                document.location.href = "bookListing.html"
            }
        })
    }
}





function createListings() {
    book.orderBy(`Title`).get().then(function (querySnapshot) {

        // We keep an index so we can assign to a tag later.
        querySnapshot.forEach(function (doc) {
            let docTitle = doc.data().Title;
            let docDesc = doc.data().Description;
            let docName = doc.id;
            // This is to get the generated ID of the document
            idList.push(docName);
            // docName will keep the ID of each listing

            let comp = new blockComponent(docTitle, docDesc, docName, index);
            comp.displayListingBlock();
            index += 1;
            // Add one to the index to make the next id be unique

        });

        addOnClick();
        // This function needs to be here.
        // For some reason it doesn't work when it's anywhere else.


    })
}

function init() {
    index = 0;
    idList = [];

    book.get().then(snap => {
        size = snap.size;
        // This will return the number of how many documents are inside of the books collection

    });
    createListings();


}

init();

