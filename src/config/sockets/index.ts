import socketIOClient from "socket.io-client";

const socket = socketIOClient(
  process.env.NEXT_PUBLIC_SOCKET_ENDPOINT as string
);

// const socket = socketIOClient("https://nft.gloo.me/api");

export default socket;
