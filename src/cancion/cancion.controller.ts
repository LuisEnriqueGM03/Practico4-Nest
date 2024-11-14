import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CancionService } from "./cancion.service";
import { Cancion } from "./cancion.model";
import { CancionDto } from "./dto/cancion.dto";
import { CancionUpdateDto } from "./dto/cancion-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("canciones")
export class CancionController {
    constructor(private cancionService: CancionService) {}

    @Get()
    list(): Promise<Cancion[]> {
        return this.cancionService.findAll();
    }

    @Get(":id")
    async get(@Param("id") id: number): Promise<Cancion | null> {
        const cancionDB = await this.cancionService.findById(id);
        if (!cancionDB) {
            throw new NotFoundException();
        }
        return cancionDB;
    }

    @Post()
    create(@Body() cancion: CancionDto): Promise<Cancion> {
        return this.cancionService.createCancion({
            id: 0,
            nombre: cancion.nombre,
            idAlbum: cancion.idAlbum,
        });
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() cancion: CancionDto): Promise<Cancion> {
        const cancionDB = await this.cancionService.findById(id);
        if (!cancionDB) {
            throw new NotFoundException();
        }
        return this.cancionService.updateCancion({
            id: id,
            nombre: cancion.nombre,
            idAlbum: cancion.idAlbum,
        });
    }

    @Patch(":id")
    async partialUpdate(@Param("id") id: number, @Body() cancion: CancionUpdateDto): Promise<Cancion> {
        const cancionDB = await this.cancionService.findById(id);
        if (!cancionDB) {
            throw new NotFoundException();
        }
        return this.cancionService.updateCancion({
            id: id,
            nombre: cancion.nombre ?? cancionDB.nombre,
            idAlbum: cancion.idAlbum ?? cancionDB.idAlbum,
        });
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const cancionDB = await this.cancionService.findById(id);
        if (!cancionDB) {
            throw new NotFoundException();
        }
        return this.cancionService.deleteCancion(id);
    }

    @Post(":id/upload")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads/cancion",
                filename: (req, file, callback) => {
                    const idSuffix = req.params.id;
                    const filename = `${idSuffix}.mp3`;
                    callback(null, filename);
                },
            }),
        }),
    )
    uploadFile(@Param("id") id: number, @UploadedFile() file: Express.Multer.File) {
        const filePath = `/uploads/cancion/${file.filename}`;
        return {
            message: "Archivo cargado correctamente",
            filePath: filePath,
        };
    }
}
