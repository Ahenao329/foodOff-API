
const jwt = require ('jsonwebtoken');

const generarJWT = (uid, role) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
            role,
        }
    
        jwt.sign( payload, process.env.jwt_SECRET, {
            expiresIn: '6h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log( err );   
                reject(' Consulte con de gerente')       
            } else { 
                resolve ( token );
            }
    
        });

    });

}


module.exports = {
    generarJWT,
    
}