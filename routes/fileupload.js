const express = require("express");
const router = express.Router();
const { upload } = require("../multer-s3-fileupload/s3UploadClient");
const aws = require("aws-sdk");
// Upload a file
router.post("/upload", upload.array("inputFile", 3), (req, res) => {
	if (!req.files) res.status(400).json({ error: "No files were uploaded." });
	console.log(req.files[0].location);
	res.status(201).json({
		message: "Successfully uploaded " + req.files.length + " files!",
		files: req.files,
	});
});
var s3 = new aws.S3();

var params = {
	Bucket: process.env.AWS_S3_BUCKET,
	Delete: {
		// required
		Objects: [
			// required
			{
				Key: "files_from_node/1591952719568india.pdf", // required
			},
		],
	},
};

s3.deleteObjects(params, function (err, data) {
	if (err) console.log(err, err.stack);
	// an error occurred
	else console.log(data); // successful response
});

module.exports = router;
