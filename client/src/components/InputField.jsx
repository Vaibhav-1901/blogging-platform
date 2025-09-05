
import React from "react";

const InputField = ({ label, name, register, rules, errors, type = "text", placeholder }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
        ${errors[name] ? "border-red-500 focus:ring-red-500" : "border-purple-500/20 focus:ring-purple-500"}`}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
    
  );
};

export default InputField;
