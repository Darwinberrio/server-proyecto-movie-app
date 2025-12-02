const jwt=require('jsonwebtoken')

const JWTGenerator=(payload)=>{
    
    //devuelve una promesa por la funcion sign

    return new Promise((resolve,reject)=>{

        //TOKEN compuesto de payload(cuerpo con informacion que se quiera del usuario)
        jwt.sign(
                payload, //lo que recibe  JWTGenerator por parametro
                process.env.SECRET_KEY, //lo coge de variables de entorno en archivo .ENV
                {expiresIn:'2h'},
                (error,token)=>{ //si hay error echar
                    if(error) {
                        console.log(error)
                        reject('error')
                    }else{
                        resolve(token)
                    }
                }

        )
    })
        
}

const decodeToken=(token)=>{
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports={JWTGenerator,decodeToken}