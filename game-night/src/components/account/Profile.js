import React, {
  useContext,
  useEffect,
  useState,
  lazy
} from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
import DataContext from "../../context/DataContext";
import {
  Stack,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider
} from "@mui/material";
import { Edit } from '@mui/icons-material';
import ContentContainer from "../common/ContentContainer";
import ProfileSkeleton from "./ProfileSkeleton";
import CollectionSkeleton from "../games/CollectionSkeleton";

const EditProfileModal = lazy(
  () => import("./EditProfile")
);

const CollectionComp = lazy(
  () => import("../games/Collection")
);

export default function Profile({ itemsOnPage }) {
  const { username } = useParams();
  const {
    navigate,
    currentUser,
    getCurrentUser,
    userData
  } = useContext(UserContext);

  const {
    userGameIDs,
    collection,
    getCollection
  } = useContext(DataContext);

  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!userData) {
      getCurrentUser(username);
    }
  }, [userData, username, getCurrentUser]);

  useEffect(() => {
    if (!collection.length && userGameIDs.size) {
      // API requires additional comma at start and end of string
      const IdString = `,${[...userGameIDs].join(',')},`;
      getCollection(IdString);
    }
  }, [userGameIDs, getCollection, collection.length]);

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
        <Grid
          container
          spacing={2}
          direction={"row"}
          alignItems={"flex-end"}
        >
          {
            userData
              ? (
                <>
                  <EditProfileModal
                    open={open}
                    setOpen={setOpen}
                    username={username}
                  />
                  <Grid item>
                    <Avatar src={userData.imageURL} sx={{ width: 120, height: 120 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" color={"primary.text"}>
                      {userData.username}
                    </Typography>
                  </Grid>
                  <Grid item marginLeft={"auto"}>
                    <Button size="small" onClick={handleEditClick}>
                      <Edit
                        fontSize="medium"
                        sx={{
                          color: "primary.contrastText",
                          marginLeft: 2
                        }}
                      />
                    </Button>
                  </Grid>
                </>
              )
              : <ProfileSkeleton />
          }
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {
          collection.length
            ? (
              userGameIDs.size
                ? (
                  <CollectionComp
                    size={userGameIDs.size}
                    collection={collection}
                    itemsOnPage={itemsOnPage}
                  />
                )
                : noGamesMsg
            )
            : <CollectionSkeleton itemsOnPage={itemsOnPage} />
        }
      </ContentContainer>
    </Stack>
  );
};