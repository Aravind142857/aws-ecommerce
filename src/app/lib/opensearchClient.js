import AWS from 'aws-sdk';
import { Client } from '@opensearch-project/opensearch';

const region = 'US East (Ohio)';
const domainEndpoint = 'https://search-e-commerce-aws-rure2vscwhey4zl5novutqzfqe.aos.us-east-2.on.aws';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region,
});

export const opensearchClient = new Client({
    node: domainEndpoint,
    Connection: require('@opensearch-project/opensearch/aws'),
    awsConfig: new AWS.Config(),
});
