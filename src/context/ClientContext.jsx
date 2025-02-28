import { createContext, useContext, useEffect, useState } from 'react';
import { initialClients } from '../utils';

const ClientContext = createContext();
// Sample initial data

export const useClientContext = () => useContext(ClientContext);

const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState(() => {
    // Try to get clients from localStorage
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      return JSON.parse(savedClients).map((client) => ({
        ...client,
        nutritionData: client.nutritionData || [], // Add fallback
      }));
    }
    return initialClients.map((client) => ({
      ...client,
      nutritionData: client.nutritionData || [], // Ensure array exists
    }));
  });

  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  // Save clients to localStor
  // In ClientProvider.js
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
    if (selectedClient) {
      const updatedClient = clients.find((c) => c.id === selectedClient.id);
      if (updatedClient) setSelectedClient(updatedClient);
    }
  }, [clients, selectedClient]);
  // Add a new client
  // Add a new client
  const addClient = (client) => {
    const newClient = {
      ...client,
      id: Date.now(),
      nutritionData: [], // Explicitly initialize array
    };
    setClients([...clients, newClient]);
  };

  // Update an existing client
  // In ClientProvider.js updateClient function
  const updateClient = (updatedclient) => {
    setClients(
      clients.map((client) =>
        client.id === updatedclient.id ? updatedclient : client
      )
    );

    // Update selected client if it's the one being edited
    if (selectedClient && selectedClient.id === updatedclient.id) {
      setSelectedClient(updatedclient);
    }
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
    setClients((clients) =>
      clients.map((client) => {
        if (client.id === clientId) {
          return {
            ...client,
            nutritionData: [
              ...(client.nutritionData || []),
              { ...nutritionData, id: Date.now() },
            ],
          };
        }
        return client;
      })
    );

    // Update selected client with fresh state
    setSelectedClient((prevSelected) => {
      if (prevSelected && prevSelected.id === clientId) {
        return {
          ...prevSelected,
          nutritionData: [...prevSelected.nutritionData, nutritionData],
        };
      }
      return prevSelected;
    });
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
