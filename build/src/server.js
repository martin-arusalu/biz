'use strict';

var _mongodb = require('mongodb');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = 'http://localhost';
var PORT = 2018;
var MONGO_URL = 'mongodb://admin:Testimiseks1@ds125181.mlab.com:25181/biz';

var prepare = function prepare(o) {
  o._id = o._id.toString();
  return o;
};

var start = async function start() {
  try {
    var db = await _mongodb.MongoClient.connect(MONGO_URL);

    var Users = db.collection('users');
    var Companies = db.collection('companies');
    var Products = db.collection('products');
    var CompaniesProducts = db.collection('companies_products');

    var typeDefs = ['\n      type Query {\n        user(_id: String): User\n        product(_id: String): Product\n        company(_id: String): Company\n        products: [Product]\n        companyProducts(companyId: String): [CompanyProduct]\n      }\n\n      type User {\n        _id: String\n        username: String\n        Password: String\n      }\n\n      type Company {\n        _id: String\n        userId: String\n        name: String\n        reputation: Int\n      }\n\n      type Product {\n        _id: String\n        name: String\n      }\n\n      type CompanyProduct {\n        _id: String\n        companyId: String\n        productId: String\n      }\n\n      type Mutation {\n        createCompanyProduct(companyId: String, productId: String): CompanyProduct\n        createUser(username: String, password: String): User\n        createCompany(userId: String, name: String, reputation: Int): Company\n        createProduct(name: String): Product\n      }\n\n      schema {\n        query: Query\n        mutation: Mutation\n      }\n    '];

    var resolvers = {
      Query: {
        user: async function user(root, _ref) {
          var _id = _ref._id;

          return prepare((await Users.findOne((0, _mongodb.ObjectId)(_id))));
        },
        product: async function product(root, _ref2) {
          var _id = _ref2._id;

          return prepare((await Products.findOne((0, _mongodb.ObjectId)(_id))));
        },
        company: async function company(root, _ref3) {
          var _id = _ref3._id;

          return prepare((await Companies.findOne((0, _mongodb.ObjectId)(_id))));
        },
        products: async function products() {
          return (await Products.find({}).toArray()).map(prepare);
        },
        companyProducts: async function companyProducts(root, _ref4) {
          var companyId = _ref4.companyId;

          return (await CompaniesProducts.find({ companyId: companyId }).toArray()).map(prepare);
        }
      },
      User: {
        company: async function company(_ref5) {
          var _id = _ref5._id;

          return (await Companies.find({ userId: _id }).toArray()).map(prepare);
        }
      },
      Company: {
        user: async function user(_ref6) {
          var userId = _ref6.userId;

          return prepare((await Users.findOne((0, _mongodb.ObjectId)(userId))));
        },
        companyProducts: async function companyProducts(_ref7) {
          var _id = _ref7._id;

          return (await CompaniesProducts.find({ companyId: _id }).toArray()).map(prepare);
        }
      },
      CompanyProduct: {
        product: async function product(_ref8) {
          var productId = _ref8.productId;

          return prepare((await Products.findOne((0, _mongodb.ObjectId)(productId))));
        },
        company: async function company(_ref9) {
          var companyId = _ref9.companyId;

          return prepare((await Companies.findOne((0, _mongodb.ObjectId)(companyId))));
        }
      },
      Mutation: {
        createCompanyProduct: async function createCompanyProduct(root, args) {
          var res = await CompaniesProducts.insert(args);
          return prepare((await CompaniesProducts.findOne({ _id: res.insertedIds[1] })));
        },
        createUser: async function createUser(root, args) {
          var res = await Users.insert(args);
          return prepare((await Users.findOne({ _id: res.insertedIds[1] })));
        },
        createCompany: async function createCompany(root, args) {
          var res = await Companies.insert(args);
          return prepare((await Companies.findOne({ _id: res.insertedIds[1] })));
        },
        createProduct: async function createProduct(root, args) {
          var res = await Products.insert(args);
          return prepare((await Products.findOne({ _id: res.insertedIds[1] })));
        }
      }
    };

    var schema = (0, _graphqlTools.makeExecutableSchema)({
      typeDefs: typeDefs,
      resolvers: resolvers
    });

    var app = (0, _express2.default)();

    app.use((0, _cors2.default)());

    app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: schema }));

    var homePath = '/graphiql';

    app.use(homePath, (0, _graphqlServerExpress.graphiqlExpress)({
      endpointURL: '/graphql'
    }));

    app.listen(PORT, function () {
      console.log('Visit ' + URL + ':' + PORT + homePath);
    });
  } catch (e) {
    console.log(e);
  }
};

start();