class Session {
	/**
	 * @param {string} title - The title of the session.
	 * @param {Date} sessionTime - The time of the session.
	 * @param {string} staff - The name of the staff member.
	 * @returns {void}
	 * @constructor
	 */
	constructor(title = "", sessionTime = new Date(), staff = "") {
		// The "days" array is used to generate session IDs.
		this.days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

		this.title = title;
		this.sessionTime = sessionTime;
		this.staff = staff;
	}

	/**
	 * Generates a session ID based on the time of the session.
	 * @returns {string} - The session ID.
	 */
	getSessionId() {
		let current = this.sessionTime.getDay();
		let day = this.days[current];
		let hour = this.sessionTime.getHours();
		return `${day}_${hour}`;
	}

	/**
	 * Adds the information regarding the session to the DOM.
	 * @returns {void}
	 */
	renderSession() {
		let id = this.getSessionId();
		let titleID = id + "_title";
		let staffID = id + "_staff";

		// If a session with the same ID exists, then there's a clash.
		if(document.getElementById(titleID)) {
			let error = document.createElement("li");
			let existingTitle = document.getElementById(titleID).textContent;
			error.textContent = existingTitle + " clashes with " + this.title;
			document.getElementById("errors").appendChild(error);
		} else {
			// There are no sessions on Sundays or Saturdays.
			if(["sun", "sat"].includes(this.days[this.sessionTime.getDay()])) {
				let error = document.createElement("li");
				error.textContent = this.title + " is timetabled at an invalid time";
				document.getElementById("errors").appendChild(error);
			} else {
				let titleElement = document.createElement("p");
				titleElement.id = titleID;
				titleElement.textContent = this.title;
					
				let staffElement = document.createElement("p");
				staffElement.id = staffID;
				staffElement.textContent = this.staff;

				let session = document.getElementById(id);

				session.appendChild(titleElement);
				session.appendChild(staffElement);

				session.classList.add("active");
			}
		}
	}

	/**
	 * Removes all sessions currently visible on the timetable.
	 * @returns {void}
	 */
	clearSession() {
		let sessionElement = document.getElementById(this.getSessionId());
					
		if(sessionElement) {
			sessionElement.classList.remove("active");

			let elements = sessionElement.getElementsByTagName("p");

			for(let i = elements.length - 1; i >= 0; i--) {
				if(elements[i].id.includes("_title") || elements[i].id.includes("_staff")){
					elements[i].remove();
				}
			}
		}
	}
}