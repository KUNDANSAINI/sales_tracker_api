const router=require('express').Router()
const tokenvalid=require('../../middleware/tokenvalid')
const taskC=require('../../controllers/taskcontroller')



router.post(`/empolyeetask/:email`,tokenvalid,taskC.empolyeetask)

router.get(`/alltaskdata`,tokenvalid,taskC.alltaskdata)

router.delete(`/taskdelete/:id`,tokenvalid,taskC.taskdelete)

router.get(`/singletask/:id`,tokenvalid,taskC.singletask)

router.post(`/updatetask/:id`,tokenvalid,taskC.updatetask)

router.get(`/userservice/:email`,tokenvalid,taskC.userservice)











module.exports=router;