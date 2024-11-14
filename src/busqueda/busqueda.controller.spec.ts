import { Test, TestingModule } from "@nestjs/testing";
import { BusquedaController } from "./busqueda.controller";

describe("BusquedaController", () => {
    let controller: BusquedaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BusquedaController],
        }).compile();

        controller = module.get<BusquedaController>(BusquedaController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
