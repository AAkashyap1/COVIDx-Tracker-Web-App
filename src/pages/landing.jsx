import Nav from '../components/nav'
import { CheckIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Footer from '../components/footer'

const features = [
    {
        name: 'Symptom Analysis',
        link: '/symptoms',
        description: 'COVIDx utilizes a high-accuracy algorithm to determine your next steps with COVID-19. ',
    },
    {
        name: 'Vaccination Sites',
        link: '/vaccinations',
        description: 'Find places near you where you can receive the COVID-19 vaccine.',
    },
    {
        name: 'Testing Locations',
        link: '/testing',
        description: 'Get an array of nearby testing locations where you can get a COVID-19 test.',
    },
    {
        name: 'Case Statistics',
        link: '/cases',
        description: 'Access an interactive map of COVID-19 cases around your local area and the country.',
    },
]

export default function Landing() {
    
    useEffect(() => {
        document.title = 'Home - COVIDx Tracker'
    })

    const { currentUser, signout } = useAuth()

    async function handleLogout(event) {
      event.preventDefault()
  
      try {
        await signout()
      } catch {
  
      }
    }
    return (
        <div className="bg-blue-450">
            <Nav current="home" />
            <div className="bg-blue-450 mt-8 relative">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-blue-450" />
                <div className="mx-auto">
                    <div className="relative shadow-xl sm:overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                                className="h-full w-full object-cover"
                                src="https://cdn.discordapp.com/attachments/712062038188228669/877584909194129479/fusion-medical-animation-rnr8D3FNUNY-unsplash.jpg"
                                alt="Virus"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
                        </div>
                        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                <span className="block text-white">Take control of COVID-19</span>
                                <span className="block text-blue-200">in your area</span>
                            </h1>
                            <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                                Get access to everything you need to know about COVID-19 including vaccination and testing locations,
                                local case statistics, and high-accuracy symptom analysis.
                            </p>
                            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                    {currentUser ? <Link
                                        to="/profile"
                                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-550 bg-white hover:bg-indigo-200 sm:px-12"
                                    >
                                        Your Profile
                                    </Link> : 
                                    <Link
                                        to="/profile"
                                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-550 bg-white hover:bg-indigo-200 sm:px-12"
                                    >
                                        Get Started
                                    </Link>}
                                    {currentUser ? <Link
                                        onClick={handleLogout}
                                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-550 hover:bg-blue-600 sm:px-12"
                                    >
                                        Logout
                                    </Link>: 
                                    <Link
                                        to="/sign-in"
                                        className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-550 hover:bg-blue-600 sm:px-12"
                                    >
                                        Sign In
                                    </Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-blue-450">
                <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-gray-300">COVIDx Tracker: An All-In-One Platform</h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Get access to all you need to know about COVID-19 within your area with this helpful, easy-to-use application.
                        </p>
                    </div>
                    <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
                        {features.map((feature) => (
                            <Link key={feature.name} to={feature.link}>
                                <div key={feature.name} className="relative">
                                    <dt>
                                        <CheckIcon className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                                        <p className="ml-9 text-lg leading-6 font-medium text-gray-300">{feature.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-9 text-base text-gray-500">{feature.description}</dd>
                                </div>
                            </Link>
                        ))}
                    </dl>
                </div>
            </div>
            <Footer />
        </div>
    )
}