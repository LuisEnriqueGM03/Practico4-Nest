import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ArtistaService } from "./artista.service";
import { Artista } from "./artista.model";
import { ArtistaDto } from "./dto/artista.dto";
import { ArtistaUpdateDto } from "./dto/artista-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("artistas")
export class ArtistaController {
    constructor(private artistaService: ArtistaService) {}

    @Get()
    list(): Promise<Artista[]> {
        return this.artistaService.findAll();
    }

    @Get(":id")
    async get(@Param("id") id: number): Promise<Artista | null> {
        const artistaDB = await this.artistaService.findById(id);
        if (!artistaDB) {
            throw new NotFoundException();
        }
        return artistaDB;
    }

    @Post()
    create(@Body() artista: ArtistaDto): Promise<Artista> {
        return this.artistaService.createArtista({
            id: 0,
            nombre: artista.nombre,
            idGenero: artista.idGenero,
        });
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() artista: ArtistaDto): Promise<Artista> {
        const artistaDB = await this.artistaService.findById(id);
        if (!artistaDB) {
            throw new NotFoundException();
        }
        return this.artistaService.updateArtista({
            id: id,
            nombre: artista.nombre,
            idGenero: artista.idGenero,
        });
    }

    @Patch(":id")
    async partialUpdate(@Param("id") id: number, @Body() artista: ArtistaUpdateDto): Promise<Artista> {
        const artistaDB = await this.artistaService.findById(id);
        if (!artistaDB) {
            throw new NotFoundException();
        }
        return this.artistaService.updateArtista({
            id: id,
            nombre: artista.nombre ?? artistaDB.nombre,
            idGenero: artista.idGenero ?? artistaDB.idGenero,
        });
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const artistaDB = await this.artistaService.findById(id);
        if (!artistaDB) {
            throw new NotFoundException();
        }
        return this.artistaService.deleteArtista(id);
    }

    @Post(":id/upload")
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./uploads/artista",
                filename: (req, file, callback) => {
                    const idSuffix = req.params.id;
                    const filename = `${idSuffix}.jpg`;
                    callback(null, filename);
                },
            }),
        }),
    )
    uploadFile(@Param("id") id: number, @UploadedFile() image: Express.Multer.File) {
        const filePath = `/uploads/artista/${image.filename}`;
        return {
            message: "Archivo cargado correctamente",
            filePath: filePath,
        };
    }
}
