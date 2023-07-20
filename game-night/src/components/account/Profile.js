import React, {
  useContext,
  useEffect,
  lazy,
  Suspense
} from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import DataContext from "../../context/DataContext";
import {
  Stack,
  Typography,
  Grid,
  Avatar,
  Button
} from "@mui/material";
import { Edit } from '@mui/icons-material';
import ContentContainer from "../common/ContentContainer";
import CircularLoading from "../common/CircularLoading";

const CollectionComp = lazy(
  () => import("../games/Collection")
);

export default function Profile() {
  const { username } = useParams();
  const {
    navigate,
    userData,
    currentUser,
    getCurrentUser,
  } = useContext(UserContext);

  const {
    userGameIDs,
    collection,
    getCollection,
    getCollectionValue,
    colValue
  } = useContext(DataContext);

  const handleClick = () => {
    console.log('edit user:', username);
  };

  useEffect(() => {
    if (!userData) {
      getCurrentUser(username);
    } 
  }, [userData ,username, getCurrentUser]);

  useEffect(() => {
    if (!collection.length && userGameIDs.size) {
      // API requires additional comma at start and end of string
      const IdString = `,${[...userGameIDs].join(',')},`;
      getCollection(IdString);
    }
  }, [userGameIDs, getCollection, collection.length]);
  
  useEffect(() => {
    getCollectionValue();
  }, [getCollectionValue]);

  const noGamesMsg = (
    <Typography sx={{ color: "primary.text", paddingLeft: 2 }} variant="h5">
      There are no games in your collection.
    </Typography>
  );

  if (!currentUser) return navigate('/login');

  if (username !== currentUser) return navigate('/');

  return (
    <Stack>
      <ContentContainer>
        {
          userData
            ? (
              <Suspense fallback={<CircularLoading size={"2rem"} />}>
                <Grid
                  container
                  spacing={2}
                  direction={"row"}
                  alignItems={"flex-end"}
                  marginBottom={".3rem"}
                >
                  <Grid item>
                    <Avatar src={userData.imageURL} sx={{ width: 120, height: 120 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" color={"primary.text"}>
                      {userData.username}
                    </Typography>
                  </Grid>
                  <Grid item marginLeft={"auto"}>
                    <Button size="small" onClick={handleClick}>
                      <Edit
                        fontSize="medium"
                        sx={{
                          color: "primary.contrastText",
                          marginLeft: "auto"
                        }}
                      />
                    </Button>
                  </Grid>
                </Grid>
              </Suspense>
            )
            : null
        }
        {
          userGameIDs.size
            ? (
              collection.length
                ? (
                  <Suspense fallback={<CircularLoading size={"2rem"} />}>
                    <CollectionComp
                      size={userGameIDs.size}
                      value={colValue}
                      collection={collection}
                      itemsOnPage={12}
                    />
                  </Suspense>
                )
                : null
            )
            : noGamesMsg
        }
      </ContentContainer>
    </Stack>
  );
};