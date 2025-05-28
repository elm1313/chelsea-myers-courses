import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, X } from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error('All fields are required');
      }

      if (newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }

      if (!/[A-Z]/.test(newPassword)) {
        throw new Error('Password must contain at least one uppercase letter');
      }

      if (!/[a-z]/.test(newPassword)) {
        throw new Error('Password must contain at least one lowercase letter');
      }

      if (!/[0-9]/.test(newPassword)) {
        throw new Error('Password must contain at least one number');
      }

      if (!/[!@#$%^&*]/.test(newPassword)) {
        throw new Error('Password must contain at least one special character (!@#$%^&*)');
      }

      if (newPassword !== confirmPassword) {
        throw new Error('New passwords do not match');
      }

      if (newPassword === currentPassword) {
        throw new Error('New password must be different from current password');
      }

      // First verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || '',
        password: currentPassword,
      });

      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);

    } catch (err: any) {
      console.error('Password change error:', err);
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-dark p-8 rounded-lg w-full max-w-md border border-accent/20 relative">
        <button
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-heading font-bold text-white mb-6">
          Change Password
        </h2>

        {success ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <p className="text-green-400">Password changed successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2" htmlFor="current-password">
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setError(null);
                }}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter your current password"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-white mb-2" htmlFor="new-password">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError(null);
                }}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Enter your new password"
                disabled={loading}
              />
              <p className="text-gray-400 text-sm mt-1">
                Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.
              </p>
            </div>

            <div>
              <label className="block text-white mb-2" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(null);
                }}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="Confirm your new password"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50"
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;