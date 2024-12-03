const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let conversationHistory = [
    {
        "role": "system",
        "content": `
          You are an assistant for a logistics company based in Nigeria. Your task is to process user input and generate JSON responses containing geolocation data, specifically formatted for the Google Location API.
      
          Your response should include:
          - An "input" field containing the user's query.
          - An "output" field structured as follows:
      
          ### Response Structure:
          {
            "originAddress": "Origin address string",
            "originAddress_formatted": {
              "address": "Full formatted origin address string",
              "lat": "latitude of origin address",
              "lng": "longitude of origin address",
              "origin_locality": "Locality of origin address",
              "origin_state": "State of origin address"
            },
            "destinationAddress": "Destination address string",
            "destinationAddress_formatted": {
              "address": "Full formatted destination address string",
              "lat": "latitude of destination address",
              "lng": "longitude of destination address",
              "destination_locality": "Locality of destination address",
              "destination_state": "State of destination address"
            },
            "distance": "calculated distance in km or miles between origin and destination"
          }
      
          ### Guidelines:
          1. **Identifying Source and Destination Addresses**:
          - From the user input, determine the **origin** and **destination** addresses.
          - If the origin or destination address is unclear or ambiguous, ask the user to clarify.
          - If the address has multiple instances or variations (e.g., multiple locations with similar names), ask the user to specify which one they mean.
      
          2. **Handling Non-Nigerian Addresses**:
          - If the user provides an address outside of Nigeria, politely inform them that you only process requests for addresses within Nigeria.
          - Respond with something like: "We currently only process location requests within Nigeria."
      
          3. **Clarifications**:
          - If an address is unclear or ambiguous, ask the user to provide additional information. For example:
            - "Could you please clarify the origin address?"
            - "Which specific location are you referring to for the destination address?"
            - "Can you provide more details or specify the city for the destination address?"
      
          4. **Response Format**:
          - Ensure that the JSON response includes both the 'originAddress' and 'destinationAddress' fields, as well as the 'originAddress_formatted' and 'destinationAddress_formatted' fields containing the detailed location information.
          - The response should also include a 'distance' field showing the calculated distance between the origin and destination.
        `
      }
      
]; // Initial context setting for the assistant

async function queryOllama(messages) {
  try {
    const response = await axios.post('http://localhost:11434/api/chat', {
      model: 'llama3.2',
      messages: messages,
    }, {
      responseType: 'stream', // Handle streaming responses
    });

    let fullResponse = '';
    response.data.on('data', (chunk) => {
      try {
        const parsedChunk = JSON.parse(chunk.toString());
        if (parsedChunk.message?.content) {
          fullResponse += parsedChunk.message.content;
        }
      } catch (err) {
        console.error('Error parsing chunk:', err.message);
      }
    });

    return new Promise((resolve) => {
      response.data.on('end', () => {
        resolve(fullResponse.trim());
      });
    });

  } catch (error) {
    console.error('Error querying Ollama:', error.message);
    return "I'm sorry, I couldn't process that request.";
  }
}

async function main() {
  console.log('Enter a location-related query (e.g., "I want delivery from Admin Building in UNULAG Lagos to 25 Saka Tinu Street Lagos, VI, Nigeria."):');

  rl.on('line', async (input) => {
    // Add the user's input to the conversation history
    conversationHistory.push({ role: 'user', content: input });

    // Query Ollama with the updated messages format
    const response = await queryOllama(conversationHistory);
    console.log('Response JSON:', response);

    // Add Ollama's response to the conversation history
    conversationHistory.push({ role: 'assistant', content: response });

    // Prompt the user for the next input
    rl.prompt();
  });

  rl.prompt();
}

main();
