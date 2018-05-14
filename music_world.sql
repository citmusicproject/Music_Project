create database user_db;

use user_db;

CREATE TABLE users (
 id int(11) NOT NULL AUTO_INCREMENT,
 first_name varchar(30) COLLATE utf8_unicode_ci NOT NULL,
 last_name varchar(30) COLLATE utf8_unicode_ci NOT NULL,
 email varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 created datetime NOT NULL,
 modified datetime NOT NULL,
 PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE playlist (
    id int(11) NOT NULL,
    pid int(3) NOT NULL,
    play_name varchar(30) COLLATE utf8_unicode_ci,
    PRIMARY KEY (id,pid),
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE video(
	vid varchar(20) NOT NULL,
    video_name varchar(100) NOT NULL,
    PRIMARY KEY(vid)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE songs(
	pid int(3) NOT NULL,
    vid varchar(20) NOT NULL,
    PRIMARY KEY(pid,vid),
    FOREIGN KEY (vid) REFERENCES video(vid) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE review (
    id int(11) NOT NULL,
    vid varchar(20) NOT NULL,
    rating decimal(2,1),
	PRIMARY KEY (id,vid),
    CONSTRAINT const_userReview_id_fk
		FOREIGN KEY (id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT const_vidReview_vid_fk
		FOREIGN KEY (vid) REFERENCES video(vid) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

