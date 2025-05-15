// ResetPasswordPage.jsx - Password reset form
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/userService';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(token, password);
            setMessage('Password reset successfully. Please log in.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
                {message && <div className="text-green-600 mb-4">{message}</div>}
                <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-6 p-2 border rounded" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
