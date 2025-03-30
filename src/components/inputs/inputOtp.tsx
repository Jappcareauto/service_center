import { useEffect, useState } from "react";
import { OtpInput } from "reactjs-otp-input";

interface OwnProps {
  onChange?: (value: string) => void;
  value?: string;
}

const InputOtp: React.FC<OwnProps> = ({
  value, onChange
}) => {

  const [otp, setOtp] = useState(value ?? '');

  const handleChange = (value: string) => {
    setOtp(value);
    onChange?.(value);
  }

  useEffect(() => {
    setOtp(value ?? '');
  }, [value])

  return <OtpInput
    focusStyle={{
      outline: "none",
      border: '1px solid',
      borderColor: '#FB7C37',
    }}
    inputStyle={{
      width: "50px",
      height: "100%",
      borderRadius: 8,
      backgroundColor: '#FFEDE6',
    }}
    className="w-full h-14"
    value={otp}
    onChange={handleChange}
    numInputs={6}
    separator={<div className="w-1"></div>}
  />;
}

export default InputOtp;
