import { useEffect, useState } from "react";
import { useSelector } from "@hooks";
import ChooseZone from "./choose-zone";
import VerifyUser from "./verify-user";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { removeCookie } from "react-use-cookie";

const steps = [<ChooseZone />, <VerifyUser />];

export default function SignUp() {
  const { createUserData } = useSelector((state) => state.signUp);
  const { resetUser } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 1 && createUserData?.zoneId) {
      setStep(2);
    } else if (step === 2 && createUserData?.role) {
    }
  }, [createUserData]);

  const handleBack = () => {
    setStep((curr) => (curr > 1 ? curr - 1 : 1));
  };
  useEffect(() => {
    resetUser();
    removeCookie("tkn");
  }, []);
  return (
    <section>
      <div>
        <a
          className={`${
            step === 1 ? "invisible" : ""
          } flex w-fit ml-3 mt-5 items-center text-base-content text-opacity-50 cursor-pointer`}
          onClick={handleBack}
        >
          <IconCaretLeftFilled height={16} width={16} />
          Volver
        </a>
      </div>
      <>
        {step !== 3
          ? steps[step - 1]
          : (steps[2] as Extract<typeof steps, Element>)[
              createUserData?.role as "driver" | "passenger"
            ]}
      </>
    </section>
  );
}
