
let students = JSON.parse(
    localStorage.getItem("students")
) || [];

let editIndex = -1;

const form = document.getElementById("studentForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        department: document.getElementById("department").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        document.getElementById("submitBtn").textContent = "Add Student";
    }

    saveData();
    displayStudents();
    form.reset();
});

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

function displayStudents(searchText = "") {

    const list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach((student, index) => {

        if (!student.name.toLowerCase().includes(searchText.toLowerCase())) {
            return;
        }

        const row = document.createElement("tr");

        [
            student.name,
            student.roll,
            student.department,
            student.email
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";
        editBtn.onclick = () => editStudent(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteStudent(index);

        actionCell.append(editBtn, deleteBtn);
        row.appendChild(actionCell);

        list.appendChild(row);
    });

    document.getElementById("count").textContent =
        "Total Students: " + students.length;
}

function editStudent(index) {

    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("department").value = student.department;
    document.getElementById("email").value = student.email;

    editIndex = index;

    document.getElementById("submitBtn").textContent = "Update Student";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteStudent(index) {

    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);

        if (editIndex === index) {
            editIndex = -1;
            form.reset();
            document.getElementById("submitBtn").textContent = "Add Student";
        } else if (editIndex > index) {
            editIndex--;
        }

        saveData();
        displayStudents();
    }
}

document.getElementById("search").addEventListener("input", function() {
    displayStudents(this.value);
});

displayStudents();
