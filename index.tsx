/**
 * هذا الملف هو نقطة الانطلاق لتطبيق React، حيث يقوم بربط المكون الأساسي (App) 
 * بعنصر الـ DOM في صفحة HTML لبدء تشغيل واجهة المستخدم.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import the global styles

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);