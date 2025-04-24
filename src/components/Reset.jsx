function Reset({ handleReset }) {
  return (
    <button
      className="bg-green-800 px-3 py-2 text-sm text-white rounded mt-6"
      onClick={handleReset}
    >
      Reset
    </button>
  );
}

export default Reset;
