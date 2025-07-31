import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "@/components/pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="font-body"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;