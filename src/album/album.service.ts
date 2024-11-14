import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "./album.model";
import { Repository } from "typeorm";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumsRepository: Repository<Album>,
    ) {}

    findAll(): Promise<Album[]> {
        return this.albumsRepository.find({ relations: ["idArtista", "canciones"] });
    }

    findById(id: number): Promise<Album | null> {
        return this.albumsRepository.findOne({
            where: { id },
            relations: ["idArtista", "canciones"],
        });
    }

    createAlbum(album: Album): Promise<Album> {
        return this.albumsRepository.save(album);
    }

    async updateAlbum(album: Album): Promise<Album> {
        await this.albumsRepository.update(album.id.toString(), album);
        return album;
    }

    async deleteAlbum(id: number): Promise<void> {
        await this.albumsRepository.delete(id);
    }
}
