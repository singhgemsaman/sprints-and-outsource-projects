const submit_btn = document.getElementById("calculate");
const metrics = document.getElementById("metrics");
const error = document.getElementById("error");
let total_expense = 0
let piechart = null;
let counter = 0;
let local_records = {
    arr_len: 0,
    salary: 0,
    name_arr: [],
    expense_arr: []
}



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




function validateInput(salary, name, expense) {
    if (salary === "" || name === "" || expense === "") {
        return "Please fill in all the fields.";
    }else if (Number(salary) < 0 || Number(expense) < 0) {
        return "Please enter positive numbers for salary and expense.";
    }
    return false;
}



function display() {
    counter = local_records.arr_len;
    total_expense = 0;
    local_records.expense_arr.map(x => total_expense += Number(x));
    metrics.innerHTML = `${local_records.salary} - ${total_expense} = ${local_records.salary - total_expense}`
    const list = document.getElementById("list-body");
    list.innerHTML = ""; // Clear the existing list items
    for (let i = 0; i < counter; i++) {
        const list_item = document.createElement("tr");
        list_item.innerHTML += `
        <td id="${i+1}" class="border border-gray-300 p-2">${i+1}</td>
        <td class="border border-gray-300 p-2">${local_records.name_arr[i]}</td>
        <td class="border border-gray-300 p-2">${local_records.expense_arr[i]}</td>
        <td  class="border border-gray-300 p-2 text-center">
            <button onclick="del_entry(${i+1})" 
                class="bg-red-500 hover:bg-red-700
                text-white font-bold py-1 px-2 rounded">&#128465;</button>
        </td>
        `;
        list.appendChild(list_item);
    }
    chart_display(local_records.salary - total_expense, total_expense);
}



const check_records = localStorage.getItem("records");
if (!check_records) {
    localStorage.setItem("records", JSON.stringify(local_records));
}else{
    local_records = JSON.parse(check_records);
    display();
}



function del_entry(index) {
    local_records.name_arr.splice(index - 1, 1);
    local_records.expense_arr.splice(index - 1, 1);
    local_records.arr_len--;
    localStorage.setItem("records", JSON.stringify(local_records));
    display();
}



submit_btn.addEventListener('click', () => {
    const salary = document.getElementById("total_salary").value.trim();
    const name = document.getElementById("name").value.trim();
    const expense = document.getElementById("expense_amount").value.trim();
    total_expense += Number(expense);

    
    error.classList.add("hidden");
    const validationMessage = validateInput(salary, name, expense);
    if (validationMessage) {
        error.textContent = validationMessage;
        error.classList.remove("hidden");
        return;
    }

    metrics.innerHTML = `${salary} - ${total_expense} = ${salary - total_expense}`

    local_records.salary = Number(salary);
    local_records.name_arr.push(name);
    local_records.expense_arr.push(Number(expense));
    local_records.arr_len++;

    const remaining_salary = Number(salary) - Number(expense);
    display();
    // console.log(local_records);
    localStorage.setItem("records", JSON.stringify(local_records));
});