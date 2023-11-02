exports.verify = (req, res, next) => {
    let auth = !!req.session.loginInfo;
    if(auth) next();
    else return res.redirect("/login");        
}