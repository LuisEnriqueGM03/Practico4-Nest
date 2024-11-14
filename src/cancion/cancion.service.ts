import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cancion } from "./cancion.model";
import { Repository } from "typeorm";

@Injectable()
export class CancionService {
    constructor(
        @InjectRepository(Cancion)
        private cancionesRepository: Repository<Cancion>,
    ) {}

    findAll(): Promise<Cancion[]> {
        return this.cancionesRepository.find({ relations: ["idAlbum"] });
    }

    findById(id: number): Promise<Cancion | null> {
        return this.cancionesRepository.findOne({
            where: { id },
            relations: ["idAlbum"],
        });
    }

    createCancion(cancion: Cancion): Promise<Cancion> {
        return this.cancionesRepository.save(cancion);
    }

    async updateCancion(cancion: Cancion): Promise<Cancion> {
        await this.cancionesRepository.update(cancion.id.toString(), cancion);
        return cancion;
    }

    async deleteCancion(id: number): Promise<void> {
        await this.cancionesRepository.delete(id);
    }
}
