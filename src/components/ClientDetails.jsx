import { useClientContext } from '../context/ClientContext';

const ClientDetails = ({ setShowEditClient, setShowAddNutrition }) => {
  const { selectedClient } = useClientContext();

  if (!selectedClient) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center h-40">
        <p className="text-gray-500">Select a client to view details</p>
      </div>
    );
  }

  // Calculate BMI
  const heightInMeters = selectedClient.height / 100;
  const bmi = (selectedClient.weight / heightInMeters ** 2).toFixed(1);
  const bmiCategory =
    bmi < 18.5
      ? 'Underweight'
      : bmi < 25
      ? 'Normal weight'
      : bmi < 30
      ? 'Overweight'
      : 'Obese';

  const latestNutrition = selectedClient.nutritionData?.at(-1) || null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Client Details</h2>
        <div className="space-x-2">
          <button
            onClick={() => setShowEditClient(true)}
            className="px-6 py-2 cursor-pointer  bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => setShowAddNutrition(true)}
            className="px-4 py-2 cursor-pointer  bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          >
            Add Nutrition Data
          </button>
        </div>
      </div>

      {/* Client Information */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Personal Information
            </h3>
            <div className="bg-gray-50 p-3 rounded space-y-2">
              {['Name', 'Age', 'Weight', 'Height', 'Health Conditions'].map(
                (field, idx) => (
                  <p key={idx} className="text-sm">
                    <span className="font-medium">{field}:</span>
                    {field === 'Health Conditions'
                      ? selectedClient.healthConditions?.join(', ') || 'None'
                      : selectedClient[field.toLowerCase()] +
                        (field === 'Weight'
                          ? ' kg'
                          : field === 'Height'
                          ? ' cm'
                          : '')}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Health Metrics */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Health Metrics
            </h3>
            <div className="bg-gray-50 p-3 rounded space-y-2">
              <p className="text-sm">
                <span className="font-medium">BMI:</span> {bmi}
              </p>
              <p className="text-sm">
                <span className="font-medium">Category:</span> {bmiCategory}
              </p>
              <p className="text-sm">
                <span className="font-medium">Latest Calorie Intake:</span>
                {latestNutrition
                  ? `${latestNutrition.calories} kcal`
                  : 'No data'}
              </p>
            </div>
          </div>
        </div>

        {/* Nutrition Chart */}
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Nutrition History
          </h3>
          {selectedClient.nutritionData?.length ? (
            <div className="bg-gray-50 p-3 rounded"></div>
          ) : (
            <p className="text-sm text-gray-500">No nutrition data available</p>
          )}
        </div>

        {/* Nutrition Records */}
        {selectedClient.nutritionData?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">
              Nutrition Records
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    {[
                      'Date',
                      'Calories',
                      'Protein (g)',
                      'Carbs (g)',
                      'Fat (g)',
                    ].map((header, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[...selectedClient.nutritionData]
                    .reverse()
                    .map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        {['date', 'calories', 'protein', 'carbs', 'fat'].map(
                          (field, idx) => (
                            <td
                              key={idx}
                              className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap"
                            >
                              {record[field]}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
