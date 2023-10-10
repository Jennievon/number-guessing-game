export const truncateAddress = (address: string) => {
  if (address.length > 6) {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  }
  return address;
};
