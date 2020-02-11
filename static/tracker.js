var ORDER = 1;
var SESSION_ID = "";

export function track(page, action, meta={}) {
    meta.descriptor = 'mvp';
    // FIXME
    meta.dev = true;
    console.log(page, action, meta);
    
    fetch('https://andi.beta.gouv.fr/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(computeRequestBody(page, action, meta)),
    })
}


export const Steps = {
    ARRIVAL: 'arrival',
    DEPART: 'departure',
    MAILTO: 'mailto',
    LINKTO: 'linkto',
    BILAN: 'bilan',
    TO_MATCHING: 'to_matching',
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
        session_id: SESSION_ID,
        page: page,
        action: action,
        meta: meta,
        client_context: {},
        server_context: {}
    }
    }
