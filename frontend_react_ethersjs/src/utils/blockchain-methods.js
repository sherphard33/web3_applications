import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// A Web3Provider wraps a standard Web3 provider, which is
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
// The Contract object
export const contract = new ethers.Contract(contractAddress, ABI, signer);
export const connectWallet = async () => {
  await provider.send("eth_requestAccounts", []);
};

export const getBalance = async (setCurrentBalance) => {
  // Get the balance of an account (by address or ENS name, if supported by network)
  const balance = await provider.getBalance(contractAddress);
  // { BigNumber: "182826475815887608" }
  // Often you need to format the output to something more user-friendly,
  // such as in ether (instead of wei)
  const balanceFormated = ethers.utils.formatEther(balance);
  setCurrentBalance(balanceFormated);
};
export const getMessage = async (setGreet) => {
  const msg = await contract.greet();
  setGreet(msg);
};
