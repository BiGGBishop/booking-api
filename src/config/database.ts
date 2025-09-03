import { DataSource } from 'typeorm';
import { Property } from '../models/Property';
import { Booking } from '../models/Booking';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [Property, Booking],
  migrations: [],
  subscribers: [],
});