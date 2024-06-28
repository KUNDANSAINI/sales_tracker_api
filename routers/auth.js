const router=require('express').Router()
const authc=require('../controllers/authcontroller')
const tokenvalid=require('../middleware/tokenvalid')

router.post('/login',authc.login)

router.post('/register',tokenvalid,authc.register)

router.get('/empolyee',tokenvalid,authc.empolyee)

router.delete('/userdelete/:id',tokenvalid,authc.empolyeedelete)

router.get('/singleuser/:id',tokenvalid,authc.singleuser)

router.put('/updateuser/:id',tokenvalid,authc.userupdate)

router.get('/userdata/:email',tokenvalid,authc.useremail)







module.exports=router;