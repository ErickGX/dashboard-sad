import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import * as Toast from '@radix-ui/react-toast';
import ExecutiveDashboard from '@/pages/Dashboard';

function App() {
  return (
    <Toast.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExecutiveDashboard />} />
        </Routes>
      </BrowserRouter>
      
      <Toaster position="top-right" />
      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  );
}

export default App;
