import dotenv from 'dotenv';
dotenv.config();

const testEsignet = async (req, res) => {    
    const clientId = process.env.MOSIP_CLIENT_ID
    const redirectUri = `https://ecard-backend.onrender.com/api/oauth2/esignet/callback`
    
    const authUrl = `https://esignet.collab.mosip.net/authorizescope=openid&response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    return res.redirect(authUrl);
};

export {
    testEsignet
};