const form = document.getElementById("form");
const recordsContainer = document.getElementById("records-container");
const createButton = document.querySelector("#form button");

// formState = "CREATE" | "UPDATE"
let formState = "CREATE";

const employeesList = [ ];

let empId = 1000;
const onSubmitForm = (event) =>{
    //event.target => form element
   
    event.preventDefault();
    const employee = {
        employeeId: ++empId,
        name: event.target.name.value,
      
        salary: event.target.salary.value,
        team: event.target.team.value,
        role: event.target.role.value,
        comapnyName: event.target.companyName.value
    }
    
    if(formState == "CREATE"){
        addNewEmployeeRecord(employee);
    }else if(formState == "UPDATE"){
        // TODO: update the employee corresponding record

        formState = "CREATE"
        createButton.innerText = "Create Employee";
    }

    // after adding an employee reset the input values inside the form 
   form.reset();
}

function deleteRecord(event){
     if(formState === "UPDATE"){
      alert("Please update the record before deleting anything");
      return;
   }

    // delete  buttom reference = event.target

    const deleteButton = event.target;

    const record = deleteButton.parentNode.parentNode;
    //record = <tr></tr></tr> entire row element
    record.remove();  // removes this tr element from the dom tree

    const currentEmployeeId = parseInt(deleteButton.getAttribute("data-empid"));

    for(let i =0; i<employeesList.length; i++){
        if(employeesList[i].imployeeId === currentEmployeeId){
            // remove this object
            employeesList.splice(i, 1);
            break;
        }
    }


}

function fillFormWithData(employee){

    // fill the form with the object data
    for(let key in employee){
        // key = "employeId"
        if(key !== "employeeId"){
        form[key].value = employee[key];
        }
    }

    createButton.innerText = "Update Employee";
    formState = "UPDATE";
}

function editRecord(event){
    // takes an employee object as input 
    //adds that object as a  record inside the table
    // create table row and append inside recordsContainer
    // console.log("hello");
    // console.log(event.target);
    const  editButton = event.target;
    const currentEmployeeId = parseInt(editButton.getAttribute("data-empid"));
//   console.log(currentEmployeeId);
    
    for(let i =0; i<employeesList.length; i++){
        if(employeesList[i].employeeId === currentEmployeeId){
           fillFormWithData(employeesList[i]);
           break;
        }
    }


}

function addNewEmployeeRecord(employee){
    // takes an employee object as an input
    // adds that object as a record inside recordsContainer
    // create table row and append inside recordsContainer

    const record = document.createElement("tr");
    for(let key in employee){
        const cell = document.createElement("td");
        cell.innerText = employee[key];
        record.append(cell);
    }

    const optionsCell = document.createElement("td");
    const editIcon = document.createElement("span");
    editIcon.className = "material-icons icon";
    editIcon.innerText = "edit";
    editIcon.setAttribute("data-emId", employee.employeeId)
    editIcon.addEventListener("click", editRecord);

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "material-icons icon ";
    deleteIcon.innerText = "delete";
    deleteIcon.setAttribute("data-emId", employee.employeeId)
    deleteIcon.addEventListener("click", deleteRecord);


    optionsCell.append(editIcon, deleteIcon);

    record.appendChild(optionsCell);

    recordsContainer.appendChild(record);

    employeesList.push(employee);

}

form.addEventListener("submit", onSubmitForm);