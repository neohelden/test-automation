const token = pm.response.json().token;
const locale = "de-DE";
let replyId = null;
// let particle = null; // TODO this ok as global?

// TODO 1. INSERT WORKSPACE NAME HERE
const workspace = "[WORKSPACE_NAME]";

async function main() {
  let particle;

  // TODO 2. ADD TEST CASES HERE

  return "Done";
}

/**
 * !---------------------------------------!
 * WARNING: DO NOT EDIT THE CODE CODE BELOW
 * !---------------------------------------!
 */

const message = async (msg) => {
  return sendRequest({
    type: "message",
    message: msg,
    locale: locale,
  });
};

const reply = async (msg) => {
  return sendRequest({
    type: "reply",
    message: msg,
    locale: locale,
    replyId: replyId ? replyId : "", // TODO test this
  });
};

const action = async (action, data) => {
  return sendRequest({
    type: "action",
    action: action,
    data: data,
    locale: locale,
  });
};

const sendRequest = async (payload) => {
  console.log("payload", payload);
  replyId = null;
  return new Promise((resolve, reject) => {
    pm.sendRequest(
      {
        method: "POST",
        url: `https://${workspace}.neohelden.com/api/v1/particle`,
        header: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: {
          mode: "raw",
          raw: JSON.stringify(payload),
        },
      },
      (err, response) => {
        if (err) reject(err);
        // TODO test whether this all legit
        let rspJson = response.json();
        if (rspJson.response.replyId) {
          replyId = rspJson.response.replyId;
        }
        console.log(rspJson);
        resolve(rspJson);
      }
    );
  });
};

/**
 * Check that the response is ok
 */
const isResponseOk = () => {
  pm.test("Response should be okay to process", function () {
    pm.response.to.not.be.error;
    pm.response.to.have.status(200);
  });
};

// --- TODO BELOW ---

// TODO checkHandshake?

// TODO remove needed index, make it optional(default parameters or args?) nad use asserts to search array -> Check whether element in array

/**
 * Check for an expected content type
 * @param contentType {String} - type: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download
 * @param particle {Object} - to check for
 * @param contentIndex {int} - index of the content to check the type for. Default: 0
 */
const isContentType = (contentType, particle, contentIndex) => {
  if (!contentIndex) contentIndex = 0;

  pm.test(`Check for content type ${contentType}`, () => {
    pm.expect(particle.response.content[contentIndex].type).to.be.a("string");
    pm.expect(particle.response.content[contentIndex].type).to.include(
      contentType
    );
  });
};

/**
 * Check for an expected directive
 * @param directiveType {String} - type:url.open, email.compose, phone.call, clipboard.copy, audio.play
 * @param particle {Object} - to check for
 * @param directiveIndex {int} - index of the directive to check the type for. Default: 0
 */
const isDirective = (directiveType, particle, directiveIndex) => {
  if (!contentIndex) contentIndex = 0;

  pm.test(`Check for directive ${directiveType}`, () => {
    pm.expect(particle.response.directives[directiveIndex].type).to.be.a(
      "string"
    );
    pm.expect(particle.response.directives[directiveIndex].type).to.include(
      directiveType
    );
  });
};

/**
 * Check for particle content to contain specific data
 * @param particle {Object} to check for
 * @param index {int} - index of the content to check the data for. Default: 0
 * @param dataToCheck {Object} - with key:values to check in the data response
 */
const containsContentData = (particle, index, dataToCheck) => {
  checkData(particle, index, dataToCheck, "content");
};

/**
 * Check for particle directive to contain specific data
 * @param particle {Object} to check for
 * @param index {int} - index of the directive to check the data for. Default: 0
 * @param dataToCheck {Object} - with key:values to check in the data response
 */
const containsDirectiveData = (particle, index, dataToCheck) => {
  checkData(particle, index, dataToCheck, "directive");
};

// --- TODO ABOVE ---

/**
 * Check for particle to contain specific suggestion attributes
 * @param particle {Object} - to check for
 * @param label {String} - to check
 * @param value {String} - to check
 * @param style {String} - to check. One of: default, good, warning, alert, highlight
 */
const containsSuggestion = (
  particle,
  label = null,
  value = null,
  style = null
) => {
  const { suggestions } = particle.response;
  pm.test(`Check for suggestion values.`, () => {
    if (label) {
      expect(suggestions.map((suggestion) => suggestion["label"])).includes(
        label
      );
    }
    if (value) {
      expect(suggestions.map((suggestion) => suggestion["value"])).includes(
        value
      );
    }
    if (style) {
      expect(suggestions.map((suggestion) => suggestion["style"])).includes(
        style
      );
    }
  });
};

// TODO add optional values? https://jsdoc.app/tags-param.html

/**
 * Check for particle to contain specific reprompt attributes
 * @param particle {Object} - to check for
 * @param typeToCheck {String} - of the reprompt
 * @param hintToCheck {String} - for the reprompt
 * @param patternToCheck {String} - to check. One of: text, number, email, tel, color, date, month, password, time, url, hidden
 */
const containsReprompt = (
  particle,
  typeToCheck = null,
  hintToCheck = null,
  patternToCheck = null
) => {
  const { type, hint, pattern } = particle.response.reprompt;

  pm.test(`Check for reprompt values.`, () => {
    if (typeToCheck) {
      expect(type).to.include(typeToCheck);
    }
    if (hintToCheck) {
      expect(hint).to.include(hintToCheck);
    }
    if (patternToCheck) {
      expect(pattern).to.include(patternToCheck);
    }
  });
};

/**
 * Check for particle to contain specific sticky attributes
 * @param particle {Object} - to check for
 * @param typeToCheckFor {String} - of the sticky: One of: upload, json, adaptivecard, plain, html, media, map, expandable, camera, image, download
 * @param dataToCheckFor {Object} - for the sticky
 */
const containsReprompt = (
  particle,
  typeToCheckFor = null,
  dataToCheckFor = null
) => {
  const { type, data } = particle.response.sticky;

  pm.test(`Check for sticky values.`, () => {
    if (typeToCheck) {
      expect(type).to.include(typeToCheck);
    }
    if (dataToCheckFor) {
      expect(data).to.include(dataToCheckFor);
    }
  });
};

/**
 * Helper function to check for data in particle attribute
 * @params type {String} - Type of attribute to check: content, directive, suggestion, reprompt,...TODO add missing
 * See docs there for params explanation
 */
const checkData = (particle, index, dataToCheck, type) => {
  if (!index) index = 0;

  // Just form validate params
  pm.test(`Check for objects as parameters`, () => {
    pm.expect(particle).to.be.an("object");
    pm.expect(dataToCheck).to.be.an("object");
  });

  const data =
    type === "content"
      ? particle.response.content[index].data
      : particle.response.directives[index].data;

  // Check that each key exists & that it satisfies it's value
  for (const key in dataToCheck) {
    if (Object.hasOwnProperty.call(dataToCheck, key)) {
      const value = dataToCheck[key];

      pm.test(`Check for data to include ${key}:${value}`, () => {
        pm.expect(data).to.have.property(key);
        pm.expect(key).to.include(value);
      });
    }
  }
};

// Do not remove the lines down below; required for async tests
const interval = setTimeout(() => {}, 50000);
main().then(() => {
  console.log("Completely done! 🚀");
  clearTimeout(interval);
});
