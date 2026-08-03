
import multer from "multer";

// Store files temporarily in memory
const storage = multer.memoryStorage();

// Allow only image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed."), false);
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});

export default upload;

// import multer from "multer"

// const storage = multer.diskStorage({

//     destination: function (req, file, callback) {
//     callback(null, "uploads/"); // folder where files will be saved
//   },
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }

    
// })

// const upload=multer({storage});

// export default upload;