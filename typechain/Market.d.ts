/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MarketInterface extends ethers.utils.Interface {
  functions: {
    "ERC2981INTERFACE()": FunctionFragment;
    "ERC721INTERFACE()": FunctionFragment;
    "createAuctionBid(uint256)": FunctionFragment;
    "createAuctionSale(address,uint256)": FunctionFragment;
    "createMarketAuction(address,uint256,uint256,uint256)": FunctionFragment;
    "createMarketItem(address,uint256,uint256)": FunctionFragment;
    "createMarketSale(address,uint256)": FunctionFragment;
    "getMarketItem()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ERC2981INTERFACE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ERC721INTERFACE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createAuctionBid",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createAuctionSale",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createMarketAuction",
    values: [string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createMarketItem",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createMarketSale",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMarketItem",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "ERC2981INTERFACE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ERC721INTERFACE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuctionBid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAuctionSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMarketAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMarketItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMarketSale",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMarketItem",
    data: BytesLike
  ): Result;

  events: {
    "MarketAuctionItemCreated(uint256,address,uint256,address,address,uint256)": EventFragment;
    "MarketItemBid(uint256,address,uint256)": EventFragment;
    "MarketItemCreated(uint256,address,uint256,address,address,uint256)": EventFragment;
    "MarketItemSold(uint256,address,address,address)": EventFragment;
    "MarketItemUnlisted(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MarketAuctionItemCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemBid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemSold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemUnlisted"): EventFragment;
}

export type MarketAuctionItemCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string, string, BigNumber] & {
    itemId: BigNumber;
    nftContract: string;
    tokenId: BigNumber;
    seller: string;
    owner: string;
    price: BigNumber;
  }
>;

export type MarketItemBidEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    itemId: BigNumber;
    bidder: string;
    amount: BigNumber;
  }
>;

export type MarketItemCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, string, string, BigNumber] & {
    itemId: BigNumber;
    nftContract: string;
    tokenId: BigNumber;
    seller: string;
    owner: string;
    price: BigNumber;
  }
>;

export type MarketItemSoldEvent = TypedEvent<
  [BigNumber, string, string, string] & {
    itemId: BigNumber;
    nftContract: string;
    seller: string;
    newOwner: string;
  }
>;

export type MarketItemUnlistedEvent = TypedEvent<
  [BigNumber] & { itemId: BigNumber }
>;

