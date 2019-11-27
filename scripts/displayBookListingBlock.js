// Constants
const book = db.collection("books");

function blockComponent (title, desc, docId) {
    // This object constructor will take the book title, book description, and document name, which is docId
    this.title = title;
    this.description = desc;
    this.docId = docId;
    this.titleText = document.createElement('h1');
    this.descText = document.createElement('p');
    this.displayListingBlock = function() {
        document.body.innerHTML += (`
            <div class="container-fluid" id="bookListingBlock">
                <div class="row">
                    <div class="col-sm-2"></div>
                    
                    <div class="col-sm-8">
                    <a href="bookListing.html">
                        <div class="col-sm-4">
                            <img class="bookImage"
                                 src="https://www.mycommercespot.com/wp-content/uploads/2019/06/books-521812297.jpg"/>
                        </div>
                        <div class="col-sm-8" id="bookInfoContainer"> <!--Book title and description will go here-->
                        </div>
                    </a>  
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

book.get().then(function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
        let docTitle = doc.data().Title;
        let docDesc = doc.data().Description;
        let docName = doc.id;
        console.log(docName)

        let comp = new blockComponent(docTitle, docDesc, docName);
        comp.displayListingBlock();

    });
});
encod