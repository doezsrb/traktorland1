const util = require("util");
const gc = require("./config/");
const bucket = gc.bucket("traktorland");
var folder = "upload";
var publicUrl = "";
const uploadImage = async (name, buffer) => {
  const blob = bucket.file(name);
  const blobStream = blob.createWriteStream({
    public: true,
    resumable: false,
  });
  blobStream
    .on("finish", () => {})
    .on("error", (err) => {
      console.log("ERROR BLOBSTREAM : ");
      console.log(err);
    })
    .end(buffer);
};
export default uploadImage;
