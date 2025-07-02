import os
from flask import Flask, render_template, request, session
from dotenv import load_dotenv

# LangChain imports
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

# Custom system prompt
from src.prompt import system_prompt

# === Flask App Setup ===
app = Flask(__name__)
app.secret_key = '184ccad403ee59c6e9af9eb310c975effd738cff43eb998aefb79ab133fd955b'  # Needed for session handling

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

# === Chat Route ===
@app.route("/get", methods=["GET", "POST"])
def chat():
    msg = request.form.get("msg", "").strip()
    if not msg:
        return "Please enter a question."

    # Detect follow-up intent
    follow_ups = ["elaborate", "elaborate more", "what do you mean", "explain further", "tell me more"]
    previous_msg = session.get("previous_msg", "")

    if msg.lower() in follow_ups and previous_msg:
        msg = previous_msg + " Can you elaborate more?"

    # Save current message as previous for next round
    session["previous_msg"] = msg

    print("Input:", msg)

    try:
        response = rag_chain.invoke({"input": msg})
        answer = response.get("answer", "I don't have enough information to answer that.")
        print("Response:", answer)
        return str(answer)
    except Exception as e:
        print("Error:", str(e))
        return "Error: " + str(e)

# === Run Server ===
if __name__ == '__main__':
    from flask_cors import CORS
    CORS(app)
    app.run(host="0.0.0.0", port=8080, debug=True)
