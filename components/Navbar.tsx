import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-lg">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight animate-rainbow">LeadsZapp Softwares</span>
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-slate-400 font-medium bg-dark-800 py-1 px-3 rounded-full border border-dark-700">
              Versão de Testes: 2.0.4
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;