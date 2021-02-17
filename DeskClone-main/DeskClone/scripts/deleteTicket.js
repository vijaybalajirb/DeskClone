function DeleteTicket(x){
    let id = x.id.replace(/[^0-9]/g,'');    
    DeleteUIElement(id);
    APIDelete(id);
}

function DeleteUIElement(id){
    let ticketCard = document.getElementById(`card-ticket-id-${id}`);
    ticketCard.parentNode.removeChild(ticketCard);
}

function APIDelete(id){
    fetch("https://newaccount1611041898747.freshdesk.com/api/v2/tickets/"+id,{

        method: "DELETE",
        headers: {
            Authorization: "Basic " + btoa('cIxywjV8pJzxh7QLsrS'+ ":x"),
            "Content-Type": "application/json;charset=utf-8"
        }
    })
    .then((response)=>{
        console.log(response);
    })
    .catch((error) => {
        console.error(error);
        alert('Please try after some time');
    });
}