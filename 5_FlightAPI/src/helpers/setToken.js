const jwt = require('jsonwebtoken')

module.exports = function(user, isRefresh = false){

    const { email, isActive, isStaff, isAdmin, _id,username ,password} = user;

    const accessData = { email, isActive, isStaff, isAdmin, username };
    const refreshData = { _id, password };


    return {
        access: jwt.sign(accessData, process.env.ACCESS_KEY, {expiresIn: "30m"}),
        refresh: isRefresh ? null : jwt.sign(refreshData, process.env.REFRESH_KEY, {expiresIn: "1d",}) 
    }

}