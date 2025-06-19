import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import X from "@/components/icons/x";
import { toast, Toaster, ToastBar } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster position="top-right">
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button
                  className="rounded-full p-1 hover:bg-gray-200 focus:outline-none"
                  onClick={() => toast.dismiss(t.id)}
                  aria-label="Close"
                >
                  <X className="w-2 h-2" />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  </StrictMode>
);
