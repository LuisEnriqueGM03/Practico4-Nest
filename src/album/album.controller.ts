import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { Album } from "./album.model";
import { AlbumDto } from "./dto/album.dto";
import { AlbumUpdateDto } from "./dto/album-update.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("albums")
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get()
    list(): Promise<Album[]> {
        return this.albumService.findAll();
    }

    @Get(":id")
    async get(@Param("id") id: number): Promise<Album | null> {
        const albumDB = await this.albumService.findById(id);
        if (!albumDB) {
            throw new NotFoundException();
        }
        return albumDB;
    }

    @Post()
    create(@Body() album: AlbumDto): Promise<Album> {
        return this.albumService.createAlbum({
            id: 0,
            nombre: album.nombre,
            idArtista: album.idArtista,
        });
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() album: AlbumDto): Promise<Album> {
        const albumDB = await this.albumService.findById(id);
        if (!albumDB) {
            throw new NotFoundException();
        }
        return this.albumService.updateAlbum({
            id: id,
            nombre: album.nombre,
            idArtista: album.idArtista,
        });
    }

    @Patch(":id")
    async partialUpdate(@Param("id") id: number, @Body() album: AlbumUpdateDto): Promise<Album> {
        const albumDB = await this.albumService.findById(id);
        if (!albumDB) {
            throw new NotFoundException();
        }
        return this.albumService.updateAlbum({
            id: id,
            nombre: album.nombre ?? albumDB.nombre,
            idArtista: album.idArtista ?? albumDB.idArtista,
        });
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const albumDB = await this.albumService.findById(id);
        if (!albumDB) {
            throw new NotFoundException();
        }
        return this.albumService.deleteAlbum(id);
    }

    @Post(":id/upload")
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./uploads/album",
                filename: (req, file, callback) => {
                    const idSuffix = req.params.id;
                    const filename = `${idSuffix}.jpg`;
                    callback(null, filename);
                },
            }),
        }),
    )
    uploadFile(@Param("id") id: number, @UploadedFile() image: Express.Multer.File) {
        const filePath = `/uploads/album/${image.filename}`;
        return {
            message: "Archivo cargado correctamente",
            filePath: filePath,
        };
    }
}
