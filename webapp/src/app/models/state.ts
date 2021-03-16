import { Deserializable } from './deserializable';

export class State implements Deserializable {

    wifiConnected: boolean;

    tempSet: number;
    tempCurrent: number;
    humCurrent: number;
    presCurrent: number;
    tempTrend: '+' | '-' | '*';
    humTrend: '+' | '-' | '*';
    presTrend: '+' | '-' | '*';
    
    holding: boolean;

    heatOn: boolean;
    coolOn: boolean;
    fanOn: boolean;

    datetime: string;

    // current schedule slot

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
