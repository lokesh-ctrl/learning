import ast
import asyncio
import os
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv
from typing import Dict, Any, List

# Import OpenAI agents framework
from agents import (
    Agent,
    Runner,
    WebSearchTool,
    trace,
    function_tool,
    OpenAIChatCompletionsModel,
)
from openai import AsyncOpenAI
from agents import set_default_openai_client, set_tracing_disabled

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


# TODO: Define the function tool for returning train availability if needed
async def railway_agent(user_query: str) -> Dict[str, Any]:
    """
    Skeleton Code for Implementation
        Railway agent that uses web search to find train information

        Args:
            user_query: Natural language query about train availability

        Returns:
            Dictionary with structured train information
    """

    agent = Agent(
        ...,
        model=model,
    )
    # Use the AI agent to extract parameters
    extraction_prompt = (
        "Extract the following details from the user query:\n"
        "- Source city\n"
        "- Destination city\n"
        "- Travel date (in YYYY-MM-DD format, or 'today'/'tomorrow')\n"
        "- Travel class (e.g., 1AC, 2AC, 3AC, SL, CC, 2S)\n\n"
        f"User query: {user_query}\n"
        "Respond in JSON format with keys: source, destination, date, class."
    )

    response = await Runner.run(agent, extraction_prompt)
    print(f"Response from agent: {response}")
    try:
        extracted_data = ast.literal_eval(response)
    except (ValueError, SyntaxError):
        extracted_data = {
            "source": "Unknown",
            "destination": "Unknown",
            "date": "Unknown",
            "class": "3A",
        }

    trains = []
    print(f"Extracted data: {extracted_data}")

    return {
        "source": extracted_data.get("source", "Unknown"),
        "destination": extracted_data.get("destination", "Unknown"),
        "date": extracted_data.get("date", "Unknown"),
        "class": extracted_data.get("class", "3A"),
        "trains": trains,
    }


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
