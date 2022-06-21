export const abi = [
   {
      anonymous: false,
      inputs: [
         {
            indexed: false,
            internalType: 'string',
            name: 'link',
            type: 'string',
         },
         {
            indexed: false,
            internalType: 'string',
            name: 'hash',
            type: 'string',
         },
      ],
      name: 'HashGenerated',
      type: 'event',
   },
   {
      inputs: [
         {
            internalType: 'string',
            name: '',
            type: 'string',
         },
      ],
      name: 'hashToLink',
      outputs: [
         {
            internalType: 'string',
            name: '',
            type: 'string',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [
         {
            internalType: 'string',
            name: '',
            type: 'string',
         },
      ],
      name: 'linkToHask',
      outputs: [
         {
            internalType: 'string',
            name: '',
            type: 'string',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [
         {
            internalType: 'string',
            name: '_link',
            type: 'string',
         },
      ],
      name: 'saveLink',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
   },
];
