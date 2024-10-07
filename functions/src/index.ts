import * as admin from "firebase-admin";
import { testOnRequest } from "./test-http";
import { testOnTaskDispatched } from "./test-task";

// Initialize the Firebase app
admin.initializeApp();

// Export the functions after initialization
export { testOnRequest, testOnTaskDispatched };
