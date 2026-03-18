/**
 * Student Record System - JavaScript
 * Name: Siso, Cris Joaquin E.
 * ID: 112-0080
 * Focus: DOM Manipulation and Array Logic
 * Features: CRUD operations with Template Literals
 */

// Hardcoded CSV content as a multi-line string
const csvData = `StudentID,first_name,last_name,LAB WORK 1,LAB WORK 2,LAB WORK 3,PRELIM EXAM,ATTENDANCE GRADE
073900438,Osbourne,Wakenshaw,69,5,52,12,78
114924014,Albie,Gierardi,58,92,16,57,97
111901632,Eleen,Pentony,43,81,34,36,16
084000084,Arie,Okenden,31,5,14,39,99
272471551,Alica,Muckley,49,66,97,3,95
104900721,Jo,Burleton,98,94,33,13,29
111924392,Cam,Akram,44,84,17,16,24
292970744,Celine,Brosoli,3,15,71,83,45
107004352,Alan,Belfit,31,51,36,70,48
071108313,Jeanette,Gilvear,4,78,15,69,69
042204932,Ethelin,MacCathay,48,36,23,1,11
111914218,Kakalina,Finnick,69,5,65,10,8
074906059,Mayer,Lorenzetti,36,30,100,41,92
091000080,Selia,Rosenstengel,15,42,85,68,28
055002480,Dalia,Tadd,84,86,13,91,22
063101111,Darryl,Doogood,36,3,78,13,100
071908827,Brier,Wace,69,92,23,75,40
322285668,Bucky,Udall,97,63,19,46,28
103006406,Haslett,Beaford,41,32,85,60,61
104913048,Shelley,Spring,84,73,63,59,3
051403517,Marius,Southway,28,75,29,88,92
021301869,Katharina,Storch,6,61,6,49,56
063115178,Hester,Menendez,70,46,73,40,56
084202442,Shaylynn,Scorthorne,50,80,81,96,83
275079882,Madonna,Willatt,23,12,17,83,5
071001041,Bancroft,Padfield,50,100,58,13,14
261170740,Rici,Everard,51,15,48,99,41
113105478,Lishe,Dashkovich,9,23,48,63,95
267089712,Alexandrina,Abate,34,54,79,44,71
041002203,Jordon,Ribbens,41,42,24,60,21
021308176,Jennette,Andrassy,63,13,100,67,4
122239937,Hamid,Chapell,90,92,44,43,47
021109935,Cordy,Crosetto,16,10,99,32,57
111026041,Tiphanie,Gwin,34,45,88,87,27
072408708,Leanor,Izachik,95,35,88,9,75
221370030,Lissy,Tuffley,90,30,84,60,86
104900048,Myrta,Mathieson,88,80,16,6,48
111311413,Cynthea,Fowles,82,59,13,97,23
091408695,Zacherie,Branch,67,6,8,78,10
231372183,Britney,Blackesland,78,79,36,23,83
263190634,Theda,Menco,50,13,7,11,8
021606580,Carin,Schrader,77,32,25,56,53
074902341,Shawn,Moston,64,91,6,95,21
107006088,Virge,Sinnat,20,1,78,44,92
091807254,Alano,Jotcham,66,35,99,48,83
011601029,Pietra,Roy,35,34,75,39,98
122240010,Orren,Danihelka,51,36,17,59,32
091400046,Angie,Grindell,51,54,55,59,61
071001630,Vachel,Swancock,41,31,88,24,24
061020977,Zane,Bellie,88,92,92,52,46`;

// Array to store student objects
let students = [];

/**
 * Parse CSV string into Array of Objects
 */
function parseCSV(csv) {
    const lines = csv.trim().split('\n');
    const result = [];
    
    // Skip header row, start from index 1
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        
        if (values.length >= 8) {
            const lab1 = parseFloat(values[3].trim());
            const lab2 = parseFloat(values[4].trim());
            const lab3 = parseFloat(values[5].trim());
            const prelim = parseFloat(values[6].trim());
            const attendance = parseFloat(values[7].trim());
            
            // Calculate grade using formula
            const labAvg = (lab1 + lab2 + lab3) / 3;
            const classStanding = (attendance * 0.40) + (labAvg * 0.60);
            
            const student = {
                id: values[0].trim(),
                name: `${values[1].trim()} ${values[2].trim()}`,
                grade: classStanding.toFixed(2)
            };
            result.push(student);
        }
    }
    
    return result;
}

/**
 * READ: Render function that clears and re-populates the table rows
 * Uses Template Literals (backticks) to generate HTML rows dynamically
 */
function render() {
    const tbody = document.getElementById('studentTableBody');
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Check if no students
    if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="no-data">No students found</td></tr>`;
        return;
    }
    
    // Generate table rows using Template Literals
    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.grade}</td>
                <td>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    // Update student count
    document.getElementById('studentCount').textContent = students.length;
}

/**
 * CREATE: Function to push() a new object to the array and re-render
 */
function addStudent() {
    // Get input values
    const idInput = document.getElementById('idInput');
    const nameInput = document.getElementById('nameInput');
    const gradeInput = document.getElementById('gradeInput');
    
    const id = idInput.value.trim();
    const name = nameInput.value.trim();
    const grade = gradeInput.value.trim();
    
    // Validate inputs
    if (!id || !name || !grade) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Create new student object
    const newStudent = {
        id: id,
        name: name,
        grade: grade
    };
    
    // Push to array
    students.push(newStudent);
    
    // Clear input fields
    idInput.value = '';
    nameInput.value = '';
    gradeInput.value = '';
    
    // Re-render the table
    render();
    
    // Focus back to ID input
    idInput.focus();
}

/**
 * DELETE: Function to remove a specific entry from the array
 */
function deleteStudent(index) {
    const student = students[index];
    
    // Confirm deletion
    if (confirm(`Are you sure you want to delete student: ${student.name}?`)) {
        // Remove from array using splice
        students.splice(index, 1);
        
        // Re-render the table
        render();
    }
}

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Parse CSV data into array of objects
    students = parseCSV(csvData);
    
    // Initial render
    render();
    
    // Add event listener for the Add button
    document.getElementById('addBtn').addEventListener('click', addStudent);
    
    // Add event listener for Enter key on input fields
    const inputs = document.querySelectorAll('.input-form input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addStudent();
            }
        });
    });
});
