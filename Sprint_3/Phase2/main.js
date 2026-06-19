let username_input = null;
let err_msg = null;
let repos = null;
let data = null;
const top_repos = document.getElementById("top_repos");

async function search() {
    const err_card = document.getElementById("err_card");
    const card_container = document.getElementById("card_container");
    username_input = document.getElementById("username_input").value.trim();
    document.getElementById("loader").classList.toggle("switch");
    top_repos.innerHTML = "";

    if (data) {
        card_container.classList.replace("flex", "hidden");
    }
    if (err_msg) {
        err_card.classList.replace("flex", "hidden");
    }


    try {
        const response = await fetch(`https://api.github.com/users/${username_input}`, { method: 'GET' });

        if (!response.ok) {
            err_card.classList.replace("hidden", "flex");
            err_msg = handle_err(response.status);
            err_card.innerHTML = err_msg;
            return;
        }

        data = await response.json()

        repo_list();

    } catch (error) {
        console.error("something went wrong");
    }
    finally {
        document.getElementById("loader").classList.toggle("switch");
    }

    display();
}

async function repo_list() {
    const response = await fetch(`${data.repos_url}?sort=updated&per_page=5`, { method: 'GET' });
    repos = await response.json();
    if (!repos.length) {
        top_repos.innerHTML = "No Repositories to show."
        return
    }

    let items = "";

    for (const i of repos) {
        items += `
            <li class="py-1 px-2"><a href="${i.html_url}" target="_blank">${i.name}</a></li>
        `
    };
    top_repos.innerHTML = items;
}

function display() {
    const card_container = document.getElementById("card_container");
    document.getElementById("avater").src = data.avatar_url;
    const identity = document.getElementById("identity");
    identity.innerHTML = `
        <li class="text-gray-900 text-3xl">${data.name || "Name : N/A"}</li>
        <li class="text-gray-600">${data.login}</li>
        <li class="text-gray-700">${date_format(data.created_at.slice(0, data.created_at.indexOf('T')))}</li>
    `
    document.getElementById("bio").innerHTML = `
        Bio: ${data.bio || "Empty"}
    `
    document.getElementById("visit_site").href = `${data.html_url}`
    card_container.classList.replace("hidden", "flex");
}

function handle_err(status) {
    if (status === 404) {
        return (`<div>User Not Found !</div> <div>Enter a valid username.</div>`);
    }
    if (status === 403) {
        return (`<div>Requests Limit Reached.</div>`);
    }
}

function date_format(date_raw){
    let date = date_raw.split("-");
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JLY", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return (`${date[2]} ${months[parseInt(date[1]) - 1]} ${date[0]}`);
}