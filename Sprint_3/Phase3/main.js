const container = document.getElementById("container");
let data;
let mode = 0;
let url_list;
let repo_list;
let star_store;
const field_container = document.getElementById("field_container");
const card_container = document.getElementById("card_container");
const top_repos_container = document.getElementById("top_repos_container");
const api = "https://api.github.com/users/";

field_container.innerHTML = `
    <input type="text" placeholder="Enter a username" id="input_1" class="border rounded px-2 focus:outline-none grow"/>
`;

function switch_mode() {
    mode ^= 1;

    field_container.innerHTML = "";
    for (let i = 0; i <= mode; i++) {
        field_container.innerHTML += `
            <input type="text" placeholder="Enter a username" id="input_${i + 1}" class="border rounded px-2 focus:outline-none grow"/>
        `;
    }
    card_container.innerHTML = "";
    top_repos_container.innerHTML = "";

}

function battel_result(i) {
    const result = star_store[0] > star_store[1] ? [1, 0] : [0, 1];
    if (!mode) {
        return ` <div id="card_${i + 1}" class="border-2 rounded p-5 w-full md:w-1/2"> `
    }
    if (star_store[0] === star_store[1]) {
        return ` <div id="card_${i + 1}" class="border-2 rounded p-5 w-full md:w-1/2">
                <div class="text-center font-bold text-2xl">DRAW</div> `
    }
    if (result[i]) {
        return ` <div id="card_${i + 1}" class="border-2 border-green-500 rounded p-5 w-full md:w-1/2">
        <div class="text-center font-bold text-2xl text-green-500">WON</div> `
    }else {
        return ` <div id="card_${i + 1}" class="border-2 border-red-700 rounded p-5 w-full md:w-1/2">
        <div class="text-center font-bold text-2xl text-red-700">LOST</div> `
    }
}

function display() {
    card_container.innerHTML = "";
    top_repos_container.innerHTML = "";

    data.forEach((element, i) => {
        card_container.innerHTML += `
            ${battel_result(i)}
                <div ><img src="${element.avatar_url}" alt="Description of the image" class="size-25 rounded"></div>
                <div>START: ${star_store[i]}</div>
                <div class="">${element.name || "Name : N/A"}</div>
                <div class="">${element.login}</div>
                <div class="">${date_format(element.created_at.slice(0, element.created_at.indexOf('T')))}</div>
                <div class="">Bio: ${element.bio || "Empty"}</div>
                <a href="${element.html_url}" target="_blank" class="border rounded px-2 py-1">Visit Profile</a>
            </div>
        `;
        top_repos_container.innerHTML += `
            <div id="top repos list${i + 1}" class="border-2 rounded p-5 w-full md:w-1/2">
                ${top_repos(repo_list[i])}
            </div>
        `;

    });
}

async function submit_all() {
    // loader
    card_container.innerHTML = `<div class="font-bold text-3xl">Loading...</div>`;
    top_repos_container.innerHTML = "";

    url_list = [];
    data = [];

    for (let i = 0; i <= mode; i++) {
        url_list.push(
            fetch(api + document.getElementById(`input_${i + 1}`).value.trim())
        );
    }

    try {
        const responses = await Promise.all(
            url_list
        );

        responses.forEach(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
        });

        data = await Promise.all(
            responses.map(response => response.json())
        );

        await get_repos_list();
        display();
    } catch (error) {
        handle_err(Number(error.message));
    }
}

function handle_err(status) {
    if (status === 404) {
        card_container.innerHTML = `
            <div id="card_1" class="border border-red-600 font-bold text-2xl text-red-600 rounded px-2 w-full md:w-1/2 text-center">Recheck the usernames for Invalid username.</div>
            `;
    } else if (status === 403) {
        card_container.innerHTML = `
            <div id="card_1" class="border border-red-600 font-bold text-2xl text-red-600 rounded px-2 w-full md:w-1/2 text-center">Requests Limit Reached.</div>
            `;
    } else {
        card_container.innerHTML = `
            <div id="card_1" class="border border-red-600 font-bold text-2xl text-red-600 rounded px-2 w-full md:w-1/2 text-center">Failed to connect to Github.</div>
            `;
    }
}

async function get_repos_list() {
    try {
        const responses = await Promise.all(data.map(user => fetch(`${user.repos_url}?sort=updated&per_page=100`)));
        repo_list = await Promise.all(responses.map(response => response.json()));
        battle(repo_list);
    } catch (error) {
        console.error("Failed to fetch repositories.")
    }
}

function top_repos(repos) {
    repos = repos.slice(0, 5);
    let items = "";
    if (!repos.length) {
        return "No Repositories to show.";
    }
    for (const repo of repos) {
        items += `
        <div class="py-1 px-2"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
        `;
    }
    return items;
}

function battle(repo_list) {
    
    star_store = repo_list.map(
        repos => repos.reduce(
            (sum, repo) => sum + repo.stargazers_count,
            0
        )
    );
}

function date_format(date_raw) {
    let date = date_raw.split("-");
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JLY", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return (`${date[2]} ${months[parseInt(date[1]) - 1]} ${date[0]}`);
}