'use client';

import Image from 'next/image';
import { Vehicle } from '@/lib/types';

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}

export default function VehicleTable({
  vehicles,
  onEdit,
  onDelete,
  loading = false,
}: VehicleTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500 text-lg">暂无车辆数据</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-black-900 text-gold-500">
              <th className="px-6 py-4 text-left font-semibold">车牌号</th>
              <th className="px-6 py-4 text-left font-semibold">发动机号</th>
              <th className="px-6 py-4 text-left font-semibold">照片</th>
              <th className="px-6 py-4 text-left font-semibold">位置</th>
              <th className="px-6 py-4 text-left font-semibold">备注</th>
              <th className="px-6 py-4 text-left font-semibold">状态</th>
              <th className="px-6 py-4 text-left font-semibold">操作</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, idx) => (
              <tr
                key={vehicle.id}
                className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-6 py-4 font-semibold text-black-900">
                  {vehicle.plate_number}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {vehicle.engine_number}
                </td>
                <td className="px-6 py-4">
                  {vehicle.vehicle_photo ? (
                    <div className="relative w-12 h-12">
                      <Image
                        src={vehicle.vehicle_photo}
                        alt={vehicle.plate_number}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">无图片</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600">{vehicle.location}</td>
                <td className="px-6 py-4 text-gray-600 text-sm truncate max-w-xs">
                  {vehicle.remark || '-'}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      vehicle.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : vehicle.status === 'sold'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {vehicle.status === 'available'
                      ? '可用'
                      : vehicle.status === 'sold'
                      ? '已售'
                      : '预留'}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => onEdit?.(vehicle)}
                    className="bg-gold-500 text-black-900 px-3 py-1 rounded font-semibold hover:bg-gold-700 transition text-sm"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => onDelete?.(vehicle.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded font-semibold hover:bg-red-700 transition text-sm"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
