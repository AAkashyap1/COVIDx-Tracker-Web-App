import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react'
import Nav from '../components/nav';
import Footer from '../components/footer';
import countries from '../data/countries';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useDocumentData } from 'react-firebase-hooks/firestore'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Vaccinations() {
    const { currentUser } = useAuth()
    const [code, setCode] = useState('')
    const [country, setCountry] = useState('')

    function GetCountry() {
        database.users.doc(currentUser.email).get().then((doc) => {
            setCountry(doc.data().country)
            setCode(doc.data().code)
        })

        return {
            country: country, 
            code: code
        }
    }
    useEffect(() => {
        document.title = 'Vaccinations - COVIDx Tracker'
    })

    return (
        <div className="min-h-screen bg-blue-450">
            <Nav current="cases" />
        
            <div className="max-w-7xl px-2 sm:px-4 lg:px-8 mx-auto mt-8 mb-4 leading-6">
                    <div className="bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-550 ring-white ring-opacity-60 border-white w-full py-2.5 text-sm leading-5 font-medium" >
                        <h2 className="max-w-7xl px-2 sm:px-4 lg:px-8 mx-auto text-2xl my-4 leading-6 font-medium text-blue-450">
                            COVID-19 Case Statistics in Your Country:{' ' + GetCountry().country}
                        </h2>
                        
                        <div className="pb-1">
                            <div className="flex flex-col mt-2">
                                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg h-full">
                                <iframe 
                                    src={`https://ourworldindata.org/grapher/total-cases-covid-19?country=${GetCountry().code}`}
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
                <div className="mt-3 text-gray-500 text-sm">Hannah Ritchie, Edouard Mathieu, Lucas Rodés-Guirao, Cameron Appel, Charlie Giattino,
                    Esteban Ortiz-Ospina, Joe Hasell, Bobbie Macdonald, Diana Beltekian and Max Roser (2020) - "Coronavirus Pandemic (COVID-19)". 
                    Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/coronavirus' [Online Resource]
                </div>
            </div>
            <Footer />
        </div>
    )
}