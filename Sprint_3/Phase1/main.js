let username_input = null;
let err_msg = null
let data = null;

async function search(){
    const err_card = document.getElementById("err_card");
    username_input = document.getElementById("username_input").value.trim();
    document.getElementById("loader").classList.toggle("hidden");

    if (data) {
        card_container.classList.add("hidden");
    }
    if (err_msg) {
        err_card.classList.add("hidden");
    }


    try {
        const response = await fetch( `https://api.github.com/users/${username_input}`, {method:'GET'} );

        console.log(response);
        if(!response.ok){
            err_card.classList.remove("hidden");
            err_msg = handle_err(response.status);
            err_card.innerHTML = err_msg;
            return;
        }

        data = await response.json()
        console.log(data);

    } catch (error) {
        console.error("something went wrong");
    }
    finally{
        document.getElementById("loader").classList.toggle("hidden");
    }

    display();
}

function display (){
    const card_container = document.getElementById("card_container");
    document.getElementById("avater").src = data.avatar_url;
    const identity = document.getElementById("identity");
    identity.innerHTML = `
        <li class="">${data.name}</li>
        <li class="">${data.login}</li>
        <li class="">${data.created_at.slice(0, data.created_at.indexOf('T'))}</li>
    `
    document.getElementById("bio").innerHTML = `
        Bio: ${data.bio || "Empty"}
    `
    document.getElementById("visit_site").href = `${data.html_url}`
    card_container.classList.remove("hidden");
}

function handle_err(status) {
    if (status === 404) {
        return (`<div>User Not Found !</div> <div>Enter a valid username.</div>`);
    }
}