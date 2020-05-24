import React, { Component } from 'react';
import { ScrollView, View , Image } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { LEADERS } from '../shared/leaders.js';


function RenderLeader({leader}){
    return(
        <View key={leader.id} style={{flex: 1, flexDirection: "row", margin: 5}}>
          <Image
            resizeMode="cover"
            style={{height:50,width:50, margin: 2}}
            source={require('./images/alberto.png')}
          />
          <View style={{flex: 1,flexDirection: "column"}}>
          <Text h4 style={{ margin : 2}}>{leader.name}</Text>
          <Text>{leader.description}</Text>
          </View>
        </View>
    )
}

class About extends Component { 

    static navigationOptions = {
        title: 'About',
    };

    constructor(props){
        super(props);
        this.state = {
            leaders : LEADERS
        }
    }

    render(){

        const leadersR = this.state.leaders.map((leader)=>{
            return <RenderLeader leader={leader}/>
        })

        return(
            <ScrollView>
                <Card
                   featuredTitle="Our History" 
                   title="About us"
                >
                <Text>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, 
                you never know what will arrive on your plate the next time you visit us.
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, 
                that featured for the first time the world's best cuisines in a pan.
                </Text>
                </Card>
                <Card
                    title='Corporate Leadership'
                >
                {leadersR}
                </Card>
            </ScrollView>
        )
    }
}

export default About;