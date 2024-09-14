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
    const insertion = await connectionPool.execute(
        `INSERT INTO tempPhoto VALUES(?)`,
        [photo]
    );

    return insertion;
};


export {
    savePhoto,
    getPhoto
};