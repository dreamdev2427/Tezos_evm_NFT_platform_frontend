/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { NFT, NFTInterface } from "../NFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getCollectionAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getTokenRoyalty",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "metaHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "royalty_",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "collectionAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620022ce380380620022ce833981016040819052620000349162000246565b828262000041336200009d565b6001805581516200005a906002906020850190620000ed565b50805162000070906003906020840190620000ed565b5050600d80546001600160a01b0319166001600160a01b0393909316929092179091555062000322915050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b828054620000fb90620002cf565b90600052602060002090601f0160209004810192826200011f57600085556200016a565b82601f106200013a57805160ff19168380011785556200016a565b828001600101855582156200016a579182015b828111156200016a5782518255916020019190600101906200014d565b50620001789291506200017c565b5090565b5b808211156200017857600081556001016200017d565b600082601f830112620001a4578081fd5b81516001600160401b0380821115620001c157620001c16200030c565b604051601f8301601f19908116603f01168101908282118183101715620001ec57620001ec6200030c565b8160405283815260209250868385880101111562000208578485fd5b8491505b838210156200022b57858201830151818301840152908201906200020c565b838211156200023c57848385830101525b9695505050505050565b6000806000606084860312156200025b578283fd5b83516001600160401b038082111562000272578485fd5b620002808783880162000193565b9450602086015191508082111562000296578384fd5b50620002a58682870162000193565b604086015190935090506001600160a01b0381168114620002c4578182fd5b809150509250925092565b600181811c90821680620002e457607f821691505b602082108114156200030657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b611f9c80620003326000396000f3fe60806040526004361061016a5760003560e01c80634f6ccce7116100d15780638da5cb5b1161008a578063b88d4fde11610064578063b88d4fde14610463578063c87b56dd14610483578063e985e9c5146104a3578063f2fde38b146104ec57600080fd5b80638da5cb5b1461041057806395d89b411461042e578063a22cb4651461044357600080fd5b80634f6ccce71461034e5780636352211e1461036e57806370a082311461038e578063715018a6146103ae5780637af1388c146103c3578063833b7b78146103e357600080fd5b806323b872dd1161012357806323b872dd146102645780632a55205a146102845780632f745c59146102c3578063333671a4146102e35780633ccfd60b1461031957806342842e0e1461032e57600080fd5b806301ffc9a71461017657806306fdde03146101ab578063081812fc146101cd578063095ea7b3146102055780630ee2cb101461022757806318160ddd1461024557600080fd5b3661017157005b600080fd5b34801561018257600080fd5b50610196610191366004611b8e565b61050c565b60405190151581526020015b60405180910390f35b3480156101b757600080fd5b506101c061056d565b6040516101a29190611d1b565b3480156101d957600080fd5b506101ed6101e8366004611c4a565b6105ff565b6040516001600160a01b0390911681526020016101a2565b34801561021157600080fd5b50610225610220366004611b65565b610626565b005b34801561023357600080fd5b50600d546001600160a01b03166101ed565b34801561025157600080fd5b50600a545b6040519081526020016101a2565b34801561027057600080fd5b5061022561027f366004611a1b565b610741565b34801561029057600080fd5b506102a461029f366004611c62565b610772565b604080516001600160a01b0390931683526020830191909152016101a2565b3480156102cf57600080fd5b506102566102de366004611b65565b6107b0565b3480156102ef57600080fd5b506101ed6102fe366004611c4a565b6000908152601060205260409020546001600160a01b031690565b34801561032557600080fd5b50610225610846565b34801561033a57600080fd5b50610225610349366004611a1b565b6108ac565b34801561035a57600080fd5b50610256610369366004611c4a565b6108c7565b34801561037a57600080fd5b506101ed610389366004611c4a565b610968565b34801561039a57600080fd5b506102566103a93660046119d8565b6109c8565b3480156103ba57600080fd5b50610225610a4e565b3480156103cf57600080fd5b506102256103de366004611bc6565b610a62565b3480156103ef57600080fd5b506102566103fe366004611c4a565b6000908152600f602052604090205490565b34801561041c57600080fd5b506000546001600160a01b03166101ed565b34801561043a57600080fd5b506101c0610b2f565b34801561044f57600080fd5b5061022561045e366004611b2b565b610b3e565b34801561046f57600080fd5b5061022561047e366004611a56565b610b4d565b34801561048f57600080fd5b506101c061049e366004611c4a565b610b85565b3480156104af57600080fd5b506101966104be3660046119f2565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b3480156104f857600080fd5b506102256105073660046119d8565b610b90565b60006001600160e01b031982166380ac58cd60e01b148061053d57506001600160e01b0319821663780e9d6360e01b145b8061055857506001600160e01b0319821663152a902d60e11b145b80610567575061056782610c06565b92915050565b60606002805461057c90611ea4565b80601f01602080910402602001604051908101604052809291908181526020018280546105a890611ea4565b80156105f55780601f106105ca576101008083540402835291602001916105f5565b820191906000526020600020905b8154815290600101906020018083116105d857829003601f168201915b5050505050905090565b600061060a82610c2b565b506000908152600660205260409020546001600160a01b031690565b600061063182610968565b9050806001600160a01b0316836001600160a01b031614156106a45760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806106c057506106c081336104be565b6107325760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161069b565b61073c8383610c8a565b505050565b61074b3382610cf8565b6107675760405162461bcd60e51b815260040161069b90611dc8565b61073c838383610d77565b600d546000838152600f60205260408120546001600160a01b039092169160649061079d9085611e42565b6107a79190611e2e565b90509250929050565b60006107bb836109c8565b821061081d5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b606482015260840161069b565b506001600160a01b03919091166000908152600860209081526040808320938352929052205490565b600d546001600160a01b031633146108705760405162461bcd60e51b815260040161069b90611d80565b600d546040516001600160a01b03909116904780156108fc02916000818181858888f193505050501580156108a9573d6000803e3d6000fd5b50565b61073c83838360405180602001604052806000815250610b4d565b60006108d2600a5490565b82106109355760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b606482015260840161069b565b600a828154811061095657634e487b7160e01b600052603260045260246000fd5b90600052602060002001549050919050565b6000818152600460205260408120546001600160a01b0316806105675760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161069b565b60006001600160a01b038216610a325760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161069b565b506001600160a01b031660009081526005602052604090205490565b610a56610f1e565b610a606000610f78565b565b600d546001600160a01b03163314610a8c5760405162461bcd60e51b815260040161069b90611d80565b610a9a600e80546001019055565b6000610aa5600e5490565b9050610ab13382610fc8565b610af18186868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061111692505050565b6000908152600f6020908152604080832094909455601090529190912080546001600160a01b0319166001600160a01b039092169190911790555050565b60606003805461057c90611ea4565b610b493383836111b0565b5050565b610b573383610cf8565b610b735760405162461bcd60e51b815260040161069b90611dc8565b610b7f8484848461127f565b50505050565b6060610567826112b2565b610b98610f1e565b6001600160a01b038116610bfd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161069b565b6108a981610f78565b60006001600160e01b0319821663780e9d6360e01b14806105675750610567826113bb565b6000818152600460205260409020546001600160a01b03166108a95760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604482015260640161069b565b600081815260066020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610cbf82610968565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610d0483610968565b9050806001600160a01b0316846001600160a01b03161480610d4b57506001600160a01b0380821660009081526007602090815260408083209388168352929052205460ff165b80610d6f5750836001600160a01b0316610d64846105ff565b6001600160a01b0316145b949350505050565b826001600160a01b0316610d8a82610968565b6001600160a01b031614610dee5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161069b565b6001600160a01b038216610e505760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161069b565b610e5b83838361140b565b610e66600082610c8a565b6001600160a01b0383166000908152600560205260408120805460019290610e8f908490611e61565b90915550506001600160a01b0382166000908152600560205260408120805460019290610ebd908490611e16565b909155505060008181526004602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000546001600160a01b03163314610a605760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161069b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b03821661101e5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161069b565b6000818152600460205260409020546001600160a01b0316156110835760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161069b565b61108f6000838361140b565b6001600160a01b03821660009081526005602052604081208054600192906110b8908490611e16565b909155505060008181526004602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600460205260409020546001600160a01b03166111915760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b606482015260840161069b565b6000828152600c60209081526040909120825161073c92840190611923565b816001600160a01b0316836001600160a01b031614156112125760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161069b565b6001600160a01b03838116600081815260076020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b61128a848484610d77565b61129684848484611416565b610b7f5760405162461bcd60e51b815260040161069b90611d2e565b60606112bd82610c2b565b6000828152600c6020526040812080546112d690611ea4565b80601f016020809104026020016040519081016040528092919081815260200182805461130290611ea4565b801561134f5780601f106113245761010080835404028352916020019161134f565b820191906000526020600020905b81548152906001019060200180831161133257829003601f168201915b50505050509050600061136d60408051602081019091526000815290565b9050805160001415611380575092915050565b8151156113b257808260405160200161139a929190611caf565b60405160208183030381529060405292505050919050565b610d6f84611523565b60006001600160e01b031982166380ac58cd60e01b14806113ec57506001600160e01b03198216635b5e139f60e01b145b8061056757506301ffc9a760e01b6001600160e01b0319831614610567565b61073c838383611597565b60006001600160a01b0384163b1561151857604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061145a903390899088908890600401611cde565b602060405180830381600087803b15801561147457600080fd5b505af19250505080156114a4575060408051601f3d908101601f191682019092526114a191810190611baa565b60015b6114fe573d8080156114d2576040519150601f19603f3d011682016040523d82523d6000602084013e6114d7565b606091505b5080516114f65760405162461bcd60e51b815260040161069b90611d2e565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610d6f565b506001949350505050565b606061152e82610c2b565b600061154560408051602081019091526000815290565b905060008151116115655760405180602001604052806000815250611590565b8061156f8461164f565b604051602001611580929190611caf565b6040516020818303038152906040525b9392505050565b6001600160a01b0383166115f2576115ed81600a80546000838152600b60205260408120829055600182018355919091527fc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a80155565b611615565b816001600160a01b0316836001600160a01b031614611615576116158382611769565b6001600160a01b03821661162c5761073c81611806565b826001600160a01b0316826001600160a01b03161461073c5761073c82826118df565b6060816116735750506040805180820190915260018152600360fc1b602082015290565b8160005b811561169d578061168781611edf565b91506116969050600a83611e2e565b9150611677565b60008167ffffffffffffffff8111156116c657634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156116f0576020820181803683370190505b5090505b8415610d6f57611705600183611e61565b9150611712600a86611efa565b61171d906030611e16565b60f81b81838151811061174057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350611762600a86611e2e565b94506116f4565b60006001611776846109c8565b6117809190611e61565b6000838152600960205260409020549091508082146117d3576001600160a01b03841660009081526008602090815260408083208584528252808320548484528184208190558352600990915290208190555b5060009182526009602090815260408084208490556001600160a01b039094168352600881528383209183525290812055565b600a5460009061181890600190611e61565b6000838152600b6020526040812054600a805493945090928490811061184e57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080600a838154811061187d57634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255828152600b9091526040808220849055858252812055600a8054806118c357634e487b7160e01b600052603160045260246000fd5b6001900381819060005260206000200160009055905550505050565b60006118ea836109c8565b6001600160a01b039093166000908152600860209081526040808320868452825280832085905593825260099052919091209190915550565b82805461192f90611ea4565b90600052602060002090601f0160209004810192826119515760008555611997565b82601f1061196a57805160ff1916838001178555611997565b82800160010185558215611997579182015b8281111561199757825182559160200191906001019061197c565b506119a39291506119a7565b5090565b5b808211156119a357600081556001016119a8565b80356001600160a01b03811681146119d357600080fd5b919050565b6000602082840312156119e9578081fd5b611590826119bc565b60008060408385031215611a04578081fd5b611a0d836119bc565b91506107a7602084016119bc565b600080600060608486031215611a2f578081fd5b611a38846119bc565b9250611a46602085016119bc565b9150604084013590509250925092565b60008060008060808587031215611a6b578081fd5b611a74856119bc565b9350611a82602086016119bc565b925060408501359150606085013567ffffffffffffffff80821115611aa5578283fd5b818701915087601f830112611ab8578283fd5b813581811115611aca57611aca611f3a565b604051601f8201601f19908116603f01168101908382118183101715611af257611af2611f3a565b816040528281528a6020848701011115611b0a578586fd5b82602086016020830137918201602001949094529598949750929550505050565b60008060408385031215611b3d578182fd5b611b46836119bc565b915060208301358015158114611b5a578182fd5b809150509250929050565b60008060408385031215611b77578182fd5b611b80836119bc565b946020939093013593505050565b600060208284031215611b9f578081fd5b813561159081611f50565b600060208284031215611bbb578081fd5b815161159081611f50565b60008060008060608587031215611bdb578384fd5b843567ffffffffffffffff80821115611bf2578586fd5b818701915087601f830112611c05578586fd5b813581811115611c13578687fd5b886020828501011115611c24578687fd5b602092830196509450508501359150611c3f604086016119bc565b905092959194509250565b600060208284031215611c5b578081fd5b5035919050565b60008060408385031215611c74578182fd5b50508035926020909101359150565b60008151808452611c9b816020860160208601611e78565b601f01601f19169290920160200192915050565b60008351611cc1818460208801611e78565b835190830190611cd5818360208801611e78565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611d1190830184611c83565b9695505050505050565b6020815260006115906020830184611c83565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526028908201527f4f4e4c592043524541544f52204841532041434345535320544f205448495320604082015267232aa721aa24a7a760c11b606082015260800190565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b60008219821115611e2957611e29611f0e565b500190565b600082611e3d57611e3d611f24565b500490565b6000816000190483118215151615611e5c57611e5c611f0e565b500290565b600082821015611e7357611e73611f0e565b500390565b60005b83811015611e93578181015183820152602001611e7b565b83811115610b7f5750506000910152565b600181811c90821680611eb857607f821691505b60208210811415611ed957634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611ef357611ef3611f0e565b5060010190565b600082611f0957611f09611f24565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b0319811681146108a957600080fdfea2646970667358221220e1016d28217e95ac4124bbf76e6c65c281ce4b748132d6849041d4f57db5b21d64736f6c63430008040033";

export class NFT__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    name_: string,
    symbol_: string,
    creator_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NFT> {
    return super.deploy(
      name_,
      symbol_,
      creator_,
      overrides || {}
    ) as Promise<NFT>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    creator_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      creator_,
      overrides || {}
    );
  }
  attach(address: string): NFT {
    return super.attach(address) as NFT;
  }
  connect(signer: Signer): NFT__factory {
    return super.connect(signer) as NFT__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NFTInterface {
    return new utils.Interface(_abi) as NFTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NFT {
    return new Contract(address, _abi, signerOrProvider) as NFT;
  }
}
