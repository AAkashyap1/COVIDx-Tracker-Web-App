import { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { XCircleIcon, CheckCircleIcon,ExclamationCircleIcon } from '@heroicons/react/solid'

export default function SignIn(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, sendPasswordResetEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const history = useHistory()

  useEffect(() => {
    document.title = 'Sign In - COVIDx Tracker'
  })

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Sorry, we did not recognize this login')
    }

    setLoading(false)
  }

  async function resetPassword(event) {
    event.preventDefault()

    try {
      setError('')
      setLoading(true)
      await sendPasswordResetEmail(emailRef.current.value)
      setMessage('Password reset email sent to ' + emailRef.current.value)
    } catch {
      setError('Sorry, we were unable to send a password reset email to ' + emailRef.current.value)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-450 flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to="/"> 
              <img
                className="h-12 w-auto"
                src={process.env.REACT_APP_VIRUS}
                alt="Virus"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-white">Sign in with your account</h2>
            <p className="mt-2 text-sm text-white max-w">
              Or{' '}
              <Link to="/profile" className="font-medium text-blue-550 hover:text-blue-600">
                create an account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="rounded-md bg-red-200 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm text-red-800">If you forgot your password, type the email associated with your account into the email field and hit the 'Forgot your password?' button.</h3>
                </div>
              </div>
            </div>

            <div>
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-blue-450 text-gray-300">Continue with</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>

                {error && 
                  <div className="w-full rounded-md bg-red-200 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm text-red-800">{error}</h3>
                      </div>
                    </div>
                  </div>
                }

                {message && 
                  <div className="rounded-md bg-green-200 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm text-green-800">{message}</h3>
                      </div>
                    </div>
                  </div>
                }

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-550 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>

                  <form>
                    <div className="text-sm">
                      <button disabled={loading} onClick={resetPassword} className="font-medium text-blue-550 hover:text-blue-600">
                        Forgot your password? 
                      </button>
                    </div>
                  </form>
                </div>

                <button disabled={loading} type="submit" className="w-full">
                  <p
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-550 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Sign in
                  </p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={process.env.REACT_APP_BACKGROUND}
          alt="Virus"
        />
      </div>
    </div>
  )
}