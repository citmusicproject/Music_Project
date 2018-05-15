create database user_db;

use user_db;

CREATE TABLE users (
 id varchar(8) COLLATE utf8_unicode_ci NOT NULL,
 first_name varchar(30) COLLATE utf8_unicode_ci NOT NULL,
 last_name varchar(30) COLLATE utf8_unicode_ci NOT NULL,
 email varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 created datetime NOT NULL,
 modified datetime NOT NULL,
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE playlist (
    id varchar(8) COLLATE utf8_unicode_ci NOT NULL,
    video_name varchar(30) COLLATE utf8_unicode_ci,
    vid varchar(20) NOT NULL,
    rating decimal(2,1),
    PRIMARY KEY (id,vid),
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
