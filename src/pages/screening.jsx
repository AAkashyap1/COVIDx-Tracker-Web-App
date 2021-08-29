import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { database } from '../firebase'
import { useHistory } from 'react-router-dom'
import Nav from '../components/nav'
import Contact from '../screens/contact'
import Symptoms from '../screens/symptoms'
import Conditions from '../screens/conditions'
import Vaccination from '../screens/vaccination'
import Emergency from '../screens/emergency'
import Consent from '../screens/consent'
import Footer from '../components/footer'
import EmergencyResults from '../screens/results_emergency'
import Results from '../screens/results'
import messages from '../data/messages'

export default function Screening() {
    const { currentUser } = useAuth()
    const history = useHistory()

    function GetDate(date) {
        let string = ""
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                        'August', 'September', 'October', 'November', 'December']
        string += months[date.getMonth()] + ' '
        string += String(date.getDate()) + ', '
        string += String(date.getFullYear())
        return string
    }

    const [screenIndex, setScreenIndex] = useState(0)
    const [conditionChecks, setConditionChecks] = useState({
        'A Chronic Lung Disease': false, 
        'Heart Condition': false, 
        'Cancer': false, 
        'Weakened Immune System': false, 
        'Blood Disorder': false, 
        'HIV': false,
        'Obesity': false, 
        'High Blood Pressure': false, 
        'Down Syndrome': false,
        'Diabetes': false,
        'Kidney or Liver Disease': false
    })
    const [contactChecks, setContactChecks] = useState({
        'Recent Direct Contact with COVID-19': false, 
        'Positive Test Result': false,
        'Negative Test Result': false, 
        'No Test Result': false, 
    })
    const [emergencyChecks, setEmergencyChecks] = useState({
        'Chest Pain': false, 
        'Sudden Disorientation': false, 
        'Discolored Skin': false, 
        'Difficulty Breathing': false, 
        'Dehydration': false, 
        'Slurred Speech': false
    })
    const [symptomChecks, setSymptomChecks] = useState({
        'Fever': false, 
        'Chills': false, 
        'Cough': false, 
        'Moderate Difficuly Breathing': false, 
        'Body and Muscle Aches': false, 
        'Fatigue': false,
        'Loss of Taste or Smell': false, 
        'Nausea or Vomiting': false, 
        'Diarrhea': false,
        'Congestion': false,
    })
    const [vaccinationChecks, setVaccinationChecks] = useState({
        'Yes': false,
        'No': false,
    })

    const [testingAdvice, setTestingAdvice] = useState('');
    const [risk, setRisk] = useState('');
    const [precautions, setPrecautions] = useState('');
    const [nextSteps, setNextSteps] = useState('');

    const date = GetDate(new Date())

    function CheckEmergency() {
        for (const val of Object.keys(emergencyChecks)) {
            if (emergencyChecks[val]) {
                database.users.doc(currentUser.email).collection('screenings').add({
                    submitted: new Date(),
                    date: date,
                    testingAdvice: 'You do not need to get tested as you should go to the nearest emergency room.',
                    risk: 'You are at a high risk of sufferring severe consequences from COVID-19 as you are suffering from life-threatening symptoms of the virus.',
                    precautions: 'You should immediately seek an emergency room or call 911.',
                    nextSteps: 'Call 911 and visit an emergency room as soon as possible.',
                    danger: 100,
                })
                return setScreenIndex(7)
            }
        }
        return setScreenIndex(2)
    }  

    function FinishScreening() {
        history.push('/symptoms')
    }

    function CalculateResults() {
        const data = ({
            otherSymptoms: 0,
            severeSymptoms: 0,
            conditions: 0,
            vaccination: false, 
            contact: 0,
        });

        for (const val of Object.keys(symptomChecks)) {
            if (val === 'Fever' || val === 'Chills' || val === 'Cough' || val === 'Moderate Difficuly Breathing') {
                if (symptomChecks[val]) {
                    data.severeSymptoms++
                } 
            } else {
                if (symptomChecks[val]) {
                    data.otherSymptoms++
                }
            }
        }

        for (const val of Object.keys(conditionChecks)) {
            if (conditionChecks[val]) {
                data.conditions++
            }
        }
        for (const val of Object.keys(contactChecks)) {
            if (val === 'Recent Direct Contact with COVID-19') {
                if (contactChecks[val]) {
                    data.contact++
                }
            } else if (val === 'Positive Test Result') {
                if (contactChecks[val]) {
                    data.contact += 3
                }
            }
        }
        if (vaccinationChecks['Yes']) {
            data.vaccination = true
        }

        console.log(data)

        switch(data.conditions) {
            case 0:
                setRisk(messages['risk'].low)
                break
            case 1:
                console.log(data.conditions)
                setRisk(messages['risk'].medium)
                break
            default:
                console.log(data.conditions)
                setRisk(messages['risk'].high)
        }

        switch (data.vaccination) {
            case true: 
                setPrecautions(messages['precautions'].vacc)
                break
            default:
                setPrecautions(messages['precautions'].notVacc)
        }

        switch(data.severeSymptoms) {
            case 0: 
                switch(data.otherSymptoms) {
                    case 0:
                        setTestingAdvice(messages['testingAdvice'].low)
                        setNextSteps(messages['nextSteps'].low)
                        break
                    case 1:
                        setTestingAdvice(messages['testingAdvice'].low)
                        setNextSteps(messages['nextSteps'].low)
                        break
                    case 2:
                        setTestingAdvice(messages['testingAdvice'].low)
                        setNextSteps(messages['nextSteps'].low)
                        break
                    default:
                        setTestingAdvice(messages['testingAdvice'].medium)
                        setNextSteps(messages['nextSteps'].medium)
                }
                break
            case 1:
                switch(data.otherSymptoms) {
                    case 0:
                        setTestingAdvice(messages['testingAdvice'].low)
                        setNextSteps(messages['nextSteps'].low)
                        break
                    default:
                        setTestingAdvice(messages['testingAdvice'].medium)
                        setNextSteps(messages['nextSteps'].medium)
                        break
                }
                break
            case 2: 
                switch(data.otherSymptoms) {
                    case 0:
                        setTestingAdvice(messages['testingAdvice'].medium)
                        setNextSteps(messages['nextSteps'].medium)
                        break
                    case 1:
                        setTestingAdvice(messages['testingAdvice'].medium)
                        setNextSteps(messages['nextSteps'].medium)
                        break
                    default:
                        setTestingAdvice(messages['testingAdvice'].high)
                        setNextSteps(messages['nextSteps'].high)
        
                }
                break
            default:
                setTestingAdvice(messages['testingAdvice'].high)
                setNextSteps(messages['nextSteps'].high)

        }

        switch(data.contact) {
            case 0:
                break
            case 1:
                setTestingAdvice(messages['testingAdvice'].high)
                if (nextSteps !== messages['nextSteps'].high) {
                    setNextSteps(messages['nextSteps'].medium)
                }
                break
            default:
                setTestingAdvice(messages['testingAdvice'].high)
                setNextSteps(messages['nextSteps'].high)
                setPrecautions(messages['precautions'].hasIt)
        }

        setScreenIndex(6)
    }   

    useEffect(() => {
        if (testingAdvice !== '' && nextSteps !== '' && risk !== '' && precautions !== '') {
            let danger = 0

            nextSteps === messages['nextSteps'].high ? danger += 40 : (nextSteps === messages['nextSteps'].medium ? danger += 20 : danger += 0)
            risk === messages['risk'].high ? danger += 40 : (risk === messages['risk'].medium ? danger += 20 : danger += 0)
            precautions === messages['precautions'].hasIt ? danger = 100 : (precautions === messages['precautions'].notVacc ? danger += 20 : danger += 0)

            database.users.doc(currentUser.email).collection('screenings').add({
                date: date,
                submitted: new Date(),
                testingAdvice: testingAdvice,
                risk: risk,
                precautions: precautions,
                nextSteps: nextSteps,
                danger: danger,
                symptoms: symptomChecks,
                conditions: conditionChecks,
                vaccination: vaccinationChecks,
                contact: contactChecks
            })
        }
    }, [testingAdvice, nextSteps, risk, precautions, contactChecks, symptomChecks, vaccinationChecks, conditionChecks, currentUser.email, date])

    function GetScreen(index) {
        switch (index) {
            case 0:
                return  <Consent 
                            date={date} 
                            buttonText="Start screening"
                            clickNext={e => {e.preventDefault(); setScreenIndex(1)}}
                        />
            case 1:
                return  <Emergency 
                            date={date} 
                            buttonText="Next" 
                            setChecks={setEmergencyChecks} 
                            checks={emergencyChecks} 
                            clickNext={e => {e.preventDefault(); CheckEmergency()}}
                            clickBack={e => {e.preventDefault(); setScreenIndex(0)}}
                        />
            case 2:
                return  <Contact 
                            date={date} 
                            buttonText="Next" 
                            setChecks={setContactChecks} 
                            checks={contactChecks} 
                            clickNext={e => {e.preventDefault(); setScreenIndex(3)}}
                            clickBack={e => {e.preventDefault(); setScreenIndex(1)}}
                        />
            case 3:
                return  <Vaccination 
                            date={date} 
                            buttonText="Next" 
                            setChecks={setVaccinationChecks} 
                            checks={vaccinationChecks} 
                            clickNext={e => {e.preventDefault(); setScreenIndex(4)}}
                            clickBack={e => {e.preventDefault(); setScreenIndex(2)}}
                        />
            case 4:
                return  <Symptoms 
                            date={date} 
                            buttonText="Next" 
                            setChecks={setSymptomChecks} 
                            checks={symptomChecks} 
                            clickNext={e => {e.preventDefault(); setScreenIndex(5)}}
                            clickBack={e => {e.preventDefault(); setScreenIndex(3)}}
                        />
            case 5:
                return  <Conditions 
                            date={date} 
                            buttonText="Submit" 
                            setChecks={setConditionChecks} 
                            checks={conditionChecks} 
                            clickNext={e => {e.preventDefault(); CalculateResults()}}
                            clickBack={e => {e.preventDefault(); setScreenIndex(4)}}
                        />
            case 6:
                return  <Results 
                            date={date} 
                            clickNext={e => {e.preventDefault(); FinishScreening()}}
                            buttonText="Back to Screening Home" 
                            setChecks={setConditionChecks} 
                            data={{
                                testingAdvice,
                                nextSteps,
                                risk,
                                precautions
                            }}
                        />
            case 7:
                return  <EmergencyResults 
                            date={date} 
                            buttonText="Back to Screening Home" 
                            clickNext={e => {e.preventDefault(); FinishScreening()}}
                        />
            default:
                break
        }
        return (
            <div className="mx-auto grid grid-cols-7 gap-6 px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <div className="space-y-6 col-span-7 md:col-start-2 md:col-span-5">
                    <div className="flex-shrink-0">
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">New Screening in Progress</h1>
                        <p className="text-sm font-medium text-gray-400">
                            Started {' '}
                            on <time dateTime="2020-08-25">{date}</time>
                        </p>
                    </div>
                    {/* Description list*/}
                    <section aria-labelledby="applicant-information-title">
                        <div className="bg-white shadow rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                    Page Not Found
                                </h2>
                            </div>
                            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                <div className="flex flex-col justify-stretch">
                                    <Link
                                        to="/symptoms"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-550 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >Back to Screening Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

    useEffect(() => {
        document.title = 'New Screening - COVIDx Tracker'
    })

    return (
        <div className="relative min-h-screen bg-blue-450">
            <Nav current="symptoms"/>
            <main className="pt-5 pb-10">
                {/* Page header */}
                {GetScreen(screenIndex)}
                {screenIndex < 6 ?
                    <div className="flex justify-center mt-3 text-gray-500 text-sm">Page {screenIndex + 1} of 6</div> :
                    <div className="flex justify-center mt-3 text-gray-500 text-sm">Showing Results</div>
                }
            </main>
            <Footer />
        </div>
    )
}