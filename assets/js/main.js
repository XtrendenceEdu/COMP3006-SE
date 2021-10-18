/**
 * Creates an instance of the Timetable class containing the given session data.
 * @param {Array} timetable - An array containing objects with session data.
 * @returns {Timetable} - The Timetable object.
 */
function buildTimetable(timetable) {
	let sessions = [];
	timetable.map(session => {
		sessions.push(new Session(session.title, session.sessionTime, session.staff));
	});
	return new Timetable(sessions);
}

document.addEventListener("DOMContentLoaded", () => {
	let timetable = buildTimetable(sampleTimetable);

	let buttonDisplay = document.getElementById("display");
	let buttonClear = document.getElementById("clear");

	buttonDisplay.addEventListener("click", () => {
		timetable.displayTimetable();
	});

	buttonClear.addEventListener("click", () => {
		timetable.clearTimetable();
	});
});