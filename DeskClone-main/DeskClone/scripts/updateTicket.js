function Submit_UpdateTicket(x){
    let id = x.id.replace(/[^0-9]/g,'');   
    console.log(id);
    let statusValue = document.getElementById(`update-status-${id}`).value;
    let priorityValue = document.getElementById(`update-priority-${id}`).value;

    UpdateBadgeText(priorityValue,statusValue,id);

    //Update Ticket via api call
    APIUpdateTicket(priorityValue,statusValue,id);
}

//Update badges fot status and priority
function UpdateBadgeText(priorityValue,statusValue,i){
    console.log('statusValue'+statusValue);
    console.log('priorityValue'+priorityValue);

    let statusArray = {2:"Open",3:"Pending",4:"Resolved",5:"Closed"};
    let priorityArray = {1:"Low",2:"Medium",3:"High",4:"Urgent"};
    let id = i;
     //Update badge of status 
     let newBadgeStatus = statusArray[statusValue];

     console.log('newBadgeStatus = '+newBadgeStatus);
     let statusSpan = document.getElementById(`status-id-${id}`);
     statusSpan.innerHTML = "";
      statusSpan.innerHTML = newBadgeStatus;
 
      //Update badge of priority
      let newBadgePriority = priorityArray[priorityValue];

      console.log('newBadgePriority = '+newBadgePriority);
 
     let prioritySpan = document.getElementById(`priority-id-${id}`);
     prioritySpan.innerHTML = "";
     prioritySpan.innerHTML = newBadgePriority;
}

//API Fetch call for update ticket

function APIUpdateTicket(priorityValue,statusValue,id) {
    priorityValue = parseInt(priorityValue);
    statusValue = parseInt(statusValue);
    
    fetch("https://newaccount1611041898747.freshdesk.com/api/v2/tickets/"+id, {            

        method: "PUT",
        body: JSON.stringify({
            priority: priorityValue,
            status: statusValue
        }),
        headers: {
            Authorization: "Basic " + btoa('cIxywjV8pJzxh7QLsrS' + ":x"),
            "Content-Type": "application/json;charset=utf-8"
        }
    })
        .then((response) => {
            alert('success', 'Ticket is successfully created');

        })
        .catch((error) => {
            console.error(error);
            alert('danger', 'Unable to create ticket');
        });
}

