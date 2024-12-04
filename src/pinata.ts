import { PinataSDK } from "pinata";

const fetchPinnedData = async () => {
    const pinata = new PinataSDK({
        pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
        pinataGateway: process.env.NEXT_PUBLIC_PINATA_JWT,
      });
  
      const pinListResponse = await pinata.files();

      if (pinListResponse.count === 0) {
       
        return;
      }

      const formattedData = pinListResponse.rows.map((item) => ({
        cid: item.ipfs_pin_hash,
        metadata: item.metadata.keyvalues,
      }));


  };