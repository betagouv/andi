var ORDER = 1;
var SESSION_ID = "";

export function track(page, action, meta={}) {
    meta.descriptor = 'mvp';
    meta.dev = process.env.GATSBY_ACTIVE_ENV !== 'prod';
    const body = computeRequestBody(page, action, meta);
    
    if (typeof window !== 'undefined'   ) {
        fetch('https://andi.beta.gouv.fr/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
    }
}


export const Steps = {
    ARRIVAL: 'arrival',
    DEPART: 'departure',
    MAILTO: 'mailto',
    LINKTO: 'linkto',
    BILAN: 'bilan',
    BUTTON_CLICK: 'button_click',
    TO_MATCHING: 'to_matching',
    TO_SERVICE: 'to_service',
    QUESTION_ARRIVAL: 'question_arrival',
    QUESTION_DEPARTURE: 'question_departure',
    QUESTION_RESPONSE: 'question_response',
    MATCHING_SEARCH: 'matching_search',
    MATCHING_RESULTS: 'matching_results',
    MATCHING_ERROR: 'matching_error',
    MORE_RESULTS: 'more_results',
    RESULT_CLICK: 'result_click',
    GUIDANCE_CLICK: 'guidance_click'
}


function computeRequestBody(page, action, meta) {
    const timeNow = new Date();

    return {
        _v:1,
        timestamp: timeNow.toISOString(),
        order: ORDER += 1,
        session_id: getSessionId(),
        page: page,
        action: action,
        meta: JSON.stringify(meta),
        client_context: {},
        server_context: {}
    }
}


function uuidv4() {
  try {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ ( crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
      );
  } catch {
      return 'ANONYMOUS';
  }
}

export function getSessionId() {
    if (SESSION_ID === "")
        SESSION_ID =  uuidv4();
    return SESSION_ID;
}
