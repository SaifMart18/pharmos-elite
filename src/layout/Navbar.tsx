import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Bell, Search, User } from 'lucide-react';

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const plan = useSelector((state: RootState) => state.subscription.plan);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search medicines, orders..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
          {plan} Plan
        </div>
        
        <button className="relative text-slate-600 hover:text-blue-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
            3
          </span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-slate-500">{user?.role || 'Administrator'}</p>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};
