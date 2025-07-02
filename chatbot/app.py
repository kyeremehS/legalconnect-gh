import os
from flask import Flask, render_template, request
from dotenv import load_dotenv

# LangChain imports
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

# Your custom prompt from src
from src.prompt import system_prompt

# === Flask App Setup ===
app = Flask(__name__)

# === Load environment variables ===
load_dotenv()

PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

if not PINECONE_API_KEY or not OPENAI_API_KEY:
    raise ValueError("Missing PINECONE_API_KEY or OPENAI_API_KEY in .env")

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

# === Embeddings ===
def download_hugging_face_embeddings():
    return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

embeddings = download_hugging_face_embeddings()

# === Pinecone Vector Store ===
index_name = "legalconnect-bot"
docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)

retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# === LLM & Prompt ===
llm = ChatOpenAI(temperature=0.4, max_tokens=500)
prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

# === RAG Chain ===
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

# # === Routes ===
# @app.route("/")
# def index():
#     return render_template("chat.html")

@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form.get("msg", "")
    if not msg:
        return "Please enter a question."

    print("Input:", msg)

    try:
        response = rag_chain.invoke({"input": msg})
        print("Response:", response.get("answer"))
        return str(response.get("answer"))
    except Exception as e:
        print("Error:", str(e))
        return "Error: " + str(e)

# === Run Server ===
if __name__ == '__main__':
    from flask_cors import CORS
    CORS(app)
    app.run(host="0.0.0.0", port=8080, debug=True)
