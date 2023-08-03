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

const EditProfileModal = lazy(() => import('./EditProfile'));

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
              <EditProfileModal
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
                  color={'primary.text'}
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
                      color: 'primary.contrastText',
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
            <Divider />
          </Grid>
        </Grid>
        <Suspense fallback={<CollectionSkeleton itemsOnPage={itemsOnPage} />}>
          <CollectionComp itemsOnPage={itemsOnPage} />
        </Suspense>
      </ContentContainer>
    </Stack>
  );
}
