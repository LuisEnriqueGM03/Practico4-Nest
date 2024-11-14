import { IsOptional, IsNumber, IsString } from "class-validator";
import { Artista } from "../../artista/artista.model";

export class AlbumUpdateDto {
    @IsOptional()
    @IsString()
    readonly nombre?: string;

    @IsOptional()
    @IsNumber()
    readonly idArtista?: Artista;
}