export class Market extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MarketInterface;

  functions: {
    ERC2981INTERFACE(overrides?: CallOverrides): Promise<[string]>;

    ERC721INTERFACE(overrides?: CallOverrides): Promise<[string]>;

    createAuctionBid(
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createAuctionSale(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createMarketAuction(
      nftContract: string,
      tokenId: BigNumberish,
      floorPrice: BigNumberish,
      auctionTime: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createMarketItem(
      nftContract: string,
      tokenId: BigNumberish,
      price: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createMarketSale(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getMarketItem(
      overrides?: CallOverrides
    ): Promise<
      [
        [
          BigNumber,
          string,
          BigNumber,
          string,
          string,
          string,
          BigNumber,
          BigNumber,
          boolean,
          boolean
        ] & {
          itemId: BigNumber;
          nftContract: string;
          tokenId: BigNumber;
          creator: string;
          seller: string;
          owner: string;
          price: BigNumber;
          royalty: BigNumber;
          isAuction: boolean;
          sold: boolean;
        }
      ]
    >;
  };

  ERC2981INTERFACE(overrides?: CallOverrides): Promise<string>;

  ERC721INTERFACE(overrides?: CallOverrides): Promise<string>;

  createAuctionBid(
    itemId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createAuctionSale(
    nftContract: string,
    itemId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createMarketAuction(
    nftContract: string,
    tokenId: BigNumberish,
    floorPrice: BigNumberish,
    auctionTime: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createMarketItem(
    nftContract: string,
    tokenId: BigNumberish,
    price: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createMarketSale(
    nftContract: string,
    itemId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getMarketItem(
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      string,
      BigNumber,
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      boolean,
      boolean
    ] & {
      itemId: BigNumber;
      nftContract: string;
      tokenId: BigNumber;
      creator: string;
      seller: string;
      owner: string;
      price: BigNumber;
      royalty: BigNumber;
      isAuction: boolean;
      sold: boolean;
    }
  >;

  callStatic: {
    ERC2981INTERFACE(overrides?: CallOverrides): Promise<string>;

    ERC721INTERFACE(overrides?: CallOverrides): Promise<string>;

    createAuctionBid(
      itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createAuctionSale(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createMarketAuction(
      nftContract: string,
      tokenId: BigNumberish,
      floorPrice: BigNumberish,
      auctionTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createMarketItem(
      nftContract: string,
      tokenId: BigNumberish,
      price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createMarketSale(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getMarketItem(
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        string,
        BigNumber,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        boolean,
        boolean
      ] & {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        creator: string;
        seller: string;
        owner: string;
        price: BigNumber;
        royalty: BigNumber;
        isAuction: boolean;
        sold: boolean;
      }
    >;
  };

  filters: {
    "MarketAuctionItemCreated(uint256,address,uint256,address,address,uint256)"(
      itemId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      price?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, string, string, BigNumber],
      {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        seller: string;
        owner: string;
        price: BigNumber;
      }
    >;

    MarketAuctionItemCreated(
      itemId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      price?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, string, string, BigNumber],
      {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        seller: string;
        owner: string;
        price: BigNumber;
      }
    >;

    "MarketItemBid(uint256,address,uint256)"(
      itemId?: BigNumberish | null,
      bidder?: string | null,
      amount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { itemId: BigNumber; bidder: string; amount: BigNumber }
    >;

    MarketItemBid(
      itemId?: BigNumberish | null,
      bidder?: string | null,
      amount?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { itemId: BigNumber; bidder: string; amount: BigNumber }
    >;

    "MarketItemCreated(uint256,address,uint256,address,address,uint256)"(
      itemId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      price?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, string, string, BigNumber],
      {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        seller: string;
        owner: string;
        price: BigNumber;
      }
    >;

    MarketItemCreated(
      itemId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: BigNumberish | null,
      seller?: null,
      owner?: null,
      price?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, string, string, BigNumber],
      {
        itemId: BigNumber;
        nftContract: string;
        tokenId: BigNumber;
        seller: string;
        owner: string;
        price: BigNumber;
      }
    >;

    "MarketItemSold(uint256,address,address,address)"(
      itemId?: null,
      nftContract?: string | null,
      seller?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [BigNumber, string, string, string],
      {
        itemId: BigNumber;
        nftContract: string;
        seller: string;
        newOwner: string;
      }
    >;

    MarketItemSold(
      itemId?: null,
      nftContract?: string | null,
      seller?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [BigNumber, string, string, string],
      {
        itemId: BigNumber;
        nftContract: string;
        seller: string;
        newOwner: string;
      }
    >;

    "MarketItemUnlisted(uint256)"(
      itemId?: null
    ): TypedEventFilter<[BigNumber], { itemId: BigNumber }>;

    MarketItemUnlisted(
      itemId?: null
    ): TypedEventFilter<[BigNumber], { itemId: BigNumber }>;
  };

  estimateGas: {
    ERC2981INTERFACE(overrides?: CallOverrides): Promise<BigNumber>;

    ERC721INTERFACE(overrides?: CallOverrides): Promise<BigNumber>;

    createAuctionBid(
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createAuctionSale(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createMarketAuction(
      nftContract: string,
      tokenId: BigNumberish,
      floorPrice: BigNumberish,
      auctionTime: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createMarketItem(
      nftContract: string,
      tokenId: BigNumberish,
      price: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createMarketSale(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getMarketItem(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ERC2981INTERFACE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ERC721INTERFACE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createAuctionBid(
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createAuctionSale(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createMarketAuction(
      nftContract: string,
      tokenId: BigNumberish,
      floorPrice: BigNumberish,
      auctionTime: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createMarketItem(
      nftContract: string,
      tokenId: BigNumberish,
      price: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createMarketSale(
      nftContract: string,
      itemId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getMarketItem(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
