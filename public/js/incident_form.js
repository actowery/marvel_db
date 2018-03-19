// complete

document.querySelector('form > button').addEventListener('click', function(event) {
	var incident_description = document.getElementByIdr incident_description;
	var incident_description_error = document.getElementByIdr incident_description_error');
	if (incident_description.value == '') {
		incident_description_error.style.display = 'block';
		event.preventDefault();
	} else {
		incident_description_error.style.display = 'none';
	}

});