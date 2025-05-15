const Alert = ({ message, type = "info", onClose }) => {
  const baseClasses = "p-4 mb-4 rounded-lg shadow-lg font-semibold text-sm";
  const types = {
    info: "bg-blue-100 text-blue-700 border border-blue-200",
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    error: "bg-red-100 text-red-700 border border-red-200",
  };

  return (
    <div className={`${baseClasses} ${types[type]}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} className="font-bold ml-4">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
