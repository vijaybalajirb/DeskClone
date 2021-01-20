
function createTicket() {
    var title = document.getElementById("title").value;

    var description = document.getElementById("desc").value;

    var email = document.getElementById("email").value;

    var name = document.getElementById("name-ticket").value;

    if (title && description && email && name) {
        createFreshdeskTicket(title, description, email, name);
    } else {
        alert('Please Fill all the details');
    }
}

function createFreshdeskTicket(title, description, email, name) {
    fetch("https://newaccount1611041898747.freshdesk.com/api/v2/tickets", {

        method: "POST",
        body: JSON.stringify({
            description: `${description}`,
            email: `${email}`,
            priority: 1,
            status: 2,
            subject: `${title}`,
            name: `${name}`
        }),
        headers: {
            Authorization: "Basic " + btoa('cIxywjV8pJzxh7QLsrS' + ":x"),
            "Content-Type": "application/json;charset=utf-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then(function (jsonData) {
            if (jsonData) {
                let myAlert = document.getElementById('myAlert');
                myAlert.style.display = 'block';      
                myAlert.querySelector('button[data-hide]').addEventListener('click', function () {
                    myAlert.style.display = 'none';
                });
                setTimeout(() => {
                    myAlert.style.display = 'none';
                }, 5000);
            }
            document.getElementById("name-ticket").value = "";
            document.getElementById("desc").value = "";
            document.getElementById("title").value = "";
            document.getElementById("email").value = "";
        })
        .catch((error) => {
            console.error(error);
            alert('Please try after some time. Unable to create ticket at the moment');
        });
}





















