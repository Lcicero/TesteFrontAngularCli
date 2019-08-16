import { Icriteria } from 'src/app/shared/model/icriteria';

export class LivroCriteria implements Icriteria {

    constructor(
        public titulo?: string,
        public autor?: string){

        }
}
