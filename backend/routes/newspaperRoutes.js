const express = require("express");
const router = express.Router();
const authenticate=require('../middlewares/Auth');
const { getHeadlines ,getNewspapers} = require("../controllers/newspaperController");


router.get('/newspapers',getNewspapers)
router.get("/headlines/:newspaperId", getHeadlines); // Fetch headlines of a newspaper

module.exports = router;
