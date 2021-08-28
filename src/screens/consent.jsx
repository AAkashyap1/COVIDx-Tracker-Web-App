export default function Consent(props) {
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
                                To move on, your consent is needed.
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">By clicking 'Next', you agree with 
                            our <span className="text-blue-550">privacy policy and terms of use</span>, as well as 
                            how we manage your data entered into this tool.</p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex flex-col justify-stretch">
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