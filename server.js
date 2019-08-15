"use strict"

const express = require("express");
const hbs = require("hbs");
// const fs = require("fs");
const fs = require("fs").promises;

const PORT = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);

app.set("view engine", "hbs");

app.use((req, res, next) =>
{
  const now = new Date().toString();
  const log = `Timestamp: ${now}\n${req.method} ${req.url}`;

  fs.appendFile("server.log", `${log}\n`)
    .catch(err => console.log("Unable to append to server.log"));

  console.log(log);

  next();
});

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());

hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) =>
{
  res.render("home.hbs",
    {
      pageTitle: "Home Page",
      welcomeMessage: "Wilkommen zu meine Webseite",
    });
});

app.get("/about", (req, res) =>
{
  res.render("about.hbs",
    {
      pageTitle: "About Page",
    });
});

app.get("/bad", (req, res) =>
{
  res.send
    ({
      error: "Error handling request"
    });
});

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
