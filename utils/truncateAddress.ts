export const  truncateWalletAddress = (address: string): string =>  {
    if (!address || address.length < 10) {
      return address; 
    }
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  }
  