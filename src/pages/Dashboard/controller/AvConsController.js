import React, { useEffect, useState } from "react";

const useAvCons = ({ data, currentSpare }) => {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (currentSpare && data) {
      const targetData = data?.filter(
        (item) => item.SparePart_Code === currentSpare.SparePart_Code
      );
      setSum(targetData[targetData.length - 1]?.AvaregeConsumption);
      console.log(targetData);
    }
  }, [currentSpare]);
  return { sum };
};

export default useAvCons;
