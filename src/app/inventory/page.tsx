'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VehicleForm from '@/components/VehicleForm';
import VehicleTable from '@/components/VehicleTable';
import { Vehicle } from '@/lib/types';
import { vehicleService } from '@/lib/supabase';

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>();

  // 加载车辆数据
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleService.getAllVehicles();
      setVehicles(data || []);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 搜索车辆
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadVehicles();
      return;
    }

    try {
      setLoading(true);
      const data = await vehicleService.searchVehicles(searchQuery);
      setVehicles(data || []);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这辆车吗？')) return;

    try {
      await vehicleService.deleteVehicle(id);
      setVehicles(vehicles.filter(v => v.id !== id));
      alert('删除成功');
    } catch (error) {
      alert('删除失败');
      console.error(error);
    }
  };

  // 处理编辑
  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  // 处理提交表单后
  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingVehicle(undefined);
    loadVehicles();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 标题 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black-900 mb-2">📋 库存管理</h2>
          <p className="text-gray-600">管理您的车牌库存，实时更新车辆信息</p>
        </div>

        {/* 搜索栏 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4 flex-wrap">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索车牌号、发动机号或位置..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500 min-w-64"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-gold-500 to-gold-700 text-black-900 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
            >
              🔍 搜索
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
                setEditingVehicle(undefined);
                setShowForm(!showForm);
              }}
              className="bg-black-900 text-gold-500 px-6 py-2 rounded-lg font-semibold border border-gold-500 hover:bg-gold-500 hover:text-black-900 transition"
            >
              {showForm ? '✕ 关闭' : '➕ 添加车辆'}
            </button>
          </div>
        </div>

        {/* 表单区域 */}
        {showForm && (
          <div className="mb-8">
            <VehicleForm
              initialData={editingVehicle}
              onSubmit={handleFormSubmit}
            />
          </div>
        )}

        {/* 数据统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gold-500">
            <p className="text-gray-600 text-sm">总车辆数</p>
            <p className="text-3xl font-bold text-black-900">{vehicles.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm">可用车辆</p>
            <p className="text-3xl font-bold text-green-600">
              {vehicles.filter(v => v.status === 'available').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm">已售车辆</p>
            <p className="text-3xl font-bold text-red-600">
              {vehicles.filter(v => v.status === 'sold').length}
            </p>
          </div>
        </div>

        {/* 车辆表格 */}
        <VehicleTable
          vehicles={vehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      {/* 页脚 */}
      <footer className="bg-black-900 text-gold-500 text-center py-6 mt-12 border-t border-gold-500">
        <p className="text-sm">© 2026 Vip Auto World - 车牌库存管理系统</p>
        <p className="text-xs text-gold-300 mt-2">Create By Martin</p>
      </footer>
    </div>
  );
}
