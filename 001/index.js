/* require("./batman")
require("./supermen")

const os = require('os')
console.log(os.type());
console.log(os.version());
console.log(os.homedir()); */

/* const math = require("./math")
const {add, sub} = math
console.log(add(2,3));
console.log(sub(2,3));
 */

/* const data = require('./data.json')
console.log(data); */

/* console.log(__filename);
console.log(__dirname);

const path = require('node:path') // path module
// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));
// console.log(path.extname(__filename));
// console.log(path.extname(__dirname));

console.log(path.parse(__filename));

console.log(path.join('folder1','folder2','index.html')); */

/* const EventEmitter = require("node:events");

const emitter = new EventEmitter();

emitter.on("order-pizza", (size, topping) => {
  console.log(`order received! Baking a ${size} pizza with ${topping}`);
});

emitter.emit('order-pizza', 'large', 'mushrooms') */

const PizzaShop = require("./pizza-shop")

const pizzaShop = new PizzaShop()

pizzaShop.order()
pizzaShop.displayOrderNumber()