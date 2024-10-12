import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'products'})
export class Product {

  @ApiProperty({
    example:'ce61617d-500a-4b7f-ae82-e318e26f730c',
    description:'Product ID',
    uniqueItems:true,
  })
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @ApiProperty({
    example:'T-shirt Teslo',
    description:'Product title',
    uniqueItems:true,
  })
  @Column('text',{
    unique:true,
  })
  title:string

  @ApiProperty({
    example:0,
    description:'Price',

  })
  @Column('float',{
    default:0
  })
  price:number;

  @ApiProperty({
    example:'Product description',
    description:'Product Description',
    default:null
  })
  @Column({
    type: 'text',
    nullable:true,
  })
  description:string;

  @ApiProperty({
    example:'t_shirt_teslo',
    description:'Product slug',
    uniqueItems:true,
  })
  @Column('text',{
    unique:true,
  })
  slug:string;

  @ApiProperty({
    example:10,
    description:'Product stock',
    default:0
  })
  @Column('int',{
    default:0
  })
  stock:number;

  @ApiProperty({
    example:['M','XL'],
    description:'Product Sizes',
  })
  @Column('text',{
    array:true,
  })
  sizes:string[]

  @ApiProperty({
    example:'women',
    description:'Product gender',

  })
  @Column('text')
  gender:string;

  @ApiProperty({
    example:'tags',
    description:'Product tag',
    uniqueItems:true,
  })
  @Column('text',{
    array:true,
    default:[]
  })
  tags:string[];

  @ApiProperty()
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    {cascade:true,eager:true}
  )
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    (user) => user.product,
    {eager:true}
  )
  user:User



  @BeforeInsert()
  checkSlugInsert(){
    if(!this.slug){
      this.slug = this.title
    }
    this.slug = this.slug.toLowerCase().replaceAll(' ','_').replaceAll("'",'')

  }

  @BeforeUpdate()
  checkSlugUpdate(){
    this.slug = this.slug.toLowerCase().replaceAll(' ','_').replaceAll("'",'')

    }

  

}
