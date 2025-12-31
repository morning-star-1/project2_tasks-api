const { app } = require("./app");
const { config } = require("./config/config");

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
  console.log(`Docs at        http://localhost:${config.port}/docs`);
});
