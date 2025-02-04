import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleCard from '../socialDataCards/SocialDataCards';
import Facebook from "./facebook.png"
import Instagram from "./instagram.png"
import Linkedin from "./linkedin.png"
import Twitter from "./twitter.png"
import DougnutChart from '../charts/doughnut/DougnutChart';
import LineChart from '../charts/line/LineChart';
import { Grid, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import FacebookIcon from '@material-ui/icons/Facebook';
import Paper from '@material-ui/core/Paper';
import  BarChart  from '../charts/bar/BarChart';
import InstagramIcon from '@material-ui/icons/Instagram';
import Axios from 'axios';
import cookies from 'react-cookies';
import Character from '../charts/character/Character';
//constants

const drawerWidth = 240;
let usernameDisplay='gowithbang2'
const documentID = '604866549c7f42544d67f493'
const url='https://analytica-parsb-api.herokuapp.com'
const useStyles = makeStyles((theme) => ({
    dataSpace:{
      margin:theme.spacing(2),
      padding:theme.spacing(2),
      height:"55vh"
    },
    textDataSpace:{
      margin:theme.spacing(2),
      padding:theme.spacing(2),
      height:"15vh"
    },
    feedSpace:{
      margin:theme.spacing(2),
      height:"135vh",
      overflowY:"scroll",
      padding: '6px 16px',
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.4em'
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
      }
    },
    timelineContent:{
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
      wordWrap: 'break-word',
      width:"18vw"
  },
  likeComment:{
      display:"flex",
      justifyContent:"flex-start",
      marginTop:theme.spacing(2),
      marginBottom:theme.spacing(2),
  },
  likeComItem:{
      marginLeft:theme.spacing(4),
      marginRight:theme.spacing(2),
  },
  timelineTitle:{      
      marginLeft: theme.spacing(2),
  },
  socialSnippets:{
      marginTop:theme.spacing(2),
      marginBottom:theme.spacing(2),
      display:"flex",
  },
  socialSnippetIcon:{
    backgroundColor:theme.palette.primary.main,
  },
  socialSnippetIconInner:{
    color:"#ffffff"
  },
  textData:{
    marginTop:theme.spacing(2)
  },
  '@media only screen and (max-width: 600px)':{
    dataSpace:{
      margin:theme.spacing(2),
      padding:theme.spacing(2),      
      height:"45vh"
    },
    textDataSpace:{
      margin:theme.spacing(2),
      padding:theme.spacing(2),
      height:"25vh"
    },
    textDataSpaceText:{
      marginTop:theme.spacing(2)
    },
    feedSpace:{
      margin:theme.spacing(2),
      height:"60vh",
      overflowY:"scroll",
      padding: '6px 16px',
    },
    timelineContent:{
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2),
      wordWrap: 'break-word',
      width:"70vw"
  },
  textData:{
    marginTop:theme.spacing(2),
    fontSize:theme.spacing(1.7)
  },
  textDataTitle:{
    fontSize:theme.spacing(1.7)
  }
  }
  }));

  

  export default function InstagramDash() {

    (function() {
      let tokenValue= cookies.load('Token') ;
      if (tokenValue) {
        Axios.defaults.headers.common['Authorization'] = tokenValue;
      } else {
        Axios.defaults.headers.common['Authorization'] = null;
      
      }
    })();
    const classes = useStyles();

    const [instaData, setInstaData] = useState({})
    const [instaFeeds, setInstaFeeds] = useState([])
    
  //   const [instaData, setInstaData] = useState({series:[],options:{labels:[],
  //     dataLabels:{
  //     enabled: false,
  // },
  // legend: {
  //     show: true,
  //     position: 'bottom',
  //     horizontalAlign: 'center', 
  //     floating: false,
  //     fontSize: '12px',
  //     fontWeight: 400,
  //     inverseOrder: false,
  //     offsetX: 0,
  //     offsetY: 0,
  //     markers: {
  //         width: 12,
  //         height: 12,
  //         strokeWidth: 0,
  //         strokeColor: '#fff',
  //         radius: 24,
  //     },
  //     itemMargin: {
  //         horizontal: 5,
  //         vertical: 5
  //     },
  //     onItemClick: {
  //         toggleDataSeries: true
  //     },
  //     onItemHover: {
  //         highlightDataSeries: true
  //     },
  // },
  // chart: {
  //     animations: {
  //         enabled: true,
  //         easing: 'easeinout',
  //         speed: 800,
  //         animateGradually: {
  //             enabled: true,
  //             delay: 150
  //         },
  //         dynamicAnimation: {
  //             enabled: true,
  //             speed: 350
  //         }
  //     }
  // }}})
 
  const [instaLineData, setInstaLineData] = useState({series:[{data:[]}],options:{xaxis:{categories:[]}}})
  const [socialInfo, setSocialInfo] = useState([{caption:"", likes:0, comments:0, timestamp:0, thumbnail:""}])
//functions

// const similarCharacters = () => {
//   let charArr=[];
//   let userObj={};
//   Axios
//           .get(url+"/analytica/analysis/profile/getsimilarcharacters/jeffbezos" )
//           .then(response => {
//             console.log(response.data)
//             userObj = {
//               userName:"Jeff Bezos",
//               profilePic:response.data.profilePic
//             }
//             charArr.push(userObj)
//             response.data.chainedData.forEach(el=>{
//               charArr.push({
//                 userName:el.full_name,
//                 profilePic:el.profile_pic_url
//               })
//             })                                  
//           })
//           .catch(err => {
//               console.log(err)
//           })

//           setUserData(charArr)
          
//           dispatch(addUser(userObj));
//           dispatch(addCharacter(charArr));
// }

// useEffect(() => {
//   similarCharacters();

// }, [])

  const instaCharts = () => {
    
      Axios
          .post(url+`/analytica/analysis/profile/engagement/`+usernameDisplay)
          .then(response => {
                setInstaLineData({
                  series:[{data:response.data.postLikes}],
                  options:{
                    xaxis:{
                      categories:response.data.postdates
                    }
                  }
                
                })

                setInstaData({
                  "engagement": response.data.engagement,
                  "likes": response.data.likes,
                  "comments": response.data.comments,
                  "posts": response.data.posts,
                  "followers": response.data.followers,
                  "postFrequency": response.data.postFrequency,
                })
              
                              
          })
          .catch(err => {
              console.log(err)
          })
          
          }
  
const userFeeds= async ()=>{
  const results=await Axios.get(url+'/analytica/instagram/personalprofile/getfeeds')
  let feedArray=[];
  console.log('userFeeds')
   console.log( results.data.data.user.edge_web_feed_timeline.edges[0])
  results.data.data.user.edge_web_feed_timeline.edges.forEach((el)=>{
  
    if(el.node.__typename=="GraphSidecar"||el.node.__typename=="GraphImage"||el.node.__typename=="GraphVideo")
    {
     
      let obj={
        text:el.node.edge_media_to_caption.edges[0].node.text,
        commentsCount:el.node.edge_media_to_comment.count,
        image:el.node.owner.profile_pic_url,
        Username:el.node.owner.username,
        likesCount:el.node.edge_media_preview_like.count
      }
      feedArray.push(obj)
    }
   
  })
  console.log(feedArray)
    setInstaFeeds(feedArray)



}
 

  useEffect(() => {
    console.log('here')
    instaCharts();
 
                                                                           
  }, [])
  useEffect(() => {
      
    console.log('here')

    userFeeds();
                                                                           
  }, [])
  const socialData = () => {
  
      Axios
          .get(`https://analytica-parsb-api.herokuapp.com/analytica/instagram/tags/${documentID}/download`)
          .then(response => {
              const negData = response.data.negatives;
              setSocialInfo(negData);
          })
          .catch(err => {
              console.log(err);
          })
          
              
          }
  
  
  
  
  useEffect(() => {

     socialData();
                                                                           
  }, [])

  
const EngagementData={
  series:[{data:[0.047,0.059,instaData.engagement,0.05]}],options:{xaxis:{categories:["World","India","User","Optimal"]}}
}
const postFrequencyData={
  series:[{data:[2,3,instaData.postFrequency,1]}],options:{xaxis:{categories:["World","India","User","Optimal"]}}
}
  
  
    return (
      <div className={classes.twitterRoot}>
        <CssBaseline />  
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Paper elevation={3} className={classes.textDataSpace}>
            <Grid container>
              <Grid item xs={4} sm={2} className={classes.textDataSpaceText}>
                <Typography align="center" className={classes.textDataTitle}>
                Engagement
                </Typography>
                <Typography align="center" className={classes.textData}>
                  {instaData.engagement}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2} className={classes.textDataSpaceText}>
                <Typography align="center" className={classes.textDataTitle}>
                  Likes
                </Typography>
                <Typography align="center" className={classes.textData}>
                {instaData.likes}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2} className={classes.textDataSpaceText}>
                <Typography align="center" className={classes.textDataTitle}>
                  Comments
                </Typography>
                <Typography align="center" className={classes.textData}>
                {instaData.comments}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2} className={classes.textDataSpaceText}>
                <Typography align="center" className={classes.textDataTitle}>
                  Posts
                </Typography>
                <Typography align="center" className={classes.textData}>
                {instaData.posts}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2} className={classes.textDataSpaceText}>
                <Typography align="center" className={classes.textDataTitle}>
                  Followers
                </Typography>
                <Typography align="center" className={classes.textData}>
                {instaData.followers}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={2} className={classes.textDataSpaceText}>
                <Typography align="center" className={classes.textDataTitle}>
                  Post Frequency
                </Typography>
                <Typography align="center" className={classes.textData}>
                {instaData.postFrequency}
                </Typography>
              </Grid>
            </Grid>
            </Paper>
            <Grid container>
              <Grid item xs={12} sm={6} align="center">
                <Paper elevation={3} className={classes.dataSpace}>
                  <Typography variant="body1" color="textPrimary"> 
                    Likeability Analysis
                  </Typography>
                  <LineChart data = {instaLineData} width = "280" height = "300"/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <Paper elevation={3} className={classes.dataSpace}>
                  <Typography variant="body1" color="textPrimary"> 
                   Engagement Details
                  </Typography>
                  <BarChart data = {EngagementData} width = "280" height = "300"/>
                </Paper>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} align="center">
                <Paper elevation={3} className={classes.dataSpace}>
                  <Typography variant="body1" color="textPrimary"> 
                   Frequency Details
                  </Typography>
                  <BarChart data = {postFrequencyData} width = "280" height = "300"/>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} align="center">
                <Paper elevation={3} className={classes.dataSpace}>
                  <Typography variant="body1" color="textPrimary"> 
                    Character Matching
                  </Typography>
                  <Character/>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
          {/* let obj={
        text:el.node.edge_media_to_caption.edges[0].node.text,
        commentsCount:el.node.edge_media_to_comment.count,
        image:el.node.owner.profile_pic_url,
        Username:el.node.owner.username,
        likesCount:el.node.edge_media_preview_like.count
      } */}
            <Paper elevation={3} className={classes.feedSpace} >
              {instaFeeds.map((item, index) => (

                  <div className={classes.socialSnippets} key={index}>
                      <Avatar className={classes.socialSnippetIcon}>

                        <InstagramIcon className={classes.socialSnippetIconInner}/>

                      </Avatar>
                
                      <div>
                        <Typography className={classes.timelineTitle} variant="h6" component="h1">
                          {item.sentiment}
                        </Typography>
                        
                        <Typography className={classes.timelineContent}>{item.text}</Typography>
                        <div className={classes.likeComment}>
                            <Typography className={classes.likeComItem}>{item.likesCount}</Typography>
                            <ThumbUpIcon color="primary"/>
                            <Typography className={classes.likeComItem}>{item.commentsCount}</Typography>
                            <CommentIcon color="primary"/>
                        </div>
                  <Divider/>
                        </div>
                  </div>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }