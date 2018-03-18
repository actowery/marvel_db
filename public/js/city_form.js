// complete
document.querySelector('form > button').addEventListener('click', function(event) {
	var city_name = document.getElementById('city_name');
	var city_name_error = document.getElementById('city_name_error');
	var city_size = document.getElementById('city_size');
	var city_size_error = document.getElementById('city_size_error');
	var city_population = document.getElementById('city_population');
	var city_population_error = document.getElementById('city_population_error');

	if (city_name.value == '') {
		city_name_error.style.display = 'block';
		event.preventDefault();
	} else {
		city_name_error.style.display = 'none';
	}
	if (city_size.value == '') {
		city_size_error.style.display = 'block';
		event.preventDefault();
	} else {
		city_size_error.style.display = 'none';
	}
	if (city_population.value == '') {
		city_population_error.style.display = 'block';
		event.preventDefault();
	} else {
		city_population_error.style.display = 'none';
	}
});