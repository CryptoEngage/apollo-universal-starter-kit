import DgraphClient from 'dgraph-node';

// Create a new client
const client = new DgraphClient({
  url: 'localhost:9080',
  debug: true //set false
});
// Transactions
//const txn = client.txn(); // Just setting up instance (no call to Dgraph)
//client.dropAll();// Do not use if don't know how it works - it will clear all graph DB

const schema = `	
Title: string .
Type: string @index(exact) .
createdBy: string .
Text: string @index(fulltext) .
Timestamp: datetime .
session: int @index(exact) .
ageversion: int @index(exact) .
SendBy: string .
Message: uid @reverse .

`;
//update the Schema
client.alter(schema);

export default client;
