import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';

export const Product: React.FC = () => {
    const [products, setProducts] = useState<{ _id: string, name: string, price: number, qty: number }[]>([]);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [qty, setQty] = useState<number | string>('');
    const [error, setError] = useState<string | null>(null);

    const handleAddProduct = async (): Promise<void> => {
        try {
            const newProduct = { name, price: Number(price), qty: Number(qty) };

            // Make the API call to add the product
            const response = await fetch('http://localhost:8080/product/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to add product. Please try again.');
            }

            // Capture the response with the saved product data
            const data = await response.json();
            const savedProduct = data.savedProduct; // Extract savedProduct from response
            console.log('Saved Product:', savedProduct);

            // Update state to include the new product with _id, name, price, qty
            setProducts([...products, { 
                _id: savedProduct._id, 
                name: savedProduct.name, 
                price: savedProduct.price, 
                qty: savedProduct.qty 
            }]);

            // Clear form fields after successfully adding
            setName('');
            setPrice('');
            setQty('');
            setError(null);  // Clear any error message
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    // Log updated products state
    useEffect(() => {
        console.log('Updated Products:', products);
    }, [products]);

    const calculateTotalPrice = (): number => {
        const subtotal = products.reduce((total, product) => total + product.price * product.qty, 0);
        const gst = subtotal * 0.18; // Adding 18% GST
        return subtotal + gst;
    };

    const navigate = useNavigate();
    const handleGenerateInvoice = () => {
        navigate("/generatePdf", { state: { products } }); // Pass products to the invoice page
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100">
                {/* Page Title */}
                <div className="text-center py-8">
                    <h1 className="text-3xl font-semibold">Add Products</h1>
                    <p className="text-sm text-gray-400">This is a basic product management page.</p>
                </div>

                {/* Product Form */}
                <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
                    <div className="flex space-x-4 mb-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-400">Product Name</label>
                            <input
                                type="text"
                                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none"
                                placeholder="Enter the product name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-400">Product Price</label>
                            <input
                                type="number"
                                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none"
                                placeholder="Enter the price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-400">Quantity</label>
                            <input
                                type="number"
                                className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none"
                                placeholder="Enter the Qty"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button>
                </div>

                {/* Product Table */}
                <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
                    <table className="w-full table-auto text-gray-400">
                        <thead>
                            <tr>
                                <th className="text-left">Product Name</th>
                                <th className="text-right">Quantity</th>
                                <th className="text-right">Price</th>
                                <th className="text-right">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td className="text-right">{product.qty}</td>
                                    <td className="text-right">INR {product.price}</td>
                                    <td className="text-right">INR {product.price * product.qty}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={3} className="text-right font-bold">+ GST 18%</td>
                                <td className="text-right font-bold">INR {calculateTotalPrice()}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-center mt-8">
                        <button
                            onClick={handleGenerateInvoice}
                            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                        >
                            Click here to Generate PDF Invoice
                        </button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
        </>
    );
};
