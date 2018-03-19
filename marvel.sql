-------Entity Tables------------------------------------
DROP TABLE IF EXISTS `person`;
DROP TABLE IF EXISTS `superpower`;
DROP TABLE IF EXISTS `city`;
DROP TABLE IF EXISTS `incident`;



CREATE TABLE superpower (
    `ID` INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    `pow` VARCHAR( 225  ) NOT NULL
) ENGINE = INNODB

CREATE TABLE city (
    `ID` INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR( 225  ) NOT NULL UNIQUE,
    `size` BIGINT,
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
    `collateral` BIGINT,
    `date` DATE NOT NULL,
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
INSERT INTO `city` ( `name`, `size`, `population` )
VALUES ( 'New York City', '302', '8537673' );

INSERT INTO `person` (`name`,`real_name`,`origin`,`villain`,`sp_CityID`)
VALUES ( 'Spider-Man','Peter Parker','Bitten by a mutated spider receiving superhuman, spider-themed abilities.','false',(SELECT `ID` from `city` WHERE name = 'New York City')), ('Dr. Octopus','Otto Octavious','Experimental mechanical arm implant made him crazy.','true', (SELECT `ID` from `city` WHERE name = 'New York City'));

INSERT INTO `superpower` ( `pow`)
VALUES ( 'Super Strength' ), ( 'Wall Crawl' ), ( 'Web Shooting' ), ( 'Spider Sense' ), ( 'Intelligence' ), ( 'Mechanical Arms' );

INSERT INTO `person_superpower` ( `sp_ID`, `superpower_ID` )
VALUES ( 
    (SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `superpower` WHERE pow='Super Strength')),
    ((SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `superpower` WHERE pow='Wall Crawl')),
    ((SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `superpower` WHERE pow='Web Shooting')),
    ((SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `superpower` WHERE pow='Intelligence')),
    ((SELECT `ID` FROM `person` WHERE name='Dr. Octopus'),
    (SELECT `ID` FROM `superpower` WHERE pow='Intelligence')),
    ((SELECT `ID` FROM `person` WHERE name='Dr. Octopus'),
    (SELECT `ID` FROM `superpower` WHERE pow='Mechanical Arms'));

INSERT INTO `person_person` ( `sp1_ID`,`sp2_ID`,`relationship` )
VALUES ( 
    (SELECT `ID` FROM `person` WHERE name='Spider-Man'),
    (SELECT `ID` FROM `person` WHERE name='Dr. Octopus'),
    'Nemesis' );

INSERT INTO `incident` ( `description`,`collateral`,`date`,`good_wins`,`in_CityID` )
VALUES (
    'Rumble in NYC - fight between Spider-Man and Dr. Octopus', '1000000','1999-03-01','true',
    (SELECT `ID` FROM `city` WHERE name-'New York City')
);

INSERT INTO `person_incident` ( `in_ID`, `sp_ID` )
VALUES (
    (SELECT `ID` FROM `incident` WHERE description='Rumble in NYC'),
    (SELECT `ID` FROM `person` WHERE name='Spider-Man')),
    ((SELECT `ID` FROM `incident` WHERE description='Rumble in NYC'),
    (SELECT `ID` FROM `person` WHERE name='Dr. Octopus'));
