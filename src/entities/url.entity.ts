import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'url' })
export class Url {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'long_url' })
  longUrl: string;

  @Column({ name: 'short_url' })
  shortUrl: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
