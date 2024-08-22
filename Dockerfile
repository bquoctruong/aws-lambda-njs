FROM public.ecr.aws/lambda/nodejs:20

# DataDog agent installation
RUN npm install datadog-lambda-js dd-trace

COPY --from=public.ecr.aws/datadog/lambda-extension:latest /opt/. /opt/

# Set DD_LAMBDA_HANDLER to original handler; originally app.handler
ENV DD_LAMBDA_HANDLER=app.js

# Copy function code
COPY app.js ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "node_modules/datadog-lambda-js/dist/handler.handler" ]
