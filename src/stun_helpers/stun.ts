/**
 * @file stun.ts
 * @fileoverview Defines the STUNHelpers class providing various helper functions for network operations and data transformations. 
 * These functions are used to create byte arrays, read bits, compare byte arrays, and convert IP addresses.
 *
 * The expression 0xFF represents a hexadecimal number. Numbers starting with 0x indicate hexadecimal format.
 * 0xFF equals 255 in hexadecimal. In binary, 0xFF corresponds to 11111111, which is an 8-bit value with all bits set to 1.
 * 
 * The operator int >>> 8 is the "unsigned right shift" operator. It performs a bitwise shift and ignores sign on negative numbers.
 * int >>> 8 shifts the bits of int 8 positions to the right.
 * For example, if int's binary value is 00000000 00000000 00000011 11000000 (256 + 192 = 448), 
 * the shift results in 00000000 00000011 11000000 00000000 (192). 
 * This operation moves the higher significant bits (high byte) into lower significant bits.
 * 
 * @version 1.0.0
 * @license MIT License
 * @author Mert Özdemir <mertozdeemiir@icloud.com> (https://github.com/mertvision)
 *
 */

// Importing the "net" module
import * as net from "net";

// Definition of the STUNHelpers class
export class STUNHelpers {
    /* Network byte order (ordering and arrangement of network bytes)
    Static method _int2Buf16 takes an integer parameter and returns a Buffer array. */
    static _int2Buf16(int: number): Buffer {

        /* Buffer.alloc() creates a Buffer of the given number length.
        This buffer is used to store a 16-bit (2-byte) number. */
        const buf = Buffer.alloc(2);

        /* buf[0] = 0xFF & (int >>> 8); writes the high 8 bits of int into buf[0].
        int >>> 8 shifts int 8 bits right, and 0xFF & ... masks the lower 8 bits. */
        buf[0] = 0xFF & (int >>> 8);

        /* buf[1] = 0xFF & int; writes the low 8 bits of int into buf[1]. */
        buf[1] = 0xFF & int;

        // return buf; returns the created Buffer.
        return buf;
    };

    /** The _getBit() method is used to get a bit value. The prefix _ indicates this method is for private or internal use.
     * It takes buffer, idx, and off parameters:
     *  "buffer" is of type Buffer, which handles binary data.
     *  "idx": the index of the byte in "buffer" from which the bit value is to be extracted.
     *  "off": the bit offset within the specified byte. Bit offset indicates the bit position inside the byte (starting at 0).
     */
    static _getBit(buffer: Buffer, idx: number, off: number){
        // Little endian addressing
        
        // Create a mask
        // Buffer.alloc(1) creates a Buffer (byte array) initially filled with zeros.
        let mask = Buffer.alloc(1);

        // Bit mask -> binary 00000001 (0x01 sets the mask bit to 00000001).
        mask[0] = 0x01; 
        /* Shift the mask left by off positions. The mask is shifted so that one bit moves to the off position.
        If off is 3, the mask value becomes 00001000 in binary. */
        mask[0] <<= off;

        return (buffer[idx] & mask[0]) !== 0 ? 1 : 0;
    };

    /** The _compareBuf(){} method is defined as a static method. It is not tied to class properties.
     * It can be called directly without creating an instance of the class.
     * It works at the class level without accessing instance variables.
     * 
     * Its main purpose is to compare two buffer arrays (objects) to check if they are completely equal in content.
     * If both Buffer objects have the same content and length, it returns true.
     * Otherwise, it returns false.
     * 
     * Takes two parameters "a" and "b" of type Buffer representing binary data, and returns a boolean.
    */
    static _compareBuf(a: Buffer, b: Buffer): boolean {

        /** Buffer.isBuffer() checks whether the argument is of type Buffer.
         * Returns false if not a Buffer.
         * Ensures this method works only with Buffer types.
        */
        if(!Buffer.isBuffer(a) || !Buffer.isBuffer(b)){
            return false;
        };

        /** Compares the byte length of Buffer objects a and b.
         * Returns false if lengths are not equal.
         */
        if(a.length !== b.length){
            return false;
        };

        // Byte-to-byte comparison
        /** 
         * Compares each byte of Buffer objects a and b.
         * The variable "i" is the loop index.
         * The loop checks if every byte of both Buffers are equal.
         */
        for(let i=0; i<a.length; i+=1){
            if(a[i] !== b[i]){
                return false;
            };
        };

        // Returns true by default
        return true;
    };
};

/**
 * 

    static _ipv4Str2Buf32(str: string): Buffer {
        return Buffer.from(str.split(".").map((n) => {
            return parseInt(n, 10);
        }));
    }

    static _ipv6Str2Buf128(str: string): Buffer {
        // Expand the double colon if it exists
        const colons = str.match(/:/g);
        const colonCount = colons ? colons.length : 0;
        str = str.replace("::", ::${":".repeat(7 - colonCount)});
        
        // Expand leading zeroes in each hextet
        const hextets = str.split(":").map(h => h.padStart(4, "0"));

        // It's an IPv4 mapped IPv6 address
        if (hextets[hextets.length - 1].split('.').length === 4 &&
            hextets[hextets.length - 2].toUpperCase() === "FFFF") {
            const buf = Buffer.alloc(16);
            buf.writeUInt32BE(0xFFFF, 8);
            STUNHelpers._ipv4Str2Buf32(hextets[hextets.length - 1]).copy(buf, 12);
            return buf;
        }

        // It's a regular IPv6 address
        return Buffer.from(hextets.join(""), "hex");
    }
 */
