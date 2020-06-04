var db = require('./db');

var setSess=function (req, email,username, name)
{
        sessionData = req.session;
        sessionData.user = {};
        sessionData.user.username = username;
        sessionData.user.email = email;
        sessionData.user.name = name;
     
        db.query('UPDATE user SET ? WHERE username=?', [post,username], function (error, result) {
        if (error) throw error;
        return result;
    }); 
        console.log("Setting session data:username=%s and email=%s and name=%s",
            sessionData.user.username, sessionData.user.email, sessionData.user.name
            );
}

var destroySess=function (res)
{
    req.session.user.destroy(function(err) {
        if(err){
            throw err;
        }else{
            res.redirect('/');
        }
    });
}

module.exports={
    setSess: setSess,
    destroySess: destroySess
}