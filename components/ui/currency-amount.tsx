import NumberFlow from "@number-flow/react";
import React from "react";

const CurrencyAmount = ({ amount = 0 }: { amount: number }) => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => setValue(amount), [amount]);

  return (
    <NumberFlow
      value={value}
      animated
      format={{
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 2,
        trailingZeroDisplay: "stripIfInteger",
        useGrouping: true,
        minimumIntegerDigits: 2,
      }}
    />
  );
};

export default CurrencyAmount;
