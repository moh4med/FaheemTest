/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as Animatable from 'react-native-animatable';


export const Height = Dimensions.get('screen').height
export const Width = Dimensions.get('screen').width
MyCustomTextInput = Animatable.createAnimatableComponent(TextInput);
MyCustomTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
MyCustomFlatList = Animatable.createAnimatableComponent(FlatList);

const CustomHeader = ({ header }) => {
  return (
    <View style={{ width: "100%", height: "10%", backgroundColor: "orange", justifyContent: "center", alignItems: "center" }}>
      <Animatable.Text
        style={{ color: "#fff" }}
        animation="zoomInUp"

      >{header}</Animatable.Text>
    </View>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      Questions: [],
      QuizWorking: false,
      currentQuestionIndex: 0,
      Score: 0,
      QuestionAnswered: false,
      prevAns: "",
      totalTime: 0,



      subject: "",
      cities: [],
      keyWord: "",
      location_id: -1,
      tutors: [],
      firstStep:true,
    }
  }
  componentDidMount() {
    this.getCities();
  }


  getCities = () => {
    this.setState({ isLoading: true }, () => {

      fetch("https://faheemapp.com/api-server/api/search/locations", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key_val: '1'
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("TAG", "responseJson", responseJson)
          this.setState({ cities: responseJson, isLoading: false })
        })
        .catch((error) => {
          console.error("TAG", "error", error);
        });
    })
  }




  chooseSubject = (s) => {
    this.setState({ subject: "" })
  }
  renderSubjects = () => {
    return (
      <Animatable.View
        ref={ref => this.subjectview = ref}
        style={{
          alignItems: "center",
          width: Width,
          position: "absolute",
          top: Height * .16
        }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: Width * .8,
          height: Height * .05,
          marginTop: Height * .03
        }}>
          <TouchableOpacity onPress={() => { this.chooseSubject("Engineering") }}>
            <Animatable.Text
              animation="zoomInUp"
              style={{ color: this.state.subject == "Engineering" ? "orange" : "#555" }}
            >Engineering</Animatable.Text>
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity onPress={() => { this.chooseSubject("Science") }}>
            <Animatable.Text
              animation="zoomInUp"
              style={{ color: this.state.subject == "Science" ? "orange" : "#555" }}
            >Science</Animatable.Text>
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity onPress={() => { this.chooseSubject("Law") }}>
            <Animatable.Text
              animation="zoomInUp"
              style={{ color: this.state.subject == "Law" ? "orange" : "#555" }}
            >Law</Animatable.Text>
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity onPress={() => { this.chooseSubject("Medicine") }}>
            <Animatable.Text
              animation="zoomInUp"
              style={{ color: this.state.subject == "Medicine" ? "orange" : "#555" }}
            >Medicine</Animatable.Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: Width * .4,
          height: Height * .05,
        }}>
          <TouchableOpacity onPress={() => { this.chooseSubject("Business") }}>
            <Animatable.Text
              animation="zoomInUp"
              style={{ color: this.state.subject == "Business" ? "orange" : "#555" }}
            >Business</Animatable.Text>
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity onPress={() => { this.chooseSubject("English") }}>
            <Animatable.Text
              animation="zoomInUp"
              style={{ color: this.state.subject == "English" ? "orange" : "#555", }}
            >English</Animatable.Text>
          </TouchableOpacity>

        </View>
      </Animatable.View>
    )
  }
  Search = () => {
    // this.view.bounce(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
   
   




    // return
    let { location_id, keyWord } = this.state
    if (location_id == -1) {
      alert("please choose city");
      return;
    }
    if (keyWord == "") {
      alert("please choose course name");
      return;
    }
    if(this.state.firstStep){
      this.firstText.transitionTo({ left: Width }, 1000);
      this.secondText.transitionTo({ right: Width }, 1000);
      this.subjectview.transitionTo({ top: -Height, opacity: 0 }, 2000);
      this.modalview.transitionTo({ top: Height * .05, left: Width * .05, width: Width * .32 }, 1000);
      this.keywordview.transitionTo({ top: Height * .05, right: Width * .17, width: Width * .42, text: "asdf" }, 1000);
      this.searchbutton.transitionTo({
        top: Height * .05, right: Width * .05,
        width: Width * .12, borderRadius: 8, borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      }, 1000);
      this.setState({firstStep:false})
     }
    this.setState({ isLoading: true }, () => {

      fetch("https://faheemapp.com/api-server/api/search/tutors", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key_val: '1',
          location_id: location_id,
          keyWord: keyWord,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("TAG", "responseJson", responseJson)
          this.setState({ tutors: responseJson, isLoading: false })
        })
        .catch((error) => {
          console.error("TAG", "error", error);
        });
    })
  }
  render() {
    let { isLoading, cities } = this.state;
    return (
      <View style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}>
        <CustomHeader header={"Find a Tutor"} />
        <View style={{ flex: 1, width: Width, backgroundColor: "#fff", alignItems: "center" }}>
          <Animatable.Text
            ref={ref => this.firstText = ref}
            animation="zoomInUp"

            style={styles.text1}
          >Compare the best teacher and choose the most appropriate</Animatable.Text>

          <Animatable.Text
            ref={ref => this.secondText = ref}
            animation="zoomInUp"
            style={styles.text2}
          >Here is best tutor in</Animatable.Text>

          {this.renderSubjects()}
          <Animatable.View
            ref={ref => this.modalview = ref}
            style={{
              width: Width * .9,
              height: Height * .07,
              top: Height * .3,
              position: "absolute",

            }}>
            <ModalDropdown
              style={{
                borderWidth: StyleSheet.hairlineWidth, borderColor: "#555"
                , width: "100%",
                height: "100%",
                justifyContent: "center",
                padding: 6
              }}

              onSelect={(item, index) => {
                this.setState({ location_id: cities[item].id })
              }}
              textStyle={{ textAlign: "right", color: "#555", textAlignVertical: "center", fontSize: 16 }}
              defaultValue={"Select City"}
              options={cities.map((item) => item.name)} />
          </Animatable.View>
          <Animatable.View
            style={{
              width: Width * .9,
              height: Height * .07,
              position: "absolute",
              top: Height * .4,
            }}
            ref={ref => this.keywordview = ref}>
            <TextInput
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "#555",
                textAlign: "right",
                padding: 4,
                position: "absolute",
              }}
              onChangeText={(text) => {
                this.setState({ keyWord: text })
              }}
              placeholder="Search the course or test name"
            />
          </Animatable.View>
          <Animatable.View
            ref={ref => this.searchbutton = ref}
            style={{
              width: Width * .9,
              height: Height * .07,
              borderRadius: Width * .1,
              backgroundColor: "orange",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: Height * .5
            }}>

            <TouchableOpacity

              onPress={this.Search}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: Width * .1,
                backgroundColor: "orange",
                justifyContent: "center",
                alignItems: "center",

              }}>
              {this.state.firstStep&&<Animatable.Text
                animation="pulse" easing="ease-out" iterationCount="infinite"
                style={{ color: "#fff", fontSize: 16 }}>Search</Animatable.Text>}

