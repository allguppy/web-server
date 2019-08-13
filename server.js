"use strict"

const express = require("express");
const hbs = require("hbs");
// const fs = require("fs");
const fs = require("fs").promises;

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);

app.set("view engine", "hbs");

app.use((req, res, next) =>
{
  const now = new Date().toString();
  const log = `Timestamp: ${now}\n${req.method} ${req.url}`;

  // fs.appendFile(file, data, options, callback)
  fs.appendFile("server.log", `${log}\n`)
    .catch(err => console.log("Unable to append to server.log"));

  console.log(log);

  next();
});

// app.use((req, res) =>
// {
//   res.render("maintenance.hbs");
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());

hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) =>
{
  // res.send("<h1>Hello express!</h1>");
  // res.send
  //   ({
  //     name: "Andrew",
  //     likes: ["Biking", "Cities"]
  //   });

  res.render("home.hbs",
    {
      pageTitle: "Home Page",
      welcomeMessage: "Wilkommen zu meine Webseite",
    });
});

app.get("/about", (req, res) =>
{
  // res.send("About Page");
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

app.listen(3000, () => console.log("Server is up on port 3000"));
