import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { stripePromise } from '../lib/stripe';
import type { StripeElementsOptions } from '../lib/stripe';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { AlertCircle } from 'lucide-react';

interface CourseDetails {
  name: string;
  price: number;
  description: string;
}

interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
}

const CheckoutForm: React.FC<{ courseDetails: CourseDetails }> = ({ courseDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    city: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const validateForm = () => {
    if (!registrationData.email || !registrationData.password || !registrationData.confirmPassword ||
        !registrationData.firstName || !registrationData.lastName || !registrationData.country ||
        !registrationData.state || !registrationData.city) {
      setError('All fields are required');
      return false;
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (registrationData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // Check if user exists
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers({
        filters: {
          email: registrationData.email
        }
      });

      if (getUserError) throw getUserError;

      let userId;

      if (users && users.length > 0) {
        // User exists, try to sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: registrationData.email,
          password: registrationData.password
        });

        if (signInError) {
          setError('Invalid email or password');
          setLoading(false);
          return;
        }

        userId = signInData.user.id;
      } else {
        // New user, create account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: registrationData.email,
          password: registrationData.password,
          options: {
            data: {
              full_name: `${registrationData.firstName} ${registrationData.lastName}`
            }
          }
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Failed to create user account');

        userId = authData.user.id;

        // Create user profile for new users
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: userId,
              first_name: registrationData.firstName,
              last_name: registrationData.lastName,
              country: registrationData.country,
              state: registrationData.state,
              city: registrationData.city,
            }
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error('Failed to create user profile');
        }
      }

      // Process payment
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard`,
          payment_method_data: {
            billing_details: {
              name: `${registrationData.firstName} ${registrationData.lastName}`,
              email: registrationData.email,
              address: {
                country: registrationData.country,
                state: registrationData.state,
                city: registrationData.city,
              }
            }
          }
        },
      });

      if (paymentError) throw paymentError;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={registrationData.firstName}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={registrationData.lastName}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={registrationData.email}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={registrationData.password}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
            required
            placeholder="At least 8 characters"
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={registrationData.confirmPassword}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
            required
            placeholder="Re-enter your password"
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={registrationData.country}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="state">
            State/Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={registrationData.state}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={registrationData.city}
            onChange={handleInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent"
            required
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-heading font-bold text-white mb-4">
          Payment Information
        </h3>
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
          <PaymentElement />
        </div>
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full bg-accent text-white py-4 rounded-lg hover:bg-accent/80 transition-colors text-lg font-semibold disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Complete Purchase • $${courseDetails.price}/year`}
      </button>

      <p className="text-center text-gray-400 text-sm">
        Your payment is secure and encrypted. By completing this purchase you agree to our terms of service. Your subscription will automatically renew annually at the current rate unless canceled.
      </p>
    </form>
  );
};

const PaymentPage = () => {
  const { courseId } = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCourseDetails = (id: string): CourseDetails | null => {
    switch (id) {
      case 'bundle':
        return {
          name: 'Complete Transformation Bundle',
          price: 449,
          description: 'Get access to Quantum Upgrade Personal Transformation and The Communication Blueprint courses.'
        };
      case 'quantum':
        return {
          name: 'Quantum Upgrade Personal Transformation',
          price: 399,
          description: 'Break free from limiting patterns and transform your life with our signature program.'
        };
      case 'communication':
        return {
          name: 'The Communication Blueprint',
          price: 199,
          description: 'Enhance your communication skills and create deeper connections.'
        };
      case 'dental':
        return {
          name: 'Entrepreneurial Intelligence for Dentists',
          price: 1600,
          description: 'Transform your dental practice with proven business strategies and leadership skills.'
        };
      default:
        return null;
    }
  };

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            courseId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create payment intent');
        }

        const { clientSecret: secret, error: apiError } = await response.json();
        if (apiError) throw new Error(apiError);

        setClientSecret(secret);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    initializePayment();
  }, [courseId]);

  const courseDetails = getCourseDetails(courseId || '');

  if (!courseDetails) {
    return (
      <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-bold text-white mb-6">
            Course Not Found
          </h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white">Loading payment form...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#8E44AD',
        colorBackground: '#1A1A1A',
        colorText: '#FFFFFF',
        colorDanger: '#EF4444',
        fontFamily: 'Open Sans, system-ui, sans-serif',
        borderRadius: '0.5rem',
        spacingUnit: '4px',
      },
      rules: {
        '.Input': {
          backgroundColor: '#1F2937',
          border: '1px solid #4B5563',
        },
        '.Input:focus': {
          border: '1px solid #8E44AD',
          boxShadow: '0 0 0 1px #8E44AD',
        },
        '.Label': {
          color: '#E5E7EB',
        },
        '.Error': {
          color: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.2)',
        },
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-dark to-gray-800 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 rounded-lg p-8">
            <h1 className="text-3xl font-heading font-bold text-white mb-6">
              Complete Your Enrollment
            </h1>

            <div className="mb-8 p-6 bg-white/5 rounded-lg">
              <h2 className="font-heading text-2xl font-bold text-accent mb-4">
                {courseDetails.name}
              </h2>
              <p className="text-gray-300 mb-4">{courseDetails.description}</p>
              <div className="text-2xl font-bold text-white mb-2">${courseDetails.price}/year</div>
              <p className="text-sm text-gray-400">
                Annual subscription - Renews automatically. Cancel anytime.
              </p>
            </div>

            {clientSecret && (
              <Elements stripe={stripePromise} options={stripeOptions}>
                <CheckoutForm courseDetails={courseDetails} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;