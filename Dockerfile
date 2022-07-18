FROM public.ecr.aws/lambda/nodejs:16

WORKDIR /var/task

COPY src/ package*.json ./

RUN npm install

COPY . .

CMD [ "lambda.handler" ]
