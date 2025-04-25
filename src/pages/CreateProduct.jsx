import { useState } from "react";
import { number, object, string } from "yup";

const initialProductData = {
  productName: "",
  productPrice: "",
};
const initialError = {
  productName: null,
  productPrice: null,
};

const productSchema = object({
  productName: string().required(),
  productPrice: number().required().positive().integer(),
});

function CreateProduct() {
  const [products, setProducts] = useState(initialProductData);
  const [errors, setErrors] = useState(initialError);

  function handleChange(e) {
    setProducts({ ...products, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(initialError);

    try {
      const validatedData = productSchema.validateSync(
        {
          ...products,
          productPrice: products.productPrice
            ? Number(products.productPrice)
            : undefined,
        },
        {
          abortEarly: false,
        }
      );

      console.log("Form is valid:", validatedData);
    } catch (error) {
      const newErrors = { ...initialError };

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      console.log("Validation errors:", newErrors);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product name: </label>
          <input
            type="text"
            className="input input-primary"
            name="productName"
            id="productName"
            onChange={handleChange}
            value={products.productName}
          />
          {errors.productName && (
            <div className="text-red-500 text-sm mt-1">
              {errors.productName}
            </div>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="productPrice">Product price: </label>
          <input
            type="number"
            className="input input-primary"
            name="productPrice"
            id="productPrice"
            onChange={handleChange}
            value={products.productPrice}
          />
          {errors.productPrice && (
            <div className="text-red-500 text-sm mt-1">
              {errors.productPrice}
            </div>
          )}
        </div>
        <button className="btn-md px-4 py-2 rounded bg-teal-500 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
