import * as pulumi from "@pulumi/pulumi";
import * as tls from "@pulumi/tls";
import * as aws from "@pulumi/aws";

const env = pulumi.getStack();

const config = new pulumi.Config("server");

const privateKey = new tls.PrivateKey(`${env}-private-key`, {
    algorithm: "RSA",
    rsaBits: 4096,
});

const keyPair = new aws.ec2.KeyPair(`${env}-db-key-pair`, {
    publicKey: privateKey.publicKeyOpenssh,
});

const role = new aws.iam.Role(`${env}-server-role`, {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: "ec2.amazonaws.com" }),
});

new aws.iam.RolePolicyAttachment(`${env}-server-role-ssm-policy-attachment`, {
    role: role.name,
    policyArn: "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
});

new aws.iam.RolePolicyAttachment(`${env}-server-role-ecr-policy-attachment`, {
    role: role.name,
    policyArn: "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
});

const instanceProfile = new aws.iam.InstanceProfile(`${env}-bastion-instance-profile`, {
    role: role.name,
});

// Find an AMI that we will use.
const ami = pulumi.output(
    aws.ec2.getAmi({
        owners: ["amazon"],
        mostRecent: true,
        filters: [
            {
                name: "name",
                values: [config.require("amiName")],
            },
        ],
    })
);

export const ec2Instance = new aws.ec2.Instance(
    `${env}-ec2-instance`,
    {
        ami: ami.id,
        instanceType: config.require("instanceType"),
        iamInstanceProfile: instanceProfile.name,
        // userData: userData,
        keyName: keyPair.keyName,
        tags: {
            Environment: env,
        },
        userData: `#!/bin/bash
        sudo yum update -y
        sudo amazon-linux-extras install docker -y
        sudo service docker start
        sudo usermod -a -G docker ec2-user
        aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 495521027359.dkr.ecr.eu-west-1.amazonaws.com
        docker run -d -p 8080:8080 495521027359.dkr.ecr.eu-west-1.amazonaws.com/prod-ecr-repo`,
    },
);

new aws.ssm.Parameter(`${env}-server-public-key`, {
    type: "SecureString",
    name: `${env}-server-public-key`,
    value: privateKey.publicKeyOpenssh,
    tags: {
        Environment: env,
    },
});

new aws.ssm.Parameter(`${env}-server-private-key`, {
    type: "SecureString",
    name: `${env}-server-private-key`,
    value: privateKey.privateKeyOpenssh,
    tags: {
        Environment: env,
    },
});

export const outputs = {
    serverDns: ec2Instance.publicDns,
    serverIp: ec2Instance.publicIp,
};
