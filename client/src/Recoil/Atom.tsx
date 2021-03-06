import { atom } from "recoil";
import { ChatInfoType, ErrorType, joinChatType, PersonInfoType, ProfileType, RequestType, TeamInfoType } from "../util/type";

export const userState = atom<PersonInfoType>({
  key: "user",
  default: {
    id: "",
    image: null,
    location: "",
    sex: "",
    age: 0,
    info: "",
    gid: null,
    idx: 0,
  },
});

export const teamState = atom<TeamInfoType>({
  key: "teamState",
  default: {
    id: "",
    image: null,
    location: "",
    sex: "",
    age: 0,
    info: "",
    leader: "",
    member: [],
  },
});

export const cowDogState = atom<ProfileType[]>({
  key: "cowDogState",
  default: [],
});

export const chatsState = atom<ChatInfoType[]>({
  key: "chatState",
  default: [],
});

export const requestState = atom<RequestType[]>({
  key: "requestState",
  default: [],
});

export const joinChatRoomState = atom<joinChatType[]>({
  key: "joinChatRoomState",
  default: [],
});

export const requestTarget = atom<ProfileType>({
  key: "requestTarget",
  default: {
    id: "",
    image: null,
    location: "",
    sex: "",
    age: 0,
    info: "",
    gid: null,
    idx: 0,
  },
});

export const profileModalDatas = atom<ProfileType[]>({
  key: "profileModalDatas",
  default: [],
});

export const chatTarget = atom<ChatInfoType>({
  key: "chatTargets",
  default: {
    chatRoomId: 0,
    member: [],
    chatMessage: [],
  },
});

export const errorState = atom<ErrorType>({
  key: "errorState",
  default: {
    errorStr: "",
    timeOut: 2000,
  },
});
