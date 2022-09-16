import { IDomainEvent } from '@shared/domain/events/IDomainEvent';
import { User } from '../User';

export class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;

  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getEntityID(): string {
    return this.user.id;
  }
}
