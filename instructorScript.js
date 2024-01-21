let instructorName = document.getElementById("instructorName");
let instructorPhone = document.getElementById("instructorPhone");
let instructorAddress = document.getElementById("instructorAddress");

let elementKey = "Instructors";
let instructorList = [];
if (!localStorage.getItem(elementKey)) {
  localStorage.setItem(elementKey, JSON.stringify(instructorList));
} else {
  instructorList = JSON.parse(localStorage.getItem(elementKey));
}

displayInstuctors();

function addInstructor() {
  let instructor = {
    id: instructorList.length + 1,
    name: instructorName.value,
    phone: instructorPhone.value,
    address: instructorAddress.value,
  };

  if (instructorName.value == "" || instructorAddress.value == "") return;
  let check = instructorList.find((item) => item.name == instructor.name);
  if (check) return;

  instructorList.push(instructor);
  // console.log(courseList);
  
  let jsonString = JSON.stringify(instructorList);
  localStorage.setItem(elementKey, jsonString);
  displayInstuctors();
}

let retrievedInstructors = localStorage.getItem(elementKey);
if (retrievedInstructors) {
  instructorList = JSON.parse(retrievedInstructors);
  //   console.log(courseList);
}

function displayInstuctors() {
  let retrievedInstructors = localStorage.getItem(elementKey);
  
  if (retrievedInstructors) {
    instructorList = JSON.parse(retrievedInstructors);
    console.log(instructorList);
    let tableRow = "";
    for (let instructor of instructorList) {
      tableRow += `<tr>
          <td>${instructor.id}</td>
          <td>${instructor.name}</td>
          <td>${instructor.phone}</td>
          <td>${instructor.address}</td>
          </tr>`;
    }
    document.getElementById("tableBody").innerHTML = tableRow;
  }
}

let instructorIdUpdate = document.getElementById("instructorIdUpdate");
let instructorNameUpdate = document.getElementById("instructorNameUpdate");
let instructorPhoneUpdate = document.getElementById("instructorPhoneUpdate");
let instructorAddressUpdate = document.getElementById(
  "instructorAddressUpdate"
);

function updateInstructor() {
  let instructor = {
    id: instructorIdUpdate.value,
    name: instructorNameUpdate.value,
    phone: instructorPhoneUpdate.value,
    address: instructorAddressUpdate.value,
  };
  let index = instructorList.findIndex((item) => item.id == instructor.id);
  if (index == -1) return;
  let indexName = instructorList.findIndex(
    (item) => item.name == instructor.name
  );
  if (indexName != -1) return;
  if (instructorNameUpdate.value == "" || instructorAddressUpdate.value == "")
    return;
  instructorList[index] = instructor;
  let jsonString = JSON.stringify(instructorList);
  localStorage.setItem(elementKey, jsonString);
  displayInstuctors();
}

let instructorIdDelete = document.getElementById("instructorIdDelete");
function deleteInstructor() {
  let index = instructorList.findIndex(
    (item) => item.id == instructorIdDelete.value
  );
  if (index == -1) return;
  instructorList.splice(index, 1);

  for (let i = 0; i < instructorList.length; i++) {
    instructorList[i].id = i + 1;
  }

  let jsonString = JSON.stringify(instructorList);
  localStorage.setItem(elementKey, jsonString);
  displayInstuctors();
}
