/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, orderId, origin, destination, quantity, shippingDate, driver,createDate) {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        const asset = {
            id: id,
            orderId: orderId,
            origin: origin,
            destination: destination,
            quantity: quantity,
            shippingDate: shippingDate,
            driver: driver,
            createDate: createDate
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }


    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

        // AssetExists returns true when asset with given ID exists in world state.
        async AssetExists(ctx, id) {
            const assetJSON = await ctx.stub.getState(id);
            return assetJSON && assetJSON.length > 0;
        }
    
        async TransferAsset(ctx, id, newOwner) {
            const assetString = await this.ReadAsset(ctx, id);
            const asset = JSON.parse(assetString);
            const oldOwner = asset.Owner;
            asset.Owner = newOwner;
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
            return oldOwner;
        }
    
    
}

module.exports = AssetTransfer;
