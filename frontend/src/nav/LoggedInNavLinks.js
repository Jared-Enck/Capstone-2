import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import GroupIcon from '@material-ui/icons/Group';
import CollectionsIcon from '@material-ui/icons/Collections';
import Grid from '@material-ui/core/Grid';

export default function LoggedInNavLinks({
  isSmallWindow, 
  classes
}) {
  const {currentUser} = useContext(UserContext);

  const loggedInUserLinks = (
    <>
      <NavLink 
        className={classes}
        to={`/gameCollections/${currentUser.username}`}
      >
        <span>
          <CollectionsIcon />
        </span>
        <span>
          Collection
        </span> 
      </NavLink>
      <NavLink 
        className={`${classes}`} 
        to='/groups'
      >
        <span>
          <GroupIcon />
        </span>
        <span>
          Groups
        </span> 
      </NavLink>
    </>
  );

  const loggedInIconLinks = (
    <>
      <NavLink 
        className={classes} 
        to={`/gameCollections/${currentUser.username}`}
      >
        <CollectionsIcon />
      </NavLink>
      <NavLink className={classes} to="/groups">
        <GroupIcon />
      </NavLink>
    </>
  );

  return (
    <>
      {isSmallWindow ? loggedInIconLinks : loggedInUserLinks}
    </>
  );
};