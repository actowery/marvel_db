//requirements a lot of this is copied from source code on their respective sites
var queries = require('./queries.js');
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var mysql = require('mysql');
var app = express();
app.engine('handlebars', handlebars.engine);
//port below is the port you set up for your online proxy
app.set('port', 22777);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());
//fill out the SQL info below
var connection = mysql.createConnection({
	host:'classmysql.engr.oregonstate.edu',
	database:'cs340_toweryci',
	user:'cs340_toweryci',
	password:'7328',
	multipleStatements:true
});

// gets index
app.get('/', function(request, response) {
	response.render('index');
});

//get and post incident
app.get('/add/incident', function(request, response) {
	var cityQ = queries.allCitys + ";";
	var personQ = queries.allPersons + " ORDER BY person.name;";

	connection.query(cityQ + " " + personQ, function(error, rows, fields) {
		var data = {
			city:rows[0],
			person:rows[1]
		};
		response.render('add_incident', {form_data:data, error_message:error});
	});
});
app.post('/add/incident', function(request, response) {
	var incident = {
		description:request.body.description,
		city:request.body.city,
		person:request.body.person
	};

	connection.query(queries.createIncidentQ, incident, function(error, result) {
		response.redirect(302, '/view/incident');
	});
});

//DELETE incident by id
app.get('/delete/incident/:id', function(request, response) {
	var deleteIncidentPersonQ = queries.deleteIncidentPersonQ + mysql.escape(request.params.id);
	var deleteIncidentQ = queries.deleteIncidentQ + mysql.escape(request.params.id);

	connection.query(deleteIncidentPersonQ, function(error, result) {
		connection.query(deleteIncidentQ, function(error, result) {
			response.redirect(302, '/view/incident');
		});
	});
});

//edit form render
app.get('/edit/incident/:id', function(request, response) {
	var incidentQById = queries.allIncidents  + " WHERE incident.ID = " + request.params.id + "; ";
	var cityQ = queries.allCitys + " ORDER BY name; ";
	var personQ = queries.allPersons + " ORDER BY name; ";

	connection.query(incidentQById + cityQ + personQ, function(error, rows, fields) {
		var incident_data = {
			incident:rows[0][0],
			city:rows[1],
			person:rows[2]
		};

		response.render('edit_incident_by_id', incident_data);
	});
});

//edit incident by id
app.post('/edit/incident/:id', function(request, response) {
	var incident = {
		description:request.body.description,
		city:request.body.city,
		person:request.body.person
	};

	connection.query(queries.updateIncidentQ, [incident, request.params.id], function(error, result) {
		response.redirect(302, '/view/incident/' + request.params.id);
	});
});

//get all incidents tabulated
app.get('/view/incident', function(request, response) {
	var viewIncidentQ = queries.viewIncidentQ + ";";

	connection.query(viewIncidentQ, function(error, rows, fields) {
		response.render('view_incident', {incident:rows, error_message:error});
	});
});

//get incident by id
app.get('/view/incident/:id', function(request, response) {
	var viewIncidentQ = queries.viewIncidentQ + " WHERE incident.ID = " + mysql.escape(request.params.id) + "; ";
	var viewPersonsByIncidentQ = queries.viewPersonsByIncidentQ + " WHERE person_incident.in_ID = " + mysql.escape(request.params.id) + " ORDER BY person_name; ";

	connection.query(viewIncidentQ + viewPersonsByIncidentQ, function(error, rows, fields) {
		var incident_data = {
			incident:rows[0][0],
			person:rows[1]
		};

		response.render('view_incident_by_id', {incident_data:incident_data, error_message:error});
	});
});

//add city form render
app.get('/add/city', function(request, response) {
	response.render('add_city');
});

//add city request
app.post('/add/city', function(request, response) {
	var city = {
		name:request.body.city_name,
		citysize:request.body.city_citysize,
		population:request.body.city_population
		};

	connection.query(queries.createCityQ, city, function(error, result) {
		response.redirect(302, '/view/city');
	});
});

