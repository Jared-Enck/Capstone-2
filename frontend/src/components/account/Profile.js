import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import {
  Stack,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import ContentContainer from '../common/ContentContainer';
import ProfileSkeleton from './ProfileSkeleton';
import CollectionSkeleton from '../games/CollectionSkeleton';
import EditProfile from './EditProfile';

const CollectionComp = lazy(() => import('../games/Collection'));

export default function Profile({ itemsOnPage }) {
  const { username } = useParams();
  const { currentUser, getCurrentUser, userData, token } =
    useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    // GET request for userData
    if (!userData && currentUser) getCurrentUser(username);
    // eslint-disable-next-line
  }, [currentUser, getCurrentUser]);

  if (!token) return <Navigate to={'/login'} />;

  return (
    <Stack>
      <ContentContainer>
        <Grid
          container
          spacing={2}
          direction={'row'}
          alignItems={'flex-end'}
        >
          {userData ? (
            <>
              <EditProfile
                open={open}
                setOpen={setOpen}
                username={username}
              />
              <Grid item>
                <Avatar
                  src={userData.imageURL}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant='h5'
                  color={'secondary.main'}
                >
                  {userData.username}
                </Typography>
              </Grid>
              <Grid
                item
                marginLeft={'auto'}
              >
                <Button
                  size='small'
                  onClick={handleEditClick}
                >
                  <Edit
                    fontSize='medium'
                    sx={{
                      color: 'secondary.main',
                      marginLeft: 2,
                    }}
                  />
                </Button>
              </Grid>
            </>
          ) : (
            <ProfileSkeleton />
          )}
          <Grid
            item
            xs={12}
          >
            <Divider sx={{ color: 'primary.muted' }} />
          </Grid>
        </Grid>
        <Suspense fallback={<CollectionSkeleton itemsOnPage={itemsOnPage} />}>
          <CollectionComp itemsOnPage={itemsOnPage} />
        </Suspense>
      </ContentContainer>
    </Stack>
  );
}
