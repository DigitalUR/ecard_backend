import httpStatus from 'http-status';
import { esignet } from '../services/oauth2Service.js';
import { getInfo } from '../services/dataService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const photos = [];

const oauth2Esignet = async (req, res) => {
    const { code } = req.query;
    if (!code) 
        return res.status(httpStatus.UNAUTHORIZED).json({error:true, message:"oauth2 failed"});

    try {
        const userEsgnetInfos = await esignet(code);
        const {picture, ...rest} = userEsgnetInfos;

        const academic = await getInfo(userEsgnetInfos.email);
        const combinedInfo = { ...academic, ...rest};

        photos.push({id:academic.regno, pic:picture});

        const token = jwt.sign(combinedInfo, process.env.JWT_SECRET_KEY);

       return res.redirect(`https://ecard-mosip.vercel.app/studentPortal/${token}`)     
    } catch (error) {
        console.error(error.stack);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:true, message:"Oops! something gone wrong"})
    }
};

const getPhoto = (req, res) => {
    const { regno } = req.params;
    const pic = photos.find(photo=> photo.id === regno);

    const index = photos.findIndex(photo => photo.id === regno);
    photos.splice(index, 1);

    res.status(httpStatus.OK).json({photo:pic.pic});
};

export {
    oauth2Esignet,
    getPhoto
};
