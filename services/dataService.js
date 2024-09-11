import connectionPool from "../config/databseConfig.js";

const getInfo = async (email) => {
        const [[credentials]] = await connectionPool.execute(
            `SELECT email, regno  FROM credential WHERE email=?`,
            [email]
        );

        if (!credentials)
            throw new Error('user not found')

        const {regno} = credentials;
        
        const [[academic]] = await connectionPool.execute(
            `SELECT college, 
                school, 
                department, 
                level, 
                active, 
                enrolledAt, 
                completionTime FROM student WHERE regno=?`,
            [regno]
        );

        return {...academic, ...credentials}
};

export {
    getInfo
};