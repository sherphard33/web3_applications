import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import InputForm from "./components/inputform/InputForm";
import {
  getMessage,
  connectWallet,
  getBalance,
  contract,
} from "./utils/blockchain-methods";

function App() {
  const [greet, setGreet] = useState("");
  const [currentBalance, setCurrentBalance] = useState("");

  useEffect(() => {
    connectWallet().catch(console.error);
    getBalance(setCurrentBalance).catch(console.error);
    getMessage(setGreet).catch(console.error);
  }, []);

  const makeDeposit = async ({ depositValue, depositMessage }) => {
    const ethValue = ethers.utils.parseEther(depositValue);
    const greetingUpdate = await contract.setGreeting(depositMessage);
    greetingUpdate.wait();
    const balanceUpdate = await contract.deposit({ value: ethValue });
    balanceUpdate.wait();
    setGreet(depositMessage);
    setCurrentBalance(depositValue);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col mt-4">
          <h4>Last Deposit: {greet}</h4>
          <p>Contract balance: {currentBalance} ETH</p>
        </div>
        <div className="col">
          <InputForm depositEth={makeDeposit} />
        </div>
      </div>
    </div>
  );
}

export default App;
