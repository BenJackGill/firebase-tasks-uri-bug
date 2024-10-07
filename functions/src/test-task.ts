import { onTaskDispatched } from "firebase-functions/v2/tasks";
import * as logger from "firebase-functions/logger";

export const testOnTaskDispatched = onTaskDispatched((request) => {
  logger.info("Hello logs from TASKS ON TASK DISPATCHED!", {
    foo: request.data,
  });
});
