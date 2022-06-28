export class AddressEntity {
  id: number
  street: string
  street_number: string
  neighborhood: string
  city: string
  state: string
  country: string
  postCode: string
  userId: number

  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }
}
