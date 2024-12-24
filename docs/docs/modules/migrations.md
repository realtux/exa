---
sidebar_position: 10
---

# migrations

the purpose of migrations is to easily apply and rollback changes to a database in a way that will sync across workspaces and developers. although not technically a module since `exa.js` has no internal code associated with migrations, it's included as a recommended way of handling database migrations anyway. the `migrations` directory could also be used with other tools, if so desired.

## jmig

the suggested migration tool and the one this documentation will focus on is `jmig`. the full documentation for this tool is located at [https://github.com/realtux/jmig](https://github.com/realtux/jmig). `jmig` is invoked in an `exa.js` project via `npx`.

## managing migrations

migration files are created in the `migrations` folder using the jmig command `npx jmig create <migration name>`. to create a migration file like the one in the next section, you could run `npx jmig create initial tables`. after the migration file is filled out, the changes can be applied with `npx jmig migrate`. changes can be rolled back with `npx jmig rollback`.

## sample migration file

```sql title="migrations/20240417195942-initial-tables.sql"
up:
create table users (
    user_id int unsigned primary key auto_increment,
    name varchar(64) not null,
    email varchar(64) not null,
    created_at datetime not null
) character set utf8mb4 collate utf8mb4_unicode_ci;

down:
drop table users;
```

### how to interpret

a blank migration file will have only `up:` and `down:` in it to start. changes to a database should be placed under the `up:` section, then reversing those changes should be placed in the `down:`. in the provided example, a `users` table is created upon migration, and then dropped upon rollback.
