import requests
import os

def download_file(url, filename):
    response = requests.get(url, stream=True)
    response.raise_for_status()
    total_size = int(response.headers.get('content-length', 0))
    
    if os.path.exists(filename):
        os.remove(filename)
        
    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)
    
    print(f"Downloaded {filename} successfully!")

if __name__ == "__main__":
    url = "https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF/resolve/main/mistral-7b-instruct-v0.1.Q4_K_M.gguf"
    filename = "mistral-7b-instruct-v0.1.Q4_K_M.gguf"
    download_file(url, filename) 