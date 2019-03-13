import pcap from "pcap";
import DisplayUnit from "./displayUnit";

export default abstract class Network {
    protected static tracker: pcap.TCPTracker;
    protected static session: any;
    protected static trafficSize: number = 0;

    public static listen(iface: string): void {
        // Reset traffic size counter.
        Network.trafficSize = 0;

        // Create instances.
        Network.tracker = new pcap.TCPTracker();
        Network.session = pcap.createSession(iface, "ip proto \\tcp");

        // Setup listeners.
        Network.tracker.on("session", (session) => {
            console.log("Start of session between " + session.src_name + " and " + session.dst_name);

            session.on("end", function (session) {
                console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
            });
        });

        Network.session.on("packet", (rawPacket) => {
            const packet = pcap.decode.packet(rawPacket);

            Network.tracker.track_packet(packet);
        
            console.log(packet);
            Network.trafficSize += packet.pcap_header.len;
            console.log("Transmitted: %s", DisplayUnit.represent(Network.trafficSize));
        });
    }

    public static getTrafficSize(): number {
        return Network.trafficSize;
    }
}
