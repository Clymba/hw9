CREATE TABLE category_of_account
(
	code_category integer NOT NULL PRIMARY KEY,
	Name_c VARCHAR(45) NOT NULL
);

CREATE TABLE user_
(
	code_user integer UNIQUE NOT NULL PRIMARY KEY,
	fk_code_category integer
	foreign key (fk_code_category) references category_of_account(code_category),
    e_mail VARCHAR(30) UNIQUE NOT NULL,
	Gender boolean NOT NULL,
	name_ VARCHAR(1478) NOT NULL,
	famille VARCHAR(1612) NOT NULL,
	patronymique VARCHAR(45) NOT NULL,
);

CREATE TABLE supervisor
(
	code_supervisor integer unique NOT NULL PRIMARY KEY,
	fk_code_user integer references user_(code_user) NOT NULL,
	education VARCHAR(45) NOT NULL,
	profile_education VARCHAR(45) NOT NULL,
	time_hours TIME NOT NULL
);

CREATE TABLE course
(
	code_course integer NOT NULL PRIMARY KEY,
	Date_of_start TIMESTAMP NOT NULL,
	Date_of_end TIMESTAMP NOT NULL,
	type_of_cousre VARCHAR(20) NOT NULL,
	Status_of_course boolean NOT NULL default false
);


CREATE TABLE Group_users
(
	code_group integer NOT NULL PRIMARY KEY,
	fk_code_course integer references course(code_course) NOT NULL,
	Name_c VARCHAR(45) NOT NULL
);

CREATE TABLE list_of_users
(
	fk_code_user integer references user_(code_user) NOT NULL,
	fk_code_group integer references Group_users(code_group) NOT NULL,
);
