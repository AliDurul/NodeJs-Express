const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const auth = req.headers?.authorization || null;
    const accessToken = auth ? auth.split(" ")[1] : null;
  
      req.isLogin = false
  
    jwt.verify(accessToken, process.env.ACCESS_KEY, function(err, user){
      if(err){
          req.user = null
      }else{
          req.isLogin = true
          req.user = user
      }
    } )
  
    next();
  }