//delete city by id
app.get('/delete/city/:id', function(request, response) {
	//make sure city 1 stays
	if (parseInt(request.params.id, 10) !== 1) {
		var makeIncidentCityUnaffiliated = queries.makeIncidentCityUnaffiliated + mysql.escape(request.params.id) + "; ";
		var makePersonCityUnaffiliated = queries.makePersonCityUnaffiliated + mysql.escape(request.params.id) + "; ";
		var deleteCityQ = queries.deleteCityQ + mysql.escape(request.params.id) + "; ";

		connection.query(makeIncidentCityUnaffiliated + makePersonCityUnaffiliated + deleteCityQ, function(error, result) {
			response.redirect(302, '/view/city');
		});
	} else {
		response.redirect(302, '/view/city');
	}
});

//edit city form
app.get('/edit/city/:id', function(request, response) {
	var cityQById = queries.allCitys + " WHERE id = " + mysql.escape(request.params.id) + "; ";

	connection.query(cityQById, function(error, rows, fields) {
		var city_data = {
			city:rows[0]
		};

		response.render('edit_city_by_id', city_data);
	});

});

//edit post request
app.post('/edit/city/:id', function(request, response) {
	var city = {
		name:request.body.city_name,
		citysize:request.body.city_citysize,
		population:request.body.city_population
	};

	var updateCityQ = queries.updateCityQ;

	connection.query(updateCityQ, [city, request.params.id], function(error, result) {
		response.redirect(302, '/view/city/' + request.params.id);
	});
});

//view city list
app.get('/view/city', function(request, response) {
	var cityQ = queries.allCitys + " WHERE id <> 1 ORDER BY name;";

	connection.query(cityQ, function(error, rows, fields) {
		response.render('view_city', {city:rows, error_message:error});
	});
});

//view by id
app.get('/view/city/:id', function(request, response) {
	var viewCityQ = queries.allCitys + " WHERE id = " + mysql.escape(request.params.id) + "; ";
	var viewPersonsByCity = queries.allPersons + " WHERE sp_CityID = " + mysql.escape(request.params.id) + "; ";
	var viewIncidentsByCity = queries.allIncidents + " WHERE in_CityID = " + mysql.escape(request.params.id) + "; ";

	connection.query(viewCityQ + viewPersonsByCity + viewIncidentsByCity, function(error, rows, fields) {
		var city_data = {
			city:rows[0][0],
			person:rows[1],
			incident:rows[2]
		};

		response.render('view_city_by_id', {city_data:city_data, error_message:error});
	});
});

//renders add person table
app.get('/add/person', function(request, response) {
	var allCitysQ = queries.allCitys + ";";
	connection.query(allCitysQ, function(error, rows, fields) {
		var city_data = {
			city:rows
		};

		response.render('add_person', {form_data:city_data, error_message:error});
	});
});

//add person request
app.post('/add/person', function(request, response) {
	var person = {
		name:request.body.name,
		real_name:request.body.real_name,
		origin:request.body.origin,
		villain:request.body.villain,
		sp_CityID:request.body.sp_CityID
		// superpower:request.body.superpower
	};

	var addPersonQ = queries.addPersonQ;

	connection.query(addPersonQ, person, function(error, result) {
		response.redirect(302, '/view/person');
	});
});

//delete person
app.get('/delete/person/:id', function(request, response) {
	//dont let them delete 1, or the db wont work
	if (parseInt(request.params.id, 10) !== 1) {
	var deletePersonQ = queries.deletePersonQ + mysql.escape(request.params.id) + "; ";

		connection.query(deletePersonQ, function(error, result) {
			response.redirect(302, '/view/person');
		});
	} else {
		response.redirect(302, '/view/person');
	}
});

//form to edit persons
app.get('/edit/person/:id', function(request, response) {
	var personByIdQ = queries.allPersons + " WHERE id = " + mysql.escape(request.params.id) + "; ";
	var allCitys = queries.allCitys + ";";
	connection.query(personByIdQ + allCitys, function(error, rows, fields) {
		var data = {
			person:rows[0][0],
			city:rows[1],
		};

		response.render('edit_person_by_id', {form_data:data, error_message:error});
	});
});

//updates person with relevant informations
app.post('/edit/person/:id', function(request, response) {
	var person = {
		name:request.body.name,
		real_name:request.body.real_name,
		origin:request.body.origin,
		villain:request.body.villain,
		city:request.body.city,
		superpower:request.body.superpower
	};

	var updatePersonQ = queries.updatePersonQ;

	connection.query(updatePersonQ, [person, request.params.id], function(error, result) {
		response.redirect(302, '/view/person/' + request.params.id);
	});
});

