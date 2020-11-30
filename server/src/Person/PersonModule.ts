import { Module } from "@nestjs/common";
import { PersonRepository } from "./PersonRepository";
import { PersonResolver } from "./PersonResolver";

@Module({
    providers: [
        PersonRepository,
        PersonResolver,
    ],
    exports: [PersonRepository],
    imports: [],
})
export class PersonModule {}