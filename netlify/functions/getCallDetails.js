const { ChatClient } = require('@azure/communication-chat');
const { AzureCommunicationTokenCredential } = require('@azure/communication-common');
const { v1: uuidv1 } = require('uuid');
const { CommunicationIdentityClient } = require('@azure/communication-administration');

const getTokenForUser = async () => {
  const connectionString = process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING;
  const client = new CommunicationIdentityClient(connectionString);

  const user = await client.createUser();
  const tokenResponse = await client.issueToken(user, ["voip", "chat"]);

  return { token: tokenResponse.token, userId: user.communicationUserId };
};

const createNewChatThread = async (chatClient, participants) => {
  const chatThreadResponse = await chatClient.createChatThread(
    { topic: 'Doctor Consultation' },
    { participants }
  );

  if (chatThreadResponse.invalidParticipants && chatThreadResponse.invalidParticipants.length > 0) {
    throw new Error('Server could not add participants to the chat thread');
  }

  const chatThread = chatThreadResponse.chatThread;
  if (!chatThread || !chatThread.id) {
    throw new Error('Server could not create chat thread');
  }

  return chatThread.id;
};

exports.handler = async (event) => {
  try {
    const { userId, doctorId } = JSON.parse(event.body);

    const userTokenDetails = await getTokenForUser();
    const doctorTokenDetails = await getTokenForUser();
    const endpointUrl = process.env.AZURE_COMMUNICATION_SERVICES_ENDPOINT;

    const chatClient = new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(userTokenDetails.token));
    const threadId = await createNewChatThread(chatClient, [
      { id: { communicationUserId: userTokenDetails.userId }, displayName: "User" },
      { id: { communicationUserId: doctorTokenDetails.userId }, displayName: "Doctor" }
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        token: userTokenDetails.token,
        doctorToken: doctorTokenDetails.token,
        groupId: uuidv1(),
        threadId
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
