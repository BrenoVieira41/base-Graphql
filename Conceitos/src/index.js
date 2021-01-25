const { ApolloServer, gql } = require('apollo-server');

//  Em Graphql Toda request e POST
// E toda request bate no MESMO endPoint

//Query -> Obter informações (Get)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

/**
query {
	post {
		title
		author{
			name
			email
			active
		}
	}
}
PRATICIDADE TOTAL
 */

const typeDefs = gql `
	type User {
		_id: ID!
		name: String!
		email: String!
		active: Boolean!
	}

	type Post {
		_id: ID!
		title: String!
		content: String!
		author: User! #Pode ser feito um aninhamento direto assim pratificando muito o trabalho
	}

	type Mutation{
		createUser(name: String!, email: String!): User!
	}

	type Query {
		hello: String
		users: [User]!
		getUserByEmail(email: String!): User!
	}
`; //E utilizado o mapeamento de um pra um pra chamar a (Função)

const users = [
	{ _id: String(Math.random()), name: 'Bale', email: 'GanhaMuitoJogapoco@test.com', active: true},
	{ _id: String(Math.random()), name: 'Grisma', email: 'GanhaMuitoJogapoco2@test.com', active: false},
	{ _id: String(Math.random()), name: 'Draxer', email: 'GanhaMuitoJogapoco3@test.com', active: true},
];

const resolvers = {
	Query: {
		hello: () => 'Hello world',
		users: () => users,
		getUserByEmail: (_, args) => {
			return users.find((user) => user.email === args.email);
		}
	},
	Mutation: {
		createUser: (_, args) => {
			const newUser = {
				_id: String(Math.random()),
				name: args.name,
				email: args.email,
				active: true,
			};

			users.push(newUser);
			return newUser
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server started at ${url}`));