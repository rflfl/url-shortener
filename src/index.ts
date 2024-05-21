import express, { json } from "express";
import { UrlController } from "./controller/UrlController"
import { MongoConnection } from "./database/MongoConnection"

let api = express()

api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new UrlController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)


api.listen(3000, () => console.log("Running server!"))
