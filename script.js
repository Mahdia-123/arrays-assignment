
console.log("===== Student Performance Analysis =====");

// 1. Create a dataset of 10 students
const students = [
  { name: "Ahmad", score: 85 },
  { name: "Sara", score: 92 },
  { name: "Ali", score: 45 },
  { name: "Maryam", score: 78 },
  { name: "Omar", score: 35 },
  { name: "Zainab", score: 96 },
  { name: "Hassan", score: 60 },
  { name: "Fatima", score: 48 },
  { name: "Bilal", score: 88 },
  { name: "Amina", score: 72 }
];

// 2. Display all students using forEach()
const studentTable = document.getElementById("studentTable");

students.forEach(function(student, index) {
  const row = document.createElement("tr");
  const passed = student.score >= 50;

  row.innerHTML = `
    <td>${index + 1}</td>
    <td>
      <span class="student-avatar">
        ${student.name.charAt(0)}
      </span>
      <span class="student-name">${student.name}</span>
    </td>
    <td class="score">${student.score}/100</td>
    <td>
      <div class="progress-track">
        <div class="progress-fill"
             style="width: ${student.score}%">
        </div>
      </div>
    </td>
    <td>
      <span class="status ${passed ? "status-pass" : "status-fail"}">
        ${passed ? "Passed" : "Failed"}
      </span>
    </td>
  `;

  studentTable.appendChild(row);
});

// 3. Filter passing students using filter()
const passingStudents = students.filter(function(student) {
  return student.score >= 50;
});

// 4. Filter failing students using filter()
const failingStudents = students.filter(function(student) {
  return student.score < 50;
});

// Helper function to display student lists
function displayStudentList(list, elementId) {
  const container = document.getElementById(elementId);

  if (list.length === 0) {
    container.innerHTML =
      '<li class="empty-message">No students found.</li>';
    return;
  }

  container.innerHTML = list.map(function(student) {
    return `
      <li>
        <span class="list-name">${student.name}</span>
        <span class="list-score">${student.score}/100</span>
      </li>
    `;
  }).join("");
}

displayStudentList(passingStudents, "passingList");
displayStudentList(failingStudents, "failingList");

// 5. Extract student names using map()
const studentNames = students.map(function(student) {
  return student.name;
});

console.log("Student Names:", studentNames);

// 6. Calculate total score using reduce()
const totalScore = students.reduce(function(total, student) {
  return total + student.score;
}, 0);

// 7. Calculate average score using reduce()
const averageScore = students.reduce(function(total, student) {
  return total + student.score;
}, 0) / students.length;

// 8. Sort students from highest to lowest
// Copy the array first to preserve the original order.
const sortedStudents = [...students].sort(function(a, b) {
  return b.score - a.score;
});

// 9. Find a student by name using find()
function searchStudent() {
  const searchName = document
    .getElementById("searchInput")
    .value.trim();

  const result = document.getElementById("searchResult");

  if (!searchName) {
    result.classList.add("not-found");
    result.textContent = "Please enter a student name.";
    return;
  }

  const foundStudent = students.find(function(student) {
    return student.name.toLowerCase() === searchName.toLowerCase();
  });

  if (foundStudent) {
    result.classList.remove("not-found");
    result.innerHTML = `
      <strong>${foundStudent.name}</strong><br>
      Score: ${foundStudent.score}/100<br>
      Status: ${foundStudent.score >= 50 ? "Passed" : "Failed"}
    `;
  } else {
    result.classList.add("not-found");
    result.textContent = "Student not found. Please try another name.";
  }
}

// Search button and Enter key
document.getElementById("searchButton")
  .addEventListener("click", searchStudent);

document.getElementById("searchInput")
  .addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      searchStudent();
    }
  });

// 10. Check if any student scored 90 or above using some()
const hasHighAchiever = students.some(function(student) {
  return student.score >= 90;
});

// 11. Check if all students passed using every()
const allPassed = students.every(function(student) {
  return student.score >= 50;
});

