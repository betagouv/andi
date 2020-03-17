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
    TO_SUMMARY: 'to_summary',
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


function computeRequestBody(page, action, metaIn) {
    const timeNow = new Date();
    const meta = Object.assign(metaIn, getUrlMeta());

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
        if (typeof document !== `undefined`) {
            SESSION_ID = (new URL(document.location)).searchParams.get('sid') || uuidv4();
        }
        else {
            SESSION_ID = uuidv4();
        }
        uuidv4();
    return SESSION_ID;
}

function getUrlMeta() {
    // Avoid using JSON and interpreting user-provided values
    var meta = {};
    const doc = typeof document !== `undefined` ? document : null;
    try {
        const check = (new URL(doc.location)).searchParams.get('t');
        const split1 = check.split(';');
        for (var tuple of split1) {
            const keyval = tuple.split(':');
            const key = keyval[0].replace(/[^\-_0-9a-zA-Z]/g,'');
            const val = keyval[1].replace(/[^\-_0-9a-zA-Z]/g,'');
            meta[key] = val;
        }
    } finally {
        return meta;
    }
}
