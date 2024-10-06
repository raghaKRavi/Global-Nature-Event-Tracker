import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";

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

const image = new awsx.ecr.Image("nasa-web-app", {
    repositoryUrl: ecrRepository.url,
    context: "./",
    dockerfile: "../server/Dockerfile"
})

export const outputs = {
    ecrName: ecrRepository.repository.name,
    ecrUrl: ecrRepository.url,
    ecrArn: ecrRepository.repository.arn,
    image: image.imageUri
};