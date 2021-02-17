function DeleteContact(x){
    let id = x.id.replace(/[^0-9]/g,'');     
    DeleteContactUIElement(id);
    APIContactDelete(id);
}

function DeleteContactUIElement(id){
    let contactsRowDelete = document.getElementById(`contacts-list-row-id-${id}`);
    contactsRowDelete.parentNode.removeChild(contactsRowDelete);
}

function APIContactDelete(deleteContactId) {
    fetch("https://newaccount1611041898747.freshdesk.com/api/v2/contacts/"+ deleteContactId, {

        method: "DELETE",
        headers: {
            Authorization: "Basic " + btoa('cIxywjV8pJzxh7QLsrS' + ":x"),
            "Content-Type": "application/json;charset=utf-8"
        }
    })
        .then(() => {
            clearInputfields();
        })
        .catch((error) => {
            console.error(error);
            alert('danger', 'Unable to delete ticket');
        });
}