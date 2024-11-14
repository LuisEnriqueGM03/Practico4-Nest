import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artista } from "./artista.model";
import { Repository } from "typeorm";

@Injectable()
export class ArtistaService {
    constructor(
        @InjectRepository(Artista)
        private artistasRepository: Repository<Artista>,
    ) {}

    findAll(): Promise<Artista[]> {
        return this.artistasRepository.find({ relations: ["idGenero", "albums"] });
    }

    findById(id: number): Promise<Artista | null> {
        return this.artistasRepository.findOne({
            where: { id },
            relations: ["idGenero", "albums"],
        });
    }

    createArtista(artista: Artista): Promise<Artista> {
        return this.artistasRepository.save(artista);
    }

    async updateArtista(artista: Artista): Promise<Artista> {
        await this.artistasRepository.update(artista.id.toString(), artista);
        return artista;
    }

    async deleteArtista(id: number): Promise<void> {
        await this.artistasRepository.delete(id);
    }
}
