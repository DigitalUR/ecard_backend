import connectionPool from "../config/databseConfig.js";
const getPhoto = async () => {
    const [[{photo}]] = await connectionPool.execute(
        `SELECT * FROM tempPhoto`
    );

    await connectionPool.execute(
        `TRUNCATE TABLE tempPhoto`
    );

    return returnedPhoto;
};


const savePhoto = async (photo) => {
    try {
        const insertion = await connectionPool.execute(
            `INSERT INTO tempPhoto VALUES(?)`,
            [photo]
        );
    
        return insertion;        
    } catch (error) {
        console.error(error.stack);
        return "error";
    }
};


export {
    savePhoto,
    getPhoto
};