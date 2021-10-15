class Timetable {
	/**
	 * @param {Array} sessions - An array of session objects.
	 * @returns {void}
	 * @constructor
	 */
	constructor(sessions = []) {
		this.sessions = sessions;
	}

	/**
	 * Loops through the session objects and calls their "renderSession()" method, which adds their data to the DOM.
	 * @returns {void}
	 */
	displayTimetable() {
		this.clearTimetable();
		this.sessions.map(session => {
			session.renderSession();
		});
	}

	/**
	 * Loops through the session objects and calls their "clearSession()" method, which removes their data from the DOM.
	 * @returns {void}
	 */
	clearTimetable() {
		this.sessions.map(session => {
			session.clearSession();
		});
	}
}