import type { AWS } from '@serverless/typescript';

const baseConfiguration: AWS = {
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
      includeModules: false,
    },
  },
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
};

export default baseConfiguration;
