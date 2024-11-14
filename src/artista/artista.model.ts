import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Genero } from "../genero/genero.model";
import { Album } from "../album/album.model";

@Entity()
export class Artista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Genero, genero => genero.artistas)
    idGenero: Genero;

    @OneToMany(() => Album, album => album.idArtista)
    albums?: Album[];
}
