# ts-serverless-tfjs

Source code for [How To Deploy A “Huge” Serverless Project To Aws? —Image Classification API With TensorflowJS](https://hoangdv.medium.com/how-to-deploy-a-huge-serverless-project-to-aws-image-classification-api-with-tensorflowjs-367a34dfe155)

## How to start?

1. Install dependencies

```
npm ci
```

2. Run unit test

```
npm run test
```

3. Start dev server

```
npm run offline
```

4. Play

```
curl --location --request POST 'localhost:3000/hello' \
    --header 'Content-Type: application/json' \
    --data-raw '{ "name": "hoangdv" }'
```

## How to deploy?

```
npm run deploy
```
