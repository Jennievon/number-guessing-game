import Button from "./Buttons";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";

  return (
    <div
      className={modalClasses}
      style={{
        backgroundImage: "url(/assets/success.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 opacity-70" onClick={onClose}></div>
      <div className="absolute top-0 right-0 m-4">
        <Button
          variant="outline"
          onClick={onClose}
          rounded
          className="w-12 h-12 flex items-center justify-center bg-white text-2xl"
        >
          <span className="text-black">X</span>
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
