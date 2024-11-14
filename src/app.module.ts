import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genero } from "./genero/genero.model";
import { Artista } from "./artista/artista.model";
import { Album } from "./album/album.model";
import { Cancion } from "./cancion/cancion.model";
import { GeneroController } from "./genero/genero.controller";
import { ArtistaController } from "./artista/artista.controller";
import { AlbumController } from "./album/album.controller";
import { CancionController } from "./cancion/cancion.controller";
import { GeneroService } from "./genero/genero.service";
import { ArtistaService } from "./artista/artista.service";
import { AlbumService } from "./album/album.service";
import { CancionService } from "./cancion/cancion.service";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { diskStorage } from "multer";
import { join } from "path";
import { BusquedaController } from "./busqueda/busqueda.controller";
import { BusquedaService } from "./busqueda/busqueda.service";

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                filename: (req, file, callback) => {
                    const idSuffix = req.params.id;
                    const extension = file.originalname.split(".").pop();
                    const filename = `${idSuffix}.${extension}`;
                    callback(null, filename);
                },
            }),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "uploads"),
            serveRoot: "/uploads",
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "spotifydb",
            entities: [Genero, Artista, Album, Cancion],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Genero, Artista, Album, Cancion]),
    ],
    controllers: [AppController, GeneroController, ArtistaController, AlbumController, CancionController, BusquedaController],
    providers: [AppService, GeneroService, ArtistaService, AlbumService, CancionService, BusquedaService],
})
export class AppModule {}
