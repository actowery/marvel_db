// INCIDENTS 

/*
    Name: allIncidents
    Description: returns all incidents
*/
exports.allIncidents = "SELECT * FROM incident";

/*
    Name:  viewIncidentQ
    Description:  Returns all incidents with the main subjects, like who was responsible, city, and collateral
*/
exports.viewIncidentQ =  "SELECT ";
exports.viewIncidentQ += "incident.ID AS in_ID, ";
exports.viewIncidentQ += "description AS incident_description, ";
exports.viewIncidentQ += "collateral AS incident_collateral, ";
exports.viewIncidentQ += "city.ID AS city_ID, ";
exports.viewIncidentQ += "city.name AS city_name ";
exports.viewIncidentQ += "FROM incident ";
exports.viewIncidentQ += "INNER JOIN city ON city.ID = incident.in_CityID ";

/*
    Name: viewIncidentByPersonQ
    Description:  Returns all incidents for a particular super person queried.
*/
exports.viewIncidentByPersonQ  = "";
exports.viewIncidentByPersonQ += "SELECT incident.ID, incident.description ";
exports.viewIncidentByPersonQ += "FROM incident ";
exports.viewIncidentByPersonQ += "INNER JOIN person_incident ";
exports.viewIncidentByPersonQ += "ON person_incident.in_ID = incident.ID ";
exports.viewIncidentByPersonQ += "INNER JOIN person ";
exports.viewIncidentByPersonQ += "ON person.ID = person_incident.sp_ID ";
exports.viewIncidentByPersonQ += "WHERE person.ID = ";

/*
    Name:  createIncidentQ
    Description:  Inserts new incident into the database.  It expects to be
    passed an object containing a Incident Description, a city, collateral, and a person.
*/
exports.createIncidentQ = "INSERT INTO incident SET ?;";

/*
    Name: deleteIncidentQ
    Description:  This q deletes incidents with given id
    table.
*/
exports.deleteIncidentQ = "DELETE FROM incident WHERE ID = ";

/*
    Name:  deleteIncidentPersonQ
    Description:  This q deletes person_incident relationships from the person_incident
    table when the incident_relationships have a particular in_ID associated with them.
*/
exports.deleteIncidentPersonQ = "DELETE FROM person_incident WHERE in_ID = ";

/*
    Name:  updateIncidentQ
    Description:  Updates incident given an id
*/
exports.updateIncidentQ = "UPDATE incident SET ? WHERE ID = ?;";




//CITYS

/*
    Name: allCitys
    Description:  
*/
exports.allCitys = "SELECT * FROM city";

/*
    Name: createCityQ
    Description:  inserts a new city.
*/
exports.createCityQ = "INSERT INTO city SET ?";

/*
    Name: deleteCityQ
    Description:  deletes a city
*/
exports.deleteCityQ = "DELETE FROM city WHERE id = ";

/*
    Name: updateCityQ
    Description:  This q updates a city with a particular id.  The values
    that are updated must be passed, as must the id.
*/
exports.updateCityQ = "UPDATE city SET ? WHERE id = ?;";

/*
    Name: makePersonCityUnaffiliated
    Description:   used to make sure persons arent orphaned when cities are deleted
*/
exports.makePersonCityUnaffiliated = "UPDATE person SET city = 1 WHERE city = ";

/*
    Name: makePersonCityUnaffiliated
    Description:  used to make sure incidents arent orphaned when cities are deleted
*/
exports.makeIncidentCityUnaffiliated = "UPDATE incident SET city = 1 WHERE city = ";

//persons
/*
    Name: allPersons
    Description:  returns all persons
*/
exports.allPersons = "SELECT * FROM person";

/*
    Name: addPersonQ
    Description:  adds person to db
*/
exports.addPersonQ = "INSERT INTO person SET ? ";

/*
    Name: deletePersonQ
    Description: removes person from db
*/
exports.deletePersonQ = "DELETE FROM person WHERE id = ";

/*
    Name: makePowerPersonUnassignedQ
    Description:  makes sure superpowers are not orphaned when 
*/
exports.PowerPersonUnassignedQ = "UPDATE superpower SET person = 1 WHERE person = ";

/*
    Name: makeCoursePersonUnassignedQ
    Description:  ensures incidents arent orphaned when persons are deleted
*/
exports.makeIncidentPersonUnassignedQ = "UPDATE incident SET person = 1 WHERE person = ";

/*
    Name: updatePersonQ
    Description:  updates a person given parameters
*/
exports.updatePersonQ = "UPDATE person SET ? WHERE id = ?;";

