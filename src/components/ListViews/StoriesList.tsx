import React, {useRef} from "react";
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View, 
    TouchableOpacity,
    Image
} from "react-native"; 
import theme from '../../../app/styles/theme.styles';
import {
    get, 
    getAlamatByCategory,
    getRecommendations
} from '../api/Alamat'; 
 
class StoriesList extends React.Component<any, any> { 

    constructor(props:any) {
        super(props) 
        this.state = {
            stories: {
                title: {rendered: String},
                excerpt: {rendered: String},
                id: Number,
                error:Boolean
            },
            loading:true,
            query: '',
            totalRecords: 0
        } 
    }   

    componentDidMount() { 
        this.fetchStories();
    }

    async fetchStories(query = "", page = 1, categoryId = 0) { 
        let result:any = [];
        if (this.props.category) {
            let category = this.props.category ? this.props.category : categoryId;
            result = await await getAlamatByCategory(category, query, page); 
        } 
        else if (this.props.recommendations)
            result = await await getRecommendations(); 
        else 
            result = await await get(query);
          
        if (this.props.updateRecords) {
            this.props.updateRecords(result.totalRecords);
            this.props.updateTotalPage(result.totalPages);
        } 
        this.setState({stories: result.data,loading:false});
    }

    displayStory() {  
        return this.state.stories.map((item:any, key:number) => {   
            let excerpt = item.excerpt.rendered.replace(/<p>|<\/p>/g, '');
            const shortenExcerpt = excerpt.substring(0, 68) + '...';  
            return <TouchableOpacity
                key={key}
                onPress={() => { 
                    this.props.navigation.navigate('Story', {id: item.id})
                }}
                >
                <View style={styles.listItem}>
                    <View style={styles.imageContainer}>
                        {
                            item._embedded.hasOwnProperty("wp:featuredmedia") ? (
                                item._embedded['wp:featuredmedia'][0].source_url ? (
                                    <Image 
                                        style={styles.image}
                                        source={{uri: item._embedded['wp:featuredmedia'][0].source_url}}
                                    />
                                ) : null
                                
                            ) : null
                            
                        }
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.listTitle}>{item.title.rendered}</Text>   
                        <Text style={styles.excerpt}>{shortenExcerpt}</Text>
                        <Text style={styles.category}>Category: {item._embedded['wp:term'][0][0].name }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        }); 
    }

    networkErrorMsg() {
        return <Text>{this.state.stories.message}</Text>
    }

    render() {

        return (
            <SafeAreaView style={styles.container}>
                {this.state.loading ? <Text>Loading...</Text> : null}
                {this.props.title? (<Text style={styles.heading}>{this.props.title}</Text>): null}
                {
                    this.state.stories.error ? this.networkErrorMsg() : (
                        this.state.stories.length ? this.displayStory() : <Text>No story found</Text>
                    )
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    excerpt: {
        fontSize:theme.FONT_SIZE_SMALL,
        color:'#999999', 
    },
    category: {
        color:'rgba(0,0,0,0.5)', 
        fontSize:theme.FONT_SIZE_SMALL
    },
    image: {
        width:'100%',
        height:90,
        borderRadius:5,
        resizeMode:'contain'
    }, 
    container: {
        paddingRight:20,
        paddingLeft:20
    },
    imageContainer: {
        width:'25%'
    },
    descriptionContainer: {
        width:'75%',
        paddingLeft:15
    },
    heading: {
        fontSize:theme.FONT_SIZE_LARGE,
        color:theme.headingColor, 
        marginTop:10,
        marginBottom:10
    }, 
    listItem: {   
        display:'flex',
        flexDirection:'row', 
        paddingBottom: 15,
        paddingTop:15,
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
        borderRadius:10,
        marginBottom:10
    },
    listTitle: {
        fontSize:theme.FONT_SIZE_REGULAR,
        color:theme.headingColor,
        fontFamily:'Poppings-ThinItalic',
        marginBottom:5
    }
})

export default StoriesList;