export default function LoadingSpinner({ size = "100px" }) {
  return (
    <div className="mt-50">
      <div
        className="border-b-2 border-gray-300 rounded-full animate-spin"
        style={{
          width: size,
          height: size,
        }}
      ></div>
    </div>
  );
}
