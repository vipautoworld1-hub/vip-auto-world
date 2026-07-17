'use client';

export default function Navbar() {
  return (
    <nav className="bg-black-900 text-gold-500 shadow-lg border-b-2 border-gold-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-700 rounded-lg flex items-center justify-center">
            <span className="text-black-900 font-bold text-lg">🚗</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gold-500">Vip Auto World</h1>
            <p className="text-xs text-gold-300">车牌库存管理系统</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a href="/" className="hover:text-gold-300 transition">
            首页
          </a>
          <a href="/inventory" className="hover:text-gold-300 transition">
            库存
          </a>
        </div>

        {/* Creator signature */}
        <div className="text-right">
          <p className="text-xs text-gold-300">Create By Martin</p>
        </div>
      </div>
    </nav>
  );
}
