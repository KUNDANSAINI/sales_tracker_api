const router=require('express').Router()

const serviceC=require('../../controllers/servicecontroller')
const tokenvalid=require('../../middleware/tokenvalid')

router.post('/addservice',tokenvalid,serviceC.addservice)
router.get('/service',tokenvalid,serviceC.service)
router.get('/singleservice/:id',tokenvalid,serviceC.singleservice)
router.put('/updateservice/:id',tokenvalid,serviceC.singleupdateservice)
router.delete('/servicedelete/:id',tokenvalid,serviceC.servicedelete)





module.exports=router;