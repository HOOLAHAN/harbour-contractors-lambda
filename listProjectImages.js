const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'harbourcontractorsimages';
const CLOUD_FRONT_URL = 'https://d8b2kltqfdpv.cloudfront.net';

exports.handler = async (event) => {
    const projectName = event.pathParameters.projectName;
    const prefix = `${projectName}/`;

    try {
        const s3Params = {
            Bucket: BUCKET_NAME,
            Prefix: prefix,
        };
        const s3Response = await s3.listObjectsV2(s3Params).promise();

        const imageUrls = s3Response.Contents
            .filter(content => !content.Key.endsWith('/'))
            .map(content => {
                return `${CLOUD_FRONT_URL}/${encodeURIComponent(content.Key)}`;
            });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,GET" 
            },
            body: JSON.stringify(imageUrls),
        };
    } catch (error) {
        console.error('Error listing images:', error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,GET" 
            },
            body: JSON.stringify({ message: 'Failed to list project images', error: error.message }),
        };
    }
};
