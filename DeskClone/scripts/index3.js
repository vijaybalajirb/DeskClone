
var dataFromLogin = localStorage['objectToPass'];
dataFromLoginArr = dataFromLogin.split(',');
var domainName = dataFromLoginArr[0];
var apiKey = dataFromLoginArr[1];

tickets = {};
tickets.yourdomain = domainName;
tickets.api_key = apiKey;
tickets.statusArray = {2:"Open",3:"Pending",4:"Resolved",5:"Closed"};
tickets.priorityArray = {1:"Low",2:"Medium",3:"High",4:"Urgent"};
tickets.Ids = [];

document.addEventListener("DOMContentLoaded", ListAllTickets);

function ListAllTickets(){

    fetch("https://newaccount1611041898747.freshdesk.com/api/v2/tickets", {
        headers: {
            "Authorization": "Basic " + btoa('cIxywjV8pJzxh7QLsrS'+ ":x"),
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: "json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            
            document.getElementById("tickets-deck").innerHTML = "";
            ticketsIds = [];
            ticketsIds.length = 0;
            if(tickets.Ids.length){
                tickets.Ids.length = 0;
            }
           
            for (let i = 0; i < jsonData.length; i++) {
                ticketsIds.push(jsonData[i].id);
                tickets.Ids.push(jsonData[i].id);
            }

            for (let i = 0; i < ticketsIds.length; i++) {
                createUIcard(i,ticketsIds);
            }

        })
        .catch(function (error) {
            console.log(error);
        });

        function createUIcard(i){
            
            fetch("https://newaccount1611041898747.freshdesk.com/api/v2/tickets/" + ticketsIds[i] + "?include=requester", {
                headers: {
                    "Authorization": "Basic " + btoa('cIxywjV8pJzxh7QLsrS'+ ":x"),
                    contentType: "application/json; charset=utf-8",
                    type: 'GET',
                    dataType: "json"
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                let ticketsTab2 = document.getElementById("tickets-deck");
                let cardTicket = `
                                 <div class="card border-dark mb-4" id= "card-ticket-id-${jsonData.id}" style="min-width:100%;  overflow: auto;">
                                <div class="card-header">
                                    <h5>${jsonData.subject} <span class="badge badge-info" id="priority-id-${jsonData.id}">${tickets.priorityArray[jsonData.priority]}</span> <span
                                            class="badge badge-warning" id="status-id-${jsonData.id}">${tickets.statusArray[jsonData.status]}</span> </h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-title" id="name-ticket-${jsonData.id}">${jsonData.requester.name}</p>
                                    <p class="card-text"><i class="fas fa-envelope"></i> ${jsonData.requester.email}</p>
                                    <p>ID: ${jsonData.id}</p>
                                    <div class="description">${jsonData.description}</div>
                
                                    <p class="mt-4 btns-update-delete">
                                        <a class="btn btn-outline-dark" id="update-btn-id-${jsonData.id}" data-toggle="collapse" href="#collapseExample-${jsonData.id}"
                                            role="button" aria-expanded="false" aria-controls="collapseExample">
                                            Update
                                        </a>
                                        <button class="btn btn-outline-danger" onclick="DeleteTicket(this);" id="delete-id-${jsonData.id}">Delete</button>
                                    </p>
                                    <div class="collapse" id="collapseExample-${jsonData.id}">
                                        <div class="card card-body">
                                            <select name="statusUpdates" class="m-2 p-2" id="update-status-${jsonData.id}">
                                                <option value="2">Open</option>
                                                <option value="3">Pending</option>
                                                <option value="4">Resolved</option>
                                                <option value="5">Closed</option>
                                            </select>
                                            <select name="priorityUpdates" class="m-2 p-2" id="update-priority-${jsonData.id}">
                                                <option value="1">Low</option>
                                                <option value="2">Medium</option>
                                                <option value="3">High</option>
                                                <option value="4">Urgent</option>
                                            </select>
                
                                            <button class="btn btn-primary submit-btn" onclick = "Submit_UpdateTicket(this);" id="submit-update-id-${jsonData.id}" data-toggle="collapse" href="#collapseExample-${jsonData.id}"
                                            role="button" aria-expanded="false" aria-controls="collapseExample">Submit</button>
                                        </div>
                                    </div>
                
                                </div>
                            </div>`;
                ticketsTab2.innerHTML += cardTicket;

                
            })
            .catch(function (error) {
                console.log(error);
            });
        }
}