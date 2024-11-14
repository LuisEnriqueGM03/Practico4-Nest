import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Genero } from "./genero.model";
import { Repository } from "typeorm";

@Injectable()
export class GeneroService {
    constructor(
        @InjectRepository(Genero)
        private generosRepository: Repository<Genero>,
    ) {}

    findAll(): Promise<Genero[]> {
        return this.generosRepository.find({ relations: ["artistas"] });
    }

    findById(id: number): Promise<Genero | null> {
        return this.generosRepository.findOne({
            where: { id },
            relations: ["artistas"],
        });
    }

    createGenero(genero: Genero): Promise<Genero> {
        return this.generosRepository.save(genero);
    }

    async updateGenero(genero: Genero): Promise<Genero> {
        await this.generosRepository.update(genero.id.toString(), genero);
        return genero;
    }

    async deleteGenero(id: number): Promise<void> {
        await this.generosRepository.delete(id);
    }
}
