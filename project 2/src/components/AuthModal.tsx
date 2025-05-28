import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertCircle, X, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        throw new Error('Please enter both email and password');
      }

      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (signInError) throw signInError;

      if (authData?.user) {
        onClose();
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email address');
      }

      // Get the current origin for the reset URL
      const origin = window.location.origin;
      const resetUrl = `${origin}/reset-password`;

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: resetUrl
        }
      );

      if (resetError) {
        console.error('Reset password error:', resetError);
        throw new Error('Unable to send reset email. Please try again later.');
      }

      setResetSent(true);
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTroubleshoot = () => {
    onClose();
    navigate('/troubleshoot-login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-dark p-8 rounded-lg w-full max-w-md border border-accent/20 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-heading font-bold text-white mb-6">
          {isResetMode ? 'Reset Password' : 'Sign In to Your Account'}
        </h2>

        {isResetMode && resetSent ? (
          <div className="text-center space-y-4">
            <p className="text-green-400">
              If an account exists with this email, you will receive password reset instructions shortly.
            </p>
            <button
              onClick={() => {
                setIsResetMode(false);
                setResetSent(false);
              }}
              className="text-accent hover:text-accent/80 transition-colors"
            >
              Return to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={isResetMode ? handleResetPassword : handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            {!isResetMode && (
              <div>
                <label className="block text-white mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent pr-10"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-2 rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50"
            >
              {loading
                ? isResetMode
                  ? 'Sending...'
                  : 'Signing in...'
                : isResetMode
                ? 'Send Reset Instructions'
                : 'Sign In'}
            </button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsResetMode(!isResetMode);
                  setError(null);
                  setResetSent(false);
                }}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                {isResetMode ? 'Back to sign in' : 'Forgot your password?'}
              </button>

              {!isResetMode && (
                <button
                  type="button"
                  onClick={handleTroubleshoot}
                  className="block w-full text-gray-400 hover:text-gray-300 transition-colors text-sm"
                >
                  Having trouble logging in?
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;