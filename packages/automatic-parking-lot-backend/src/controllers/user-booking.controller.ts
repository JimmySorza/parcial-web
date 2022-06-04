import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Booking,
} from '../models';
import {UserRepository} from '../repositories';

export class UserBookingController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/bookings', {
    responses: {
      '200': {
        description: 'Array of User has many Booking',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Booking)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Booking>,
  ): Promise<Booking[]> {
    return this.userRepository.bookings(id).find(filter);
  }

  @post('/users/{id}/bookings', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Booking)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {
            title: 'NewBookingInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) booking: Omit<Booking, 'id'>,
  ): Promise<Booking> {
    return this.userRepository.bookings(id).create(booking);
  }

  @patch('/users/{id}/bookings', {
    responses: {
      '200': {
        description: 'User.Booking PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Booking, {partial: true}),
        },
      },
    })
    booking: Partial<Booking>,
    @param.query.object('where', getWhereSchemaFor(Booking)) where?: Where<Booking>,
  ): Promise<Count> {
    return this.userRepository.bookings(id).patch(booking, where);
  }

  @del('/users/{id}/bookings', {
    responses: {
      '200': {
        description: 'User.Booking DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Booking)) where?: Where<Booking>,
  ): Promise<Count> {
    return this.userRepository.bookings(id).delete(where);
  }
}
