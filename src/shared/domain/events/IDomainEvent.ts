export interface IDomainEvent {
  dateTimeOccurred: Date;
  getEntityID(): string;
}
