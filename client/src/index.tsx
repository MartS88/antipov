import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthProvider} from "@/components/context";
import App from "@/pages/app/App";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
);

