/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
   BaseContract,
   BigNumber,
   BytesLike,
   CallOverrides,
   ContractTransaction,
   Overrides,
   PopulatedTransaction,
   Signer,
   utils,
} from "ethers";
import type {
   FunctionFragment,
   Result,
   EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
   TypedEventFilter,
   TypedEvent,
   TypedListener,
   OnEvent,
   PromiseOrValue,
} from "./common";

export interface S2lStorageInterface extends utils.Interface {
   functions: {
      "hashToLink(string)": FunctionFragment;
      "linkToHask(string)": FunctionFragment;
      "saveLink(string)": FunctionFragment;
   };

   getFunction(
      nameOrSignatureOrTopic: "hashToLink" | "linkToHask" | "saveLink"
   ): FunctionFragment;

   encodeFunctionData(
      functionFragment: "hashToLink",
      values: [PromiseOrValue<string>]
   ): string;
   encodeFunctionData(
      functionFragment: "linkToHask",
      values: [PromiseOrValue<string>]
   ): string;
   encodeFunctionData(
      functionFragment: "saveLink",
      values: [PromiseOrValue<string>]
   ): string;

   decodeFunctionResult(functionFragment: "hashToLink", data: BytesLike): Result;
   decodeFunctionResult(functionFragment: "linkToHask", data: BytesLike): Result;
   decodeFunctionResult(functionFragment: "saveLink", data: BytesLike): Result;

   events: {
      "HashGenerated(string,string)": EventFragment;
   };

   getEvent(nameOrSignatureOrTopic: "HashGenerated"): EventFragment;
}

export interface HashGeneratedEventObject {
   link: string;
   hash: string;
}
export type HashGeneratedEvent = TypedEvent<
   [string, string],
   HashGeneratedEventObject
>;

export type HashGeneratedEventFilter = TypedEventFilter<HashGeneratedEvent>;

export interface S2lStorage extends BaseContract {
   connect(signerOrProvider: Signer | Provider | string): this;
   attach(addressOrName: string): this;
   deployed(): Promise<this>;

   interface: S2lStorageInterface;

   queryFilter<TEvent extends TypedEvent>(
      event: TypedEventFilter<TEvent>,
      fromBlockOrBlockhash?: string | number | undefined,
      toBlock?: string | number | undefined
   ): Promise<Array<TEvent>>;

   listeners<TEvent extends TypedEvent>(
      eventFilter?: TypedEventFilter<TEvent>
   ): Array<TypedListener<TEvent>>;
   listeners(eventName?: string): Array<Listener>;
   removeAllListeners<TEvent extends TypedEvent>(
      eventFilter: TypedEventFilter<TEvent>
   ): this;
   removeAllListeners(eventName?: string): this;
   off: OnEvent<this>;
   on: OnEvent<this>;
   once: OnEvent<this>;
   removeListener: OnEvent<this>;

   functions: {
      hashToLink(
         arg0: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<[string]>;

      linkToHask(
         arg0: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<[string]>;

      saveLink(
         _link: PromiseOrValue<string>,
         overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
   };

   hashToLink(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
   ): Promise<string>;

   linkToHask(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
   ): Promise<string>;

   saveLink(
      _link: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
   ): Promise<ContractTransaction>;

   callStatic: {
      hashToLink(
         arg0: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<string>;

      linkToHask(
         arg0: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<string>;

      saveLink(
         _link: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<void>;
   };

   filters: {
      "HashGenerated(string,string)"(
         link?: null,
         hash?: null
      ): HashGeneratedEventFilter;
      HashGenerated(link?: null, hash?: null): HashGeneratedEventFilter;
   };

   estimateGas: {
      hashToLink(
         arg0: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<BigNumber>;

      linkToHask(
         arg0: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<BigNumber>;

      saveLink(
         _link: PromiseOrValue<string>,
         overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
   };

   populateTransaction: {
      hashToLink(
         arg0: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<PopulatedTransaction>;

      linkToHask(
         arg0: PromiseOrValue<string>,
         overrides?: CallOverrides
      ): Promise<PopulatedTransaction>;

      saveLink(
         _link: PromiseOrValue<string>,
         overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
   };
}
