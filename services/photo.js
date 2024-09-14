import connectionPool from "../config/databseConfig.js";
const getPhoto = async () => {
    const [[{photo}]] = await connectionPool.execute(
        `SELECT * FROM tempPhoto`
    );

    console.log(photo);
    await connectionPool.execute(
        `TRUNCATE TABLE tempPhoto`
    );

    return photo;
};


const savePhoto = async (photo) => {
    const insertion = await connectionPool.execute(
        `INSERT INTO tempPhoto VALUES(?)`,
        [photo]
    );
};


export {
    savePhoto,
    getPhoto
};