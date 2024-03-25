import { Client, Account } from 'appwrite';
const client = new Client();

client
    .setProject('660174264de420d938a0')
    .setEndpoint('https://cloud.appwrite.io/v1')

const account = new Account(client);

export { client, account }