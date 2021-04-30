import {User} from './User';

export class Donation {
  donationId: number;
  userDTO: User;
  familyName: string;
  amount: number;
  wasRedeemed: boolean;
}
