import express from "express";
import { enquiryForm } from "../controllers/contact.controller";

const contactRoute = express.Router();

contactRoute.post(`/submitForm`, enquiryForm);

export default contactRoute;
