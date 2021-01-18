import React, {FunctionComponent, useState} from 'react';
import {
    Box,
    Button,
    Container,
    createStyles, Divider,
    Drawer, Grid,
    List,
    ListItem, ListItemIcon, ListItemText,
    makeStyles, Paper,
    Theme, Toolbar, Typography,
    useTheme
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

interface OwnProps {}

type Props = OwnProps;

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

const TheoryPage: FunctionComponent<Props> = (props) => {
    const classes = useStyles();
  return (
      <div className={classes.root} >
          <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                  paper: classes.drawerPaper,
              }}
          >
              <Toolbar />
              <div className={classes.drawerContainer}>
                  <List>
                      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                          <ListItem button key={text}>
                              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                              <ListItemText primary={text} />
                          </ListItem>
                      ))}
                  </List>
                  <Divider />
                  <List>
                      {['All mail', 'Trash', 'Spam'].map((text, index) => (
                          <ListItem button key={text}>
                              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                              <ListItemText primary={text} />
                          </ListItem>
                      ))}
                  </List>
              </div>
          </Drawer>
          <main className={classes.content}>
              <Toolbar />
              <Typography paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                  facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                  gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                  donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                  adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                  Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                  imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                  arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                  donec massa sapien faucibus et molestie ac.
              </Typography>
              <Typography paragraph>
                  Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                  facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                  tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                  consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                  vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                  hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                  tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                  nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                  accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
              </Typography>
          </main>
  </div>);
};

export default TheoryPage;


