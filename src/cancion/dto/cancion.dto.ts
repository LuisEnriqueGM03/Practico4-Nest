import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Album } from "../../album/album.model";

export class CancionDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsNumber()
    readonly idAlbum: Album;
}
