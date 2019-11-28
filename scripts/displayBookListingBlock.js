// Constants
const book = db.collection("books");

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
                                 src="https://www.mycommercespot.com/wp-content/uploads/2019/06/books-521812297.jpg"/>
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
    for (let j = 0; j < 7; j++) {
        document.getElementById(`${j}`).addEventListener("click", function () {
            // The goal of this event listener is to make it so the docId gets written to local storage then can be called later when we look at the listing page.

            // This is currently not working >:(


            if (localStorage.getItem("docId") === idList[j]) {
                // If the stored id is already matching the id of the div that was clicked on the you don't need to store the local info again
                
                // Just move to the page
                document.location.href = "bookListing.html"
            } else {
                localStorage.setItem("docId", idList[j])
                document.location.href = "bookListing.html"
            }

            
        })
    }
}

var idList = [];

book.get().then(function (querySnapshot) {
    let index = 0;
    // We keep an index so we can assign to a tag later.
    querySnapshot.forEach(function (doc) {
        let docTitle = doc.data().Title;
        let docDesc = doc.data().Description;
        let docName = doc.id;
        // This is to get the generated ID of the document
        idList.push(docName)
        // docName will keep the ID of each listing
        // console.log(docName)
        localStorage.setItem("test", "test is working")
        // test is to test localStorage is working
        localStorage.setItem("docId", "If you see this the test failed.")
        // docId is to see if I overwrite the localStorage correctly or not. If you see this on the other page console when clicking on the a book that means the overwrite has FAILED
        let comp = new blockComponent(docTitle, docDesc, docName, index);
        comp.displayListingBlock();
        index += 1;
        // Add one to the index to make the next id be unique
        console.log(comp)
    });
    addOnClick();
});
encod