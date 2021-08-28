const symptoms = [
  { name: 'Chest Pain', description: 'Experiencing severe pressure or pain in the chest that remains constant' },
  { name: 'Sudden Disorientation', description: 'Newly-appearing confusion' },
  { name: 'Discolored Skin', description: 'Bluish or pale skin or lips' },
  { name: 'Difficulty Breathing', description: 'Frequent need to catch breath causing inability to perform regular activities' },
  { name: 'Dehydration', description: 'Infrequent urination or dry lips' },
  { name: 'Slurred Speech', description: 'Difficulty to speak or speech frequently slurred together' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Emergency(props) {
    
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
                                Which of the following life-threatening symptoms are you experiencing?
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
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={props.clickBack}
                                    type="button"
                                    className="w-1/2 mr-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-550 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Back
                                </button>
                                <button
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