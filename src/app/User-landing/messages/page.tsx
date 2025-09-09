import { Suspense } from "react";
import ClientMessagesComponent from "./ClientMessagesComponent";

export default function ClientMessages() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4a017] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    }>
      <ClientMessagesComponent />
    </Suspense>
  );
}
