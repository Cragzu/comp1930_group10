// Constants
const book = db.collection("books");

// Display component
function displayListingBlock(title, description) {
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
                        <div class="col-sm-8">
                            <h1 id="blockTitle">Book Title</h1>
                            <p id="blockDesc">This is placeholder text for the short description of the book.</p>
                        </div>
            
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>
        </a>
    `);
   document.getElementById("blockTitle").innerHTML = title;
   document.getElementById("blockDesc").innerHTML = description;

}



book.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        let title = doc.data().Title;
        let author = doc.data().Author;
        let desc = doc.data().Description;
        // console.log(doc.id, " => ", doc.data());
        console.log('Title: ', title, ' | Author: ', author);
        document.write(title);
        displayListingBlock(doc.data().Title, doc.data().Description);
    });
});







// Get data from firestore to display
// function displayBlocksFromDatabase() {
//     book.onSnapshot(function (doc) {
//         if (doc && doc.exists) {
//             const myData = doc.data();
//             console.log(myData);
//
//             displayListingBlock('lala', 'asdahsdasf');
//         }
//     });
//
//
// }
// displayListingBlock('a', '3')
// displayBlocksFromDatabase();

