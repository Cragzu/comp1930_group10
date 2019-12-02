let userStatus;

function listBook(author, title, price, description, seller) {

    db.collection("books").add({
        Author: author,
        Title: title[0].toUpperCase() + title.slice(1),
        Price: price,
        Description: description,
        Seller: seller

    }).then(function () {
        window.alert("Your book was listed successfully!");
        window.location = "viewAccount.html";
    }).catch(function () {
        console.log("User has failed trying to list a book.");
    })
}

function checkTextBox() {
    // This function will check all the text boxes first before you can list a book
    let bookTitle = document.getElementById("bookTitle").value;
    let authorName = document.getElementById("authorName").value;
    let bookPrice = document.getElementById("bookPrice").value;
    let bookDescription = document.getElementById("bookDescription").value;
    let user = firebase.auth().currentUser;
    let userDisplay = user.displayName;

    if (bookTitle && !(/\d/.test(authorName)) && (bookPrice && !isNaN(bookPrice)) && bookDescription) {
        /*
        The conditions check is:
        1. Check if something is filled in for title
        2. Check if author name is only letters; this will automatically fail if nothing is filled in
        3. (!isNaN(bookPrice) && bookPrice) Check if bookPrice is a number or not. Th !isNaN will return true
        if the string is only numbers. And having bookPrice by itself will check where the text field is empty or not.
        4. If there is ANYTHING typed in the book description section it will pass
        */

        // Once all the conditions are passed we can then give all of out data to the listBook function
        //This will take all of the data inputted and give it to the database
        listBook(authorName, bookTitle, bookPrice, bookDescription, userDisplay);
    } else {
        alert("At least one of the four fields has not been entered");
    }
}


function init() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(`A user is logged in: ${user.displayName}`)
        } else {
            console.log(`No user us logged in.`)
        }
    });
    document.getElementById("listButton").onclick = checkTextBox;
    // When you click the button it will check the fields before you can list the book.

}

init();