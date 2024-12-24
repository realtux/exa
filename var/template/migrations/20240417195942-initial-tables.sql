up:
create table users (
    user_id int unsigned primary key auto_increment,
    name varchar(64) not null,
    email varchar(64) not null,
    created_at datetime not null
) character set utf8mb4 collate utf8mb4_unicode_ci;

down:
drop table users;
