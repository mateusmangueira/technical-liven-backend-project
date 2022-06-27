export class AddressEntity {
  id: string
  street: string
  street_number: string
  neighborhood: string
  city: string
  state: string
  country: string
  postCode: string
  userId: string

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
