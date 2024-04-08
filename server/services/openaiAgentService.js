// Openai library which provides easy access to OpenAI API in NodeJS projects
const OpenAI = require('openai');
// environment variable which we will use to store our API key. 
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define a function to create an assistant
// Create an Assistant by defining its custom instructions and picking a model.
// If helpful, add files and enable tools like Code Interpreter, Retrieval, and
// Function calling.
// https://platform.openai.com/docs/api-reference/assistants/createAssistant
async function createAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: "Tech Stack Advisor",
    instructions: "You are an AI that recommends technology stacks for software projects based on a description.",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-3.5-turbo"
  });
  console.log(`The result of 'openai.beta.assistants.create' is:`) //TODO: comment after testing
  console.log(assistant) //TODO: comment after testing
  return assistant;
}

// Define a function to add a user's message to a thread
// Add Messages to the Thread as the user asks questions.
// https://platform.openai.com/docs/api-reference/messages
async function addMessageToThread(threadId, userContent) {
  const message = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user", 
      content: userContent
    }
  );
  console.log(`The result of 'openai.beta.threads.messages.create' is:`) //TODO: comment after testing
  console.log(message) //TODO: comment after testing
  return message;
}

// Define a function to run the assistant on the thread and get a response
async function createAndStreamRun(threadId, assistantId) {
  const run = await openai.beta.threads.runs.stream(
    threadId,
    {
      assistant_id: assistantId
    })
    .on('textCreated', (text) => process.stdout.write('\nassistant > '))
    .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value))
    .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`))
    .on('toolCallDelta', (toolCallDelta, snapshot) => {
      if (toolCallDelta.type === 'code_interpreter') {
        if (toolCallDelta.code_interpreter.input) {
          process.stdout.write(toolCallDelta.code_interpreter.input);
        }
        if (toolCallDelta.code_interpreter.outputs) {
          process.stdout.write("\noutput >\n");
          toolCallDelta.code_interpreter.outputs.forEach(output => {
            if (output.type === "logs") {
              process.stdout.write(`\n${output.logs}\n`);
            }
          });
        } 
      }
    });
    console.log(`The result of 'openai.beta.threads.runs.stream' is:`) //TODO: comment after testing
    console.log(run); //TODO: comment after testing
}

exports.getTechStackRecommendation = async (req, res) => {
  try {
    const { projectDescription } = req.body;
    console.log(`Project description: ${projectDescription}`) //TODO: comment after testing
    
    // Create the assistant
    const assistant = await createAssistant();

    // Create a new thread
    // Create a Thread when a user starts a conversation.
    // https://platform.openai.com/docs/api-reference/threads
    const thread = await openai.beta.threads.create();
    console.log(`Create assistant thread: ${thread.id}`) //TODO: comment after testing

    // Add the user's message to the thread
    await addMessageToThread(thread.id, projectDescription);

    // Run the Assistant on the Thread to generate a response by calling the
    // model and the tools. https://platform.openai.com/docs/api-reference/runs
    const Recommendation = await createAndStreamRun(thread.id, assistant.id);

    // Send the recommendation back to the client
    res.json({ recommendation:Recommendation});
  } catch (error) {
    console.error(`Error fetching recommendation: ${error}`);
    res.status(500).send('Failed to provide tech stack advice due to an internal error.');
  }
};