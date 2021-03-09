import { Deserializable } from './deserializable';

export class Settings implements Deserializable {

    name: string;

    wifiSSID: string;
    wifiPassword: string;

    netHostname: string;
    netStatic: boolean;
    netAddr: string;
    netMask: string;
    netGatewayAddr: string;
    netDNSAddr: string;

    mqttBrokerAddr: string;
    // there will be more...

    dtTimezone: string;
    dtNTPAddress1: string;
    dtNTPAddress2: string;

    tstatHysteresis: number;
    tstatFanMode: string;   // not sure what this is yet

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
