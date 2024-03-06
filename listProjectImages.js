// ./listProjectImages.js

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'harbourcontractorsimages';

exports.handler = async (event) => {

    // Extract the projectName from the path parameter
    const projectName = event.pathParameters.projectName;

    const prefix = `${projectName}/`;

    try {
        const s3Params = {
            Bucket: BUCKET_NAME,
            Prefix: prefix,
        };
        const s3Response = await s3.listObjectsV2(s3Params).promise();

        const imageUrls = s3Response.Contents
            .filter(content => !content.Key.endsWith('/')) // Filter out directories
            .map(content => {
                // Generating full URL for each image
                return `https://${BUCKET_NAME}.s3.eu-west-2.amazonaws.com/${encodeURIComponent(content.Key)}`;
            });

        return {
            statusCode: 200,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(imageUrls),
        };
    } catch (error) {
        console.error('Error listing images:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to list project images', error: error.message }),
        };
    }
};
