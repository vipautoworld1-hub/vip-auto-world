'use client';

import { useState } from 'react';
import { Vehicle } from '@/lib/types';
import { vehicleService } from '@/lib/supabase';

interface VehicleFormProps {
  onSubmit?: (vehicle: Vehicle) => void;
  initialData?: Vehicle;
}

export default function VehicleForm({ onSubmit, initialData }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    plate_number: initialData?.plate_number || '',
    engine_number: initialData?.engine_number || '',
    location: initialData?.location || '',
    remark: initialData?.remark || '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = initialData?.vehicle_photo;

      if (imageFile) {
        imageUrl = await vehicleService.uploadImage(imageFile);
      }

      const vehicleData = {
        ...formData,
        vehicle_photo: imageUrl,
        status: 'available',
      };

      if (initialData?.id) {
        await vehicleService.updateVehicle(initialData.id, vehicleData);
      } else {
        await vehicleService.createVehicle(vehicleData);
      }

      setFormData({
        plate_number: '',
        engine_number: '',
        location: '',
        remark: '',
      });
      setImageFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-gold-500">
      <h2 className="text-2xl font-bold text-black-900 mb-6">
        {initialData ? '编辑车辆' : '添加新车辆'}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 车牌号 */}
        <div>
          <label className="block text-sm font-semibold text-black-900 mb-2">
            车牌号码 *
          </label>
          <input
            type="text"
            name="plate_number"
            value={formData.plate_number}
            onChange={handleChange}
            placeholder="例如: 京A00001"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500"
          />
        </div>

        {/* 发动机号 */}
        <div>
          <label className="block text-sm font-semibold text-black-900 mb-2">
            发动机号 *
          </label>
          <input
            type="text"
            name="engine_number"
            value={formData.engine_number}
            onChange={handleChange}
            placeholder="例如: 1A2B3C4D5E6F7G8H"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500"
          />
        </div>

        {/* 位置 */}
        <div>
          <label className="block text-sm font-semibold text-black-900 mb-2">
            车辆位置 *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="例如: 仓库A-1号位"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500"
          />
        </div>

        {/* 图片上传 */}
        <div>
          <label className="block text-sm font-semibold text-black-900 mb-2">
            车辆照片
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500"
          />
        </div>
      </div>

      {/* 备注 */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-black-900 mb-2">
          备注信息
        </label>
        <textarea
          name="remark"
          value={formData.remark}
          onChange={handleChange}
          placeholder="添加任何相关信息..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gold-500"
        />
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-gold-500 to-gold-700 text-black-900 font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
      >
        {loading ? '处理中...' : (initialData ? '更新车辆' : '添加车辆')}
      </button>
    </form>
  );
}
