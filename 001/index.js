/* require("./batman")
require("./supermen")

const os = require('os')
console.log(os.type());
console.log(os.version());
console.log(os.homedir()); */


const math = require("./math")
const {add, sub} = math
console.log(add(2,3));
console.log(sub(2,3));
