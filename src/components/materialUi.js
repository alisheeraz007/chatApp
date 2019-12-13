import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import NewMessege from './NewMessege';
import CreateGroup from './CreateGroup';
import Login from './Login'

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "500px",
        height: "500px",
        backgroundColor: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    },
    tab: {
        color: "red",
    }
    ,
    indicator: {
        backgroundColor: 'white',
    },
    '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(2);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabContainer dir={theme.direction}>
                    <div>
                        <div className="topButton">
                            <button onClick={(ev) => this.signOut(ev)}>Sign Out</button>
                            <button onClick={(ev) => this.dashBoard(ev)}>My Messege</button>
                            <button onClick={(ev) => this.creatGroup(ev)}>Create Group</button>
                            <button onClick={(ev) => this.newMessege(ev)}>New Messege</button>
                            <div>
                                1st Page
                        </div>
                        </div>
                    </div>
                </TabContainer>
                <TabContainer dir={theme.direction}>
                    <div>
                        <div className="topButton">
                            <button onClick={(ev) => this.signOut(ev)}>Sign Out</button>
                            <button onClick={(ev) => this.dashBoard(ev)}>My Messege</button>
                            <button onClick={(ev) => this.creatGroup(ev)}>Create Group</button>
                            <button onClick={(ev) => this.newMessege(ev)}>New Messege</button>
                            <div>
                                2nd Page
                        </div>
                        </div>
                    </div>
                </TabContainer>
                <TabContainer dir={theme.direction}>
                    <Login />
                </TabContainer>
            </SwipeableViews>
        </div>
    );
}
