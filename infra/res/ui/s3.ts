import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const env = pulumi.getStack();

const config = new pulumi.Config("ui");

const siteBucket = new aws.s3.Bucket(`${env}-static-site-bucket`, {
    website: {
        indexDocument: "index.html",
    },
});

// Configure public access to bucket
// const bucketPolicy = new aws.s3.BucketPolicy(`${env}-static-site-policy`, {
//     bucket: siteBucket.bucket,
//     policy: siteBucket.bucket.apply(bucketName => JSON.stringify({
//         Version: "2012-10-17",
//         Statement: [{
//             Effect: "Allow",
//             Principal: "*",
//             Action: ["s3:GetObject"],
//             Resource: [`arn:aws:s3:::${bucketName}/*`],
//         }],
//     })),
// });

export const outputs = {
    websiteUrl: siteBucket.websiteEndpoint,
};