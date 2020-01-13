Live App: https://healthix-hl7-self-testing-tool.herokuapp.com/

PROJECT DESCRIPTION:
This is an app I developed using React to assist my company with conducting testing of HL7 formatted patient data to verify that it meets standard specifications. This app also features the ability to generate a sample well-formatted message, as well as allow the user to de-identify PHI (personal health information) to comply with HIPAA.

As the user pastes their own HL7 message, or modifies the sample HL7 message, the application automatically re-renders and validates the input to generate a score as well as provide feedback to the user in real time. For example, if the gender field is not an accepted value (e.g. "33"), then 2 points are deducted from the total score and the user is notified which segment and field number they have to resolve in order to improve the quality of their message.
