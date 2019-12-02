const docId = localStorage.getItem("docId");
const userDisplayName = localStorage.getItem("userDisplayName");
let cartIndex;
let sameId;

function getCurrentData() {

    let bookTitle = document.getElementById("bookTitle");
    let bookAuthor = document.getElementById("bookAuthor");
    let bookDesc = document.getElementById("bookDescription");
    let bookSeller = document.getElementById("seller");
    let bookPrice = document.getElementById("price");

    db.collection("books").doc(`${docId}`).onSnapshot(function (doc) {
        // Try to access the data if the docId change is working.

        bookTitle.innerHTML = doc.data().Title;
        bookAuthor.innerHTML = `&nbsp;by ${doc.data().Author}`;
        bookDesc.innerHTML = `Description: ${doc.data().Description}`;
        bookSeller.innerHTML = `Seller: ${doc.data().Seller}`;
        bookPrice.innerHTML = `Price: &#36;${doc.data().Price}`;

    })
}
function bookIteration() {
    cartIndex = 1;
    // Set the index at one so the first book that is listed will be called "book1"
    sameId = false;


    db.collection("users").doc(userDisplayName).collection("cart").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {

                // doc.data() is never undefined for query doc snapshots
                if (doc.id === "book" + pad(cartIndex, 5)) {

                    if (doc.data().bookId === docId) {

                        sameId = true;
                    }

                    // If we find a book with the same name then we increase our index again.
                    // It will keep going until it hits the non existing document
                    // After that the cartIndex will stay the same number and we will make a new doucment with the current cartIndex. When adding to a cart the ways books are given ids is that it will always start with book1 and and gaps in number will be filled in.
                    cartIndex += 1;

                }

            });
            addBookToCart();
        });

}

function pad(n, width, z) {
    // This function will allow the index to be consistent with the firebase.
    // If I do pad(1, 5) I will get 00001 back.
    // The only purpose of this function is to help sort the cart in Firebase.
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


function addBookToCart() {
    // This function is supposed to add books to the logged in user cart
    if (sameId !== true) {
        db.collection("users").doc(userDisplayName).collection("cart").doc("book" + pad(cartIndex, 5)).set({

            bookId: docId,
        }).then(function () {
            alert(`The book has been added to your cart!`)

        }).catch(function () {
            console.log(`We tried adding the book to the cart, but something has caused it to fail.`)
        })
    } else {
        alert(`You already added this book to your cart! Please view your cart to see it.`)
    }
}



function init() {
    // Run the functions in this script.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(`There is a user logged in. User: ${user.displayName}`);

        } else {
            console.log(`No one is logged in`);

        }
    });
    getCurrentData();
    document.getElementById("addToCart").onclick = bookIteration;
}

init();