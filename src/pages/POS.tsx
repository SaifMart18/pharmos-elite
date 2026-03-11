import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/posSlice';
import { Search, Barcode, Trash2, Plus, Minus, Printer, CreditCard, ShoppingCart } from 'lucide-react';

export const POS = () => {
  const dispatch = useDispatch();
  const medicines = useSelector((state: RootState) => state.inventory.medicines);
  const { cart, total } = useSelector((state: RootState) => state.pos);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.barcode.includes(searchQuery)
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'p' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleCheckout();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Processing payment of $${total.toFixed(2)}...`);
    dispatch(clearCart());
  };

  return (
    <div className="flex gap-8 h-[calc(100vh-160px)]">
      {/* Left Side: Product Selection */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search medicine or scan barcode (Ctrl+F)"
              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-xl outline-none focus:ring-2 ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Barcode className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
            Available Medicines
          </div>
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMedicines.map(med => (
              <button
                key={med.id}
                onClick={() => dispatch(addToCart(med))}
                className="p-4 border border-slate-100 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left flex flex-col justify-between group"
              >
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{med.name}</h4>
                  <p className="text-xs text-slate-500">{med.category}</p>
                </div>
                <div className="mt-4 flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-900">${med.price.toFixed(2)}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${med.stock > 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {med.stock} in stock
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Cart / Invoice */}
      <div className="w-96 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Current Order</h3>
          <button 
            onClick={() => dispatch(clearCart())}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
              <ShoppingCart size={48} strokeWidth={1} />
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-slate-800">{item.name}</h5>
                  <p className="text-xs text-slate-500">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                    className="w-6 h-6 flex items-center justify-center bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="w-6 h-6 flex items-center justify-center bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="text-right min-w-[60px]">
                  <p className="text-sm font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Tax (0%)</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-all">
              <Printer size={18} />
              Receipt
            </button>
            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
            >
              <CreditCard size={18} />
              Pay (Ctrl+P)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
