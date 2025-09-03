import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from './Booking';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('decimal')
  price_per_night!: number;

  @Column('date')
  available_from!: Date;

  @Column('date')
  available_to!: Date;

  @OneToMany(() => Booking, booking => booking.property)
  bookings!: Booking[];
}