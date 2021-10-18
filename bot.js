const {ActivityHandler} = require('botbuilder');
const validator = require('validator');
const {FetchWeather} = require('./api/WeatherDetails');
const axios = require('axios');



const questions = {
    none : "none",
    name : "name",
    phone : "phone",
    email : "email",
    city : "city",
}


class WeatherBot extends ActivityHandler{
    constructor(userState,conversationState){
        super();

        if(!userState) throw new Error('User State is not found');
        if(!conversationState) throw new Error('Conversation State is not Found');

        this.userState = userState;
        this.conversationState = conversationState;

        this.userData = this.userState.createProperty('USER_DATA_ACCESSOR');
        this.conversationData = this.conversationState.createProperty('CONVERSATION_DATA_ACCESSOR');
        this.WelcomeUser = this.userState.createProperty('WELCOMED_USER');

        this.onMembersAdded(async(context,next)=>{
            const membersAdded = context.activity.membersAdded;
            let welcome;
            for(let cnt = 0; cnt < membersAdded.length; cnt++){
                if(membersAdded[cnt].id !== context.activity.recipient.id){
                    welcome = `Welcome ${membersAdded[cnt].name}`
                    await context.sendActivity(welcome)
                }
            }

            await next();
        })

        this.onMessage(async(context,next) =>{
            const flow = await this.conversationData.get(context,{
                lastQuestionAsked : questions.none
            });

            const profile = await this.userData.get(context,{});

            let didBotWelcomedUser = await this.WelcomeUser.get(context,false)

            if(didBotWelcomedUser == false){
                didBotWelcomedUser = true;
            }

            await this.UserDetails(flow,profile,context);

            await next();
        });
    }

    async run(context) {
        await super.run(context);
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
      }

    async UserDetails(flow,profile,context){
        let input = context.activity.text;
        let result;
        switch(flow.lastQuestionAsked){
            case questions.none : await context.sendActivity('What is Your Name ? ');
                                 flow.lastQuestionAsked = questions.name;
                                 break;
            case questions.name : result = await this.ValidateName(input);
                                 if(result.success){
                                     profile.name = result.name;
                                     await context.sendActivity(`Saving Your Name as ${profile.name}`);
                                     await context.sendActivity('What is Your Phone Number ? ');
                                     flow.lastQuestionAsked = questions.phone;
                                 }
                                 else
                                 {
                                     await context.sendActivity(result.message)
                                 }
                                 break;
            case questions.phone : result = await this.ValidatePhone(input);
                                 console.log(result);
                                if(result.success){
                                profile.phone = result.phone;
                                await context.sendActivity(`${profile.name} saving your phone as ${profile.phone}`);
                                await context.sendActivity('What is Your Email ? ');
                                flow.lastQuestionAsked = questions.email;
                                }
                                else
                                {
                                    await context.sendActivity(result.message)
                                }
                                break;
            case questions.email : result = await this.ValidateEmail(input);
                                 console.log(result);
                                if(result.success){
                                profile.email = result.email;
                                await context.sendActivity(`${profile.name} saving your email as ${profile.email}`);
                                await context.sendActivity('You want to find Weather Details of which City ? ');
                                flow.lastQuestionAsked = questions.city;
                                }
                                else
                                {
                                    await context.sendActivity(result.message)
                                }
                                break;
            case questions.city : result = await this.ValidateCity(input);
                               console.log(result);
                               if(result.success){
                               profile.city = result.city;
                               await context.sendActivity(`Fetching Weather Details of ${profile.city}.....`);

                               let weather = await FetchWeather(profile.city);
                               await context.sendActivity(weather);
                      
                               }
                               else
                               {
                                   await context.sendActivity(result.message)
                               }
                               break;
        }
    }

    async ValidateName(input){
        const validate = input;
        console.log(validate);
        return validate != undefined
        ? { success : true, name : input }
        : { success : false, message : 'Please enter a name that contains at least one character.'}
    }

    async ValidateCity(input){
        const validate = input;
        console.log(validate);
        return validate != undefined
        ? { success : true, city : input }
        : { success : false, message : 'Please enter a city name that contains at least one character.'}
    }

    async ValidatePhone(input){
        const validate = validator.isMobilePhone(input)
        console.log(validate);
        if(validate)
        {
        return { success : true, phone : input }
        }
        else{
        return { success : false, message : 'Please enter a valid phone number'}
        }
    }

    async ValidateEmail(input){
        const validate = validator.isEmail(input)
        console.log(validate);
        if(validate)
        {
        return { success : true, email : input }
        }
        else{
        return { success : false, message : 'Please enter a valid email'}
        }
    }
}

module.exports.WeatherBot = WeatherBot;