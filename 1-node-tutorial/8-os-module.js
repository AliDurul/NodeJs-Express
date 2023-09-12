const os = require('os')

// info about current user
const user = os.userInfo()
console.log(user);

// method retunrs the system uptime in seconds
console.log(`The system Uptime is ${os.uptime()} seconds`);
console.log((os.uptime()/ 60)/60);

const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMem:os.freemem()
}

console.log(currentOS);