import * as functions from 'firebase-functions';
import { createUserHandler } from './createUser';
import { getProfileHandler } from './getProfile';
import { loginHandler } from './login';
import { uploadPhotoHandler } from './uploadPhoto';
import * as admin from "firebase-admin";
import { createAdminHandler } from './createAdmin';



const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG as string);

if (functions.config()?.hasura?.env === "local") {
  const serviceAccount = require("../serviceAccountKey.json");
  adminConfig.credential = admin.credential.cert(serviceAccount);
}

admin.initializeApp(adminConfig);

export const createUser = functions.https.onRequest(createUserHandler);
export const createAdmin = functions.https.onRequest(createAdminHandler);
export const getProfile = functions.https.onRequest(getProfileHandler);
export const login = functions.https.onRequest(loginHandler);
export const uploadPhoto = functions.https.onRequest(uploadPhotoHandler);