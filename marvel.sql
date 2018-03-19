-------Entity Tables------------------------------------
DROP TABLE IF EXISTS `person`;
DROP TABLE IF EXISTS `superpower`;
DROP TABLE IF EXISTS `city`;
DROP TABLE IF EXISTS `incident`;



CREATE TABLE superpower (
    `ID` INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    `spow` VARCHAR( 225  ) NOT NULL
) ENGINE = INNODB

CREATE TABLE city (
    `ID` INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR( 225  ) NOT NULL UNIQUE,
    `citysize` BIGINT,
    `population` BIGINT
) ENGINE = INNODB

CREATE TABLE person(
    `ID` INT( 11 ) PRIMARY KEY AUTO_INCREMENT ,
    `name` VARCHAR( 225 ) NOT NULL ,
    `real_name` VARCHAR( 225 ) UNIQUE NOT NULL ,
    `origin` TEXT,
    `villain` BOOL,
    `sp_CityID` INT( 11 ) ,
FOREIGN KEY (  `sp_CityID` ) REFERENCES city(  `ID` )
) ENGINE = INNODB

CREATE TABLE incident (
    `ID` INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    `description` TEXT NOT NULL,
    `good_wins` BOOL,
    `in_CityID` INT( 11 ),
    FOREIGN KEY ( `in_CityID` ) REFERENCES city( `ID` )
) ENGINE = INNODB

-------Relationship Tables---------------------------------
DROP TABLE IF EXISTS `person_person`;
DROP TABLE IF EXISTS `person_superpower`;
DROP TABLE IF EXISTS `person_incident`;

CREATE TABLE person_person (
    `sp1_ID` INT( 11 ),
    `sp2_ID` INT( 11 ),
    `relationship` VARCHAR( 255 ) NOT NULL,
    UNIQUE ( `sp1_ID`, `sp2_ID` ),
    PRIMARY KEY ( `sp1_ID`,`sp2_ID` )
) ENGINE = INNODB;

CREATE TABLE person_superpower (
    `sp_ID` INT( 11 ),
    `superpower_ID` INT( 11 ),
    UNIQUE ( `sp_ID`, `superpower_ID` ),
    PRIMARY KEY ( `sp_ID`,`superpower_ID` )
) ENGINE = INNODB;

CREATE TABLE person_incident (
    `in_ID` INT( 11 ),
    `sp_ID` INT( 11 ),
    PRIMARY KEY ( `in_ID`,`sp_ID` )
) ENGINE = INNODB;

--------Database Entries---------------------------
INSERT INTO `city` ( `name`, `citysize`, `population` )
VALUES ( 'New York City', '302', '8537673' );

INSERT INTO `person` (`name`,`real_name`,`origin`,`villain`,`sp_CityID`)
VALUES ( 'Spider-Man','Peter Parker','Bitten by a mutated spider receiving superhuman, spider-themed abilities.','false',(SELECT `ID` from `city` WHERE name = 'New York City')), ('Dr. Octopus','Otto Octavious','Experimental mechanical arm implant made him crazy.','true', (SELECT `ID` from `city` WHERE name = 'New York City'));

INSERT INTO `superpower` ( `spow`)
VALUES ( 'Super Strength' ), ( 'Wall Crawl' ), ( 'Web Shooting' ), ( 'Spider Sense' ), ( 'Intelligence' ), ( 'Mechanical Arms' );

INSERT INTO `person_superpower` ( `sp_ID`, `superpower_ID` )
VALUES ( 
    (SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `superpower` WHERE spow='Super Strength')),
    ((SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `superpower` WHERE spow='Wall Crawl')),
    ((SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `superpower` WHERE spow='Web Shooting')),
    ((SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `superpower` WHERE spow='Intelligence')),
    ((SELECT `ID` FROM `person` WHERE name='Dr. Octopus'),
    (SELECT `ID` FROM `superpower` WHERE spow='Intelligence')),
    ((SELECT `ID` FROM `person` WHERE name='Dr. Octopus'),
    (SELECT `ID` FROM `superpower` WHERE spow='Mechanical Arms'));

INSERT INTO `person_person` ( `sp1_ID`,`sp2_ID`,`relationship` )
VALUES ( 
    (SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `person` WHERE name='Dr. Octopus'),
    'Nemesis' );

INSERT INTO `incident` ( `description`,`good_wins`,`in_CityID` )
VALUES (
    'Rumble in NYC - fight between Spider-Man and Dr. Octopus','true',
    (SELECT `ID` FROM `city` WHERE name-'New York City')
);

INSERT INTO `person_incident` ( `in_ID`, `sp_ID` )
VALUES (
    (SELECT `ID` FROM `incident` WHERE description='Rumble in NYC'),
    (SELECT `ID` FROM `person` WHERE name='Spider-Man')),
    ((SELECT `ID` FROM `incident` WHERE description='Rumble in NYC'),
    (SELECT `ID` FROM `person` WHERE name='Dr. Octopus'));
