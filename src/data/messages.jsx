const messages = {
    'testingAdvice': {
        already: 'In your current situation, there is no need to get a COVID-19 test.',
        low: 'In your current situation, there is no need to get a COVID-19 test as it is unlikely that you have the virus.',
        medium: 'Based off of your data, there is a possibility that you could be carrying the virus. Thus, you should get a COVID-19 test soon.',
        high: 'Based off of your responses, there is a large chance that you could be carrying the virus. Thus, you should get a COVID-19 test as soon as possible.'
    },
    'risk': {
        low: 'Based off of your pre-existing conditions, you are not at risk of getting severely ill from the virus.',
        medium: 'Based off of your pre-existing conditions, you may be at risk of getting severely ill from the virus. Because of this, you should take extra precautions to ensure you do not catch the virus.',
        high: 'Based off of your pre-existing conditions, you are at a definite risk of getting severely ill from the virus. Because of this, you should take extra precautions to ensure you do not catch the virus.',
    },
    'precautions': {
        hasIt: 'You should self-quarantine until you receive two negative COVID-19 tests. Do not leave your home until you are unable to spread the virus.',
        vacc: 'When in public, make sure to wear a mask and maintain social distancing when possible.',
        notVacc: 'You should receive a COVID-19 vaccination as soon as possible if you have not done so already. When in public, make sure to wear a mask and maintain social distancing.',
    },
    'nextSteps': {
        low: 'Based off of your symptoms, it is unlikely that you have COVID-19. You should continue to follow standard precautions as listed above. If you begin to feel symptoms, use this tool again or contact your health provider.',
        medium: 'Based off of your symptoms, you may have COVID-19. You should self-quarantine until you receive a negative COVID-19 tests. Avoid contact with any other individuals to ensure that you may not spread the virus.',
        high: 'Based off of your symptoms, you likely have COVID-19. You should self-quarantine until you receive two negative COVID-19 tests. Avoid contact with any other individuals to ensure that you will not spread the virus.',
    }
}

export default messages;