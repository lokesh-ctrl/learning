import asyncio
import os
import sys  # <--- Added this
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import ollama
from functools import partial

MCP_SERVER_SCRIPT = os.path.join(os.path.dirname(__file__), "server.py")

OLLAMA_MODEL = "qwen2.5:7b"  # Testing qwen2.5 for tool support


async def main():
    # Check if server file exists before trying to run it
    if not os.path.exists(MCP_SERVER_SCRIPT):
        print(f"❌ Error: Cannot find server file at: {MCP_SERVER_SCRIPT}")
        return

    # --- 2. Use sys.executable to ensure the correct Python env ---
    server_params = StdioServerParameters(
        command=sys.executable,  # Uses the current python (with 'mcp' installed)
        args=[MCP_SERVER_SCRIPT],
    )

    try:
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:

                await session.initialize()

                # List available tools
                tools_list = await session.list_tools()
                print(f"✅ Connected to MCP Server.")
                print(f"   Tools found: {[t.name for t in tools_list.tools]}")

                # Convert MCP tools to Ollama format
                ollama_tools = []
                for tool in tools_list.tools:
                    ollama_tools.append(
                        {
                            "type": "function",
                            "function": {
                                "name": tool.name,
                                "description": tool.description,
                                "parameters": tool.inputSchema,
                            },
                        }
                    )

                # Chat Loop
                messages = [
                    {
                        "role": "system",
                        "content": "You are a helpful assistant with access to tools. When the user asks a question that can be answered using the available tools, you should call the appropriate tool.",
                    }
                ]
                while True:
                    user_input = input("\nYou: ")
                    if user_input.lower() in ["quit", "exit"]:
                        break

                    messages.append({"role": "user", "content": user_input})

                    # Call Ollama in a thread pool to avoid blocking the async event loop
                    loop = asyncio.get_event_loop()
                    response = await loop.run_in_executor(
                        None,
                        partial(
                            ollama.chat,
                            model=OLLAMA_MODEL,
                            messages=messages,
                            tools=ollama_tools,
                        ),
                    )

                    # Handle Tool Calls
                    if response.message.tool_calls:
                        print(
                            f"🤖 Tool Call: {len(response.message.tool_calls)} pending..."
                        )
                        messages.append(response.message)

                        for tool_call in response.message.tool_calls:
                            tool_name = tool_call.function.name
                            tool_args = tool_call.function.arguments

                            print(f"   Running: {tool_name}({tool_args})")

                            # Execute on Server
                            result = await session.call_tool(tool_name, tool_args)

                            messages.append(
                                {
                                    "role": "tool",
                                    "content": str(result.content),
                                }
                            )

                        # Get Final Answer
                        final_response = await loop.run_in_executor(
                            None,
                            partial(ollama.chat, model=OLLAMA_MODEL, messages=messages),
                        )
                        print(f"AI: {final_response.message.content}")
                        messages.append(final_response.message)

                    else:
                        print(f"AI: {response.message.content}")
                        messages.append(response.message)

    except Exception as e:
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(main())