// 12. Challenge: Find the top three students
const topThreeStudents = sortedStudents.slice(0, 3);

const topThreeContainer = document.getElementById("topThree");

topThreeContainer.innerHTML = topThreeStudents.map(function(student, index) {
  return `
    <div class="leader-item">
      <span class="rank">${index + 1}</span>
      <div class="leader-info">
        <div class="leader-name">${student.name}</div>
        <div class="leader-caption">Student</div>
      </div>
      <span class="leader-score">${student.score}/100</span>
    </div>
  `;
}).join("");

// 13. Challenge: Find the student with the lowest score
const lowestStudent = sortedStudents[sortedStudents.length - 1];

// 14. Display summary cards
document.getElementById("stats").innerHTML = `
  <article class="stat-card">
    <div class="stat-top">
      <span class="stat-label">Total Students</span>
      <span class="stat-icon purple-bg">👥</span>
    </div>
    <div class="stat-value">${students.length}</div>
    <div class="stat-note">Students in this class</div>
  </article>

  <article class="stat-card">
    <div class="stat-top">
      <span class="stat-label">Passing Students</span>
      <span class="stat-icon green-bg">✓</span>
    </div>
    <div class="stat-value">${passingStudents.length}</div>
    <div class="stat-note">${(passingStudents.length / students.length * 100).toFixed(0)}% pass rate</div>
  </article>

  <article class="stat-card">
    <div class="stat-top">
      <span class="stat-label">Failing Students</span>
      <span class="stat-icon red-bg">!</span>
    </div>
    <div class="stat-value">${failingStudents.length}</div>
    <div class="stat-note">Scores below 50</div>
  </article>

  <article class="stat-card">
    <div class="stat-top">
      <span class="stat-label">Average Score</span>
      <span class="stat-icon blue-bg">📊</span>
    </div>
    <div class="stat-value">${averageScore.toFixed(2)}</div>
    <div class="stat-note">Out of 100 points</div>
  </article>
`;

// 15. Display performance insights
document.getElementById("insights").innerHTML = `
  <div class="insight-card">
    <div class="insight-label">Total Score</div>
    <div class="insight-value">${totalScore}</div>
  </div>

  <div class="insight-card">
    <div class="insight-label">Highest Score</div>
    <div class="insight-value positive">
      ${sortedStudents[0].name} — ${sortedStudents[0].score}
    </div>
  </div>

  <div class="insight-card">
    <div class="insight-label">Lowest Score</div>
    <div class="insight-value negative">
      ${lowestStudent.name} — ${lowestStudent.score}
    </div>
  </div>

  <div class="insight-card">
    <div class="insight-label">High Achievers (90+)</div>
    <div class="insight-value ${hasHighAchiever ? "positive" : "negative"}">
      ${hasHighAchiever ? "Yes, at least one student" : "No high achievers"}
    </div>
  </div>

  <div class="insight-card">
    <div class="insight-label">Did Everyone Pass?</div>
    <div class="insight-value ${allPassed ? "positive" : "negative"}">
      ${allPassed ? "Yes, everyone passed" : "No, some students failed"}
    </div>
  </div>

  <div class="insight-card">
    <div class="insight-label">Student Names</div>
    <div class="insight-value">${studentNames.length} names extracted</div>
  </div>
`;

// Print results in the browser console for the homework
console.log("All Students:", students);
console.log("Total Students:", students.length);
console.log("Passing Students:", passingStudents);
console.log("Failing Students:", failingStudents);
console.log("Student Names:", studentNames);
console.log("Total Score:", totalScore);
console.log("Average Score:", averageScore.toFixed(2));
console.log("Ranked Students:", sortedStudents);
console.log("Top Three Students:", topThreeStudents);
console.log("Student with Lowest Score:", lowestStudent);
console.log("Any student scored 90 or above?", hasHighAchiever);
console.log("Did all students pass?", allPassed);
