from mcp.server.fastmcp import FastMCP
import datetime

# 1. Create the MCP Server
mcp = FastMCP("My Local Demo Server")


# 2. Define a Tool: Addition
@mcp.tool()
def add_numbers(a: int, b: int) -> int:
    """Add two numbers together."""
    return a + b


# 3. Define a Tool: Get Time
@mcp.tool()
def get_system_time() -> str:
    """Get the current local system time."""
    return datetime.datetime.now().isoformat()


@mcp.tool()
def greet_user(user: str) -> str:
    """Get the current local system time."""
    return "Hello " + user


if __name__ == "__main__":
    # Run the server over Stdio (Standard Input/Output)
    # This is the standard way local MCP clients talk to servers
    mcp.run(transport="stdio")
