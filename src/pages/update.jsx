import { useState, useEffect } from 'react'
import { database, getUserInfo } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import Nav from '../components/nav'
import countries from '../data/countries'
import Select from 'react-select'
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/solid'

export default function Update() {
  const { currentUser, sendPasswordResetEmail } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [code, setCode] = useState('')
  const [country, setCountry] = useState('')
  const [updateData, setUpdateData] = useState(false)
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(1)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Update Profile - COVIDx Scanner'
  })

  useEffect(() => {
    getUserInfo(currentUser.email)
      .then((doc) => {
        setFirstName(doc.data().first_name)
        setLastName(doc.data().last_name)
        setAge(doc.data().age)
        setCode(doc.data().code)
        setCountry(doc.data().country)
      })
  }, [currentUser])
  
  function handleUpdate(event) {
    event.preventDefault()

    if (country === '' || code === '') {
        return setError('You must select a valid country')
    }

    database.users.doc(currentUser.email).update({
        age: age,
        first_name: firstName,
        last_name: lastName,
        code: code,
        country: country,
    })
    
   setUpdateData(!updateData)
   setCount(count+1)
   setMessage('Profile successfully updated (' + count + ')')
  }

  async function resetPassword(event) {
    event.preventDefault()
    try {
      setError('')
      setLoading(true)
      await sendPasswordResetEmail(currentUser.email)
      setMessage('Password reset email sent to ' + currentUser.email)
    } catch {
      setError('Sorry, we were unable to send a password reset email to ' + currentUser.email)
    } finally {
      setLoading(false)
    }
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
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Your Profile</h1>
          </div>
        </header>
        <main>
          <div className="z-50 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="space-y-6 lg:px-0 lg:col-span-9">
              <form onSubmit={handleUpdate} action="#" method="POST">
                <div className="shadow sm:rounded-md overflow-hidden shadow border border-gray-200">
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                      <p className="mt-1 text-sm text-gray-500">{'* '}Denotes a required field.</p>
                    </div>
                      
                    <div className="col-span-6 tw-forms-disable-all-descendants">
                      <label htmlFor="email_address" className="mb-1 block text-sm font-medium text-gray-700">
                        Country{'*'}
                      </label>
                      <Select isSearcbhable value={{ label: country, value: code }} options={countries} onChange={e => onChange(e)} />
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
                          required
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          type="text"
                          name="last_name"
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div> 

                      <div className="col-span-6">
                        <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                          Age{'*'}
                        </label>
                        <input
                          required
                          value={age}
                          onChange={e => setAge(e.target.value)}
                          type="number"
                          name="age"
                          id="age"
                          autoComplete="number"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></input>
                      </div>
                    </div>
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ExclamationCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm text-green-800">If you want to reset your password, click <span><button disabled={loading} onClick={resetPassword} className="font-semibold text-blue-550">here</button></span></h3>
                            </div>
                        </div>
                    </div>

                    {error && <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm text-red-800">{error}</h3>
                            </div>
                        </div>
                    </div>}

                    {message && <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm text-green-800">{message}</h3>
                            </div>
                        </div>
                    </div>}
                    
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