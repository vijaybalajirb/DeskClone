
const Contacts = {};
Contacts.cid = "";

//gets id of that update button
function UpdateContact(x) {
    Contacts.cid = "";
    let cid = x.id.replace(/[^0-9]/g, '');
    Contacts.cid = cid;

    document.getElementById("update-full-name").value = document.getElementById(`contacts-name-id-${Contacts.cid}`).innerHTML;
    document.getElementById("update-contact-email").value = document.getElementById(`contacts-email-id-${Contacts.cid}`).innerHTML;
    document.getElementById("update-contact-number").value = document.getElementById(`contacts-phone-id-${Contacts.cid}`).innerHTML;

}

// updates contact
function APIUpdateContact() {

    let nameContactUpdate = document.getElementById("update-full-name").value;
  
    let emailContactUpdate = document.getElementById("update-contact-email").value;

    let phoneContactUpdate = document.getElementById("update-contact-number").value;


    let contactId = Contacts.cid;
 

    if (nameContactUpdate && emailContactUpdate && phoneContactUpdate && contactId) {
        // make changes in UI
        document.getElementById(`contacts-name-id-${Contacts.cid}`).innerHTML = nameContactUpdate;
        document.getElementById(`contacts-email-id-${Contacts.cid}`).innerHTML = emailContactUpdate;
        document.getElementById(`contacts-phone-id-${Contacts.cid}`).innerHTML = phoneContactUpdate;
        updateFreshdeskContact(nameContactUpdate, emailContactUpdate, phoneContactUpdate, contactId);
    } else {
        alert('Please Try again after some time');
    }
}

function updateFreshdeskContact(nameContactUpdate, emailContactUpdate, phoneContactUpdate, contactId, ListContacts) {
    fetch("https://newaccount1611041898747.freshdesk.com/api/v2/contacts/" + contactId, {

        method: "PUT",
        body: JSON.stringify({
            name: `${nameContactUpdate}`,
            email: `${emailContactUpdate}`,
            phone: `${phoneContactUpdate}`
        }),
        headers: {
            Authorization: "Basic " + btoa('cIxywjV8pJzxh7QLsrS' + ":x"),
            "Content-Type": "application/json;charset=utf-8"
        }
    })
        .then((response) => {
            clearInputfields();
        })
        .then(function (jsonData) {
        })
        .catch((error) => {
            console.error(error);
            alert('Please Try Again after sometime');
        });
}


function clearInputfields() {
    document.getElementById("update-full-name").value = "";
    document.getElementById("update-contact-email").value = "";
    document.getElementById("update-contact-number").value = "";
}
