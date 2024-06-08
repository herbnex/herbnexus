const { ChatClient } = require('@azure/communication-chat');
const { AzureCommunicationTokenCredential } = require('@azure/communication-common');
const { v1: createGUID } = require('uuid');

const { CommunicationIdentityClient } = require('@azure/communication-administration');

const getTokenForUser = async (userId) => {
  const connectionString = process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING;
  const client = new CommunicationIdentityClient(connectionString);

  // Create a new user if they don't already exist
  const user = await client.createUser();
  const tokenResponse = await client.issueToken(user, ["voip", "chat"]);

  return tokenResponse.token;
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

exports.handler = async (event, context) => {
  try {
    const { userId, doctorId } = JSON.parse(event.body);
    // Fetch token and user details from your database or authentication service
    const token = await getTokenForUser(userId); // Implement this function to retrieve a token
    const doctorToken = await getTokenForUser(doctorId); // Implement this function to retrieve a token
    const endpointUrl = "https://<RESOURCE_NAME>.communication.azure.com";

    const chatClient = new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(token));
    const threadId = await createNewChatThread(chatClient, [
      { id: { communicationUserId: userId }, displayName: "User" },
      { id: { communicationUserId: doctorId }, displayName: "Doctor" }
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
        doctorToken,
        groupId: createGUID(),
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