{!this.state.firstStep&&<Image 
source={require('./search.png')}
style={{width:12,height:12,borderRadius:6,tintColor:"#fff"}}/>}
            </TouchableOpacity>
          </Animatable.View>

            {!this.state.firstStep&&<FlatList

              data={this.state.tutors}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              style={{ height: Height * .9, marginTop: Height * .2 }}
              contentContainerStyle={{ width: Width, backgroundColor: "snow", alignItems: "center" }}
              keyExtractor={(item, index) => "" + item.id}
              renderItem={
                ({ item, index }) => {

                  let x = ["slideInDown",
                    "slideInUp",
                    "slideInLeft",
                    "slideInRight"]
                  return (
                    <Animatable.View

                      animation={x[index % 4]}
                      useNativeDriver={true}
                      duration={600}
                      delay={0}
                      style={{
                        width: Width * .9,
                        height: Height * .2,
                        elevation: 5,
                        borderRadius: 4,
                        backgroundColor: "#fff",
                        marginVertical: 10,
                        paddingVertical: Height * .02,
                        paddingHorizontal: Width * .03
                      }}>
                      <View style={{ flex: 4, backgroundColor: "#fff", flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: "#555", fontSize: 13 }}>  SR{item.price}</Text>
                          <Text style={{ color: "#555", fontSize: 14 }}>per hour</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                          <Text style={{ color: "#555", fontSize: 20, fontWeight: "bold",textAlign:"right" }}>{item.username}</Text>
                          <Text style={{textAlign:"right"}}>⭐</Text>
                          <Text style={{ color: "#555", fontSize: 12,textAlign:"right" }}>qualification - {item.qualification} </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                          <Image
                            style={{ width: Width * .14, height: Width * .14, borderRadius: Width * .07, borderWidth: StyleSheet.hairlineWidth, borderColor: "#555" }}
                            source={{ uri: item.photo }}
                          />
                        </View>
                      </View>
                      <View style={{ flex: 2, backgroundColor: "#fff", alignItems: "flex-end" }}>
                        <FlatList

                          data={item.subjects}
                          extraData={this.state}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={{ height: Height * .9 }}
                          contentContainerStyle={{ alignItems: "center" }}
                          keyExtractor={(item, index) => "" + index}
                          renderItem={
                            ({ item, index }) => {

                              return (

                                <View style={{
                                  width: Width * .19,
                                  height: Height * .03,
                                  marginRight: 4,
                                  borderRadius: Width * .03,
                                  justifyContent: "center", alignItems: "center",
                                  backgroundColor: "orange"
                                }}>
                                  <Text style={{ color: "#fff" }}>{item.subject_name}</Text>
                                </View>


                              )
                            }
                          }
                        />
                      </View>
                    </Animatable.View>


                  )
                }
              }
            />}

        </View>


        {isLoading && <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute", zIndex: 5
          }}>
          <View style={{ width: Width * .2, height: Width * .2, elevation: 6, borderRadius: 4, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>

            <ActivityIndicator color="orange" size="large" />
          </View>

        </View>
        }
      </View>
    );
  }

};

const styles = StyleSheet.create({
  text1: {
    width: Width * .86,
    textAlign: "center",
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    top: Height * .05
  },
  text2: {
    width: Width * .86,
    textAlign: "center",
    color: "orange",
    fontSize: 22,
    fontWeight: "900",
    position: "absolute",
    top: Height * .12
  }
});

export default App;
