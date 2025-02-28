/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import { useClientContext } from '../context/ClientContext';
const ClientForm = ({ onClose, isEdit, client }) => {
  const { addClient, updateClient } = useClientContext();
  const [formData, setFormData] = useState({
    name: isEdit ? client.name : '',
    age: isEdit ? client.age : '',
    weight: isEdit ? client.weight : '',
    height: isEdit ? client.height : '',
    healthConditions: isEdit ? client.healthConditions : '',
  });
  const [errors, setErrors] = useState({});
  // Add useEffect to handle prop updates
  useEffect(() => {
    if (isEdit && client) {
      setFormData({
        name: client.name,
        age: client.age,
        weight: client.weight,
        height: client.height,
        healthConditions: client.healthConditions,
      });
    } else {
      setFormData({
        name: '',
        age: '',
        weight: '',
        height: '',
        healthConditions: '',
      });
    }
  }, [isEdit, client]); // Update form when isEdit or client changes

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    if (!formData.height) newErrors.height = 'Height is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Pass merged object with ID for updates
    isEdit ? updateClient({ ...formData, id: client.id }) : addClient(formData);
    toast.success(`Client ${isEdit ? 'updated' : 'added'} successfully!`);
    setFormData({
      name: '',
      age: '',
      weight: '',
      height: '',
      healthConditions: '',
    });
    onClose();
  };

  return (
    <>
      {/* Background Overlay with Glass Effect */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Animated Form Modal */}
      <motion.div
        className="fixed inset-0 flex justify-center items-center z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-4 relative"
        >
          <h2 className="text-lg font-semibold">
            {isEdit ? 'Edit Client' : 'Add Client'}
          </h2>

          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium"
              data-tooltip-id="name-tooltip"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label
              htmlFor="age"
              className="text-sm font-medium"
              data-tooltip-id="age-tooltip"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* Weight Field */}
          <div>
            <label
              htmlFor="weight"
              className="text-sm font-medium"
              data-tooltip-id="weight-tooltip"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.weight && (
              <p className="text-red-500 text-sm">{errors.weight}</p>
            )}
          </div>

          {/* Height Field */}
          <div>
            <label
              htmlFor="height"
              className="text-sm font-medium"
              data-tooltip-id="height-tooltip"
            >
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              id="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {errors.height && (
              <p className="text-red-500 text-sm">{errors.height}</p>
            )}
          </div>

          {/* Health Conditions Field */}
          <div>
            <label htmlFor="healthConditions" className="text-sm font-medium">
              Health Conditions
            </label>
            <input
              type="text"
              name="healthConditions"
              id="healthConditions"
              value={formData.healthConditions}
              onChange={handleChange}
              placeholder="e.g. Diabetes, Hypertension"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md"
            >
              {isEdit ? 'Update' : 'Add'} Client
            </button>
          </div>
        </form>
      </motion.div>

      {/* Tooltips */}
      <Tooltip id="name-tooltip" place="top" content="Enter full name" />
      <Tooltip id="age-tooltip" place="top" content="Enter age between 0-120" />
      <Tooltip id="weight-tooltip" place="top" content="Enter weight in kg" />
      <Tooltip id="height-tooltip" place="top" content="Enter height in cm" />
    </>
  );
};

export default ClientForm;
