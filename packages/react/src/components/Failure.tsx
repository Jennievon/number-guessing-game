function FailurePage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <svg
          className="w-16 h-16 mx-auto text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 10l3 3m0 0l3-3m-3 3v4"
          />
        </svg>
        <h1 className="text-2xl font-bold mt-4">Tough Luck!</h1>
        <p className="text-gray-600 mt-2">{message}</p>
      </div>
    </div>
  );
}

export default FailurePage;
