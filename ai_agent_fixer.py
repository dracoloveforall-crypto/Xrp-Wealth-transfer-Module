import os
import openai

# Use your US-based AI Key from GitHub Secrets
openai.api_key = os.getenv("OPENAI_API_KEY")

def autonomous_repair():
    print("AI Agent: Scanning for system vulnerabilities or errors...")
    
    # Example: Scanning your Landlord or HII folders for broken logic
    files_to_check = ["./hii_core/main.py", "./legal_tech/main.py", "./strawberry_fi/main.py"]
    
    for file_path in files_to_check:
        with open(file_path, "r") as f:
            code = f.read()
            
        # The AI "Reasoning" step
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a US-owned AI repair agent. Fix any syntax or logic errors in this code."},
                {"role": "user", "content": f"Code to check:\n{code}"}
            ]
        )
        
        fixed_code = response.choices[0].message.content
        
        with open(file_path, "w") as f:
            f.write(fixed_code)
            print(f"✅ AI has repaired and optimized: {file_path}")

if __name__ == "__main__":
    autonomous_repair()
