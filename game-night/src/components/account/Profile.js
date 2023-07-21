import React, {
  useContext,
  useEffect,
  useState,
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

const EditProfileModal = lazy(
  () => import("./EditProfile")
);

const CollectionComp = lazy(
  () => import("../games/Collection")
);

export default function Profile() {
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
        {
          userData
            ? (
              <Suspense fallback={<CircularLoading size={"2rem"} />}>
                <EditProfileModal
                  open={open}
                  setOpen={setOpen}
                  username={username}
                />
                <Grid
                  container
                  spacing={2}
                  direction={"row"}
                  alignItems={"flex-end"}
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
                    <Button size="small" onClick={handleEditClick}>
                      <Edit
                        fontSize="medium"
                        sx={{
                          color: "primary.contrastText",
                          marginLeft: 1
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