import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    [theme.breakpoints.down('sm')]: {
        mainContainer: {
            display: "flex",
            flexDirection: "column-reverse"
        }
    },
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
}));