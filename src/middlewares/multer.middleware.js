import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    // here we can place a file name with our own specifications, but it's not necessary for now 
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    
    cb(null,file.originalname)

    // here we can add any name to file but currently i'm putting it default as user file name 
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    // this may cause trouble in a way for example if multiple users will upload files of same name it may result to ovwerwriting the original file but as soon as the app is deployed and tested i will be modifying it, or atleast i think so..


  }
})

export const upload = multer({ 
    storage,

})