import React, { useEffect, useState,useCallback } from "react";
import "./styles.css";
import Login from "./Login";
import Register from "./Register";
import HomeHeader from "./HomeHeader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./Firebase";
import PostUI from './PostUI';

const App = () => {
  const APP_KEY = 'ugzHUtoZrNUfhjIRemn8qUmD1zRpIaz1';

  const [gif, setGif] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('tranding');
  const [postText, setpostText] = useState('')
  const [selectedGif, setselectedGif] = useState('')
  const [posts, setposts] = useState([])
  
   const [user, setUser] = useState([]);
  const getGifdata = useCallback( async() => {
    const request = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${APP_KEY}&limit=10`;
    fetch(request)
    .then(res => res.json())
      .then((data) => {
        console.log(data.data);
        setGif(data.data);
      })
  
  
  },[query])
  useEffect(() => {
    window.addEventListener('mouseup',function(event){
      var gifSearchBox = document.getElementById('gifSearchBox');
      if(event.target !== gifSearchBox && event.target.parentNode !== gifSearchBox){
        gifSearchBox.style.display = 'none';
      }
});  

    getGifdata();
  }, [getGifdata, query]);

const updateSearch = event =>{
  setSearch(event.target.value);
  setQuery(event.target.value);

};

  const updatePostText = (event) => {
    setpostText(event.target.value);
  };
  const addPost = event => {
    event.preventDefault();
    let postsTemp = posts
    postsTemp.push({ "postText": postText, "gifUrl": selectedGif })
    setposts(postsTemp)
    setpostText('');
    setselectedGif('');
    document.getElementById('gifSearchBox').style.display='none'
   
}
//  for firebase auth
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/:username/:uid">
            <HomeHeader user={user} />
            {/* <Profile user={user} /> */}
          </Route>
          <Route path="/">
            <HomeHeader user={user} selected />
            {/* <div className="app__page">
                <Sidebar user={user} />
                <div className="app__posts">
                  <Posts user={user} />
                </div>
                <Sidebar2 />
              </div> */}
          </Route>
        </Switch>
      </Router>
      <div className='postInputBox'>
        <div className="postHeader">
          <text>
Add Post
</text>
      </div>
      <form onSubmit={addPost} className="search-form">
        <input className="textInput" type="text" required placeholder="Write something here" value={postText} onChange={updatePostText}></input>
        {selectedGif?<img alt="gif" src={selectedGif}/>:<div></div>}
        <button className="gifButton" type='button' onClick={()=>{document.getElementById('gifSearchBox').style.display='block'}} >GIF</button>
        
         <div className="postFooter">
            <button className='postButton' type="submit">Post</button>
          </div>
          </form>
      <div id="gifSearchBox" style={{ display: "none"}}>
      
      <input className="search-bar" placeholder="Search" type="text" value={search} onChange={updateSearch}></input>
      
    
    <div className="row recipecontainer" >
{gif.map(gif =>(
<img onClick={()=>{setselectedGif(gif.images.fixed_width.url)}} style={{display:'block', margin:'auto'}} alt="imager" src={gif.images.fixed_width.url}/>))}
        </div>
        </div>
        </div>
      <div>
          {posts.map((post, index) => (
            <div>
             
              <PostUI post={post} index={index} />
              </div>
        ))}
        </div>
        
    
    </div>
  );
};
export default App;
