import type { AWS } from '@serverless/typescript';

import classify from '@functions/classify';

const serverlessConfiguration: AWS = {
  service: 'ts-jest-serverless',
  disabledDeprecations: [
    'CLI_OPTIONS_SCHEMA',
  ],
  package: {
    individually: true,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-northeast-1',
    versionFunctions: false,
    logRetentionInDays: 1,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { classify },
};

module.exports = serverlessConfiguration;
