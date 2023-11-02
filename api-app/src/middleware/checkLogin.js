module.exports = (req, res, next) => {
    let auth = !!req.session.loginInfo;
    
    if(!auth) res.redirect("/login");
    else return next();      
}