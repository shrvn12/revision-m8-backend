const registrationValidator = (req, res, next) => {
    let {name, email, password, address} = req.body;
    let payload = {
        name, email, password, address
    }

    for(let key in payload){
        if(!payload[key]){
            return res.status(402).send({msg:`Please provide ${key}`});
        }
        if(payload.password.length < 5){
            return res.status(402).send({msg:'Password should have minimum 5 characters'});
        }
        let arr = payload.email.split("");
        // console.log(arr);
        if(!arr.includes('@') || !arr.includes('.')){
            return res.status(402).send({msg:'Invalid Email'});
        }
    }

    address = {
        street: payload.address.street,
        city: payload.address.city,
        state: payload.address.state,
        country: payload.address.country,
        zip: payload.address.zip
    }

    for(let key in address){
        if(!address[key]){
            return res.status(402).send({msg:`Please provide ${key}`});
        }
    }
    req.body = payload;
    next();
}

module.exports = {
    registrationValidator
}