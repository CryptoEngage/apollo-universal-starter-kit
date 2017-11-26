/*eslint-disable no-unused-vars*/
export default pubsub => ({
  Query: {
    async getTopics(obj, x, context) {
      const topic = await context.Chat.getTopics();
      // publish for Topic list
      // pubsub.publish(TOPICS_SUBSCRIPTION, {
      //   TopicsUpdated: {
      //     mutation: 'CREATED',
      //     id,
      //     node: topic
      //   }
      // });
      return topic;
    },
    async getMessages(obj, id, context) {
      const messages = await context.Chat.getMessages(id);
      return messages;
    }
  },
  Mutation: {
    async addTopic(obj, { input }, context) {
      const topic = await context.Chat.createTopic(input);
      return topic;
    },
    async addMessage(obj, { input }, context) {
      const message = await context.Chat.createMessage(input);
      return message;
    }
  },
  Subscription: {}
});
