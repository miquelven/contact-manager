export default function AuthLayout({ children }) {
  return (
    <div className="h-screen flex items-center justify-center  bg-gradient-to-tr from-blue-300 to-blue-800">
      {children}
    </div>
  );
}
