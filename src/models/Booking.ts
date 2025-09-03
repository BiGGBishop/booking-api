import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Property } from './Property';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Property, property => property.bookings)
  property!: Property;

  @Column()
  property_id!: number;

  @Column()
  user_name!: string;

  @Column('date')
  start_date!: Date;

  @Column('date')
  end_date!: Date;

  @CreateDateColumn()
  created_at!: Date;
}