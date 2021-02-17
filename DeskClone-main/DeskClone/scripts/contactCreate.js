document.getElementById("createContact-btn").addEventListener("click", () => {
    var nameContact = document.getElementById("full-name").value;
    console.log(nameContact);
    var emailContact = document.getElementById("contact-email").value;
    console.log(emailContact);
    var phoneContact = document.getElementById("contact-number").value;
    console.log(phoneContact);

    if (nameContact && emailContact && phoneContact) {
        createFreshdeskContact(nameContact, emailContact, phoneContact);
    } else {
        alert('Please try after some time unable to create ticket');
    }
});

function createFreshdeskContact(nameContact, emailContact, phoneContact){

    fetch("https://newaccount1611041898747.freshdesk.com/api/v2/contacts", {

        method: "POST",
        body: JSON.stringify({
            name: `${nameContact}`,
            email: `${emailContact}`,
            phone: `${phoneContact}`
        }),
        headers: {
            Authorization: "Basic " + btoa('cIxywjV8pJzxh7QLsrS' + ":x"),
            "Content-Type": "application/json;charset=utf-8"
        }
    })
        .then((response) => {
            clearInputfields();
            return response.json();
        })
        .then(function (jsonData) {
            if (jsonData) {
                let myAlert = document.getElementById('myAlert-contact');
                // Show the alert box
                myAlert.style.display = 'block';
                // Override Bootstrap's standard close action
                myAlert.querySelector('button[data-hide]').addEventListener('click', function () {
                    myAlert.style.display = 'none';
                });
                setTimeout(() => {
                    myAlert.style.display = 'none';
                }, 5000);
            }
        })
        .catch((error) => {
            console.error(error);
            alert('Please Try After some time. Unable to create contact');
        });
}

function clearInputfields() {
    document.getElementById("full-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-number").value = "";
}