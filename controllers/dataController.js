import dataService from "../services/dataService.js";

const getData = async (req, res) => {
  try {
    const data = await dataService.getAllData();
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getData,
};