//display table of persons
app.get('/view/person', function(request, response) {
	connection.query(queries.allPersons, function(error, rows, fields) {
		response.render('view_person', {person:rows, error_message:error});
	});
});

//view person by id
app.get('/view/person/:id', function(request, response) {
	var viewPersonQ = queries.allPersons+" WHERE id =" + mysql.escape(request.params.id) +";";

	connection.query(viewPersonQ, function(error, rows, fields) {
		var person_data = {
			person:rows[0]
		};

		response.render('view_person_by_id', {person_data:person_data, error_message:error});
	});
});

//add superpower
app.get('/add/superpower', function(request, response) {
	var personQ = queries.allPersons + " ORDER BY name;";

	connection.query(personQ, function(error, rows, fields) {
		var data = {
			person:rows[0],
		};

		response.render('add_superpower', {form_data:data, error_message:error});
	});
});
app.post('/add/superpower', function(request, response) {
	var superpower = {
		spow:request.body.spow
	};

	connection.query(queries.createPowerQ, superpower, function(error, result) {
		response.redirect(302, '/view/superpower');
	});
});

//records superpowers owned by persons
app.post('/add/superpower/:id/person', function(request, response) {
	var person_superpower = {
		sp_id:request.body.person,
		superpower_id:request.params.id
	};

	connection.query(queries.createPersonPowerQ, person_superpower, function(error, result) {
		response.redirect(302, '/view/superpower/' + person_superpower.superpower_id);
	});
});

//delete superpower by id
app.get('/delete/superpower/:id', function(request, response) {
	var deletePowerQ = queries.deletePowerQ + mysql.escape(request.params.id) + ";";

	connection.query(deletePowerQ, function(error, result) {
		response.redirect(302, '/view/superpower');
	});
});

//edit superpower by id
app.get('/edit/superpower/:id', function(request, response) {
	var superpowerQ = queries.allPowers + " WHERE id = " + request.params.id + ";";

	connection.query(superpowerQ, function(error, rows, fields) {
		var data = {
			superpower:rows[0][0]
		};

		response.render('edit_superpower_by_id', {form_data:data, error_message:error});
	});
});

//contains data for editing of superpower
app.post('/edit/superpower/:id', function(request, response) {
	var superpower = {
		spow:request.body.spow,

	};

	connection.query(queries.updatePowerQ, [superpower, request.params.id], function(error, result) {
		response.redirect(302, '/view/superpower/' + request.params.id);
	});
});

//remove by superpower by person id
app.get('/remove/superpower/:superpower_id/person/:sp_id', function(request, response) {
	connection.query(queries.removePowerFromPersonQ, [request.params.sp_id, request.params.superpower_id], function(error, result) {
		response.redirect(302, '/view/superpower/' + request.params.superpower_id);
	});
});

//displays a table of superpower spows
app.get('/view/superpower', function(request, response) {
	connection.query(queries.viewPowerViewQ, function(error, rows, fields) {
		response.render('view_superpower', {superpower:rows, error_message:error});
	});
});

//display superpower by id
app.get('/view/superpower/:id', function(request, response) {
	var viewPowerByIdQ = queries.viewPowerByIdQ + mysql.escape(request.params.id) + ";";
	var viewPersonsByPowerQ = queries.viewPowersByPersonQ + mysql.escape(request.params.id) + ";";

	connection.query(viewPowerByIdQ + viewPersonsByPowerQ, request.params.id, function(error, rows, fields) {
		if (rows[0].length > 0) {
			var superpower_data = {
				superpower_id:rows[0][0].id,
				superpower_superpower:rows[0][0].description,
				person:rows[1],
				persons_without_current_superpower:rows[2]
			};
		} else {
			error = "No superpower with ID of " + request.params.id + ".";
		}

		response.render('view_superpower_by_id', {superpower:superpower_data, error_message:error});
	});

});

//error handling
app.use(function(request, response) {
	response.status(404);
	response.render('404');
});

app.use(function(error, request, response, next) {
	response.status(500);
	response.render('500');
});

//*************************************************************
//CONNECTION OPTIONS
//*************************************************************

//for OSU server use
app.listen(app.get('port'), function() {
	console.log('Express started on port' + app.get('port'));
});



//for c9 use
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Server Running...");});
