import { useState, useEffect } from 'react'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuth } from '../contexts/AuthContext'
import { database } from '../firebase'
import { Link, useHistory } from 'react-router-dom'
import {
  HeartIcon,
  UserIcon,
} from '@heroicons/react/solid'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { ExclamationIcon } from '@heroicons/react/outline'
import PastScreening from '../screens/past_screening'

export default function Example() {
    const history = useHistory()
    const [loading] = useState(false)
    const { currentUser } = useAuth()
    const [name, setName] = useState('')
    const [screenings, setScreenings] = useState([])
    const [date, setDate] = useState('')
    const [data, setData] = useState({
        date: '',
        testingAdvice: '',
        risk: '',
        precautions: '',
        nextSteps: '',
    })
    const [screenIndex, setScreenIndex] = useState(0)
    let info = useDocumentData(database.users.doc(currentUser.email))[0]
    let screeningsCollection = useCollectionData(database.users.doc(currentUser.email)
                                .collection('screenings').orderBy('submitted', 'desc'))[0]
  
    useEffect(() => {
        document.title = 'Symptom Screenings - COVIDx Tracker'
    })

    useEffect(() => {
        if (info !== undefined) {
            setName(info.first_name + ' ' + info.last_name)
            setDate(GetDate(info.joined))
        }
        if (screeningsCollection !== undefined){
            if (screenings.length < screeningsCollection.length) {
                for (const screening of screeningsCollection) {
                    setScreenings(pastScreenings => [
                        ...pastScreenings,
                        {
                            datetime: screening.submitted,
                            date: screening.date,
                            icon: screening.danger > 50 ? ExclamationIcon : HeartIcon,
                            target: String(screening.danger) + '%',
                            content: 'Risk: ',
                            color: screening.danger > 50 ? 'red' : 'blue',
                            testingAdvice: screening.testingAdvice,
                            nextSteps: screening.nextSteps,
                            risk: screening.risk,
                            precautions: screening.precautions,
                        }
                    ])
                }
            }
        }
    }, [info, screeningsCollection, screenings])

    function GetDate(seconds) {
        let t = new Date(seconds*1000);
        let date = ""
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                        'August', 'September', 'October', 'November', 'December']
        date += months[t.getMonth()] + ' '
        date += String(t.getDate()) + ', '
        date += String(t.getFullYear() - 1969)
        return date
    }

    function GetScreen(index) {
        switch(index) {
            case 0:
                return (
                    <div className="mx-auto grid grid-cols-7 gap-6 px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                    <section aria-labelledby="timeline-title" className="col-start-1 col-span-7 md:col-start-2 md:col-span-5">
                    <div className="mb-6 flex items-center justify-between md:space-x-5">
                    <div className="flex items-center space-x-0 sm:space-x-5">
                        <div className="flex-shrink-0">
                        <div className="relative">
                            <span className="rounded-full bg-gray-400">
                                <UserIcon
                                className="h-12 w-12 rounded-full text-blue-550"
                                />
                            </span>
                        </div>
                        </div>
                        <div>
                        <h1 className="text-2xl font-bold text-white">{name}</h1>
                        <p className="text-sm font-medium text-gray-400">
                            Joined {' '}
                            <Link to="/" className="text-blue-550">
                            COVIDx Tracker
                            </Link>{' '}
                            on <time dateTime="2020-08-25">{date}</time>
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse md:mt-0 md:flex-row ">
                        <button
                            onClick={e => {e.preventDefault(); history.push('/screening')}}
                            to="/screening"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-550 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-450 focus:ring-blue-500"
                        >
                            New Screening
                        </button>
                    </div>
                    </div>
                        <div className="bg-white px-4 py-5 shadow rounded-lg sm:px-6">
                        <h2 id="timeline-title" className="text-lg font-medium text-blue-900">
                            Past Screenings
                        </h2>

                        {/* Activity Feed */}
                        <div className="mt-4 flow-root">
                            <ul className="-mb-8">
                                {!loading ?
                                    screenings.length !== 0 ? 
                                        (screenings.map((item, itemIdx) => (
                                            <li key={item.id}>
                                            <div className="relative pb-8">
                                                {itemIdx !== screenings.length - 1 ? (
                                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-500" aria-hidden="true" />
                                                ) : null}
                                                <div className="relative flex space-x-3">
                                                <div>
                                                    <span
                                                        className={item.color === 'blue' ? 
                                                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-blue-550' :
                                                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-red-500' 
                                                        }
                                                    >
                                                    <item.icon className="w-5 h-5 text-white" aria-hidden="true" />
                                                    </span>
                                                </div>
                                                <button  
                                                    onClick={e => {e.preventDefault(); setData({
                                                        date: item.date,
                                                        testingAdvice: item.testingAdvice,
                                                        risk: item.risk,
                                                        precautions: item.precautions,
                                                        nextSteps: item.nextSteps,
                                                    }); setScreenIndex(1)}}
                                                    className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4"
                                                >
                                                    <div>
                                                    <p className="text-sm text-gray-500">
                                                        {item.content}{' '}
                                                        <span className="text-blue-450 font-semibold">{item.target}</span>
                                                    </p>
                                                    </div>
                                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                    <time dateTime={item.datetime}>{item.date}</time>
                                                    </div>
                                                </button>
                                                </div>
                                            </div>
                                            </li>))) : 
                                        <Link to='/screening' className="flex justify-center text-lg text-blue-450 mb-10">No past screenings - Create one!</Link>
                                    : <Link to='/screening' className="flex justify-center text-lg text-blue-450 mb-10">Loading...</Link>
                                }
                            </ul>
                        </div>
                        </div>
                    </section>
                    </div>
                )
            case 1:
                return <PastScreening 
                    data={data}
                    clickNext={e => {e.preventDefault(); setScreenIndex(0)}} 
                    buttonText="Back to Screening Home" 
                />
            default: 
                break
        }
    }

    return (
        <div className="relative min-h-screen bg-blue-450">
        <Nav current="symptoms"/>

        <main className={screenIndex === 1 ? "pt-4 pb-5" : "pt-10 pb-5"}>
            {GetScreen(screenIndex)} 
        </main>
        <Footer />
        </div>
    )
}