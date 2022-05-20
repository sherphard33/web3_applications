import { useState } from "react";
import "./InputForm.css";

function InputForm({ depositEth }) {
  const handleMessage = (e) => {
    const depositmsg = e.target.value;
    setdepositMessage(depositmsg);
  };
  const handleDeposit = (e) => {
    const depositAmount = e.target.value;
    setDepositValue(depositAmount);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    depositEth({ e, depositValue, depositMessage });
    setDepositValue(0);
    setdepositMessage("");
  };
  const [depositValue, setDepositValue] = useState("");
  const [depositMessage, setdepositMessage] = useState("");
  return (
    <div className="login-box">
      <div className="login-header">Deposit</div>
      <div className="login-body">
        <form className="form-group" onSubmit={onSubmit}>
          <label>Ether Amount</label>
          <input
            type="number"
            placeholder="0"
            className="form-control"
            value={depositValue}
            onChange={handleDeposit}
          />
          <label>Deposit Description</label>
          <input
            type="text"
            className="form-control"
            value={depositMessage}
            placeholder="Buy some snacks"
            onChange={handleMessage}
          />
          <input
            type="submit"
            value="Deposit"
            className="form-control btn btn-dark"
            name=""
          />
        </form>
      </div>
    </div>
  );
}

export default InputForm;
