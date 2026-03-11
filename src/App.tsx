import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store';
import { MainLayout } from './layout/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { POS } from './pages/POS';
import { Medicines } from './pages/Medicines';

// Placeholder components for other pages
const Inventory = () => <div className="p-8"><h2 className="text-2xl font-bold">Inventory Management</h2><p className="text-slate-500 mt-2">Stock tracking and alerts coming soon.</p></div>;
const Reports = () => <div className="p-8"><h2 className="text-2xl font-bold">Analytics & Reports</h2><p className="text-slate-500 mt-2">Comprehensive sales and inventory reports.</p></div>;
const Users = () => <div className="p-8"><h2 className="text-2xl font-bold">Users & Roles</h2><p className="text-slate-500 mt-2">Manage staff accounts and permissions.</p></div>;
const Settings = () => <div className="p-8"><h2 className="text-2xl font-bold">System Settings</h2><p className="text-slate-500 mt-2">Pharmacy and subscription configuration.</p></div>;

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
