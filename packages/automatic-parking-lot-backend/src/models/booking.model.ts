import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Booking extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  datetime: string;

  @property({
    type: 'string',
    required: true,
  })
  time: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @belongsTo(() => User)
  userId: number;

  constructor(data?: Partial<Booking>) {
    super(data);
  }
}

export interface BookingRelations {
  // describe navigational properties here
}

export type BookingWithRelations = Booking & BookingRelations;
