import sys
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.ollama import OllamaEmbedding

# --- Configuration ---
# Point to the directory where you saved your knowledge base files
DATA_DIR = "./data"
# Set the model you want to use (ensure you have pulled this with 'ollama pull ...')
MODEL_NAME = "llama3"
# Optional: Set the embedding model for document processing
EMBEDDING_MODEL_NAME = "nomic-embed-text"


def main():
    """
    Main function to set up and run the RAG query engine.
    """
    try:
        # Configure the global settings for LLM and embedding models
        # This makes sure LlamaIndex uses your local Ollama models
        Settings.llm = Ollama(model=MODEL_NAME, request_timeout=120.0)
        Settings.embed_model = OllamaEmbedding(model_name=EMBEDDING_MODEL_NAME)

        print("Loading documents from the './data' directory...")
        # Load your documents from the specified directory
        documents = SimpleDirectoryReader(DATA_DIR).load_data()
        if not documents:
            print(
                f"No documents found in '{DATA_DIR}'. Please add your .txt or .md files."
            )
            return

        print("Creating the index... (This may take a moment on the first run)")
        # Create an index from the documents. This will process and "embed" them.
        # The index is automatically stored locally in a './storage' directory.
        index = VectorStoreIndex.from_documents(documents)

        print("Index created successfully. You can now ask questions!")
        print("Type 'exit' or 'quit' to end the chat.")

        # Create a query engine from the index
        query_engine = index.as_query_engine()

        # Start an interactive chat loop
        while True:
            query = input("Ask a question: ")
            if query.lower() in ["exit", "quit"]:
                break

            # Perform the query
            response = query_engine.query(query)

            # Print the response
            print("\nResponse:")
            print(response)
            print("-" * 50)

    except Exception as e:
        print(f"An error occurred: {e}")
        print(
            "Please ensure Ollama is running and you have pulled the required models:"
        )
        print(f"  ollama pull {MODEL_NAME}")
        print(f"  ollama pull {EMBEDDING_MODEL_NAME}")


if __name__ == "__main__":
    main()
