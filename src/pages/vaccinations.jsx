import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react'
import Nav from '../components/nav';
import Footer from '../components/footer';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Vaccinations() {
    
    useEffect(() => {
        document.title = 'Vaccinations - COVIDx Tracker'
    })

    let [categories] = useState({
        'Vaccine Locations Near You': [
            <div>
                <h2 className="max-w-7xl px-2 sm:px-4 lg:px-8 mx-auto text-2xl my-4 leading-6 font-medium text-blue-450">
                    Find COVID-19 Vaccination Locations Near You
                </h2>
                
                <div className="pb-1">
                    <div className="flex flex-col mt-2">
                        <div className="bg-white align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg h-full">
                        <iframe title="Vaccine provider information from VaccinateTheStates.com" 
                            src="https://www.vaccinatethestates.com/embed" 
                            width="100%" 
                            height="600" 
                            frameborder="0" 
                            allow="geolocation" 
                        >
                        </iframe>
                        </div>
                    </div>
                </div>
            </div>
        ],
        'US Vaccination Statistics': [
            <div>
                <h2 className="max-w-7xl px-2 sm:px-4 lg:px-8 mx-auto text-2xl my-4 leading-6 font-medium text-blue-450">
                    COVID-19 Vaccination Statistics in the United States
                </h2>
                
                <div className="pb-1">
                    <div className="flex flex-col mt-2">
                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg h-96 sm:h-full">
                        <iframe title="Vaccine provider information from VaccinateTheStates.com" 
                            src="https://public.domo.com/cards/YE040" 
                            className="sm:rounded-lg"
                            height="500"
                            width="100%"
                            marginheight="0" 
                            marginwidth="0" 
                            frameborder="0">
                        </iframe>
                        </div>
                    </div>
                </div>
            </div>
        ],
        'Worldwide Vaccination Statistics': [
            <div>
                <h2 className="max-w-7xl px-2 sm:px-4 lg:px-8 mx-auto text-2xl my-4 leading-6 font-medium text-blue-450">
                    COVID-19 Vaccination Statistics Worldwide
                </h2>
                
                <div className="pb-1">
                    <div className="flex flex-col mt-2">
                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg h-96 sm:h-full">
                        <iframe 
                            src="https://public.domo.com/cards/31O7r" 
                            className="sm:rounded-lg"
                            height="500"
                            width="100%"
                            marginheight="0" 
                            marginwidth="0" 
                            frameborder="0">
                        </iframe>
                        </div>
                    </div>
                </div>
            </div>
        ],
      })
    return (
        <div className="min-h-screen bg-blue-450">
            <Nav current="vaccination" />
        
            <div className="max-w-7xl px-2 sm:px-4 lg:px-8 mx-auto mt-8 mb-4 leading-6">
                <Tab.Group>
                    <Tab.List className="flex pt-1 pb-6 space-x-1 bg-blue-900/20 rounded-xl">
                    {Object.keys(categories).map((category) => (
                        <Tab
                        key={category}
                        className={({ selected }) =>
                            classNames(
                            'border-white w-full py-2.5 text-sm leading-5 font-medium rounded-lg',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                            selected
                                ? 'text-blue-450 bg-white shadow'
                                : 'text-white hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                        >
                        {category}
                        </Tab>
                    ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                    {Object.values(categories).map((post, idx) => (
                        <Tab.Panel
                        key={idx}
                        className={classNames(
                            'bg-white rounded-xl p-3',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-550 ring-white ring-opacity-60'
                        )}
                        >
                        {post}
                        </Tab.Panel>
                    ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <Footer />
        </div>
    )
}