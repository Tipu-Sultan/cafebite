// src/components/FormInput.js
const FormInput = ({ label, name, type = "text", value, onChange, options = [] }) => {
    if (type === 'select') {
      return (
        <div className="mb-4">
          <label className="block text-gray-700">{label}</label>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    }
  
    return (
      <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    );
  };
  
  export default FormInput;
  