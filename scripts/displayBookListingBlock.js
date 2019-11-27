// Constants
const book = db.collection("books");

function blockComponent(title, desc, docId, i) {
    // This object constructor will take the book title, book description, and document name, which is docId
    this.title = title;
    this.description = desc;
    this.docId = docId;
    // Keep the document ID
    this.i = i;
    // THis is an index to keep track of
    this.titleText = document.createElement('h1');
    this.descText = document.createElement('p');
    this.displayListingBlock = function () {
        document.body.innerHTML += (`
            <div class="container-fluid" id="bookListingBlock">
                <div class="row">
                    <div class="col-sm-2"></div>
                    
                    <div class="col-sm-8" id="${this.i}">
                   
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


        console.log(docId)







    }
}
function later() {
    for (let j = 0; j < 7; j++) {
        document.getElementById(`${j}`).addEventListener("click", function () {
            // The goal of this event listener is to make it so the docId gets written to local storage then can be called later when we look at the listing page.

            // This is currently not working >:(


            // if (localStorage.getItem("docId") === docId){
            //     console.log("This ID has already been stored.")
            // }else{
            //     localStorage.setItem("docId", docId)
            // }

            localStorage.setItem("docId", idList[j])
            document.location.href = "bookListing.html"
        })
    }
}

var idList = [];

book.get().then(function (querySnapshot) {
    let index = 0;
    querySnapshot.forEach(function (doc) {
        let docTitle = doc.data().Title;
        let docDesc = doc.data().Description;
        let docName = doc.id;
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
        console.log(comp)
    });
    later();
});
encod