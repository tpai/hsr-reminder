# HSR Reminder

Lambda function for checking availability of HSR trains at specific time, it will trigger webhook if train data exists.

## Usage

Run function in development mode.

```
npm start
```

## Deployment

1. Fill up required environment variables.
1. Archive source code.

    ```
    npm run build
    ```
1. Upload zip file to AWS Lambda.
1. Use Cloudwatch event to setup cron job.
1. It's done, wait for the message.
