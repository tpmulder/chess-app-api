import { injectable } from "inversify";
import { Driver } from "neo4j-driver"
import { neoDriver } from "../../config/app";
import "reflect-metadata";

type Friend = { 
    user_id: string
    email: string
}

interface IFriendshipRepository {
    getAllFriendsOfUser(id: string): Promise<Friend[]>
    createUser(id: string, email: string): Promise<{ message: string }>
    deleteUser(id: string): Promise<{ message: string }>
    createFriendship(userid: string, friendId: string): Promise<{ message: string }>
    deleteFriendship(userid: string, friendId: string): Promise<{ message: string }>
}

@injectable()
class FriendshipRepository implements IFriendshipRepository {
    private readonly driver: Driver

    constructor() {
        this.driver = neoDriver;
    }

    async getAllFriendsOfUser(id: string) {
        const result = await this.exec(
            `MATCH (a:user {user_id: "${id}"})--(b)` +
            `RETURN b`
        );

        return (result[0] as any)._fields.map((e: any) => e.properties);
    }

    async createUser(id: string, email: string) {
        const result = await this.exec(
            `CREATE (a:User {user_id: "${id}", email:"${email}"}) ` +
            'RETURN a'
        );

        const user: Friend = (result[0] as any)._fields[0].properties;

        return { message: `created new user "${user.user_id}" with email "${user.email}"` };
    }

    async deleteUser(id: string) {
        const result = await this.exec(
            `MATCH(a:User {user_id: "${id}"}) ` +
            'WITH a, a.username AS u, a.user_id AS i ' +
            'DETACH DELETE a ' +
            'RETURN u, i'
        );

        const username: Friend = (result[0] as any)._fields[0];

        return { message: `${username} is deleted`}
    }

    async createFriendship(userId: string, friendId: string) {
        const result = await this.exec(
            `MATCH (a:User {email: "${userId}"}) ` +
            `MATCH (b:User {email: "${friendId}"}) ` +
            'MERGE (a)-[:FRIENDS]-(b) ' +
            'RETURN a, b'
        );

        const user: Friend = (result[0] as any)._fields[0].properties;
        const friend: Friend = (result[0] as any)._fields[1].properties;

        return { message: `${user.email} and ${friend.email} are now friends.` };
    }

    async deleteFriendship(userId: string, friendId: string) {
        const result = await this.exec(
            `MATCH (a:User {email: "${userId}"}) ` + 
            `MATCH (b:User {email: "${friendId}"}) ` + 
            'MATCH (a)-[r]-(b) ' + 
            'DELETE r ' +
            'RETURN a, b'
        );

        const user: Friend = (result[0] as any)._fields[0].properties;
        const friend: Friend = (result[0] as any)._fields[1].properties;

        return { message: `${user.email} and ${friend.email} are no longer friends.` };
    }

    private async exec(query: string) {
        try {
            const session = this.driver.session();      
            const result = await session.run(query);
    
            await session.close();
    
            return result.records;
        } 
        catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}

export { Friend, IFriendshipRepository, FriendshipRepository }