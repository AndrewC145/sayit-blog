import { Button } from "../ui/button";

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
      className="sm:text-md mt-4 w-full cursor-pointer bg-white p-2 text-sm text-black hover:bg-gray-200 sm:p-6"
    >
      {text}
    </Button>
  );
}

export default FormButton;
