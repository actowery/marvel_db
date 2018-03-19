// complete
document.querySelector('form > button').addEventListener('click', function(event) {
	var superpower = document.getElementById('superpower');
	var superpower_error = document.getElementById('superpower_error');


	if (superpower.superpower == '') {
		superpower_error.style.display = 'block';
		event.preventDefault();
	} else {
		superpower_error.style.display = 'none';
	}

});