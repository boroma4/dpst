import React, { FunctionComponent } from 'react';
import {Container} from "@material-ui/core";

interface OwnProps {
    setOpen:Function
}

type Props = OwnProps;

const MainText: FunctionComponent<Props> = (props) => {
    return (<Container>Helo</Container>);
};

export default MainText;
