import { useEffect, useState } from "react";
import { useSelector } from "@hooks";
import ChooseZone from "./choose-zone";
import VerifyUser from "./verify-user";
import DriverForm from "./driver-form";
import PassengerForm from "./passenger-form";

const steps = [
  <ChooseZone />,
  <VerifyUser />,
  { driver: <DriverForm />, passenger: <PassengerForm /> },
];

export default function SingUp() {
  const { createUserData } = useSelector((state) => state.signUp);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1 && createUserData?.zoneId) {
      setStep(2);
    }
  }, [createUserData]);

  const handleBack = () => {
    setStep((curr) => (curr > 1 ? curr - 1 : 1));
  };
  return (
    <>
      <div>
        <a
          className={`${
            step === 1 ? "invisible" : ""
          } flex ml-3 mt-5 items-center text-base-content text-opacity-50`}
          onClick={handleBack}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" />
          </svg>
          Volver
        </a>
      </div>
      {steps[step - 1]}
    </>
  );
}
