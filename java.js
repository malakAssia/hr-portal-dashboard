

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let leaves = JSON.parse(localStorage.getItem("leaves")) || 0;




const employeesBody = document.getElementById("employeesBody");

const modal = document.getElementById("employeeModal");
const form = document.getElementById("employeeForm");

const empName = document.getElementById("empName");
const empRole = document.getElementById("empRole");
const empCin = document.getElementById("empCin");
const empDepartment = document.getElementById("empDepartment");
const empStatus = document.getElementById("empStatus");
//kpi var
const kpiEmployees = document.getElementById("kpiEmployees");
const kpiCandidates = document.getElementById("kpiCandidates");
const kpiNew = document.getElementById("kpiNew");
const kpiLeave = document.getElementById("kpiLeave");




function openModal(){
  modal.classList.remove("hidden");
}

function closeModal(){
  modal.classList.add("hidden");
  form.reset();
}


//liste employer

function renderEmployees(){
  employeesBody.innerHTML = "";

  employees.forEach((e, index) => {
    employeesBody.innerHTML += `
      <tr>
        <td class="employee">
          <img src="https://i.pravatar.cc/40?img=${index + 1}">
          ${e.name}
        </td>
        <td>${e.role}</td>
        <td>${e.cin}</td>
        <td>${e.department}</td>
        <td>
          <span class="status ${e.status === "ACTIF" ? "active" : "onboarding"}">
            ${e.status}
          </span>
        </td>
        <td class="account">Activé</td>
        <td class="actions">
          <button class="btn-icon delete" onclick="removeEmployee(${index})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  updateKPI();
}


//ajout

form.addEventListener("submit", function(e){
  e.preventDefault();

  const employee = {
    name: empName.value,
    role: empRole.value,
    cin: empCin.value,
    department: empDepartment.value,
    status: empStatus.value
  };

  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  renderEmployees();
  closeModal();
});


//supprimer

function removeEmployee(index){
  if(confirm("Supprimer cet employé ?")){
    employees.splice(index, 1);

    leaves++;
    localStorage.setItem("leaves", leaves);
    localStorage.setItem("employees", JSON.stringify(employees));

    renderEmployees();
  }
}


//kpi

function updateKPI(){
  // Total employes
  kpiEmployees.textContent = employees.length;

  // Nv employes
  const newEmployees = employees.filter(
    e => e.status === "EN INTÉGRATION"
  ).length;
  kpiNew.textContent = newEmployees;

  // Candidatures 
  kpiCandidates.textContent = 12;

  // Demissions
  kpiLeave.textContent = leaves;
}


//init 

renderEmployees();
