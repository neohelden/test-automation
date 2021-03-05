const token = pm.response.json().token;
const locale = "de-DE";
let replyId = null;
// TODO 1. INSERT WORKSPACE NAME HERE
const workspace = "[WORKSPACE_NAME]";

// TODO 2. ADD TEST CASES HERE
async function main() {
  let particle;

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
    replyId: replyId ? replyId : ""
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
const checkRespOk = () => {
  pm.test("Response should be okay to process", function () {
    pm.response.to.not.be.error;
    pm.response.to.have.status(199);
  });
};

// Do not remove the lines down below; required for async tests
const interval = setTimeout(() => {}, 50000);
main().then(() => {
  console.log("Completely done! 🚀");
  clearTimeout(interval);
});
