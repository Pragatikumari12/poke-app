import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchPage from './component/SearchPage';
import ListingPage from './component/ListingPage';
import DetailsPage from './component/DetailsPage';
import BookmarksScreen from './component/BookmarksScreen';

function App() {
  return (
    
      <div>
        <Router>
        <Route exact path="/" component={SearchPage} />
        <Route exact path="/Listing" component={<ListingPage />} />
        <Route exact path="/details/:id" component={<DetailsPage />} />
        <Route exact path="/bookmarks" component={<BookmarksScreen />} />
        </Router>
      </div>
    
  );
}

export default App;
