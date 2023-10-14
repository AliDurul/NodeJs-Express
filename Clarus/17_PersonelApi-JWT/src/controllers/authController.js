
const Personnel = require('../models/personnel.model')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req,res) => {
      const { username, password} = req.body

        if(username && password){

            const user = await Personnel.findOne({username, password})
           
            if(user){

                if(user.isActive){
                    // login Ok

                    const accessData = {
                        _id: user._id,
                        departmentId: user.departmentId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isActive: user.isActive,
                        isAdmin: user.isAdmin,
                        isLead: user.isLead
                    }

                    const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '30m'})
                    

                    const refreshData = {
                        username: user.username,
                        password: user.password
                    }

                    const refreshToken = jwt.sign(refreshData,process.env.REFRESH_KEY, {expiresIn: '3d'})

                    res.send({
                        error: false,
                        token:{
                            access: accessToken,
                            refresh: refreshToken
                        }
                    })

                }else{
                    res.errorStatusCode = 401
                    throw new Error('This account is not active')
                }
            }else{
                res.errorStatusCode = 401
            throw new Error('Wrong Crediantials..')
            }

        }else{
            res.errorStatusCode = 401
            throw new Error('Pleae anter username and password.')
        }

    },
    refresh: async (req,res) => {
      
    },
    logout: async (req,res) => {
      res.send({
        error:false,
        message: 'No need any doing for logout. You must deleted Baerer Token from your browser.'
      })
    },
}