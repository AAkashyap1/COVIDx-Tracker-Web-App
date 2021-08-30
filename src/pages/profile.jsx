import React, { useState, useRef, useEffect } from 'react'
import { ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { useAuth } from '../contexts/AuthContext.js'
import { database } from '../firebase'
import Nav from '../components/nav'
import countries from '../data/countries'
import { timestamp } from '../firebase'

export default function Profile() {
  const message = 'Creating a profile is strongly recommended. It allows you to sync previous screening results across COVIDx servers.'
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const history = useHistory()

  useEffect(() => {
    document.title = 'Create a Profile - COVIDx Tracker'
  })

  async function handleLogin(event) {
    event.preventDefault()

    if (passwordRef.current.value.length < 7) {
      return setError('Passwords must be at least 7 characters in length')
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Your passwords do not match')
    }

    if (emailRef.current.value.toLowerCase() !== emailRef.current.value) {
      return setError('Your email must only contain lowercase letters')
    }

    if (country === '') {
      return setError('You must select a valid country')
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      database.users.doc(email).set({
          first_name: firstName,
          last_name: lastName,
          age: age,
          email: email,
          code: code, 
          country: country,
          joined: timestamp,
      })
      history.push('/')
    } catch {
      setError('Failed to create profile. This email may already have an account associated with it.')
    }

    setLoading(false)
  }

  function onChange(e) {
    setCountry(e.label)
    setCode(e.value)
  }

  return (
    <div className="bg-white">
      <Nav />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <h1 className="text-3xl font-bold leading-tight text-blue-450">Create a Profile</h1>
          </div>
        </header>
        <main>
          <div className="z-50 max-w-7xl mx-auto sm:px-6 lg:px-8">
            {message && 
                <div className="mb-6 rounded-md bg-yellow-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                    <ExclamationCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <h3 className="text-sm text-green-800">{message}</h3>
                    </div>
                </div>
                </div>
            }
            <div className="space-y-6 lg:px-0 lg:col-span-9">
              <form onSubmit={handleLogin} action="#" method="POST">
                <div className="shadow sm:rounded-md overflow-hidden shadow border border-gray-200">
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                      <p className="mt-1 text-sm text-gray-500">{'* '}Denotes a required field.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                          First Name{'*'}
                        </label>
                        <input
                          required
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="given-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                          Last Name{'*'}
                        </label>
                        <input
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          required
                          type="text"
                          name="last_name"
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 tw-forms-disable-all-descendants">
                        <label htmlFor="age" className=" mb-1 block text-sm font-medium text-gray-700">
                            Country{'*'}
                        </label>
                        <Select required isSearchable options={countries} onChange={e => onChange(e)} placeholder="" /> 
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                          Email Address{'*'}
                        </label>
                        <input
                          ref={emailRef}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                          Age{'*'}
                        </label>
                        <input
                          required
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          type="number"
                          name="age"
                          id="aeg"
                          autoComplete="number"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password{'*'}
                        </label>
                        <input
                          required
                          ref={passwordRef}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Confirm Password{'*'}
                        </label>
                        <input
                          required
                          ref={confirmPasswordRef}
                          id="confirmpassword"
                          name="confirmpassword"
                          type="password"
                          autoComplete="current-password"
                          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    {error && 
                      <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm text-red-800">{error}</h3>
                          </div>
                        </div>
                      </div>
                    }
                    
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      disabled={loading}
                      type="submit"
                      className="bg-blue-450 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}