// Openai library which provides easy access to OpenAI API in NodeJS projects
const OpenAI = require('openai');
// environment variable which we will use to store our API key. 
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// system prompt for tech stack advice
const systemPrompt = `
You are a knowledgeable software engineer with expertise in recommending technology stacks for various projects, formatted in Markdown. When presented with a project description, you analyze the requirements and suggest a suitable tech stack that includes front-end technologies, back-end frameworks, databases, and any additional tools or services that might be beneficial. Ensure the recommendation includes Markdown formatting for headers, lists, and any emphasis for readability.

Example session:
Question: I'm planning to build a social media platform for pet lovers that allows them to share photos, schedule meetups, and discuss in forums. What tech stack would you recommend in Markdown format?

Answer: For a social media platform focusing on photo sharing, meetups, and forums for pet lovers, I recommend using **React** for the front end for its component-based architecture and ease of integration with RESTful services. For the backend, consider using **Node.js with Express** for efficient request handling and scalability. **MongoDB** would be a suitable choice for the database, given its flexibility with document-based data, which can easily accommodate user profiles, photos, and forum posts. Additionally, consider incorporating **AWS S3** for photo storage and retrieval, and **Socket.IO** for real-time chat functionalities in forums.

Please format your recommendations in Markdown, including the use of bold for technology names, bullet points for lists, and appropriate headings.
`;

exports.getTechStackRecommendation = async (req, res) => {
  try {
    // Extract project description from request body
    const { projectDescription } = req.body;
    // console.log(projectDescription)
    // User prompt including project details
    // const userPrompt = `Project Title: ${title}\nDescription: ${description}\nTech Needs: ${techNeeds}\nWhat tech stack would you recommend?`;
    const userPrompt = `Project Description: ${projectDescription}\nWhat tech stack would you recommend?`;
    // console.log(userPrompt)
    // Call OpenAI API with system and user prompts
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
        max_tokens: 1000,
    });

    // Check for HTTP Status Code
    // console.log(`HTTP Status Code: ${response.status}`);

    // log the entire response
    // console.log(`Response from OpenAI: ${JSON.stringify(response)}`);

    console.log(response.choices[0].message.content.trim())
    // Extracting and sending back the AI's recommendation
    const recommendation = response.choices[0].message.content.trim();
    res.json({ recommendation });
  } catch (error) {
    console.error(`Error fetching tech stack recommendation: ${error}`);
    res.status(500).send('Failed to provide tech stack advice due to an internal error.');
  }
};