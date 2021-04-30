FROM public.ecr.aws/lambda/nodejs:14

# Copy mobilenet model files
RUN mkdir -p /usr/mobilenet_v2
COPY mobilenet_v2  /usr/mobilenet_v2
RUN chmod -R 777 /usr/mobilenet_v2

# Copy package.json + package-lock.json and cache npm dependences
COPY package.json ${LAMBDA_TASK_ROOT}
COPY package-lock.json ${LAMBDA_TASK_ROOT}
RUN npm ci --only=prod

# Copy handler function
COPY .webpack/classify/src/functions/classify/handler.js ${LAMBDA_TASK_ROOT}

# Set the CMD to the handler
CMD [ "handler.main" ]
