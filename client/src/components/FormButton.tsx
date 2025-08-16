import { Button } from "./ui/button";

function FormButton({
  text,
  handleClick,
}: {
  text: string;
  handleClick?: () => void;
}) {
  return (
    <Button
      onClick={handleClick}
      type="submit"
      className="text-md mt-4 w-full cursor-pointer bg-white p-6 text-black hover:bg-gray-200"
    >
      {text}
    </Button>
  );
}

export default FormButton;
