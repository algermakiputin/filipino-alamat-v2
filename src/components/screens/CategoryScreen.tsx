import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    Text,
    TextInput
} from 'react-native';
import StoriesList from '../ListViews/StoriesList';
import themeStyles from '../../../app/styles/theme.styles';

class CategoryScreen extends React.Component<any,any> {

    render() {

        return (
            <SafeAreaView>
                <View style={styles.container}> 
                    <TextInput 
                        style={styles.searchbox}
                        placeholder="Search..."
                    />
                    <Text style={styles.heading}>Mga alamat tungkol sa Tao</Text> 
                    
                </View>
                <ScrollView>
                    <StoriesList 
                        title='' 
                        navigation={this.props.navigation} 
                        />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight:20,
        paddingLeft:20
    },
    headerImage: { 
        backgroundColor:"#333",
        borderRadius:10, 
        display:'flex',
        justifyContent:'center', 
        height:210
    },
    searchbox: {
        backgroundColor:"#ffffff",
        marginTop:15,
        borderColor:"#999999",
        borderWidth:1,
        borderRadius:10,
        paddingLeft:15,
        height:45
    },
    heading: {
        fontSize:themeStyles.FONT_SIZE_MEDIUM,
        color:"#000", 
        marginTop:15,
        marginBottom:10
    }, 
    cover: {
        width:'100%',
        height:'100%', 
        resizeMode:'cover',
        borderRadius:10, 
        top:0,
        position:'absolute'
    
    },
    coverText: {
        color:"#fff",
        paddingRight:30,
        fontSize: themeStyles.FONT_SIZE_LARGE,
        fontWeight:'bold',
        textAlign:'center',
        paddingTop:20,
    
    }
});

export default CategoryScreen;