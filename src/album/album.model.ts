import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Artista } from "../artista/artista.model";
import { Cancion } from "../cancion/cancion.model";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Artista, artista => artista.albums)
    idArtista: Artista;

    @OneToMany(() => Cancion, cancion => cancion.idAlbum)
    canciones?: Cancion[];
}
