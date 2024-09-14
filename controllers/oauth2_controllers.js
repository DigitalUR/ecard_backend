import httpStatus from 'http-status';
import { esignet } from '../services/oauth2Service.js';
import { getInfo } from '../services/dataService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getPhoto, savePhoto } from '../services/photo.js';

dotenv.config();

const oauth2Esignet = async (req, res) => {
    const { code, state } = req.query;
    if (!code) 
        return res.status(httpStatus.UNAUTHORIZED).json({error:true, message:"oauth2 failed"});

    try {
        const userEsgnetInfos = await esignet(code);
        const academic = await getInfo(userEsgnetInfos.email);
        const {picture, ...rest} = userEsgnetInfos;

        await savePhoto(picture);
        
        const combinedInfo = { ...academic, ...rest};

        const token = jwt.sign(combinedInfo, process.env.JWT_SECRET_KEY);
        if(state === 'ecard_request')
            return res.redirect(`https://ecard-mosip.vercel.app/studentPortal/${token}`);
        return res. redirect(`${state}?data=${token}&type=student`); 
    } catch (error) {
        console.error(error.stack);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:true, message:"Oops! something gone wrong"});
    }
};



const getImage = async (req, res) => {
    try {
        const photo = await getPhoto();

        return res.status(httpStatus.OK).json({picture:photo})
    } catch(error) {
        console.error(error.stack);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:true, message:"Oops! something gone wrong"});
    }
}

export {
    oauth2Esignet,
    getImage
};