import React, { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import { actionsType } from "../../types";

type OverviewType = {
  actionFunc: React.Dispatch<React.SetStateAction<actionsType | undefined>>;
  acctBalance: number;
};

const Overview: React.FC<OverviewType> = ({ actionFunc, acctBalance }) => {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const handleBtnClick = (actionType: actionsType) => {
    actionFunc(actionType);
  };

  return (
    <div>
      <h4 className="text-base font-bold mb-8 text-[26px]">Overview</h4>
      <div className="grid grid-cols-3 max-md:grid-cols-1 max-md:space-x-0 max-md:space-y-4 space-x-4">
        <Card
          title={"Account Type"}
          value={"Check in"}
          className="bg-cyan-100"
        />
        <Card
          title={"Account Balance"}
          value={`$${showBalance ? acctBalance.toLocaleString() : "****"}`}
          className="bg-purple-100"
          icon={
            showBalance ? (
              <i
                onClick={() => setShowBalance(false)}
                className="ri-eye-close-line text-gray-500 cursor-pointer"
              ></i>
            ) : (
              <i
                onClick={() => setShowBalance(true)}
                className="ri-eye-line text-gray-500 cursor-pointer"
              ></i>
            )
          }
        />

        <div className="flex flex-col justify-between max-md:space-y-4">
          <Button
            btnTitle="Deposit"
            handleClick={() => handleBtnClick("deposit")}
            className="bg-green-300/50"
          />
          <Button
            btnTitle="Withdraw"
            handleClick={() => handleBtnClick("withdraw")}
            className="bg-red-300/50"
          />
          <Button
            btnTitle="Transfer"
            handleClick={() => handleBtnClick("transfer")}
            className="bg-orange-300/50"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
