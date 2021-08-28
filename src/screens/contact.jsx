import { useState, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/solid'

const symptoms = [
  { name: 'Recent Direct Contact with COVID-19', description: 'Contact with or exposed to someone who has had COVID-19 within the last 2 weeks' },
  { name: 'Negative Test Result', description: 'COVID-19 Test Result that has come out negative within the last 10 days.' },
  { name: 'Positive Test Result', description: 'COVID-19 Test Result that has come out positive within the last 10 days' },
  { name: 'No Test Result', description: 'You have not been tested within the last 10 days' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Contact(props) {
    const [error, setError] = useState('')
    
    useEffect(() => {
        if ([props.checks['Positive Test Result'], props.checks['Negative Test Result'], props.checks['No Test Result']]
            .filter(item => item === true).length > 1) {
                setError('You can only have one test result')
        } else {
            setError('')
        }
    }, [props.checks])
    
    return (
        <div className="mx-auto grid grid-cols-7 gap-6 px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="space-y-6 col-span-7 md:col-start-2 md:col-span-5">
                <div className="flex-shrink-0">
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">New Screening in Progress</h1>
                    <p className="text-sm font-medium text-gray-400">
                        Started {' '}
                        on <time dateTime="2020-08-25">{props.date}</time>
                    </p>
                </div>
                {/* Description list*/}
                <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                Which of the following situations apply to you?
                            </h2>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Select all that apply</p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <div className="space-y-4">
                                {symptoms.map((symptom) => (
                                <button
                                    onClick={e => props.setChecks({
                                        ...props.checks,
                                        [symptom.name]: !props.checks[symptom.name]
                                    })}
                                    key={symptom.name}
                                    value={symptom}
                                    className="text-left w-full relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none"                                   
                                >
                                    <>
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <p className="font-medium text-gray-900">
                                                {symptom.name}
                                                </p>
                                                <div className="text-gray-500">
                                                    <p className="sm:inline">
                                                        {symptom.description} 
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={classNames(
                                                props.checks[symptom.name] ? 'border-blue-550' : 'border-transparent',
                                                'absolute -inset-px rounded-lg border-2 pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                </button>
                                ))}
                            </div>
                            {error && 
                            <div className="mt-6 rounded-md bg-red-50 p-4">
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
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={props.clickBack}
                                    type="button"
                                    className="w-1/2 mr-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-550 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Back
                                </button>
                                <button
                                    disabled={error !== ''}
                                    onClick={props.clickNext}
                                    type="button"
                                    className="w-1/2 ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-550 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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