// ForgotPasswordPage.jsx - Password recovery
import { useState } from 'react';
import { requestPasswordReset } from '../../services/userService';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await requestPasswordReset(email);
            setMessage('Password reset link sent. Check your email.');
        } catch (err) {
            setMessage('Failed to send reset link. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
                {message && <div className="text-blue-600 mb-4">{message}</div>}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-6 p-2 border rounded" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;