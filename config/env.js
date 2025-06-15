import { config } from "dotenv";

config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});

// console.log(process.env.NODE_ENV)

export  const {PORT,DB_URL,NODE_ENV} = process.env