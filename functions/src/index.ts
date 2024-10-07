import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { getFunctions } from "firebase-admin/functions";
import { onTaskDispatched } from "firebase-functions/v2/tasks";
import * as logger from "firebase-functions/logger";

// Initialize the Firebase app
admin.initializeApp();

// The task function
export const testOnRequest = onRequest(async (request, response) => {
  const taskPayload = {
    foo: "bar",
  };
  const targetUri =
    "projects/demo-project/locations/us-central1/functions/testOnTaskDispatched"; // <-- This does NOT work :(
  // const targetUri = "locations/us-central1/functions/testOnTaskDispatched"; // <-- This does NOT work :(
  // const targetUri = "testOnTaskDispatched"; // <-- This works :)
  const queue = getFunctions().taskQueue(targetUri);

  try {
    await queue.enqueue(taskPayload);
  } catch (error) {
    console.error("Error scheduling task", error);
    response.status(500).send("Error scheduling task");
    return;
  }
  response.send("Hello from HTTP ON REQUEST!");
});

// The http functions
export const testOnTaskDispatched = onTaskDispatched((request) => {
  logger.info("Hello logs from TASKS ON TASK DISPATCHED!", {
    foo: request.data,
  });
});
