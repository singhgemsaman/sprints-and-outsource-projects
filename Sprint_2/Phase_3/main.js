let base = 'INR';
let select_curr = 'INR';
let apiUrl = `https://api.frankfurter.dev/v1/latest?base=INR`;
const curr_opt = document.getElementById("currency_options");
let expense = null; let salary = 0; let exp_name = null;
const submit_btn = document.getElementById("calculate");
// const metrics = document.getElementById("metrics");
const convert = document.getElementById("convert");
const reset_btn = document.getElementById("reset");
const error = document.getElementById("error");
let total_expense = 0
let piechart = null;
let multiplier = 1;
let rate = null;
let counter = 0;
let local_records = {
    base_store: "",
    arr_len: 0,
    salary: 0,
    name_arr: [],
    expense_arr: []
}




const check_records = localStorage.getItem("records");
if (!check_records) {
    localStorage.setItem("records", JSON.stringify(local_records));
} else {
    local_records = JSON.parse(check_records);
    display();
}

if (local_records.base_store) {
    select_curr = local_records.base_store;
    convert.innerHTML = select_curr;
}
fetchFrankfurterData();


reset_btn.addEventListener('click', () => {
    document.getElementById("input_form").reset();
    error.classList.add("hidden");
    local_records = {
        base_store: base,
        arr_len: 0,
        salary: 0,
        name_arr: [],
        expense_arr: []
    }
    localStorage.setItem("records", JSON.stringify(local_records));
    display();
})



function chart_display(remaining_salary, total_expense) {
    if (piechart) {
        piechart.destroy();
    }
    const ctx = document.getElementById('piechart');
    piechart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Remaining Salary", "Total Expense"],
            datasets: [{
                data: [remaining_salary, total_expense],
                backgroundColor: ["rgba(0, 123, 255, 0.5)", "rgba(255, 99, 132, 0.5)"]
            }],
            hoverOffset: 4,
        }
    });
}




function validateInput(salary, name, expense, total_ecpense) {
    if (salary === "" || name === "" || expense === "") {
        return "Please fill in all the fields.";
    } else if (Number(salary) < 0 || Number(expense) < 0) {
        return "Please enter positive numbers for salary and expense.";
    } else if (salary < total_ecpense + Number(expense)) {
        return "cannot afford!<br/>expense is greater than the remaining salary."
    }
    return false;
}



function display() {
    counter = local_records.arr_len;
    total_expense = 0;
    local_records.expense_arr.map(x => total_expense += Number(x));
    const list = document.getElementById("card-list");
    list.innerHTML = "";
    for (let i = 0; i < counter; i++) {
        const list_item = document.createElement("li");
        list_item.className = "flex flex-col rounded-xl px-5 py-4 shadow-sm border border-gray-200";
        list_item.innerHTML = `
        <div class="flex justify-between items-start">
        <div>
        <span class="text-xs text-gray-400">#${i + 1}</span>
        <p class="text-gray-800 font-medium pl-5">${local_records.name_arr[i]}</p>
        </div>
        <div class="text-right">
        <p class="text-red-500 font-semibold">${select_curr} ${(local_records.expense_arr[i] * multiplier).toFixed(2)}</p>
        <button onclick="del_entry(${i + 1})"
        class="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-2 py-2 rounded cursor-pointer">
        🗑
        </button>
        </div>
        </div>
        `;
        list.appendChild(list_item);
    }
    const total_salary_card = document.getElementById("total_salary_card");
    const total_expense_card = document.getElementById("total_expense_card");
    const remaining_balance_card = document.getElementById("remaining_balance_card");
    total_salary_card.innerHTML = `${select_curr} ${(local_records.salary * multiplier).toFixed(2)}`;
    total_expense_card.innerHTML = `${select_curr} ${(total_expense * multiplier).toFixed(2)}`;
    remaining_balance_card.innerHTML = `${select_curr} ${((local_records.salary - total_expense) * multiplier).toFixed(2)}`;
    document.getElementById("total_salary").value = Number(local_records.salary) * multiplier || "";
    if ((((local_records.salary - total_expense) * multiplier) < (local_records.salary * multiplier * 0.1))) {
        document.getElementById("critical_msg").classList.remove("hidden");
        remaining_balance_card.classList.add("text-red-600");
    }else{
        document.getElementById("critical_msg").classList.add("hidden");
        remaining_balance_card.classList.remove("text-red-600");

    }

    chart_display(local_records.salary - total_expense, total_expense);
}



function del_entry(index) {
    local_records.name_arr.splice(index - 1, 1);
    local_records.expense_arr.splice(index - 1, 1);
    local_records.arr_len--;
    localStorage.setItem("records", JSON.stringify(local_records));
    display();
}



submit_btn.addEventListener('click', () => {
    expense = document.getElementById("expense_amount").value.trim();
    salary = document.getElementById("total_salary").value.trim();
    exp_name = document.getElementById("name").value.trim();

    error.classList.add("hidden");
    const validationMessage = validateInput(salary, exp_name, expense, total_expense * multiplier)
    if (validationMessage) {
        error.innerHTML = validationMessage;
        error.classList.remove("hidden");
        return;
    }

    local_records.expense_arr.push(Number(expense) / multiplier);
    local_records.salary = Number(salary) / multiplier;
    local_records.name_arr.push(exp_name);
    total_expense += Number(expense);
    local_records.arr_len++;

    document.getElementById("input_form").reset();

    display();
    localStorage.setItem("records", JSON.stringify(local_records));

});



function set_multiplier(currency) {
    select_curr = currency;
    local_records.base_store = currency;
    multiplier = rate[currency];
    convert.innerHTML = currency;
    curr_opt.classList.toggle("hidden");
    localStorage.setItem("records", JSON.stringify(local_records));
    display();
}



async function fetchFrankfurterData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        rate = data.rates;
        rate['INR'] = 1;

        if (rate[select_curr]) {
            multiplier = rate[select_curr];
        }

        curr_opt.innerHTML = "";
        Object.keys(rate).forEach(element => {
            const curr = document.createElement("li");
            curr.innerHTML = `<button onclick="set_multiplier('${element}')"
                class="text-sm w-inherit bg-white rounded text-black hover:border px-3 py-1">
                ${element}
            </button>`;
            curr_opt.appendChild(curr);
        });

        display();
        return data;
    } catch (error) {
        console.error('Error calling API:', error);
        throw error;
    }
}

convert.addEventListener('click', () => {
    curr_opt.classList.toggle("hidden");
})


function export_pdf() {
    const { jsPDF } = window.jspdf
    var doc = new jsPDF()

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(30);
    doc.text('REPORT', 15, 15);

    doc.setFontSize(13);
    doc.setFont("Helvetica", "normal");
    doc.text(`Balance: ${select_curr} ${local_records.salary * multiplier - total_expense * multiplier}`, 15, 25)
    doc.text(`Total Expense: ${select_curr} ${total_expense * multiplier}`, 15, 30)

    doc.autoTable({
        head: [['S.No', 'Expense Name', `Expense Amount(${select_curr})`]],
        body: local_records.name_arr.map((name, i) => [
            i + 1, name, local_records.expense_arr[i] * multiplier
        ]),
        startY: 40
    })
    doc.save('table.pdf')
}