// complete

document.querySelector('form > button').addEventListener('click', function(event) {
	var incident_description = document.getElementByIdr incident_description;
	var incident_description_error = document.getElementByIdr incident_description_error');
	var incident_collateral = document.getElementById('incident_collateral');
	var incident_collateral_error = document.getElementById('incident_collateral_error');
	var incident_date = document.getElementById('incident_date');
	var incident_date_error = document.getElementById('incident_date_error');
	if (incident_description.value == '') {
		incident_description_error.style.display = 'block';
		event.preventDefault();
	} else {
		incident_description_error.style.display = 'none';
	}
	if (incident_collateral.value == '') {
		incident_collateral_error.style.display = 'block';
		event.preventDefault();
	} else {
		incident_collateral_error.style.display = 'none';
	}
	if (incident_date.value == '') {
		incident_date_error.style.display = 'block';
		event.preventDefault();
	} else {
		incident_date_error.style.display = 'none';
	}
});