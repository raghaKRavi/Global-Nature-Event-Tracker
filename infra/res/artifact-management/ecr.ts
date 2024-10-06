import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

const env = pulumi.getStack();

const ecrRepository = new awsx.ecr.Repository(`${env}-ecr-repo`, {
    name: `${env}-ecr-repo`,
    imageScanningConfiguration: {
        scanOnPush: true,
    },
    imageTagMutability: "MUTABLE",
    lifecyclePolicy: {
        rules: [
            {
                description: "Expire images older than 14 days and are untagged",
                tagStatus: awsx.types.enums.ecr.LifecycleTagStatus.Untagged,
                maximumAgeLimit: 14,
            },
        ],
    },
});

export const outputs = {
    ecrName: ecrRepository.repository.name,
    ecrUrl: ecrRepository.url,
    ecrArn: ecrRepository.repository.arn,
};