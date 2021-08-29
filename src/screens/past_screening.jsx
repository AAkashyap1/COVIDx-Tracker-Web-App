import { database } from "../firebase"
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

export default function PastScreening(props) {
    const [age, setAge] = useState(0)
    const { currentUser } = useAuth()

    function GetAge() {
        database.users.doc(currentUser.email).get().then((doc) => {
            setAge(doc.data().age)
        })
        return age
    }
    return (
        <div className="mx-auto grid grid-cols-7 gap-6 px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="space-y-6 col-span-7 md:col-start-2 md:col-span-5">
                <div className="flex-shrink-0">
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Past Screening</h1>
                    <p className="text-sm font-medium text-gray-400">
                        Finished {' '}
                        on <time>{props.data.date}</time>
                    </p>
                </div>
                {/* Description list*/}
                <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                Here were your results
                            </h2>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Testing Advice</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{props.data.testingAdvice}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Risk</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{props.data.risk} {GetAge() > 50 ? 
                                        `Additionally, due to your age, you are at an increased 
                                        risk of becoming severly ill if infeceted with COVID-19.` 
                                        : ''}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Precautions</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{props.data.precautions}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Next Steps</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{props.data.nextSteps}</dd>
                                </div>
                            </dl>
                            <div className="mt-6 flex flex-col justify-stretch">
                                <button
                                    onClick={props.clickNext}
                                    type="button"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-550 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {props.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}