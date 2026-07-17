'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { vehicleService } from '@/lib/supabase';

export default function HomePage() {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await vehicleService.getAllVehicles();
      setStats({
        total: data?.length || 0,
        available: data?.filter(v => v.status === 'available').length || 0,
        sold: data?.filter(v => v.status === 'sold').length || 0,
      });
    } catch (error) {
      console.error('加载统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* 英雄部分 */}
      <section className="bg-gradient-to-r from-black-900 via-black-950 to-black-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-block text-6xl mb-4">🚗</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-gold">Vip Auto World</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gold-300 mb-6">车牌库存管理系统</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            专业的车牌交易库存管理平台，实时追踪每一辆车的信息，确保数据安全永久保存。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/inventory"
              className="bg-gradient-to-r from-gold-500 to-gold-700 text-black-900 font-bold py-3 px-8 rounded-lg hover:shadow-xl transition transform hover:scale-105"
            >
              📋 进入库存系统
            </Link>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-gold-500 text-gold-500 font-bold py-3 px-8 rounded-lg hover:bg-gold-500 hover:text-black-900 transition"
            >
              了解更多
            </button>
          </div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 总数 */}
            <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-lg shadow-lg p-8 text-center border-t-4 border-gold-500">
              <p className="text-gray-600 text-sm font-semibold mb-2">📦 总库存</p>
              <p className="text-5xl font-bold text-black-900">{stats.total}</p>
              <p className="text-gray-600 text-xs mt-2">辆车</p>
            </div>

            {/* 可用 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg p-8 text-center border-t-4 border-green-500">
              <p className="text-gray-600 text-sm font-semibold mb-2">✅ 可用</p>
              <p className="text-5xl font-bold text-green-600">{stats.available}</p>
              <p className="text-gray-600 text-xs mt-2">可随时交易</p>
            </div>

            {/* 已售 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-lg p-8 text-center border-t-4 border-red-500">
              <p className="text-gray-600 text-sm font-semibold mb-2">✓ 已售</p>
              <p className="text-5xl font-bold text-red-600">{stats.sold}</p>
              <p className="text-gray-600 text-xs mt-2">成功交易</p>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black-900 text-center mb-12">✨ 核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 特性卡片 */}
            {[
              {
                icon: '🏷️',
                title: '车牌管理',
                desc: '完整记录车牌号码和发动机号，快速查询库存',
              },
              {
                icon: '📸',
                title: '图片上传',
                desc: '上传车辆照片，永久保存在云端，随时查看',
              },
              {
                icon: '📍',
                title: '位置追踪',
                desc: '记录每辆车的具体位置，方便库存管理',
              },
              {
                icon: '📝',
                title: '备注系统',
                desc: '添加详细备注，记录车辆特殊信息',
              },
              {
                icon: '🔍',
                title: '快速搜索',
                desc: '支持车牌、发动机号、位置多维度搜索',
              },
              {
                icon: '☁️',
                title: '云端备份',
                desc: '数据存储在云端，永不丢失，自动备份',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition border-t-4 border-gold-500"
              >
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h3 className="text-xl font-bold text-black-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术栈 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black-900 text-center mb-12">🛠️ 技术架构</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Frontend', tech: 'React 18 + TypeScript', icon: '⚛️' },
              { name: 'Styling', tech: 'Tailwind CSS', icon: '🎨' },
              { name: 'Backend', tech: 'Supabase PostgreSQL', icon: '🗄️' },
              { name: 'Deployment', tech: 'Vercel + CDN', icon: '🚀' },
            ].map((stack, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-lg p-6 text-center border border-gold-300">
                <p className="text-3xl mb-2">{stack.icon}</p>
                <p className="font-semibold text-black-900 mb-1">{stack.name}</p>
                <p className="text-sm text-gray-600">{stack.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-black-900 to-gold-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">准备好管理您的库存了吗？</h2>
          <p className="text-gray-300 text-lg mb-8">开始使用 Vip Auto World 库存管理系统，体验专业的车牌交易管理体验。</p>
          <Link
            href="/inventory"
            className="inline-block bg-gold-500 text-black-900 font-bold py-4 px-10 rounded-lg hover:shadow-xl transition transform hover:scale-105"
          >
            📋 开始使用
          </Link>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-black-900 text-gold-500 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-3">关于我们</h3>
              <p className="text-gold-300 text-sm">Vip Auto World 是专业的车牌库存管理平台，为交易商提供可靠的数据管理解决方案。</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">功能</h3>
              <ul className="text-gold-300 text-sm space-y-1">
                <li>✓ 库存管理</li>
                <li>✓ 图片上传</li>
                <li>✓ 数据搜索</li>
                <li>✓ 云端备份</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">技术</h3>
              <ul className="text-gold-300 text-sm space-y-1">
                <li>✓ React + TypeScript</li>
                <li>✓ Supabase PostgreSQL</li>
                <li>✓ Vercel 部署</li>
                <li>✓ 100% 免费</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gold-500 pt-6 text-center">
            <p className="text-sm text-gold-300 mb-2">© 2026 Vip Auto World. All rights reserved.</p>
            <p className="text-xs text-gold-500">✨ Create By Martin ✨</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
