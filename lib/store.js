import { asyncThunkCreator, configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, compose } from "redux";
import { loginReducer, registerReducer } from "./features/auth/authSlice";
import sidebarSlice from "./features/sidebarSlice";
import loaderSlice from "./features/loaderSlice";

import { ProfileReducer } from "./features/profile/profileSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";


import { ChatReducer } from "./features/studentchat/studentchat";
import { GetSingleChat } from "./features/studentchat/singlechatSlice";
import { TutorchatReducer } from "./features/tutorchat/tutorchatSlice";
import { SinglestudentchatReducer } from "./features/tutorchat/singlestudentchatSlice";
import { SelectedChatReducer } from "./features/selectedchat/Selectedchatidslice";
import { FortutorMergedArrayReducer } from "./features/studentchat/updateMergedStudentSlice";
import { messageCountsReducer } from "./features/studentchat/messagecountSlice";
import { MergedtutorMessageReducer } from "./features/tutorchat/updateMergedTutorSlice";
import { SelectedChatByStudentReducer } from "./features/selectedchat/selectedchatidbystudentslice";

const reducers = combineReducers({
  registerUserData: registerReducer,
  loginUserData: loginReducer,
  sidebarToggle: sidebarSlice,
  loader: loaderSlice,
  profile: ProfileReducer,
  createdchats: ChatReducer,
  singlechat: GetSingleChat,
  studentchats: TutorchatReducer,
  singlestudentchat: SinglestudentchatReducer,
  TutorChat: TutorchatReducer,
  SelectedChatId: SelectedChatReducer,
  SelectedChatByStudentReducer: SelectedChatByStudentReducer,
  Mergedfortutor: MergedtutorMessageReducer,
  tutorMergedMesage: FortutorMergedArrayReducer,
  messageCounts: messageCountsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "createdchats",
    "singlechat",
    "loginUserData",
    "tutorMergedMesage",
    "messageCounts",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({ reducer: persistedReducer });
const persistor = persistStore(store);

export { store, persistor };
