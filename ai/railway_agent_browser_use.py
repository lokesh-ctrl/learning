import ast
import asyncio
import os
import json
from dotenv import load_dotenv
from typing import Dict, Any, List

# Import OpenAI agents framework
from agents import (
    Agent,
    Runner,
    WebSearchTool,
    OpenAIChatCompletionsModel,
    function_tool,
)
from openai import AsyncOpenAI
from agents import set_default_openai_client, set_tracing_disabled
from browser_use import Browser, Controller

# Initialize Ollama client
external_client = AsyncOpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # required, but unused
)
set_default_openai_client(external_client)
set_tracing_disabled(True)
model = OpenAIChatCompletionsModel(
    model="qwen2.5:7b",
    openai_client=external_client,
)

# Load environment variables
load_dotenv()
# Set your OpenAI API key
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")


@function_tool
async def extract_train_travel_info_from_prompt(user_query: str) -> Dict[str, Any]:
    agent = Agent(..., model=model)
    # Use the AI agent to extract parameters
    extraction_prompt = (
        "Extract the following details from the user query:\n"
        "- Source city\n"
        "- Destination city\n"
        "- Travel date (in YYYY-MM-DD format, or 'today'/'tomorrow')\n"
        "- Travel class (e.g., 1AC, 2AC, 3AC, SL, CC, 2S)\n\n"
        f"User query: {user_query}\n"
        "Respond in as dictionary with keys: source, destination, date, class."
    )

    response = await Runner.run(agent, extraction_prompt)
    try:
        extracted_data = ast.literal_eval(response.final_output)
    except (ValueError, SyntaxError):
        extracted_data = {
            "source": "Unknown",
            "destination": "Unknown",
            "date": "Unknown",
            "class": "3A",
        }

    print(f"Extracted data: {extracted_data}")

    return {
        "source": extracted_data.get("source", "Unknown"),
        "destination": extracted_data.get("destination", "Unknown"),
        "date": extracted_data.get("date", "Unknown"),
        "class": extracted_data.get("class", "3A"),
    }


async def railway_agent(user_query: str) -> Dict[str, Any]:
    agent = Agent(
        ...,
        model=model,
        instructions=(
            """
    You are a transport booking assistant specializing in Indian travel.
        1. If the prompt includes terms related to trains (e.g., "train", "IRCTC", "railway"), use the `extract_train_travel_info` tool to extract details.
        2. Then, using above info use the WebSearchTool to fetch real-time availability from Goibibo for trains.
https://www.goibibo.com/trains/
        3. Always return valid JSON with the following structure:
        4. If no availability is found, you must still return a valid JSON object with empty `trains` or `flights` list, instead of plain text explanation.
e.g:{
  "source": "Delhi",
  "destination": "Leh",
  "date": "2025-04-17",
  "class": "3A",
  "trains": []
}

Expected JSON response from Websearchtool for trains:
{
  "source": "<city>",
  "destination": "<city>",
  "date": "<YYYY-MM-DD>",
  "class": "<1A|2A|3A|SL|CC|2S>",
  "trains": [
    {
      "train_number": "12951",
      "train_name": "Mumbai Rajdhani",
      "departure": "16:25",
      "arrival": "08:15",
      "duration": "15h 50m",
      "availability": "Available 42",
      "fare": 1985
    }
  ]
}
Always return valid JSON only. No markdown, no plain text, no extra commentary.

    Respond in valid JSON with keys: source, destination, date, class, trains.
        """
            f"User query: {user_query}"
        ),
        tools=[WebSearchTool(), extract_train_travel_info_from_prompt],
    )
    # Use the AI agent to extract parameters
    response = await Runner.run(agent, user_query)
    print("final response is", response)

    return response


async def main():
    print("🚆 Welcome to the Railway Booking Assistant 🚆")
    print("I can help you find train availability between cities in India.")
    print(
        "Ask me questions like: 'Find trains from Delhi to Mumbai tomorrow for 3AC class'"
    )
    print("Type 'exit' to quit.")

    while True:
        user_query = input(
            "\nWhat would you like to know about train availability? (or 'exit' to quit): "
        )

        if user_query.lower() in ["exit", "quit", "bye"]:
            print(
                "Thank you for using the Railway Booking Assistant. Happy travels! 👋"
            )
            break

        print("\nSearching for train information...")
        response = await railway_agent(user_query)
        print("\nResults:")
        print(json.dumps(response, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
