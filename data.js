var students = [
  { id: "1122222", name: "John", score: 90 }, // 0 {Object} => students[0] => students[0].score => total
  { id: "2223333", name: "Larry", score: 60 }, // 1
  { id: "4455555", name: "Joseph", score: 50 }, // 2
  { id: "5526666", name: "Karla", score: 80 }
];

document.write("<h3>JSON</h3>");
document.write("<pre class='alert alert-secondary'>"); // 1) Bootstrap class
document.write(JSON.stringify(students, undefined, 2));
document.write("</pre>");
document.write("<br/>");
var names = [];

students.forEach(student => {
  names.push(student.name);
});

document.writeln("Students are:" + names);

document.write("<pre>");
document.writeln(`Average: ${calculateAverage()}`);
document.write("</pre>");

function calculateAverage() {
  var average = 0;
  students.forEach(student => {
    average = average + parseInt(student.score);
  });
  average = average / students.length;

  return average.toFixed(2);
}

function loadDataGrid() {
  var i = 0;
  let dataList = document.getElementById("dataList");
  dataList.innerHTML = "";

  while (i < students.length) {
    var listItem = document.createElement("section");
    listItem.classList.add("row");

    var id = document.createElement("div");
    id.classList.add("col-sm");
    id.innerText = students[i].id;

    var name = document.createElement("div");
    name.classList.add("col-sm");
    name.innerText = students[i].name;

    var score = document.createElement("div");
    score.classList.add("col-sm");
    score.innerText = students[i].score;

    console.log(students[i]);

    dataList.appendChild(listItem);

    listItem.appendChild(id);
    listItem.appendChild(name);
    listItem.appendChild(score);

    i = i + 1; // Alternatively, use i++;

    // Other ways:
    // i += 2;
    // i += 3;
  }
}

function displayAverage() {
  var resultSection = document.getElementById("resultSection");
  var paragraph = document.createElement("p");
  paragraph.classList.add("badge", "badge-info"); // 2) Bootstrap classes

  paragraph.innerText = "Average: " + calculateAverage();

  resultSection.appendChild(paragraph);
}

function myReplacer(name, val) {
  if (typeof val === "string") {
    return val.toString().toUpperCase();
  } else {
    return val; // return as is
  }
}

// Old-way of loading data (ol). No longer used
function loadData() {
  var i = 0;
  let dataList = document.getElementById("dataList");

  while (i < students.length) {
    var listItem = document.createElement("li");

    console.log(students[i]);
    listItem.innerText = students[i].name;

    dataList.appendChild(listItem);
    i++;
  }
}

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
const formToJSON = elements =>
  [].reduce.call(
    elements,
    (data, element) => {
      if (element.name) {
        data[element.name] = element.value;
      }
      return data;
    },
    {}
  );

ready(function() {
  document
    .querySelector("#addStudent")
    .addEventListener("submit", function(event) {
      event.preventDefault();
      let student = formToJSON(event.target.elements);
      students.push(student);
      loadDataGrid();
      event.target.reset();
    });
});
