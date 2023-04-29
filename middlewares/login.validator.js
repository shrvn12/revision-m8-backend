const loginValidator = (req, res, next) => {
    const {email, password} = req.body;

    let payload = {
        email, password
    }

    for(let key in payload){
        if(!payload[key]){
            return res.status(402).send({msg:`Please provide ${key}`});
        }
        if(payload.password.length < 5){
            return res.status(402).send({msg:'Password should have minimum 5 characters'});
        }
        let arr = payload.email.split("");
        if(!arr.includes('@') || !arr.includes('.')){
            return res.status(402).send({msg:'Invalid Email'});
        }
    }

    req.body = payload;
    next();
}

module.exports = {
    loginValidator
}