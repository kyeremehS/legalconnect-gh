# app.py
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import os

# LangChain Community Imports (Modern Versions)
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import DirectoryLoader
from langchain.llms import LlamaCpp

from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

from src.prompt import prompt_template
from src.helper import format_response

# Initialize Flask app
app = Flask(__name__)

# Load environment variables
load_dotenv()

# === Embeddings ===
def download_hugging_face_embeddings():
    return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

embeddings = download_hugging_face_embeddings()

# === Chroma Vector Store ===
CHROMA_DIR = "chroma_db"
docsearch = Chroma(
    persist_directory=CHROMA_DIR,
    embedding_function=embeddings
)
docsearch.persist()

# === Prompt Template ===
PROMPT = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)
chain_type_kwargs = {"prompt": PROMPT}

# === LLM Setup ===
llm = LlamaCpp(
    model_path="mistral-7b-instruct-v0.1.Q4_K_M.gguf",
    temperature=0.7,
    max_tokens=256,
    top_p=1,
    n_ctx=2048,
    verbose=True,
    n_batch=128,
    n_threads=8,
    f16_kv=True,  # Enable half-precision for key/value cache
    repeat_penalty=1.1,  # Slightly penalize repetition
    n_gpu_layers=0  # CPU only for now
)

# === QA Chain ===
qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=docsearch.as_retriever(search_kwargs={'k': 2}),
    return_source_documents=True,
    chain_type_kwargs=chain_type_kwargs
)

# === Routes ===
@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    print("Query:", msg)
    try:
        # Use invoke instead of __call__
        qa_result = qa.invoke({"query": msg})
        # Extract the result from the QA response
        response = qa_result.get('result', '')
        # Format the response
        formatted_response = format_response(response)
        return formatted_response
    except Exception as e:
        error_message = f"Error: {str(e)}"
        print("Error:", error_message)
        return error_message

# === Run Server ===
if __name__ == '__main__':
    # Enable CORS for development
    from flask_cors import CORS
    CORS(app)
    
    app.run(host="0.0.0.0", port=8080, debug=True)
