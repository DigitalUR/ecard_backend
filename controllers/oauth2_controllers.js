import httpStatus from 'http-status';
import { esignet } from '../services/oauth2Service.js';
import { getInfo } from '../services/dataService.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs/promises';  // Using promises for async file operations
import path from 'path';        // For safe path management

dotenv.config();

const oauth2Esignet = async (req, res) => {
    const { code } = req.query;
    if (!code) 
        return res.status(httpStatus.UNAUTHORIZED).json({error: true, message: "oauth2 failed"});

    try {
        const userEsgnetInfos = await esignet(code);
        const academic = await getInfo(userEsgnetInfos.email);
        
        // Generate unique file name (e.g., using email as identifier)
        const uuidName = `user_${userEsgnetInfos.email}`;
        const image = userEsgnetInfos.picture;

        // Writing image data to file
        const filePath = path.join(process.cwd(), `${uuidName}.txt`);
        await fs.writeFile(filePath, image, 'utf8');
        
        // Overwrite userEsgnetInfos picture with the file name
        userEsgnetInfos.picture = uuidName;

        // Combine academic and user information
        const combinedInfo = { ...academic, ...userEsgnetInfos };

        // Generate a JWT with combined information
        const token = jwt.sign(combinedInfo, process.env.JWT_SECRET_KEY);

        // Redirect to frontend with the token
        return res.redirect(`https://ecard-mosip.vercel.app/studentPortal/${token}`);
    } catch (error) {
        console.error(error.stack);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: true, message: "Oops! something went wrong" });
    }
};

const getImage = async (req, res) => {
    const { imageFileName } = req.params;

    // Validate image file name (for security)
    if (!imageFileName || typeof imageFileName !== 'string') {
        return res.status(httpStatus.BAD_REQUEST).json({ error: true, message: "Invalid image file name" });
    }

    try {
        const filePath = path.join(process.cwd(), `${imageFileName}.txt`);
        
        // Read the file content
        const imageData = await fs.readFile(filePath, 'utf8');
        
        // Delete the file after reading
        await fs.unlink(filePath);

        // Send the image data back as response
        return res.status(httpStatus.OK).json({ picture: imageData });
    } catch (err) {
        console.error(`Error reading/deleting the file: ${err.message}`);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: true, message: "Error reading image" });
    }
};

export {
    oauth2Esignet,
    getImage
};
