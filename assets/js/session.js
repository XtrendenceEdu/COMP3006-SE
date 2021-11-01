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

		this.titleID = id + "_title";
		this.staffID = id + "_staff";

		// If a session with the same ID exists, then there's a clash.
		if(document.getElementById(this.titleID)) {
			this.handleError("clash");
			return;
		}

		// There are no sessions on Sundays or Saturdays.
		if(this.validTime(this.sessionTime)) {
			let titleElement = document.createElement("p");
			titleElement.id = this.titleID;
			titleElement.textContent = this.title;
				
			let staffElement = document.createElement("p");
			staffElement.id = this.staffID;
			staffElement.textContent = this.staff;

			let session = document.getElementById(id);

			session.appendChild(titleElement);
			session.appendChild(staffElement);

			session.classList.add("active");
			
		} else {
			this.handleError("time");
		}
	}

	/**
	 * Checks whether or not the session time is valid. If it's on a Saturday or Sunday, or is before 9 AM or after 4 PM, then it's invalid.
	 * @param {Date} time - The session time.
	 * @returns {boolean}
	 */
	validTime(time) {
		if(["sat", "sun"].includes(this.days[time.getDay()])) {
			return false;
		} else if(time.getHours() < 9 || time.getHours() > 16) {
			return false;
		}
		return true;
	}

	/**
	 * Handles session clashes and invalid times.
	 * @param {string} type - The type of error.
	 * @returns {void}
	 */
	handleError(type) {
		let error = document.createElement("li");
		switch(type) {
			case "clash":
				let existingTitle = document.getElementById(this.titleID).textContent;
				error.textContent = this.title + " clashes with " + existingTitle;
				document.getElementById("errors").appendChild(error);
				break;
			case "time":
				error.textContent = this.title + " is scheduled at an invalid time";
				document.getElementById("errors").appendChild(error);
				break;
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