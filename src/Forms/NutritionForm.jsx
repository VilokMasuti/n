/* eslint-disable no-unused-vars */
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useClientContext } from '../context/ClientContext';

const NutritionForm = ({ onClose, clientId }) => {
  const { addNutritionData } = useClientContext();

  // Initial form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.calories || formData.calories < 0)
      newErrors.calories = 'Enter valid calories';
    if (!formData.protein || formData.protein < 0)
      newErrors.protein = 'Enter valid protein';
    if (!formData.carbs || formData.carbs < 0)
      newErrors.carbs = 'Enter valid carbs';
    if (!formData.fat || formData.fat < 0) newErrors.fat = 'Enter valid fat';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addNutritionData(clientId, {
      ...formData,
      id: Date.now(), // Add unique ID
      calories: +formData.calories,
      protein: +formData.protein,
      carbs: +formData.carbs,
      fat: +formData.fat,
    });

    toast.success('Nutrition data added successfully! ✅');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Add Nutrition Data
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['date', 'calories', 'protein', 'carbs', 'fat'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            <input
              type={field === 'date' ? 'date' : 'number'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors[field] ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-2 focus:ring-blue-500`}
            />
            {errors[field] && (
              <p className="text-sm text-red-500">{errors[field]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default NutritionForm;
