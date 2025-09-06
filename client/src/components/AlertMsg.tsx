import { useState, useEffect } from "react";
import { Alert, AlertTitle } from "./ui/alert";
import { type AuthContextType } from "@/context/AuthContext";
import { MessageSquare } from "lucide-react";

type AlertProps = Pick<AuthContextType, "message" | "setMessage">;

function AlertMsg({ message, setMessage }: AlertProps) {
  const [shown, setShown] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setShown(true);
      const timer = setTimeout(() => {
        setShown(false);
        setMessage(undefined);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!shown || !message) return null;

  return (
    <Alert
      className="w-[30vw] rounded-md border-1 border-gray-500 bg-[#242424] text-white"
      variant="default"
    >
      <MessageSquare />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}

export default AlertMsg;
