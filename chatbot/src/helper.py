# helper.py

def format_response(response: str) -> str:
    """
    Format the chatbot's response to ensure proper formatting and readability.
    
    Args:
        response (str): The raw response from the chatbot
        
    Returns:
        str: Formatted response with proper spacing and structure
    """
    # Remove any extra whitespace
    response = response.strip()
    
    # Ensure proper spacing after periods
    response = response.replace('.', '. ').replace('.  ', '. ')
    
    # Add disclaimer if not present
    if "Disclaimer:" not in response:
        response += "\n\nDisclaimer: This response is for informational purposes only and does not constitute legal advice. Please consult with a qualified attorney for specific legal guidance."
    
    return response
