import React from "react";

type CardProps = {
  title: string;
  value: string;
  icon?: JSX.Element;
  className?: string;
};

const Card: React.FC<CardProps> = ({ title, value, icon, className }) => {
  return (
    <div className={` p-5 rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <span className="block text-base font-semibold text-gray-500 ">
          {title}
        </span>

        {icon}
      </div>
      <span className="block text-[24px] font-bold">{value}</span>
    </div>
  );
};

export default Card;
