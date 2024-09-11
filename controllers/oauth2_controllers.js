import httpStatus from 'http-status';
import { esignet } from '../services/oauth2Service.js';

const oauth2Esignet = async (req, res) => {
    const { code } = req.query;
    if (!code) 
        return res.status(httpStatus.UNAUTHORIZED).json({error:true, message:"oauth2 failed"});

    try {
        const userEsgnetInfos = await esignet(code);

        // const combinedData = {...academicInfo, ...userEsgnetInfos}
        return res.status(httpStatus.OK).json(userEsgnetInfos);     
    } catch (error) {
        console.error(error.stack);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:true, message:"Oops! something gone wrong"})
    }
};

const dataDemo = (req, res) => {
    res.status(httpStatus.OK).json({
        regNo:222004312,
        college:'College of science and technology',
        school:'School og ICT',
        department:'Computer science',
        active:true,
        enrolledAt:2021,
        completionTime:2025
    });
}

export {
    oauth2Esignet,
    dataDemo
};
