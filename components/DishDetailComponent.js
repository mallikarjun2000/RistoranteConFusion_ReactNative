import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Input,Rating } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/base_url';
import { postFavorite, postComment } from '../redux/ActionCreaters';

import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
      postFavorite: (dishId) => dispatch(postFavorite(dishId)),
      postComment: (comment) => dispatch(postComment(comment))
  })

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class RenderDish extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen : false,
            rating : 0,
            author: '',
            comment: ''
        }
        //this.toggleM = this.toggleM.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    ratingCompleted(rating1) {
        this.setState({
            rating: rating1
        })
        console.log("Rating is: " + rating)
      }      

    toggleModal(){
        console.log('change state');
        console.log(this.state.isModalOpen);
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
        console.log(this.state.isModalOpen);
    }

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
      }

      handleChange(evt){
          this.setState({
              [evt.target.name]: evt.target.value
          })
          console.log(evt.target.value);
      }

      submitComment(){
          const comment = {
              id: 0,
              dishId: this.props.dish.id,
              author: this.state.author,
              rating: this.state.rating,
              comment: this.state.comment,
              date: Date.now().toLocaleString()
          }
          console.log('comment at ', comment);
          this.props.postComment(comment);
      }

    handleView = ref => this.view = ref;

    render(){

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if ( dx < -200 )
                return true;
            else
                return false;
        }
    

    const dish = this.props.dish;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)){
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {this.props.favorite ? console.log('Already favorite') : this.props.onPress()}},
                    ],
                    { cancelable: false }
                );
            }
            else
            {
                this.toggleModal();
            }

            return true;
        }
    })
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleView}
                {...panResponder.panHandlers}>
                    <View>
                    <Card
                        featuredTitle={dish.name}
                        image={require('./images/uthappizza.png')}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={ this.props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => this.props.favorite ? console.log('Already favorite') : this.props.onPress()}
                        />
                    <Icon
                        raised
                        reverse
                        name='edit'
                        type='font-awesome'
                        color='#f50'
                        onPress={()=>this.toggleModal()}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }
                        />
                </Card>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isModalOpen}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View>
                    <Card>
                            <Rating type="star" onFinishRating={this.ratingCompleted} />
                            <Input 
                            value={this.state.author}
                            onChangeText={(value)=>this.setState({author: value})}
                            name='author'
                            type="text" 
                            placeholder="Author"/>
                            <Input
                            value={this.state.comment} 
                            name='comment'
                            onChangeText={(value)=>this.setState({comment: value})}
                            type="text" 
                            placeholder="Comment"/>
                            <Button title='save' onPress={()=>this.submitComment()}></Button>
                            <Button title='cancel' onPress={()=>this.toggleModal()}></Button>
                    </Card>
                    </View>
                </Modal>
                </View>
            </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
    }
}

class DishDetail extends Component {

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    postComment = {this.props.postComment}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
            </Animatable.View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);