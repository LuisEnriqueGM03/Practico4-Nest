import { IsOptional, IsNumber, IsString } from "class-validator";
import { Album } from "../../album/album.model";

export class CancionUpdateDto {
    @IsOptional()
    @IsString()
    readonly nombre?: string;

    @IsOptional()
    @IsNumber()
    readonly idAlbum?: Album;
}
