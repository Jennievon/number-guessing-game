import React, { useState } from "react";

const Tooltip = ({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const showTooltip = () => {
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {isTooltipVisible && (
        <div className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-sm rounded-md shadow-md">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
