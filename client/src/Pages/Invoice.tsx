import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';


export const Invoice: React.FC = () => {
    const location = useLocation();
    const productsInState = location.state?.products || []; // Get products from state
    console.log(productsInState);
    

    const products = productsInState.map((product: any) => ({
        productId: product._id,
        name: product.name || 'Unknown Product',
        quantity: product.qty,
        rate: product.price || 0,
        totalAmount: (product.qty * (product.price || 0)).toFixed(2)
    }));

    // Function to calculate total charges, GST, and total amount
    const calculateTotals = () => {
        const totalCharges = products.reduce((acc, curr) => acc + parseFloat(curr.totalAmount), 0);
        const gst = (totalCharges * 0.18).toFixed(2);
        const totalAmount = (totalCharges + parseFloat(gst)).toFixed(2);
        return { totalCharges: totalCharges.toFixed(2), gst, totalAmount };
    };

    const { totalCharges, gst, totalAmount } = calculateTotals();

    const handleGenerateInvoice = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/invoice/generate-invoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ products })
            });

            if (!response.ok) {
                throw new Error('Failed to generate invoice. Please try again.');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoice.pdf');
            document.body.appendChild(link);
            link.click();
            if (link && link.parentNode) {
                link.parentNode.removeChild(link);
            }
        } catch (error) {
            console.error('Error generating invoice:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100 p-8">
            <div className="w-full max-w-4xl">
                <h2 className="text-center text-lg font-medium text-gray-300 mb-6">
                    Sample Output : How Invoice format should look.
                </h2>
            </div>
            <div className="w-full max-w-4xl bg-white text-gray-900 rounded-lg shadow-lg p-6">
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-semibold">INVOICE GENERATOR</h2>
                        <p>Sample Output should be this </p>
                    </div>
                    <div className="text-right">
                        <p> <strong>Levitation</strong></p>
                        <p>Infotech</p>
                    </div>
                </header>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="p-3">Product</th>
                            <th className="p-3">Qty</th>
                            <th className="p-3">Rate</th>
                            <th className="p-3">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.quantity}</td>
                                <td className="p-3">USD {product.rate}</td>
                                <td className="p-3">USD {product.totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-end mt-6 ">
                    <div className="w-full max-w-sm border-2 border-black p-2">
                        <div className="flex justify-between">
                            <span>Total Charges</span>
                            <span>USD {totalCharges}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>GST (18%)</span>
                            <span>USD {gst}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total Amount</span>
                            <span>₹ {totalAmount}</span>
                        </div>
                    </div>
                </div>

                <footer className="mt-8 text-center text-sm text-gray-600">
                    <p>Date: 12/04/23</p>
                    <p className="mt-4 bg-gray-800 text-white p-3 rounded-lg">
                        We are pleased to provide any further information you may require and look forward to assisting you with your next order. Rest assured, it will receive our prompt and dedicated attention.
                    </p>
                </footer>
            </div>

            <button
                onClick={handleGenerateInvoice}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none"
            >
                Click here to Generate PDF Invoice
            </button>
        </div>
        </>

    );
};
