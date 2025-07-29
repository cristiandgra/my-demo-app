import { useState } from 'react';
import './App.css';

interface ApiResponse {
  message: string;
  data: string;
  timestamp: string;
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await fetch('http://localhost:8080/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>🚀 Demo App</h1>
          <p className='text-gray-600 text-lg'>React + TypeScript + Spring Boot</p>
        </div>

        {/* Main Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
          <div className='mb-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Process Data</h2>
            <p className='text-gray-600'>Enter your data below and see it processed by the backend</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='input' className='block text-sm font-medium text-gray-700 mb-2'>
                Your Data
              </label>
              <input
                id='input'
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Type something here...'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                disabled={loading}
              />
            </div>

            <button
              type='submit'
              disabled={loading || !inputValue.trim()}
              className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium'>
              {loading ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg className='h-5 w-5 text-red-400' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3'>
                  <p className='text-sm text-red-700'>{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Response */}
          {response && (
            <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <svg className='h-5 w-5 text-green-400' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='ml-3 flex-1'>
                  <h3 className='text-sm font-medium text-green-800 mb-2'>Response Received</h3>
                  <div className='text-sm text-green-700 space-y-1'>
                    <p>
                      <span className='font-medium'>Message:</span> {response.message}
                    </p>
                    <p>
                      <span className='font-medium'>Data:</span> {response.data}
                    </p>
                    <p>
                      <span className='font-medium'>Time:</span> {response.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-500'>Built with React 19, TypeScript, Spring Boot 3.2, and Docker</p>
          <div className='mt-2 flex justify-center space-x-4 text-xs text-gray-400'>
            <a
              href='http://localhost:8080'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-600 transition-colors'>
              Backend
            </a>
            <a
              href='http://localhost:8080/swagger-ui.html'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-600 transition-colors'>
              API Docs
            </a>
            <a
              href='http://localhost:8080/api/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-600 transition-colors'>
              API Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
