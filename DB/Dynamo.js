const AWS = require('aws-sdk');
const {nanoid} = require('nanoid');

AWS.config.update({
    region : process.env.AWS_REGION,
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'users';

module.exports.addUser = async(profile) => {

    let user = {...profile,id:nanoid()};
    console.log(user);
    const params = {
        TableName : TABLE_NAME,
        Item : user
    };

    return await dynamoClient.put(params).promise();
    console.log('User Added Successfully')
}
