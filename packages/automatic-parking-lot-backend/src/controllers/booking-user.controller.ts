import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Booking,
  User,
} from '../models';
import {BookingRepository} from '../repositories';

export class BookingUserController {
  constructor(
    @repository(BookingRepository)
    public bookingRepository: BookingRepository,
  ) { }

  @get('/bookings/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Booking',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Booking.prototype.id,
  ): Promise<User> {
    return this.bookingRepository.user(id);
  }
}
