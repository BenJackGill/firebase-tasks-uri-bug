import { onRequest } from "firebase-functions/v2/https";
import { getFunctions } from "firebase-admin/functions";

export const testOnRequest = onRequest(async (request, response) => {
  const taskPayload = {
    foo: "bar",
  };
  const targetUri = "testOnTaskDispatched"; // <-- This works :)
  // const targetUri = "locations/us-central1/functions/testOnTaskDispatched"; // <-- This does NOT work :(
  // const targetUri =
  //  "projects/demo-project/locations/us-central1/functions/testOnTaskDispatched"; // <-- This does NOT work :(
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
