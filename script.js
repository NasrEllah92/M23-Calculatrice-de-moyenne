function calculateGPA(event) {
    event.preventDefault(); // Prevent form submission and page refresh

    // Function to validate if a number is within 0 and 20
    function isValidGrade(grade) {
        return !isNaN(grade) && grade >= 0 && grade <= 20;
    }

    // Function to parse input and handle dots and commas as decimal separators
    function parseGradeInput(input) {
        let trimmedInput = input.trim().replace(',', '.');
        let parsedGrade = parseFloat(trimmedInput);
        return !isNaN(parsedGrade) ? parsedGrade : NaN;
    }

    // Fetch grades from input fields and validate
    let grade_unit1 = parseGradeInput(document.getElementById('grade_unit1').value);
    let grade_unit2 = parseGradeInput(document.getElementById('grade_unit2').value);
    let grade_unit3 = parseGradeInput(document.getElementById('grade_unit3').value);
    let grade_unit4 = parseGradeInput(document.getElementById('grade_unit4').value);
    let grade_acp = parseGradeInput(document.getElementById('grade_acp').value);
    let grade_immunologie = parseGradeInput(document.getElementById('grade_immunologie').value);
    let grade_microbiologie = parseGradeInput(document.getElementById('grade_microbiologie').value);
    let grade_pharmacologie = parseGradeInput(document.getElementById('grade_pharmacologie').value);

    // Validate each grade
    if (!isValidGrade(grade_unit1) ||
        !isValidGrade(grade_unit2) ||
        !isValidGrade(grade_unit3) ||
        !isValidGrade(grade_unit4) ||
        !isValidGrade(grade_acp) ||
        !isValidGrade(grade_immunologie) ||
        !isValidGrade(grade_microbiologie) ||
        !isValidGrade(grade_pharmacologie)) {
        alert("Veuillez entrer des notes valides entre 0 et 20.");
        return; // Exit function if any grade is invalid
    }

    // Calculate total credits and total weighted grade points
    let totalCredits = 13; // Total credits after updating
    let totalWeightedGradePoints = (grade_unit1 * 2) + (grade_unit2 * 2) + (grade_unit3 * 2) + (grade_unit4 * 2)
                                  + grade_acp + grade_immunologie + grade_microbiologie + grade_pharmacologie;

    // Calculate GPA
    let gpa = totalWeightedGradePoints / totalCredits;

    // Display result
    let resultDisplay = document.getElementById('result');
    resultDisplay.innerHTML = `Votre moyenne GPA est : <strong>${gpa.toFixed(2)}</strong>`;

    // Check GPA and provide feedback
    let messageDisplay = document.getElementById('message');
    if (gpa >= 10.00) {
        messageDisplay.innerHTML = `<span class="success">Félicitations, vous avez réussi sans le module de parasitologie, et votre moyenne est : ${gpa.toFixed(2)}</span>`;
    } else {
        let requiredGrade = 130 - (gpa * 13);
        if (requiredGrade <= 20.00) {
            messageDisplay.innerHTML = `<span class="warning">Vous devez obtenir une note de ${requiredGrade.toFixed(2)} en Parasitologie Mycologie pour réussir.</span>`;
        } else {
            messageDisplay.innerHTML = `<span class="error">Je suis désolé, mais même si vous obtenez 20 en Parasitologie Mycologie, vous n'avez pas assez de points pour réussir. Bonne chance en rattrapage.</span>`;
        }
    }
}
