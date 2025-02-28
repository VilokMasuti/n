import { useClientContext } from '../context/ClientContext';

const Sidebar = ({ setShowAddClient }) => {
  const { setSearchTerm, setFilterCondition, searchTerm, filterCondition } =
    useClientContext();

  return (
    <div className="h-full bg-white shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          <span className="text-xl font-bold text-green-600">NutriTrack</span>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowAddClient(true)}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          >
            Add New Client
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Clients
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Health Condition
            </label>
            <input
              type="text"
              id="filter"
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              placeholder="e.g. Diabetes"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Quick Stats
          </h3>
          <div className="bg-gray-100 p-3 rounded-md">
            <div className="text-sm text-gray-600">
              <p className="flex justify-between mb-1">
                <span>Total Clients:</span>
                <span className="font-medium">5</span>
              </p>
              <p className="flex justify-between">
                <span>Active Plans:</span>
                <span className="font-medium">3</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
