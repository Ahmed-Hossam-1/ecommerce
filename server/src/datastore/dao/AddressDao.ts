import { Address } from '../../types/typeDao';

export interface AddressDao {
  createAddress: (address: Address) => Promise<void>;
  getAddressById: (id: string) => Promise<Address | undefined>;
  getAddressByUserId: (userId: string) => Promise<Address | undefined>;
  editAddress: (address: Address) => Promise<void>;
}
