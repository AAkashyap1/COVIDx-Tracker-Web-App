import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { database } from '../firebase'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Nav(props) {
    const [name, setName] = useState('')
    const { currentUser, signout } = useAuth()

    async function handleLogout(event) {
      event.preventDefault()
  
      try {
        await signout()
      } catch {
  
      }
    }

    function GetUserName() {
        database.users.doc(currentUser.email).get().then((doc) => {
            setName(doc.data().first_name + ' ' + doc.data().last_name)
        })
        return name
    }

    return (
        <Disclosure as="nav" className="bg-blue-450 shadow">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex px-2 lg:px-0">
                                <div className="flex-shrink-0 flex items-center">
                                    <Link
                                        to="/"
                                    >
                                        <img
                                            className="block lg:hidden h-8 w-auto"
                                            src="https://cdn.discordapp.com/attachments/712062038188228669/877437030638964756/FinalVirusImage.png"
                                            alt="Virus"
                                        />
                                    </Link>
                                    <Link
                                        to="/"
                                    >
                                        <img
                                            className="hidden lg:block h-8 w-auto"
                                            src="https://cdn.discordapp.com/attachments/712062038188228669/877437030638964756/FinalVirusImage.png"
                                            alt="Virus"
                                        />
                                    </Link>
                                    <Link to="/"><h2 className="ml-3 text-white font-bold text-2xl">COVIDx Tracker</h2></Link>
                                </div>
                                <div className="hidden lg:ml-9 lg:flex lg:space-x-8">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    <Link
                                        to="/"
                                        className={props.current === 'home' ? "border-blue-550 text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" :
                                        "border-transparent text-white hover:border-blue-550 hover:text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/symptoms"
                                        className={props.current === 'symptoms' ? "border-blue-550 text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" :
                                        "border-transparent text-white hover:border-blue-550 hover:text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}
                                    >
                                        Screening
                                    </Link>
                                    <Link
                                        to="/cases"
                                        className={props.current === 'cases' ? "border-blue-550 text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" :
                                        "border-transparent text-white hover:border-blue-550 hover:text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}
                                    >
                                        Cases Near Me
                                    </Link>
                                    <Link
                                        to="/vaccinations"
                                        className={props.current === 'vaccination' ? "border-blue-550 text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" :
                                        "border-transparent text-white hover:border-blue-550 hover:text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}
                                   >
                                        Vaccination
                                    </Link>
                                    <Link
                                        to="/testing"
                                        className={props.current === 'testing' ? "border-blue-550 text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" :
                                        "border-transparent text-white hover:border-blue-550 hover:text-blue-550 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}
                                  >
                                        Testing
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative z-50">
                                    {({ open }) => (
                                        <>
                                            <div>
                                                <Menu.Button className="max-w-xs bg-blue-450 rounded-full flex items-center text-sm focus:outline-none focus:ring-offset-2 lg:p-2 lg:rounded-md ">
                                                    {currentUser ? 
                                                        <span className="ml-3 text-white text-sm font-medium lg:block">
                                                            <span className="sr-only">Open user menu for </span>
                                                            <span>{GetUserName()}</span>
                                                        </span> : 
                                                        <span className="ml-3 text-white text-sm font-medium lg:block">
                                                            <span className="sr-only">Not Signed In</span>
                                                            <span>Not Signed In</span>
                                                        </span>
                                                    }
                                                    <ChevronDownIcon
                                                        className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    {currentUser && <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/profile"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Your Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>}
                                                    {currentUser && <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                onClick={handleLogout}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Logout
                                                            </Link>
                                                        )}
                                                    </Menu.Item>}
                                                    {!currentUser && <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/sign-in"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Sign In
                                                            </Link>
                                                        )}
                                                    </Menu.Item>}
                                                    {!currentUser && <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to="/profile"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Create an Account
                                                            </Link>
                                                        )}
                                                    </Menu.Item>}
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                            <Link
                                to="/"    
                                className="border-transparent text-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/symptoms"
                                className="border-transparent text-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Screening
                            </Link>
                            <Link
                                to="/cases"
                                className="border-transparent text-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Cases Near Me
                            </Link>
                            <Link
                                to="/vaccinations"
                                className="border-transparent text-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Vaccination
                            </Link>
                            <Link
                                to="/testing"
                                className="border-transparent text-white hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Testing
                            </Link>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                {currentUser ? 
                                    <div className="text-white font-medium text-base">Hello, {' '}{GetUserName()}</div> : 
                                    <div className="text-white font-medium text-base">Not Signed In</div>
                                }
                            </div>
                            <div className="mt-3 space-y-1">
                                {currentUser && <Link
                                    to="/update"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                >
                                    Your Profile
                                </Link>}
                                {currentUser && <Link
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                >
                                    Logout
                                </Link>}
                                {!currentUser && <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                >
                                    Get Started
                                </Link>}
                                {!currentUser && <Link
                                    to="/sign-in"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                >
                                    Sign In
                                </Link>}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}