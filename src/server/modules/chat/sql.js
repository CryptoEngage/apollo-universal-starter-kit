/*eslint-disable no-unused-vars*/
import client from '../../../server/sql/graphconnector';

let queryFragTopic = `	
        id : uid
        createdBy
        Title
        Text
        Timestamp
        session
        ageversion
`;

let queryFragmsg = `	
        id : uid
        Type
        SendBy
        Text
        Timestamp
        ageversion
`;

export default class Chat {
  async createTopic(input) {
    const now = new Date().toISOString();
    let mutate = await client.mutate({
      set: `
                _:uid <Title> "${input.title}" .
                _:uid <Type> "Topic" .
                _:uid <createdBy> "${input.SendBy}" .
                _:uid <Text> "${input.text}" .
                _:uid <Timestamp> "${now}" .
                _:uid <session> "${input.session}" .
                _:uid <ageversion>  "${input.ageversion}" .
                    `
    });
    let query = await client.query(`
                query {
                    getTopic(func: uid(${mutate.data.uid})) {
                        ${queryFragTopic}
                    }
                    }
                    `);
    if (Object.keys(query.data.getMessage).length > 0) {
      let arrayToObjectToCall = array =>
        array.reduce((obj, item) => {
          obj['user'] = item;
          return item;
        }, {});
      query = arrayToObjectToCall(query.data.getMessage);
    } else {
      query = undefined;
    }
    return query;
  }

  async getTopics() {
    let query = await client.query(`
        query {
            getTopics(func: eq(Type, "Topic")) {
                ${queryFragTopic}
            }
            }
            `);
    return query.data.getTopics;
  }

  async createMessage(input) {
    const now = new Date().toISOString();
    let mutate = await client.mutate({
      set: `
        <${input.topicID}> <Message> _:uid .
                _:uid <Type> "Message" .
                _:uid <SendBy> "${input.SendBy}" .
                _:uid <Text> "${input.text}" .
                _:uid <Timestamp> "${now}" .
                _:uid <ageversion>  "${input.ageversion}" .
                `
    });
    let query = await client.query(`
                query {
                    getMessage(func: uid(${mutate.data.uids.uid})) {
                        ${queryFragmsg}
                    }
                    }
                    `);
    if (Object.keys(query.data.getMessage).length > 0) {
      let arrayToObjectToCall = array =>
        array.reduce((obj, item) => {
          obj['user'] = item;
          return item;
        }, {});
      query = arrayToObjectToCall(query.data.getMessage);
    } else {
      query = undefined;
    }
    return query;
  }

  async getMessages(id) {
    let query = await client.query(`
       query {
           #Search for messages that has the related topic UID and filter by age version block informed
        getMessages(func: uid(${id.id}))
         {
            Messages : Message { 
            ${queryFragmsg}
            }
        }
         }
           `);
    if (Object.keys(query.data.getMessages).length > 0) {
      let arrayToObjectToCall = array =>
        array.reduce((obj, item) => {
          obj['user'] = item;
          return item;
        }, {});
      query = arrayToObjectToCall(query.data.getMessages);
    } else {
      query = undefined;
    }
    return query;
  }
}
