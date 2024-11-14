import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { GeneroService } from "./genero.service";
import { Genero } from "./genero.model";
import { GeneroDto } from "./dto/genero.dto";
import { GeneroUpdateDto } from "./dto/genero-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("generos")
export class GeneroController {
    constructor(private generoService: GeneroService) {}

    @Get()
    list(): Promise<Genero[]> {
        return this.generoService.findAll();
    }

    @Get(":id")
    async get(@Param("id") id: number): Promise<Genero | null> {
        const generoDB = await this.generoService.findById(id);
        if (!generoDB) {
            throw new NotFoundException();
        }
        return generoDB;
    }

    @Post()
    create(@Body() genero: GeneroDto): Promise<Genero> {
        return this.generoService.createGenero({
            id: 0,
            nombre: genero.nombre,
        });
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() genero: GeneroDto): Promise<Genero> {
        const generoDB = await this.generoService.findById(id);
        if (!generoDB) {
            throw new NotFoundException();
        }
        return this.generoService.updateGenero({
            id: id,
            nombre: genero.nombre,
        });
    }

    @Patch(":id")
    async partialUpdate(@Param("id") id: number, @Body() genero: GeneroUpdateDto): Promise<Genero> {
        const generoDB = await this.generoService.findById(id);
        if (!generoDB) {
            throw new NotFoundException();
        }
        return this.generoService.updateGenero({
            id: id,
            nombre: genero.nombre ?? generoDB.nombre,
        });
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const generoDB = await this.generoService.findById(id);
        if (!generoDB) {
            throw new NotFoundException();
        }
        return this.generoService.deleteGenero(id);
    }

    @Post(":id/upload")
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./uploads/genero",
                filename: (req, file, callback) => {
                    const idSuffix = req.params.id;
                    const filename = `${idSuffix}.jpg`;
                    callback(null, filename);
                },
            }),
        }),
    )
    uploadFile(@Param("id") id: number, @UploadedFile() image: Express.Multer.File) {
        const filePath = `/uploads/genero/${image.filename}`;
        return {
            message: "Archivo cargado correctamente",
            filePath: filePath,
        };
    }
}
