import { ApiGatewayProps } from "aws-cdk-lib/aws-events-targets";
import {S3} from "aws-sdk"


const s3Client = new S3();


async function main(event : any, context : any) {
    console.log("event : ");
    console.log(event);


    const s3listBucket = await s3Client.listBuckets().promise();


    return {
        statusCode: 200,
        body: JSON.stringify(s3listBucket)
    }
}


export {main}