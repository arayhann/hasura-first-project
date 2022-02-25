"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhoto = exports.login = exports.getProfile = exports.createAdmin = exports.createUser = void 0;
const functions = require("firebase-functions");
const createUser_1 = require("./createUser");
const getProfile_1 = require("./getProfile");
const login_1 = require("./login");
const uploadPhoto_1 = require("./uploadPhoto");
const admin = require("firebase-admin");
const createAdmin_1 = require("./createAdmin");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
if (((_b = (_a = functions.config()) === null || _a === void 0 ? void 0 : _a.hasura) === null || _b === void 0 ? void 0 : _b.env) === "local") {
    const serviceAccount = require("../serviceAccountKey.json");
    adminConfig.credential = admin.credential.cert(serviceAccount);
}
admin.initializeApp(adminConfig);
exports.createUser = functions.https.onRequest(createUser_1.createUserHandler);
exports.createAdmin = functions.https.onRequest(createAdmin_1.createAdminHandler);
exports.getProfile = functions.https.onRequest(getProfile_1.getProfileHandler);
exports.login = functions.https.onRequest(login_1.loginHandler);
exports.uploadPhoto = functions.https.onRequest(uploadPhoto_1.uploadPhotoHandler);
//# sourceMappingURL=index.js.map