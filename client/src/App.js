import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [check, setCheck] = useState(true)

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path={["/movies/:id", "/update-movie/:id"]}
        render={props => {
          return <Movie check={check} {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
        path='/update-movie/:id'
        render={props => (
          <UpdateMovie setCheck={setCheck} check={check} {...props}/>
        )}
      />
    </>
  );
};

export default App;
