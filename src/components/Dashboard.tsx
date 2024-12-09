import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#e80070'];

export default function Dashboard() {
  const farms = useSelector((state: RootState) => state.farms.farms);

  const totalFarms = farms.length;
  const totalArea = farms.reduce((sum, farm) => sum + farm.totalArea, 0);

  const stateDistribution = farms.reduce((acc, farm) => {
    acc[farm.state] = (acc[farm.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cultureDistribution = farms.reduce((acc, farm) => {
    farm.cultures.forEach(culture => {
      acc[culture] = (acc[culture] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const landUseDistribution = [
    {
      name: 'Área Agricultável',
      value: farms.reduce((sum, farm) => sum + farm.arableLand, 0),
    },
    {
      name: 'Área de Vegetação',
      value: farms.reduce((sum, farm) => sum + farm.vegetationArea, 0),
    },
  ];

  const renderPieChart = (data: { name: string; value: number }[], title: string) => (
    <div className="h-64">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#e80070"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total de Fazendas</h3>
          <p className="mt-2 text-3xl font-bold text-pink-500">{totalFarms}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Área Total (ha)</h3>
          <p className="mt-2 text-3xl font-bold text-pink-500">{totalArea.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderPieChart(
          Object.entries(stateDistribution).map(([name, value]) => ({ name, value })),
          'Distribuição por Estado'
        )}
        {renderPieChart(
          Object.entries(cultureDistribution).map(([name, value]) => ({ name, value })),
          'Distribuição por Cultura'
        )}
      </div>

      <div className="col-span-2">
        {renderPieChart(landUseDistribution, 'Uso do Solo')}
      </div>
    </div>
  );
}