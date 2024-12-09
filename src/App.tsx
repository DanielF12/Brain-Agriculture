import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './components/Dashboard';
import FarmList from './components/FarmList';
import FarmForm from './components/FarmForm';
import { Farm } from './types';
import { Plus } from 'lucide-react';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | undefined>();

  const handleEdit = (farmId: string) => {
    const farm = store.getState().farms.farms.find((f) => f.id === farmId);
    setEditingFarm(farm);
    setIsFormOpen(true);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className="py-10">
          <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Brain Agriculture
            </h1>
          </header>
          <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="mb-8">
                <Dashboard />
              </div>

              <div className="bg-white shadow rounded-lg p-6 mt-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Produtores Rurais
                  </h2>
                  <button
                    onClick={() => {
                      setEditingFarm(undefined);
                      setIsFormOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Novo Produtor
                  </button>
                </div>

                <FarmList onEdit={handleEdit} />
              </div>

              {isFormOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {editingFarm ? 'Editar Produtor' : 'Novo Produtor'}
                    </h2>
                    <FarmForm
                      initialData={editingFarm}
                      onClose={() => {
                        setIsFormOpen(false);
                        setEditingFarm(undefined);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;