export class Utils {
    public static base64ToAscii(encodedStr: string): string {
        const buffer = Buffer.from(encodedStr, 'base64');
        return buffer.toString('ascii');
    }

    public static extractUsernameFromAuthHeader(header: string) {
        const authSegments: string[] = header.split(' ');
        const usernameAndPassword = Utils.base64ToAscii(authSegments[1]).split(':');

        return {
            username: usernameAndPassword[0],
            password: usernameAndPassword[1]
        };
    }
}
