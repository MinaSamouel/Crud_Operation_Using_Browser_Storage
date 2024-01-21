let courseName = document.getElementById("courseName");
let courseHours = document.getElementById("courseHours");

let courseList = [];
let elementKey = "Courses";

displayCourses();

function addCourse() {
  let course = {
    id: courseList.length + 1,
    name: courseName.value,
    hours: courseHours.value,
  };

  if (courseName.value == "" || courseHours.value == "") return;
  let check = courseList.find((item) => item.name == course.name);
  if (check) return;
  courseList.push(course);
  // console.log(courseList);
  let jsonString = JSON.stringify(courseList);
  localStorage.setItem(elementKey, jsonString);
  
  displayCourses();
}

let retrievedCourses = localStorage.getItem(elementKey);
if (retrievedCourses) {
  courseList = JSON.parse(retrievedCourses);
  //   console.log(courseList);
}

function displayCourses() {
  let retrievedCourses = localStorage.getItem(elementKey);
  if (retrievedCourses) {
    courseList = JSON.parse(retrievedCourses);
    console.log(courseList);
    let tableRow = "";
    for (let course of courseList) {
      tableRow += `<tr>
          <td>${course.id}</td>
          <td>${course.name}</td>
          <td>${course.hours}</td>
          </tr>`;
    }
    document.getElementById("tableBody").innerHTML = tableRow;
  }
}

let courseIdUpdate = document.getElementById("courseIdUpdate");
let courseNameUpdate = document.getElementById("courseNameUpdate");
let courseHoursUpdate = document.getElementById("courseHoursUpdate");

function updateCourse() {
  let course = {
    id: courseIdUpdate.value,
    name: courseNameUpdate.value,
    hours: courseHoursUpdate.value,
  };
  let index = courseList.findIndex((item) => item.id == course.id);
  if (index == -1) return;
  let indexName = courseList.findIndex((item) => item.name == course.name);
  if (indexName != -1) return;
  if (courseNameUpdate.value == "" || courseHoursUpdate.value == "") return;
  courseList[index] = course;
  let jsonString = JSON.stringify(courseList);
  localStorage.setItem(elementKey, jsonString);
  displayCourses();
}

let courseIdDelete = document.getElementById("courseIdDelete");
function deleteCourse() {
  let index = courseList.findIndex((item) => item.id == courseIdDelete.value);
  if (index == -1) return;
  courseList.splice(index, 1);

  for (let i = 0; i < courseList.length; i++) {
    courseList[i].id = i + 1;
  }

  let jsonString = JSON.stringify(courseList);
  localStorage.setItem(elementKey, jsonString);
  displayCourses();
}
