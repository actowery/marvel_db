// complete
document.querySelector('form > button').addEventListener('click', function(event) {
	var power = document.getElementById('power');
	var power_error = document.getElementById('power_error');


	if (power.power == '') {
		power_error.style.display = 'block';
		event.preventDefault();
	} else {
		power_error.style.display = 'none';
	}

});