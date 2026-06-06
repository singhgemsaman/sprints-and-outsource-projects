const submit_btn = document.getElementById("calculate");
const metrics = document.getElementById("metrics");
const error = document.getElementById("error");
let total_expense = 0


function validateInput(salary, name, expense) {
    if (salary === "" || name === "" || expense === "") {
        return "Please fill in all the fields.";
    }else if (Number(salary) < 0 || Number(expense) < 0) {
        return "Please enter positive numbers for salary and expense.";
    }
    return false;
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

    const remaining_salary = Number(salary) - Number(expense);
    const list = document.getElementById("list-body");
    const list_item = document.createElement("tr");
    list_item.innerHTML = `
        <td class="border border-gray-300 p-2">${name}</td>
        <td class="border border-gray-300 p-2">${expense}</td>
    `;
    list.appendChild(list_item);
});