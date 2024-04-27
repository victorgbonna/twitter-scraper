module.exports = function routes(app) {
    // app.get("/", (req, res) => {
    //   return res.sendFile(path.join(__dirname, "public", "./views/index.html"));
    // });
    app.use("/users", require("./users.js"));
    // app.use("/posts", require("./posts.js"));


    app.use((req, res, next) => {
      const error = new Error("Not Found");
      error.status = 404;
      next(error);
    });
  
    app.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        error: {
          status: error.status || 500,
          message: error.message,
        },
      });
    });
  };