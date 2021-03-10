import { Deserializable } from './deserializable';

export class State implements Deserializable {

    hwVersion: string;
    hwSerial: string;
    fwVersion: string;

    wifiMode: 'AP' | 'STA';
    wifiConnected: boolean;
    ipAddr: string;

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

    // flash size/remaining?
    // running partition
    // current schedule slot

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
