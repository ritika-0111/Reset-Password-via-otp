function verify(req){
    console.log(req.session);
    let session = req.session;
    if(typeof(session.user) == 'undefined')
    return false;
    else
    return true; 
   }
   
   
   module.exports = verify;