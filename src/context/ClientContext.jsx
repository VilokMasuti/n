import { createContext, useContext, useEffect, useState } from 'react';
import { initialClients } from '../utils';

const ClientContext = createContext();
// Sample initial data

export const useClientContext = () => useContext(ClientContext);

const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState(() => {
    // Try to get clients from localStorage
    const savedClients = localStorage.getItem('clients');
    return savedClients ? JSON.parse(savedClients) : initialClients;
  });

  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  // Save clients to localStor
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);
  // Add a new client
  // Add a new client
  const addClient = (client) => {
    const newClient = {
      ...client,
      id: Date.now(),
      nutritionData: [],
    };
    setClients([...clients, newClient]);
  };

  // Update an existing client
  const updateClient = (updatedclient) => {
    setClients(
      clients.map((client) => (updatedclient.id ? updatedclient : client))
    );
  };
  // Delete a client
  const deleteClient = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId));
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient(null);
    }
  };
  // Add nutrition data to a client
  const addNutritionData = (clientId, nutritionData) => {
    setClients(
      clients.map((client) => {
        if (client.id === clientId) {
          return {
            ...client,
            nutritionData: [...client.nutritionData, nutritionData],
          };
        }
        return client;
      })
    );
    // Update selected client if it's the one being modified
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient({
        ...selectedClient,
        nutritionData: [...selectedClient.nutritionData, nutritionData],
      });
    }
  };

  // Filter clients based on search term and health condition
  const filteredClients = clients.filter((client) => {
    const matchesSearchTerm = client.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCondition =
      filterCondition === '' ||
      client.healthConditions.some((condition) =>
        condition.toLowerCase().includes(filterCondition.toLowerCase())
      );
    return matchesSearchTerm && matchesCondition;
  });

  return (
    <ClientContext.Provider
      value={{
        addClient,
        updateClient,
        deleteClient,
        addNutritionData,
        filterCondition,
        filteredClients,
        searchTerm,
        setSearchTerm,
        setFilterCondition,
        selectedClient,
        setSelectedClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
