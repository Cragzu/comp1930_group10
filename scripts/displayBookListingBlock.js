// Constants
const book = db.collection("books");


function blockComponent (title, desc) {
    this.title = title;
    this.description = desc;
    this.titleText = document.createElement('h1');
    this.descText = document.createElement('p');
    this.displayListingBlock = function() {
        document.write(`
        <a href="bookListing.html">
            <div class="container-fluid" id="bookListingBlock">
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
            
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
        </a>
    `);
        this.titleText.appendChild(document.createTextNode(title));
        this.descText.appendChild(document.createTextNode(desc));
        document.getElementById('bookInfoContainer').appendChild(this.titleText);
        document.getElementById('bookInfoContainer').appendChild(this.descText);
    }

}

book.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        let docTitle = doc.data().Title;
        let docDesc = doc.data().Description;
        let comp = new blockComponent(docTitle, docDesc);
        comp.displayListingBlock();

        console.log('Title: ', docTitle, ' | Desc: ', docDesc);
    });
});
