import classify from '@functions/classify';
import type { AWS } from '@serverless/typescript';
import baseConfiguration from './serverless.base';


const serverlessConfiguration: AWS = {
  ...baseConfiguration,
  plugins: [
    'serverless-webpack',
    'serverless-offline',
  ],
  functions: { classify },
};

module.exports = serverlessConfiguration;
