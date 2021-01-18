import React, {FunctionComponent, useState} from 'react';
import {
    createStyles,
    Drawer,
    List,
    ListItem, ListItemText,
    makeStyles,
    Theme, Toolbar, Typography,
} from "@material-ui/core";
import TheoryBank from "./TheoryBank";


interface OwnProps {}

type Props = OwnProps;

const topics:Array<string> = Object.keys(TheoryBank);
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
    const [chosenPage, setChosenPage] = useState<string>('1. Problems');
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
                      {topics.map((text, index) => (
                          <ListItem button key={text} onClick={()=>{console.log(index);setChosenPage(text)}}>
                              <ListItemText primary={text} />
                          </ListItem>
                      ))}
                  </List>

              </div>
          </Drawer>
          <main className={classes.content}>
              <Toolbar />
              <Typography paragraph>
                  {(TheoryBank as any)[chosenPage]}
              </Typography>
          </main>
  </div>);
};

export default TheoryPage;