/*
    Name: viewPersonViewQ
    Description:  helps render persons
*/
exports.viewPersonViewQ  = "SELECT person.ID AS sp_id, person.name, person.real_name, person.origin, person.villain, city.ID AS c_id, city.name FROM person ";
exports.viewPersonViewQ += "INNER JOIN city ON person.sp_CityID = city.ID ";
exports.viewPersonViewQ += "WHERE person.ID <> 1 "
exports.viewPersonViewQ += "ORDER BY person.name, city.name;";

/*
    Name:  viewPersonQ
    Description:  helps render more info for persons
*/
exports.viewPersonQ =  "SELECT ";
exports.viewPersonQ += "person.ID AS sp_id, "
exports.viewPersonQ += "person.name AS person_name, "
exports.viewPersonQ += "person.real_name AS person_real_name, "
exports.viewPersonQ += "person.origin AS person_origin, "
exports.viewPersonQ += "person.villain AS person_villain, "
exports.viewPersonQ += "city.name AS city_name "
exports.viewPersonQ += "FROM person "
exports.viewPersonQ += "INNER JOIN city ON city.ID = person.sp_CityID ";



//superpowers
/*
    Name: allPowers
    Description:  returns all superpowers
*/
exports.allPowers = "SELECT * FROM superpower";

/*
    Name: createPowerQ
    Description:  creates superpower
*/
exports.createPowerQ = "INSERT INTO superpower SET ?;"

/*
    Name: deletePowerQ
    Description:  deletes superpower
*/
exports.deletePowerQ = "DELETE FROM superpower WHERE id = ";

/*
    Name: viewPowerViewQ
    Description: to display superpower list
*/
exports.viewPowerViewQ  = "SELECT ID AS superpower_id, "
exports.viewPowerViewQ += "spow FROM superpower;"

/*
    Name: viewPowerById
    Description: returns superpower by id
*/
exports.viewPowerByIdQ  = "SELECT ";
exports.viewPowerByIdQ += "superpower.ID, ";
exports.viewPowerByIdQ += "superpower.spow ";
exports.viewPowerByIdQ += "WHERE superpower.ID = ";

/*
    Q: updatePowerQ
    Description: updates superpower given new params
*/
exports.updatePowerQ = "UPDATE superpower SET ? WHERE id = ?";

/*
    Q: removePowerFromPersonQ
    Description: removes a superpower from a person
*/
exports.removePowerFromCourseQ = "DELETE FROM person_superpower WHERE sp_id = ? AND superpower_id = ?;";

/*
    Name: viewPowersByPersonQ
    Description:  displays superpowers by person
*/
exports.viewPowersByCourseQ =  "SELECT ";
exports.viewPowersByCourseQ += "superpower.ID AS superpower_id, ";
exports.viewPowersByCourseQ += "superpower.spow AS superpower_superpower, ";
exports.viewPowersByCourseQ += "FROM superpower ";
exports.viewPowersByCourseQ += "INNER JOIN person_superpower ON person_superpower.superpower_id = superpower.ID ";

/*
    Name: PersonsWithoutParticularPowerQ
    Description: to generate eligible people for superpowers
*/
exports.personsWithoutParticularPowerQ = "SELECT person_table.sp_id, person_table.person_name ";
exports.personsWithoutParticularPowerQ += "FROM (SELECT id AS sp_id, name AS person_name ";
exports.personsWithoutParticularPowerQ += "FROM person) as person_table ";
exports.personsWithoutParticularPowerQ += "LEFT JOIN (SELECT superpower.ID AS superpower_id, superpower.spow AS superpower_superpower, person_superpower.sp_id AS sp_id ";
exports.personsWithoutParticularPowerQ += "FROM superpower ";
exports.personsWithoutParticularPowerQ += "INNER JOIN person_superpower ";
exports.personsWithoutParticularPowerQ += "ON person_superpower.superpower_id = superpower.ID ";
exports.personsWithoutParticularPowerQ += "WHERE superpower.ID = ?) as superpower_table ";
exports.personsWithoutParticularPowerQ += "ON superpower_table.sp_id = person_table.sp_id ";
exports.personsWithoutParticularPowerQ += "WHERE superpower_id IS NULL ";
exports.personsWithoutParticularPowerQ += "ORDER BY person_table.person_name;";

/*
    Name: createCoursePowerQ
    Description: inserts a new course
*/
exports.createCoursePowerQ = "INSERT INTO course_superpower SET ?";