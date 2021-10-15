let session1 = new Session("COMP3006 Lecture", new Date(2021, 9, 8, 11, 30, 30, 0), "David Walker");
let session2 = new Session("COMP3005 Lecture", new Date(2021, 9, 8, 11, 30, 30, 0), "Shirley Atkinson");
let session3 = new Session("COMP3000 Lecture", new Date(2021, 9, 4, 14, 30, 30, 0), "Shirley Atkinson");
let session4 = new Session("COMP3006 Lab", new Date(2021, 9, 2, 14, 30, 30, 0), "James Hayter");

let timetable = new Timetable([session1, session2, session3, session4]);

let buttonDisplay = document.getElementById("display");
let buttonClear = document.getElementById("clear");

buttonDisplay.addEventListener("click", () => {
	timetable.displayTimetable();
});

buttonClear.addEventListener("click", () => {
	timetable.clearTimetable();
});