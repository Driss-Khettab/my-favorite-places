// import { DataSource } from "typeorm";
// import { User } from "./entities/User";
// import { Address } from "./entities/Address";

// const datasource = new DataSource({
//   type: "better-sqlite3",
//   database: "./data/db.sqlite",
//   entities: [__dirname + "/entities/**/*.{js,ts}"],
//   logging: true,
//   synchronize: true,
// });

// const datasource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "postgres",
//   password: "mysecretpassword",
//   database: "postgres",
//   entities: [User, Address],
//   logging: true,
//   synchronize: true,
// });

// export default datasource;


import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Address } from "./entities/Address";

const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "mysecretpassword",
  database: process.env.DB_NAME || "postgres",
  entities: [User, Address],
  logging: true,
  synchronize: true,
});

export default datasource;