/** 
 * @file stun.type.ts
 * @fileoverview This file defines a class representing a container structure that works with specific data holders.
 * The class can be used to encapsulate data types and operate on these data.
 * Its properties provide flexibility when working with data structures.
 * 
 * @version 1.0.0
 * @license MIT License
 * @author Mert Özdemir <mertozdeemiir@icloud.com> (https://github.com/mertvision)
 * 
 */

// Class definition
class STUNType {
    // Types of class properties defined in the constructor.
    // Three properties are open to any type of data.
    type: any;
    bin: any;
    f: any;

    // Class properties are specified in the constructor function.
    // The 'type', 'bin', and 'f' parameters have default values set to null.
    // When an instance is created, the constructor is called and initializes properties with default null values.
    // Type definitions use ":", while assignments use "=".
    constructor(type: any = null, bin: any = null, f: any = null) {
        this.type = type;
        this.bin = bin;
        this.f = f;
    }
};

// Exporting the class for use in other files
export { STUNType };
