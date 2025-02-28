/* eslint-disable no-unused-vars */
import { PencilIcon, TrashIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useClientContext } from '../context/ClientContext';
const ClientList = ({ setShowEditClient, setShowAddNutrition }) => {
  const { filteredClients, selectedClient, setSelectedClient, deleteClient } =
    useClientContext();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Client List</h2>
        <p className="text-sm text-gray-500">
          {filteredClients.length} clients found
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="shadow-md">
            <tr>
              {[
                'Name',
                'Age',
                'Weight (kg)',
                'Health Conditions',
                'Actions',
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedClient?.id === client.id ? 'bg-green-50' : ''
                  }`}
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.weight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.healthConditions.length
                      ? client.healthConditions
                      : 'None'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                        setShowEditClient(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-3 "
                    >
                      <PencilIcon className="w-5 h-5  cursor-pointer" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (toast.success(' 🗑️ Client deleted successfully!')) {
                          deleteClient(client.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-90 cursor-pointer"
                    >
                      <TrashIcon className="w-5 h-5 " />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
