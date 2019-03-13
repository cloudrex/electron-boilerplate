export default abstract class DisplayUnit {
    public static readonly KB: number = 1024;
    public static readonly MB: number = 1048576;
    public static readonly GB: number = 1073741824;

    public static represent(size: number): string {
        if (size >= DisplayUnit.GB) {
            return `${size} GB`;
        }
        else if (size >= DisplayUnit.MB) {
            return `${size} MB`;
        }
        else if (size >= DisplayUnit.KB) {
            return `${size} KB`;
        }

        return `${size} B`;
    }
}
