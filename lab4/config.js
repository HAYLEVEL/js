require('dotenv').config();
 
const config = {
    dbConnectionString: process.env.DB_HOST,
    //
    cloudinary : {
    cloud_name: "backend-labs-lavinsky",
    api_key: 537151117776743,
    api_secret: process.env.CLOUDINARY_SECRET
    }
};
 
module.exports = config;