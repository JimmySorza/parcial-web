import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations, Booking} from '../models';
import {BookingRepository} from './booking.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly bookings: HasManyRepositoryFactory<Booking, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BookingRepository') protected bookingRepositoryGetter: Getter<BookingRepository>,
  ) {
    super(User, dataSource);
    this.bookings = this.createHasManyRepositoryFactoryFor('bookings', bookingRepositoryGetter,);
    this.registerInclusionResolver('bookings', this.bookings.inclusionResolver);
  }
}
