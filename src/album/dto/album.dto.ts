import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Artista } from "../../artista/artista.model";

export class AlbumDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsNumber()
    readonly idArtista: Artista;
}
