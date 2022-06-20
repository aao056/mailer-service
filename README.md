# Mailer-service
A simple service which can be used to send anonymous e-mails to others without having an e-mail account
This is a service for sending quickly e-mails to others.

How to run it?

Clone this repository

Make sure to add to the server directory valid outlook credentials

If you do not have them you can alternatively access the service which is hosted at:

http://3.120.141.246:8000/

Then run the following script:

```
npm run install-client --only=production
npm run install-server
npm run build --prefix client
npm start --prefix server
```

The service should be running now
