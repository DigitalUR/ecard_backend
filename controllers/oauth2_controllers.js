import dotenv from 'dotenv';
import httpStatus from 'http-status';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
dotenv.config();    

const clientId = process.env.MOSIP_CLIENT_ID;
const privateKeyJwk = JSON.parse(process.env.PRIVATE_KEY_JWK);
const redirectUri = process.env.REDIRECT_URI;

const testEsignet = async (req, res) => {
    // const authUrl = `https://esignet.collab.mosip.net/authorize?scope=openid&response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    const authUrl = `https://esignet.collab.mosip.net/authorize?scope=openid profile&response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    return res.redirect(authUrl);
};

const oauth2Esignet = async (req, res) => {
    console.log("hello from oath2Esignet....!");
    const { code } = req.query;
    if (!code) 
        return res.status(httpStatus.UNAUTHORIZED).json({error:true, message:"oauth2 failed"});

    const privateKeyPem = jwkToPem(privateKeyJwk, {private:true});

    const payload = {
        iat: Math.floor(Date.now() / 1000 ),
        exp: Math.floor(Date.now() / 1000 ) + 5 * 60,
        sub: clientId,
        iss: clientId,
        aud: 'https://esignet.collab.mosip.net/v1/esignet/oauth/v2/token'
    };

    const clientAssertion = jwt.sign(payload ,privateKeyPem,{algorithm: 'RS256'});

    try {
        const response = await fetch('https://esignet.collab.mosip.net/v1/esignet/oauth/v2/token',{
            method: 'POST',
            // body: {
            //     code,
            //     client_assertion: clientAssertion,
            //     client_assertion_type:  'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            //     redirect_uri: redirectUri
            // }
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                code: code,
                client_assertion: clientAssertion,
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                redirect_uri: redirectUri,
                grant_type: 'authorization_code'
            }).toString()

        });
        // console.log(response);
        const data = await response.json();
        console.log(data);

        return res.status(httpStatus.OK).json('ok')
    } catch(err) {
        console.log(err.stack);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:true, message: "Something gone wrong"})
    }
};

export {
    testEsignet,
    oauth2Esignet
};
