import db from "../db.js";

const getAllData = async () => {
  try {
    const [results] = await db.promise().query("SELECT * FROM student");
    return results;
  } catch (err) {
    throw new Error("Error fetching data: " + err.message);
  }
};

export default {
  getAllData,
};
