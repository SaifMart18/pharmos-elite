import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Pill, 
  Package, 
  BarChart3, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { FeatureGuard } from '../components/FeatureGuard';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-600 hover:bg-slate-100'
      }`
    }
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col p-4 fixed left-0 top-0">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          P
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">PharmOS Elite</h1>
      </div>

      <nav className="flex-1 space-y-1">
        <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <FeatureGuard feature="POS">
          <SidebarItem to="/pos" icon={ShoppingCart} label="Point of Sale" />
        </FeatureGuard>
        <SidebarItem to="/medicines" icon={Pill} label="Medicines" />
        <SidebarItem to="/inventory" icon={Package} label="Inventory" />
        <FeatureGuard feature="REPORTS">
          <SidebarItem to="/reports" icon={BarChart3} label="Reports" />
        </FeatureGuard>
        <SidebarItem to="/users" icon={Users} label="Users & Roles" />
      </nav>

      <div className="pt-4 border-t border-slate-100">
        <SidebarItem to="/settings" icon={Settings} label="Settings" />
        <button 
          onClick={() => dispatch(logout())}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-1"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
