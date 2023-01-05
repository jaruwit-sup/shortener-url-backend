import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'url' })
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;
}
