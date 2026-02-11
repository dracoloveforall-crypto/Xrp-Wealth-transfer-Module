import time
from web3 import Web3

# --- CONFIGURATION ---
# Replace with your actual RPC provider (like Infura or Alchemy)
RPC_URL = "https://mainnet.infura.io/v3/YOUR_PROJECT_ID"
# The contract address for your StrawberryFi Utility Token
STRAWBERRY_FI_ADDRESS = "0xYourStrawberryFiTokenAddress"
# The wallet address you want to check
USER_WALLET = "0xYourWalletAddress"

# Standard ERC-20 ABI (Minimal for checking balance)
ERC20_ABI = [
    {"constant": True, "inputs": [{"name": "_owner", "type": "address"}], "name": "balanceOf", "outputs": [{"name": "balance", "type": "uint256"}], "type": "function"},
    {"constant": True, "inputs": [], "name": "decimals", "outputs": [{"name": "", "type": "uint8"}], "type": "function"}
]

class StrawberryAgent:
    def __init__(self, rpc_url, token_address):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.token_contract = self.w3.eth.contract(address=token_address, abi=ERC20_ABI)
        
    def get_token_balance(self, wallet):
        """Checks how much StrawberryFi the user has."""
        balance = self.token_contract.functions.balanceOf(wallet).call()
        decimals = self.token_contract.functions.decimals().call()
        return balance / (10 ** decimals)

    def run_agent_cycle(self, wallet):
        """The autonomous logic of the software."""
        print(f"--- StrawberryFi Agentic Software Active ---")
        balance = self.get_token_balance(wallet)
        print(f"Current StrawberryFi Balance: {balance} tokens")

        # Threshold logic: The agent only performs 'advanced' tasks if you have tokens
        if balance > 10:
            print("[STATUS] Premium Access Granted.")
            self.perform_advanced_task()
        else:
            print("[STATUS] Basic Mode: Please hold 10+ StrawberryFi for Agentic features.")
            self.perform_basic_task()

    def perform_basic_task(self):
        print("Action: Monitoring Star Crystal Mycelium humidity (Basic Log only).")

    def perform_advanced_task(self):
        # This is where the 'California-style' Agentic AI logic would go
        print("Action: AUTONOMOUS MODE. Adjusting Anderson Creek heater cycles...")
        print("Action: Analyzing legislative news from Senator Budd for local impact.")

# --- EXECUTION ---
if __name__ == "__main__":
    agent = StrawberryAgent(RPC_URL, STRAWBERRY_FI_ADDRESS)
    
    # Run the agent in a loop (The 'Autonomous' part)
    try:
        while True:
            agent.run_agent_cycle(USER_WALLET)
            print("Agent sleeping for 1 hour until next compression time...\n")
            time.sleep(3600) 
    except KeyboardInterrupt:
        print("Agent deactivated.")
