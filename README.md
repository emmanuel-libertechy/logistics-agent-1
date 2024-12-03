# Logistics Assistant API (Version 1)

## Overview

This project provides a text-based logistics assistant designed to process user input related to location queries. The assistant is capable of processing user requests involving geolocation within Nigeria, such as deliveries, route queries, and other logistics tasks. It generates JSON responses containing geolocation data, formatted for integration with services like the Google Location API.

This is the first version of the application, which uses a conversational assistant powered by Ollama (`llama3.2` model) to interpret the user's queries and generate structured geolocation responses. Future updates will improve the assistant's capabilities, including integrating Google’s Geolocation service for more accurate results and distance calculations.

## Key Features

- **Input Processing**: The assistant reads user input, processes it to determine source and destination addresses, and returns geolocation data.
- **Ambiguity Handling**: If the source or destination address is unclear, the assistant asks the user for clarification.
- **Non-Nigerian Address Handling**: The assistant only processes addresses within Nigeria and politely informs users when an address outside Nigeria is provided.
- **Response Structure**: The assistant generates structured JSON responses that are formatted for potential use with geolocation APIs, such as Google’s Location API.

### Example Response:

```json
{
  "originAddress": "Admin Building, UNILAG, Lagos, Nigeria",
  "originAddress_formatted": {
    "address": "Admin Building, UNILAG, Lagos, Nigeria",
    "lat": 6.524167,
    "lng": 3.375000,
    "origin_locality": "Yaba",
    "origin_state": "Lagos"
  },
  "destinationAddress": "25 Saka Tinu Street, Lagos, Nigeria",
  "destinationAddress_formatted": {
    "address": "25 Saka Tinu Street, Lagos, Nigeria",
    "lat": 6.434167,
    "lng": 3.421667,
    "destination_locality": "Victoria Island",
    "destination_state": "Lagos"
  },
  "distance": "5.0 km"
}
```

## How It Works
1.   **User Input**: The assistant listens for user queries related to logistics, such as delivery requests. Here are some example queries:

- "I want delivery from Admin Building in UNILAG Lagos to 25 Saka Tinu Street Lagos, VI, Nigeria."
- "Can you help me with delivery from Ikoyi to Lekki, Lagos?"

2.  **Identify Source and Destination**:  The assistant processes the user's input to identify the origin (source) and destination addresses.

3. **Ambiguity Handling** If the origin or destination address is unclear, the assistant will prompt the user for clarification. For instance:

- "Could you please clarify the origin address?"
- "Which specific location are you referring to for the destination address?"
- "Can you provide more details or specify the city for the destination address?"

4. **Geolocation Response**: Once the addresses are identified and clarified, the assistant generates a JSON response with the following fields:
- **originAddress**: The full source address.
- **originAddress_formatted**: A structured object containing detailed geolocation information for the origin address, including latitude, longitude, locality, and state.
- **destinationAddress**: The full destination address.
- **destinationAddress_formatted**: A structured object containing detailed geolocation information for the destination address, including latitude, longitude, locality, and state.
- **distance**: The calculated distance between the origin and destination.

##  **Current Version**

This is **Version 1** of the system. The current implementation uses the Ollama API (llama3.2) for understanding and generating responses based on user input.

**Key Features in Version 1:**

1. **Conversation History:** The assistant maintains a conversation history that includes system-level messages and user interactions.
2. **Simple Text Interface**: The user interacts with the assistant via a text prompt (e.g., command line).
3. **Response Format**: The assistant processes user input and generates a structured JSON response, formatted for use with geolocation services.
4. **Ambiguity and Clarifications**: If the assistant is unsure about the origin or destination address, it asks for clarification.
Future Version Plans (Version 2)

The next version will feature an agent that calls the Google Geolocation API to provide accurate geolocation data and calculate distances between addresses. This will replace the current system that relies on the assistant's own geolocation knowledge.

**Expected Features in Version 2:**

- **Google Geolocation Integration:** The assistant will call the Google Geolocation API to retrieve precise latitude and longitude for given addresses.
- **Distance Calculation:** The assistant will calculate the exact distance between the origin and destination using the Google API, providing more accurate results than the current implementation.
-** Improved Query Handling**: More advanced processing of user input, including better handling of multiple address instances or variations.

## **How to Run**
- Install Dependencies: Before running the application, ensure you have Node.js installed. Then install the required packages:

    - npm install axios readline
- Run the Application: To start the assistant, run the following command in your terminal:

    - node index.js
- Interact with the Assistant: Once the assistant is running, you can enter location-related queries such as:

- "I want delivery from Admin Building in UNILAG Lagos to 25 Saka Tinu Street Lagos, VI, Nigeria."
- "Can you help me with delivery from Ikoyi to Lekki, Lagos?"

The assistant will process your input and return a JSON response.

### License****
This project is licensed under the MIT License.
