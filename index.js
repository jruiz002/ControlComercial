"use strict"

const app = require("./configs/app");
const port = 3000;
app.listen(port, () => {
    console.log(`Server running to port ${port}`);
});
