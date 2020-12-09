import { Driver } from "neo4j-driver"
import { neoDriver } from "../../config/app";

export type friend = { username: string }

export default class FriendShipRepository {
    private readonly driver: Driver

    constructor() {
        this.driver = neoDriver;
    }

    async getAllFriendsOfUser(username: string) {
        const result = await this.exec(
            `MATCH (a:user { username: '${username}' })--(b)` +
            `RETURN b.username`
        );

        console.log(result);

        return result.map(e => e.toString());
    }

    async createUser(username: string) {
        const result = await this.exec(
            `CREATE (a:User {username: "${username}"})`
        );
    }

    async deleteUser(username: string) {
        const result = await this.exec(
            `MATCH (a:User {username: "${username}"})` +
            `DETACH DELETE a`
        );

        return result;
    }

    async createFriendship(username: string, friendName: string) {
        const result = await this.exec(
            `MATCH (a:User {username: "${username}"}) ` +
            `MATCH (b:User {username: "${friendName}"}) ` +
            'MERGE (a)-[:FRIENDS]-(b)'
        );

        return { message: `${username} and ${friendName} are now friends!` };
    }

    async deleteFriendship(username: string, friendName: string) {
        const result = await this.exec(
            `MATCH (a:User {username: "${username}"}) ` + 
            `MATCH (b:User {username: "${friendName}"}) ` + 
            'MATCH (a)-[r]-(b) ' + 
            'DELETE r'
        );

        return { message: `${username} and ${friendName} are no friends anymore.` };
    }

    private async exec(query: string) {
        try {
            const session = this.driver.session();
            
            const result = await session.run(query);
    
            await session.close();
    
            return result.records.map((e) => e.toObject());
        } 
        catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}