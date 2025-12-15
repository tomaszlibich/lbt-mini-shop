import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin.js";
import homeRoutes from "./routes/home.js";
import shopRoutes from "./routes/shop.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(homeRoutes);
app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", theme: "light" });
});

app.listen(5000);
