import { Injectable } from "@nestjs/common";
import { Artista } from "../artista/artista.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Album } from "../album/album.model";
import { Cancion } from "../cancion/cancion.model";

@Injectable()
export class BusquedaService {
    constructor(
        @InjectRepository(Artista)
        private artistasRepository: Repository<Artista>,
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
        @InjectRepository(Cancion)
        private cancionRepository: Repository<Cancion>,
    ) {}

    async buscar(termino: string) {
        const [artistas, albums, canciones] = await Promise.all([
            this.artistasRepository.find({
                where: { nombre: ILike(`%${termino}%`) },
                relations: ["idGenero", "albums"],
            }),
            this.albumRepository.find({
                where: { nombre: ILike(`%${termino}%`) },
                relations: ["idArtista", "canciones"],
            }),
            this.cancionRepository.find({
                where: { nombre: ILike(`%${termino}%`) },
                relations: ["idAlbum"],
            }),
        ]);
        const cancionesConArtista = canciones.map(cancion => ({
            ...cancion,
            artista: cancion.idAlbum ? cancion.idAlbum.idArtista : null,
        }));

        return { artistas, albums, canciones: cancionesConArtista };
    }
}
