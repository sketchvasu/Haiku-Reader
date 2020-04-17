/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Haiku Reader';
const GET_FACT_MESSAGE = 'I have a haiku for you: ';
const HELP_MESSAGE = 'You can say tell me a haiku...  or, you can say stop... What can I help you with?';
const HELP_REPROMPT = 'You can ask me to tell a haiku or exit to stop. What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  `A world of dew.
And within every dewdrop.
A world of struggle`,

  `Carefree raindrops drop. 
Racing on my windowpanes.
Drip drop They fall down`,

  `Over the wintry.
  Forest winds howl in rage.
  with no leaves to blow`,
 
 `Blowing from the west.
 Fallen leaves gather.
 In the east`,
 
 `A summer river being crossed.
 How pleasing.
 with sandals in my hands `,
 
 `A beautiful bird.
 Feels free and proud in the sky.
 Flies like an angel`,
 
 `An old silent pond.
 A frog jumps into the pond.
 Splash silence again`,
 
 `I write erase rewrite.
 Erase again and then.
 A poppy blooms`,
 
 `Love between us is.
 Speech and breath Loving you is.
 A long river running`,
 
 `Funny fluffy cloud.
 Making faces in the sky.
 Whoosh it fades away`,
 
 `Bright summer morning.
 A happy Rayaansh roars.
 After Suryansh`,
 
 `Magic of winter.
 Somehow a chill in the air.
 Brings warmth to our hearts.`
];

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
