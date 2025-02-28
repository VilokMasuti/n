import { useState } from 'react';
import { useClientContext } from '../context/ClientContext';
import ClientForm from '../Forms/ClientForm';
import NutritionForm from '../Forms/NutritionForm';
import ClientDetails from './ClientDetails';
import ClientList from './ClientList';
import Sidebar from './Sidebar';

export const Dashboard = () => {
  const { selectedClient } = useClientContext();
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [showAddNutrition, setShowAddNutrition] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen   bg-slate-50 shadow-2xl">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          {isMobileSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 fixed lg:relative z-20 w-64 h-full`}
      >
        <Sidebar setShowAddClient={setShowAddClient} />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-5 px-18 sm:px-18 lg:px-8">
            <h1 className="text-2xl font-semibold  antialiased text-gray-900">
              <span className=" text-green-500 animate-pulse duration-1000  ease-in-out   uppercase underline decoration-green-500 decoration-4  px-2">
                Nutritionist
              </span>
              Dashboard
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Client list section */}
              <div className="w-full lg:w-1/2">
                <ClientList
                  setShowEditClient={setShowEditClient}
                  setShowAddNutrition={setShowAddNutrition}
                />
              </div>
              {/* Client details section */}
              <div className="w-full lg:w-1/2">
                {selectedClient &&
                  !showAddClient &&
                  !showEditClient &&
                  !showAddNutrition && (
                    <ClientDetails
                      setShowEditClient={setShowEditClient}
                      setShowAddNutrition={setShowAddNutrition}
                    />
                  )}
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Modal forms */}

      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Client</h2>
            <ClientForm
              onClose={() => setShowAddClient(false)}
              isEdit={false}
            />
          </div>
        </div>
      )}

      {showEditClient && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Client</h2>
            <ClientForm
              onClose={() => setShowEditClient(false)}
              isEdit={true}
              client={selectedClient}
            />
          </div>
        </div>
      )}

      {showAddNutrition && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Nutrition Data</h2>
            <NutritionForm
              onClose={() => setShowAddNutrition(false)}
              clientId={selectedClient.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};
