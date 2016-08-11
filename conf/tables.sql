CREATE TABLE users (
  name varchar(255) binary NOT NULL default '',
  country varchar(255) binary NOT NULL default ''
);

CREATE TABLE batches (
  number int unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  country varchar(255) binary NOT NULL default '',
  owner varchar(255) binary NOT NULL default '',
  data text NOT NULL default '',
  closed bool NOT NULL default 0
);
