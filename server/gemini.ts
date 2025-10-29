


"use strict";
import dotenv from "dotenv";
dotenv.config();
// A) importing librerie
import http from "http";
import url from "url";
import fs from "fs";
import express from "express";



import { generateText, streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';

import { z } from 'zod';




// B) configurazione server
const port: number = 3000;
let paginaErr: string = "";
const app: express.Express = express();
//app sarebbe funzione di callback per la creazione del server





// C) creazione server
const server: http.Server = http.createServer(app);

server.listen(port, function () {
    console.log("Server in ascolto sulla porta " + port);

    fs.readFile("./static/error.html", function (err, content) {
        if (err)
            paginaErr = "<h1>Risorsa non trovata</h1>";
        else
            paginaErr = content.toString();
    });

});


app.use("/", function (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log("Metodo: " + req.method);
    console.log("Original URL: " + req.originalUrl);
    next();
})

app.use("/", express.static("./static"));

app.use("/", express.json({ limit: "10mb" }));

app.use("/", function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && Object.keys(req.body).length > 0) {
        console.log("-------------------\nParametri post: " + JSON.stringify(req.body));
    }
    next();
})



app.get("/api/gemini/generate", async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        console.log("API Key: " + process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        const { text, usage } = await generateText({
            model: google("gemini-2.5-flash-lite"),
            system: "You are a 8 years old kid",
            prompt: "What is love in simple terms?",
        })
        res.send({ text, usage });
    } catch (error) {
        next(error);
    }
});

app.get("/api/gemini/structured-output", async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { object } = await generateObject({
            model: google("gemini-2.5-flash-lite"),
            schema: z.object({
                flashcards: z.array(z.object({
                    question: z.string().describe("The question on the front of the flashcard"),
                    options: z.array(z.string()).describe("Multiple choice options for the question, 3 choices"),
                    answer: z.string().describe("The correct answer to the question"),
                })
                ).describe("A list of quiz to help learn the basics of the Star Wars universe, 5 question")
            }),
            prompt: 'Generate quiz for learning basic of Star Wars universe',
        });
        res.send(object);
    } catch (error) {
        next(error);
    }
})



// F) default root 
app.use("/", function (req: express.Request, res: express.Response) {
    res.status(404);
    if (!req.originalUrl.startsWith("/api/")) {
        res.send(paginaErr);// send serializza in automatico
    }
    else {
        res.send("Risorsa non trovata");
    }
})

// G) gestione errori
app.use("/", function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    // err.stack contiene l'elenco completo degli errori
    res.status(500);
    res.send(err.message);
    console.log("*********ERROR*********\n" + err.stack)

})