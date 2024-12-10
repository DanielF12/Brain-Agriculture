import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Farm, Culture } from '../types';
import { addFarm, updateFarm } from '../store/farmSlice';
import { validateDocument, validateAreas } from '../utils/validation';
import { AlertCircle } from 'lucide-react';

const CULTURES: Culture[] = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'];
const STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

interface FarmFormProps {
  initialData?: Farm;
  onClose: () => void;
}

export default function FarmForm({ initialData, onClose }: FarmFormProps) {
  const dispatch = useDispatch();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<Omit<Farm, 'id'>>(
    initialData ?? {
      document: '',
      producerName: '',
      farmName: '',
      city: '',
      state: '',
      totalArea: 0,
      arableLand: 0,
      vegetationArea: 0,
      cultures: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateDocument(formData.document)) {
      setError('CPF/CNPJ inválido');
      return;
    }

    if (!validateAreas(formData)) {
      setError('A soma das áreas não pode ser maior que a área total');
      return;
    }

    if (initialData) {
      dispatch(updateFarm({ ...formData, id: initialData.id }));
    } else {
      dispatch(addFarm({ ...formData, id: crypto.randomUUID() }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF/CNPJ</label>
          <input
            type="text"
            value={formData.document}
            onChange={(e) => setFormData({ ...formData, document: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Produtor</label>
          <input
            type="text"
            value={formData.producerName}
            onChange={(e) => setFormData({ ...formData, producerName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nome da Fazenda</label>
          <input
            type="text"
            value={formData.farmName}
            onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cidade</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option value="">Selecione um Estado</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Área Total (ha)</label>
          <input
            type="number"
            value={formData.totalArea}
            onChange={(e) => setFormData({ ...formData, totalArea: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Área Agricultável (ha)</label>
          <input
            type="number"
            value={formData.arableLand}
            onChange={(e) => setFormData({ ...formData, arableLand: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Área de Vegetação (ha)</label>
          <input
            type="number"
            value={formData.vegetationArea}
            onChange={(e) => setFormData({ ...formData, vegetationArea: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Culturas</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {CULTURES.map((culture) => (
            <label key={culture} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.cultures.includes(culture)}
                onChange={(e) => {
                  const newCultures = e.target.checked
                    ? [...formData.cultures, culture]
                    : formData.cultures.filter((c) => c !== culture);
                  setFormData({ ...formData, cultures: newCultures });
                }}
                className="rounded border-gray-300 text-pink-500 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
              <span className="ml-2">{culture}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600"
        >
          {initialData ? 'Atualizar' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
}