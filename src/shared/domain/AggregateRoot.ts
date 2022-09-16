import { v4 } from 'uuid';
import { DomainEvents } from './events/DomainEvents';
import { IDomainEvent } from './events/IDomainEvent';

export abstract class AggregateRoot<T> {
  protected readonly _id: string;

  public readonly props: T;

  private _domainEvents: IDomainEvent[] = [];

  constructor(props: T, id?: string) {
    this._id = id || v4();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markEntityForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
}
