//complete
document.querySelector('form > button').addEventListener('click', function(event) {
	var name = document.getElementById('name');
	var name_error = document.getElementById('name_error');
	var real_name = document.getElementById('real_name');
	var real_name_error = document.getElementById('real_name_error');
	var origin = document.getElementById('origin');
	var origin_error = document.getElementById('origin_error');


	if (name.value == '') {
		name_error.style.display = 'block';
		event.preventDefault();
	} else {
		name_error.style.display = 'none';
	}


});