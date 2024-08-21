import { io } from "socket.io-client";
import { IP } from "../utils/consts";

export const socket = io(`${IP}`);
