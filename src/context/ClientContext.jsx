
import { createContext, useContext, useEffect, useState } from 'react';
import { initialClients } from '../utils';


const ClientContext = createContext();


export const useClientContext = () => useContext(ClientContext);


const ClientProvider = ({ children }) => {
  // Client state initialization with localStorage persistence
  const [clients, setClients] = useState(() => {
    // Attempt to load saved clients from localStorage
    const savedClients = localStorage.getItem('clients');

    if (savedClients) {
      // Parse and normalize existing clients (ensure nutritionData array exists)
      return JSON.parse(savedClients).map((client) => ({
        ...client,
        nutritionData: client.nutritionData || [], // Backward compatibility
      }));
    }

    // Initialize with default clients if no localStorage data exists
    return initialClients.map((client) => ({
      ...client,
      nutritionData: client.nutritionData || [], // Ensure array initialization
    }));
  });

  // Client selection state
  const [selectedClient, setSelectedClient] = useState(null);

  // Client filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  /**
   * Effect: Persist clients to localStorage and keep selected client in sync
   * Triggers when clients or selectedClient changes
   */
  useEffect(() => {
    // 1. Save current clients state to localStorage
    localStorage.setItem('clients', JSON.stringify(clients));

    // 2. Update selected client if it exists in the current clients array
    if (selectedClient) {
      const updatedClient = clients.find((c) => c.id === selectedClient.id);
      if (updatedClient) setSelectedClient(updatedClient);
    }
  }, [clients, selectedClient]);

  /**
   * Add a new client to the system
   * @param {Object} client - New client data (without ID)
   */
  const addClient = (client) => {
    const newClient = {
      ...client,
      id: Date.now(), // Generate unique timestamp ID
      nutritionData: [], // Initialize empty nutrition array
    };
    setClients([...clients, newClient]);
  };

  /**
   * Update existing client information
   * @param {Object} updatedclient - Updated client object (must contain valid ID)
   */
  const updateClient = (updatedclient) => {
    setClients(
      clients.map((client) =>
        client.id === updatedclient.id ? updatedclient : client
      )
    );

    // If updated client is currently selected, update selected state
    if (selectedClient?.id === updatedclient.id) {
      setSelectedClient(updatedclient);
    }
  };

  /**
   * Delete a client by ID
   * @param {number} clientId - ID of client to remove
   */
  const deleteClient = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId));

    // Deselect if deleted client was selected
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
    }
  };

  /**
   * Add nutrition data to a specific client
   * @param {number} clientId - Target client ID
   * @param {Object} nutritionData - Nutrition entry data (without ID)
   */
  const addNutritionData = (clientId, nutritionData) => {
    // Functional update to ensure fresh state
    setClients((prevClients) =>
      prevClients.map((client) => {
        if (client.id === clientId) {
          return {
            ...client,
            nutritionData: [
              ...(client.nutritionData || []), // Handle potential undefined
              { ...nutritionData, id: Date.now() }, // Add unique ID
            ],
          };
        }
        return client;
      })
    );

    // Update selected client's nutrition data immediately
    setSelectedClient((prevSelected) => {
      if (prevSelected?.id === clientId) {
        return {
          ...prevSelected,
          nutritionData: [...prevSelected.nutritionData, nutritionData],
        };
      }
      return prevSelected;
    });
  };

  /**
   * Filter clients based on current search and filter conditions
   * @type {Array} Filtered client list
   */
  const filteredClients = clients.filter((client) => {
    // Normalize search strings for case-insensitive comparison
    const searchLower = searchTerm.toLowerCase();
    const filterLower = filterCondition.toLowerCase();

    // Check name matches search term
    const nameMatch = client.name.toLowerCase().includes(searchLower);

    // Check health conditions match filter
    const conditionMatch =
      filterCondition === '' ||
      client.healthConditions.some((condition) =>
        condition.toLowerCase().includes(filterLower)
      );

    return nameMatch && conditionMatch;
  });

  // Expose state and methods via context provider
  return (
    <ClientContext.Provider
      value={{
        // Client management methods
        addClient,
        updateClient,
        deleteClient,
        addNutritionData,

        // Filtering state
        filterCondition,
        filteredClients,
        searchTerm,
        setSearchTerm,
        setFilterCondition,

        // Client selection state
        selectedClient,
        setSelectedClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
