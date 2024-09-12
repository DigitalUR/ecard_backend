import httpStatus from 'http-status';
import { esignet } from '../services/oauth2Service.js';
import { getInfo } from '../services/dataService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const oauth2Esignet = async (req, res) => {
    const { code } = req.query;
    if (!code) 
        return res.status(httpStatus.UNAUTHORIZED).json({error:true, message:"oauth2 failed"});

    try {
        const userEsgnetInfos = await esignet(code);
        const academic = await getInfo(userEsgnetInfos.email);
        // bobox idea
        const image = userEsgnetInfos.picture;
        console.log(image);
        
        const uuidName = 'a100';
        fs.writeFileSync(`${uuidName}.txt`, image);
        userEsgnetInfos.picture = uuidName;
        fs.readFile(`${uuidName}.txt`, 'utf8', (err, data) => {
            console.log("successfuly read the file");

            console.log(data);
            if (err) {
                console.error(`Error reading the file: ${err.message}`);
                return;
            }
    
        });
        
        const combinedInfo = { ...academic, ...userEsgnetInfos};
        //bobox idea

        const token = jwt.sign(combinedInfo, process.env.JWT_SECRET_KEY);

       return res.redirect(`https://ecard-mosip.vercel.app/studentPortal/${token}`)     
    } catch (error) {
        console.error(error.stack);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:true, message:"Oops! something gone wrong"})
    }
};
const getImage = (req, res) => {
    const {imageFileName} = req.params;
    const filePath = `./${imageFileName}.txt`;
    let dataBuffer = ''
    fs.readFile(filePath, 'utf8', (err, data) => {
        dataBuffer = data
        if (err) {
            console.error(`Error reading the file: ${err.message}`);
            return;
        }

    });

fs.unlink(filePath, (err) => {
    console.log("successfully deleted");
    if (err) {
        console.error(`Error deleting the file: ${err.message}`);
        return;
    }

});

    res.status(httpStatus.OK).json({
        picture: dataBuffer
    });
}

export {
    oauth2Esignet,
    getImage,
};