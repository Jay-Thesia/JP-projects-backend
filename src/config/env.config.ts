import dotenv from 'dotenv'; 

const ENVIRONMENT=process.env.ENVIRONMENT || "development"
dotenv.config({path:ENVIRONMENT?`.env.${ENVIRONMENT}`:".env.development"});

const apiKey = process.env.REACT_APP_MY_API_KEY;  

const envObjects={
    BASE_URL:process.env.BASE_URL,
    PORT:process.env.PORT,
    DATABASE_URL:process.env.DATABASE_URL || "",
    NODE_ENV:process.env.NODE_ENV

}


export const {
BASE_URL,
PORT,
DATABASE_URL,
NODE_ENV
}=envObjects