function init() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(`There is a user logged in. User: ${user.displayName}`)
            let displayName = user.displayName;
            let displayEmail = user.email;

            localStorage.setItem("userDisplayName", displayName);
            localStorage.setItem("userEmail", displayEmail);
            // To avoid having to use Firebase I'm using local storage

            db.collection("users").doc(user.displayName).set({
                Name: displayName,
                Email: displayEmail,
            });

            document.getElementById("userName").innerHTML = displayName;
            document.getElementById("userEmail").innerHTML = displayEmail;

        } else {
            console.log(`No one is logged in`);

        }
    });


}

init();
