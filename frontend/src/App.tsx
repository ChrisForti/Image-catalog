import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anchor } from "lucide-react";
import { HomePage } from "./pages/HomePage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <nav className="bg-white shadow-md border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <Anchor className="text-nautical-600" size={32} />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Nautical Carpentry
                  </h1>
                  <p className="text-xs text-gray-500">Knowledge Base</p>
                </div>
              </div>

              {/* Tagline */}
              <div className="hidden md:block text-gray-600">
                Document techniques • Track hardware • Build better
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-600 text-sm">
              <p>Nautical Carpentry Knowledge Base &copy; 2026</p>
              <p className="mt-1 text-xs text-gray-500">
                Document techniques, hardware, and best practices for marine
                carpentry
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
