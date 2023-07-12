import React, { useCallback, useContext, useEffect, useMemo } from "react";
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
import Collection from "../games/Collection";

export default function Profile() {
  const { username } = useParams();
  const { getCurrentUser, navigate, currentUser, userData } = useContext(UserContext);
  const { collection, userGameIDs, getCollection } = useContext(DataContext);
  const inSync = userGameIDs.size === collection.length;

  const getCollectionValue = useCallback((total = 0, count = 0) => {
    if (count === collection.length) return total;
    total += collection[count].msrp;
    return getCollectionValue(total, count + 1);
  }, [collection]);

  const collectionValue = useMemo(() => {
    return getCollectionValue();
  }, [collection, getCollectionValue]);

  const handleClick = () => {
    console.log('edit user:', username);
  };

  const checkCollection = useCallback(() => {
    if (!inSync) getCollection();
  }, [inSync, getCollection])

  useEffect(() => {
    if (!userData) getCurrentUser(username);
    checkCollection();
  }, [username, checkCollection]);

  if (!currentUser) return navigate('/login');

  if (username !== currentUser) return navigate('/');

  return (
    <Stack>
      <ContentContainer>
        {
          userData
            ? (
              <>
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
                <Divider />
                <Typography variant="h5" color={"primary.contrastText"}>
                  Collection
                </Typography>
                <Typography color={"primary.text"}>
                  Total Games: {collection.length}
                </Typography>
                <Typography color={"primary.text"}>
                  Estimated Value: {`$${collectionValue.toLocaleString('en-Us')}`}
                </Typography>
                <Collection inSync={inSync} collection={collection} />
              </>
            )
            : null
        }
      </ContentContainer>
    </Stack>
  );
};