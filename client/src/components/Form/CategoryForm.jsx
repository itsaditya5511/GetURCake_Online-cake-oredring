import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
     <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => {
                // Regex pattern to allow only alphabetic characters and spaces
                const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setValue(newValue);
            }}
        />
    </div>

    <button type="submit" className="btn btn-primary">
        Submit
    </button>
</form>

    </>
  );
};

export default CategoryForm;