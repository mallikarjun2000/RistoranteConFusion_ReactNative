import React, { Component } from 'react';
import { ScrollView, View , Image } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { LEADERS } from '../shared/leaders.js';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/base_url';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function RenderLeader({leader}){
    return(
        <View key={leader.id} style={{flex: 1, flexDirection: "row", margin: 5}}>
          <Image
            resizeMode="cover"
            style={{height:50,width:50, margin: 2}}
            source={{uri: baseUrl+leader.image}}
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


    render(){
        const leadersR = this.props.leaders.leaders.map((leader)=>{
            return <RenderLeader leader={leader}/>
        })

        if(this.props.leaders.isLoading) {
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
                    <Loading/>
                </Card>
                </ScrollView>
            )
        }
        else
        if(this.props.leaders.errMess) {
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
                   <Text>{this.props.leaders.errMess}</Text>
                </Card>
                </Animatable.View>
            </ScrollView>
        }
        else{
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
                </Animatable.View>
            </ScrollView>
        )
        }
    }
}

export default connect(mapStateToProps)(About);