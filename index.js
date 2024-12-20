const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
const viewsDir = process.env.VIEWS_DIR
  ? path.resolve(process.env.VIEWS_DIR)
  : path.join(__dirname, "views");
app.set("views", viewsDir);

const publicDir = process.env.STATIC_DIR
  ? path.resolve(process.env.STATIC_DIR)
  : path.join(__dirname, "public");
app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "abc",
        content: "hi"
    },
    {
        id: uuidv4(),
        username: "abcd",
        content: "hey"
    }
];

app.get("/", (req, res) => {
    res.redirect("/posts");
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("newPost.ejs");
});

app.get("/posts/:username", (req, res) => {
    const { username } = req.params;
    res.render("getPosts.ejs", { username, posts });
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const content = req.body.content;
    const reqPost = posts.find((p) => id === p.id);
    reqPost.content = content;

    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});
