const Cloud = require("@google-cloud/storage");
const path = require("path");

const json = path.resolve("public/keys2.json");

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: json,
  projectId: "traktorland-rs",
});

module.exports = storage;
