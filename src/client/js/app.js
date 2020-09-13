import { $, show, hide, inputNotValid } from './utils';
import environment from './environment';

export default () => {
  const loader = $('#loader');

  const textInput = $('#text');
  const analyzeBtn = $('#analyze-btn');

  const analysisContainer = $('#analysis-container');
  const confidenceInput = $('#confidence');
  const scoreInput = $('#score');
  const agreementInput = $('#agreement');
  const subjectivityInput = $('#subjectivity');
  const ironyInput = $('#irony');

  const isProd = environment.MODE === 'PROD';

  async function analyseText(e) {
    try {
      if (inputNotValid(textInput)) {
        throw new Error('Validation error: input not valid');
      }
      e.preventDefault();
      show(loader);
      const escapedText = escape(textInput.value)
      const analysisRequest = await getSentimentAnalysis(escapedText);
      const analysisResponse = await manageRequestResponse(analysisRequest,
        (request) => {
          if (request.status === 400) {
            alert('Bad input');
          }
        }
      );
      renderResponse(analysisResponse);
      show(analysisContainer);
    } catch (e) {
      alert('Something went wrong :(')
    } finally {
      hide(loader)
    }

    function getSentimentAnalysis(text) {
      return fetch(`${environment.APIURL}?text=${text}`, {
        mode: isProd ? 'same-origin' : 'cors'
      });
    }

    async function manageRequestResponse(pendingRequest, errorHandler = null) {
      if (!pendingRequest.ok) {
        if (errorHandler) {
          errorHandler(pendingRequest);
        }
        throw new Error(`Request failed: ${pendingRequest.status}`);
      }
      const payload = await pendingRequest.json();
      return payload.data;
    }

    function renderResponse(response) {
      confidenceInput.innerText = response.confidence;
      scoreInput.innerText = response.score_tag;
      agreementInput.innerText = response.agreement.toLowerCase();
      subjectivityInput.innerText = response.subjectivity.toLowerCase();
      ironyInput.innerText = response.irony.toLowerCase();
    }
  }
  analyzeBtn.addEventListener('click', analyseText);
}
