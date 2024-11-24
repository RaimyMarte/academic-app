export const calculateGrade = (grade: number | null) => {
    if (!grade) {
        return 'Ungraded';
    }

    switch (true) {
        case (grade >= 90 && grade <= 100):
            return 'A';
        case (grade >= 80 && grade < 90):
            return 'B';
        case (grade >= 70 && grade < 80):
            return 'C';
        case (grade >= 0 && grade < 70):
            return 'F';
        default:
            return 'Ungraded';
    }
}
