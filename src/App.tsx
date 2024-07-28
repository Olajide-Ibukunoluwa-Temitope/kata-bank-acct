import React, { useState } from "react";
import Navbar from "./components/view/Navbar";
import Overview from "./components/view/Overview";
import Transactions from "./components/view/Transactions";
import ModalContainer from "./components/common/ModalContainer";
import Button from "./components/common/Button";
import { actionDataType, actionsType, tableDataType } from "./types";
import toast, { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [actionType, setActionType] = useState<actionsType | undefined>(
    undefined
  );
  const [acctBalance, setAcctBalance] = useState<number>(10000);
  const [error, setError] = useState<boolean>(false);
  const [transactionHistory, setTransactionHistory] = useState<tableDataType[]>(
    []
  );
  const [actionData, setActionData] = useState<actionDataType>({
    amount: "",
    email: "",
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setActionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (actionType === "deposit") {
      setAcctBalance((prev) => prev + Number(actionData.amount));
      setTransactionHistory((prevState) => [
        {
          amount: Number(actionData.amount),
          balance: acctBalance + Number(actionData.amount),
          type: actionType as actionsType,
          date: new Date(),
        },
        ...prevState,
      ]);
    } else {
      setAcctBalance((prev) => prev - Number(actionData.amount));
      setTransactionHistory((prevState) => [
        {
          amount: Number(actionData.amount),
          balance: acctBalance - Number(actionData.amount),
          type: actionType as actionsType,
          date: new Date(),
        },
        ...prevState,
      ]);
    }
    toast.success(
      `${
        actionType === "withdraw"
          ? "Withdrawal"
          : (actionType as string)?.[0]?.toUpperCase() +
            (actionType as string)?.slice(1)
      } successful!`
    );
    setActionType(undefined);
    setActionData({
      amount: "",
      email: "",
    });
  };

  return (
    <div className="bg-purple-100/20 min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <div className="p-10">
        <div className="mb-12">
          <Overview actionFunc={setActionType} acctBalance={acctBalance} />
        </div>

        <Transactions tableData={transactionHistory} />
      </div>

      <ModalContainer
        open={Boolean(actionType)}
        showCloseIcon={false}
        tailwindClassName="w-[45%] max-lg:w-1/2 max-sm:w-[95%]"
        closeModal={() => {
          setActionType(undefined);
          setActionData({
            amount: "",
            email: "",
          });
          setError(false);
        }}
      >
        <div className="bg-white rounded-lg shadow-cardShadow relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                Number(actionData.amount) > acctBalance &&
                actionType !== "deposit"
              ) {
                setError(true);
              } else {
                setError(false);
                handleSubmit();
              }
            }}
            className="px-10 pt-3"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-5">
                <h4 className="text-2xl capitalize font-bold text-g-75 mb-2">
                  {actionType}
                </h4>
                <span className="block text-lg font-medium">
                  Current Balance: ${acctBalance.toLocaleString()}
                </span>
              </div>

              <div className="space-y-3 w-full">
                {actionType === "transfer" && (
                  <input
                    type="email"
                    name="email"
                    value={actionData.email}
                    placeholder={`Enter receiver's interac email address`}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 outline-none h-[48px] rounded-md px-4"
                  />
                )}

                <div>
                  <input
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(
                        evt.key
                      ) && evt.preventDefault()
                    }
                    type="number"
                    name="amount"
                    value={actionData.amount}
                    required
                    placeholder={`Enter amount to ${actionType}`}
                    onChange={handleChange}
                    className="w-full border border-gray-300 outline-none h-[48px] rounded-md px-4"
                  />
                  {error && (
                    <span className="block mt-1 text-red-500 text-left font-medium text-sm">
                      *You can not {actionType} an amount more than your current
                      balance
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full py-6">
              <Button
                btnTitle={"Proceed"}
                btnType="submit"
                className={`py-3 text-lg ${
                  actionType === "deposit"
                    ? "bg-green-300/50"
                    : actionType === "withdraw"
                    ? "bg-red-300/50"
                    : "bg-orange-300/50"
                }`}
                handleClick={() => {}}
              />
            </div>
          </form>
        </div>
      </ModalContainer>
    </div>
  );
};

export default App;
