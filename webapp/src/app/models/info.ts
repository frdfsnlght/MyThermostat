import { Deserializable } from './deserializable';

export class Info implements Deserializable {

    buildTag: string;
    buildCommit: string;
    wifiMode: 'AP' | 'STA';
    netIP: string;
    netAddr: string;

    // flash size/remaining?
    // running partition

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
