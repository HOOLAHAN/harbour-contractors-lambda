// Assuming you have a lib/s3Client.js that handles creating the S3 client
const s3Client = require("./lib/s3Client");

module.exports.listProjectImages = async (event) => {
  console.log("Received event:", JSON.stringify(event));
  const req = JSON.parse(event.body);
  const projectName = req.projectName;
  
  try {
    const params = {
      Bucket: "harbourcontractorsimages",
      Prefix: `${projectName} `,
    };

    const data = await s3Client.listObjectsV2(params).promise();
    const images = data.Contents.map((item) => item.Key);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Images listed successfully",
        projectName: projectName,
        images: images,
      }, null, 2),
    };
  } catch (error) {
    console.error("Error listing project images:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to list images",
        error: error.message,
      }, null, 2),
    };
  }
};
