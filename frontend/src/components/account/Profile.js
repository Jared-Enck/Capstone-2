import React, { useContext, useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import DataContext from '../../context/DataContext';
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
import CollectionSkeleton from '../collection/CollectionSkeleton';
import EditProfile from './EditProfile';

const CollectionComp = lazy(() => import('../collection/Collection'));

export default function Profile({ itemsOnPage }) {
  const { username } = useParams();
  const { currentUser, getCurrentUser, userData, token } =
    useContext(UserContext);

  const { isSmallScreen } = useContext(DataContext);
  const avatarSize = isSmallScreen
    ? { width: '5.5rem', height: '5.5rem' }
    : { width: '7.5rem', height: '7.5rem' };
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
      {userData ? (
        <EditProfile
          open={open}
          setOpen={setOpen}
          username={username}
          avatarSize={avatarSize}
        />
      ) : null}
      <ContentContainer>
        <Grid
          container
          spacing={2}
          direction={'row'}
          alignItems={'flex-end'}
          padding={1}
        >
          {userData ? (
            <>
              <Grid
                item
                xs={12}
                md={2}
              >
                <Avatar
                  src={userData.imageURL}
                  sx={{ width: avatarSize.width, height: avatarSize.height }}
                />
              </Grid>
              <Grid
                item
                sx={{ display: 'flex' }}
                xs={12}
                md={10}
              >
                <Typography
                  variant='h5'
                  color={'secondary.main'}
                  sx={{ flexGrow: 1 }}
                >
                  {userData.username}
                </Typography>
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
            <ProfileSkeleton avatarSize={avatarSize} />
          )}
        </Grid>

        <Divider sx={{ bgcolor: 'primary.dark', margin: 1 }} />

        <Suspense fallback={<CollectionSkeleton itemsOnPage={itemsOnPage} />}>
          <CollectionComp itemsOnPage={itemsOnPage} />
        </Suspense>
      </ContentContainer>
    </Stack>
  );
}
