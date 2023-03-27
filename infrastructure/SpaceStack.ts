import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import { join } from "path"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { GenericTable } from "./GenericTable";


export class SpaceStack extends Stack {

    private api = new apigateway.RestApi(this, "SpaceApi");
    private spaceTable = new GenericTable("SpaceTable", "spaceId", this);


    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);



        // const lamdaHello = new lambda.Function(this, "hello-lambda", {
        //     runtime: lambda.Runtime.NODEJS_16_X,
        //     code: lambda.Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
        //     handler: 'hello.main'
        // })


        const helloLamdaNodeJs = new NodejsFunction(this, "hello-lambda-nodejs", {
            entry: (join(__dirname, "..", "services", "node", "hello.ts")),
            handler: "main"

        })
        


        const s3listPolicy = new PolicyStatement();
        s3listPolicy.addActions("s3:ListAllMyBuckets");
        s3listPolicy.addResources("*");
        helloLamdaNodeJs.addToRolePolicy(s3listPolicy);


        // Hello Api lambda integration
        const helloLambdaIntegration = new apigateway.LambdaIntegration(helloLamdaNodeJs)
        const helloLambdaResource = this.api.root.addResource('hello');
        helloLambdaResource.addMethod('GET', helloLambdaIntegration);
    }


}