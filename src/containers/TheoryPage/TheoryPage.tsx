import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    Button,
    createStyles,
    Drawer,
    List,
    ListItem, ListItemText,
    makeStyles,
    Theme, Toolbar,
} from "@material-ui/core";
import TheoryBank from "./TheoryBank";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import SubdirectoryArrowRightSharpIcon from "@material-ui/icons/SubdirectoryArrowRightSharp";
import {MAIN_PATH} from "../../App";
import { useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in';



interface OwnProps {}

type Props = OwnProps;

const topics:Array<string> = Object.keys(TheoryBank);
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            textAlign:'left',
            paddingBottom:'4vh',
            fontSize:"2.5vh",
            maxWidth:"75vw"

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
            padding: theme.spacing(3)
        },
    }),
);


const TheoryPage: FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const [chosenPage, setChosenPage] = useState<string>('1. Introduction');
    const history = useHistory();
    const sendToVisualizer = <Button onClick={()=>history.push(MAIN_PATH + '/visualizer')} variant="contained" color="primary" size="large" style={{padding:20}}>Go to visualizer<SubdirectoryArrowRightSharpIcon style={{margin:5}}/></Button> ;

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
                              <ListItem button style={(text === chosenPage)? ({backgroundColor:"#3f51b5",color:"white"}) : ({})} key={text} onClick={()=>{setChosenPage(text)}}>
                                  <ListItemText primary={text} />
                              </ListItem>
                          ))}
                      </List>

                  </div>
              </Drawer>
          <FadeIn>
              <div className={classes.content}>
                  <h3>{chosenPage}</h3>
                  <ReactMarkdown
                      children={(TheoryBank as any)[chosenPage][0]}
                      escapeHtml={false}
                      plugins={[
                          RemarkMathPlugin
                      ]}
                      renderers={{math:({ value }) => <BlockMath>{value}</BlockMath>,inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>}}
                  />
                  {((TheoryBank as any)[chosenPage].length >1)? (sendToVisualizer) : (<></>)}
              </div>
          </FadeIn>
  </div>);
};

export default TheoryPage;


