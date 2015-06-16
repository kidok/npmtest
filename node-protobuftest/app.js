var fs = require("fs");
var np = require("node-protobuf");
var pb = new np(fs.readFileSync("protocol.desc"));