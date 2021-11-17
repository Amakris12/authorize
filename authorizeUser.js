const authorizeUser = (req,res,next) =>{
    const {emailKey} = req.query;
    if(emailKey === '' ){
       req.user = {name:'John John', id:'0112358132235'}
       next()
    }else{
        console.log('You lost your chance to use this api, Sorryyyyy')
        res.send({result:[],status:401,message:'unathorized access'})
    }
}
module.exports = authorizeUser